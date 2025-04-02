import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { VoteResponse } from "@/types/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VoteResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("logo-vote");

    const { municipalityId } = req.body;
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    if (!municipalityId) {
      return res.status(400).json({
        success: false,
        message: "Municipality ID is required",
      });
    }

    // Check for duplicate votes (limit 1 vote per IP per municipality per day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingVote = await db.collection("votes").findOne({
      municipalityId,
      ip: userIp,
      timestamp: { $gte: today },
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted for this municipality today",
      });
    }

    // Record the vote
    await db.collection("votes").insertOne({
      municipalityId,
      ip: userIp,
      userAgent,
      timestamp: new Date(),
    });

    // Update municipality vote count
    const result = await db
      .collection("municipalities")
      .findOneAndUpdate(
        { muni_code: municipalityId },
        { $inc: { voteCount: 1 } },
        { returnDocument: "after" }
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Municipality not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      voteCount: result.value?.voteCount || 1,
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing vote",
    });
  }
}
