import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Municipality } from "@/types/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Municipality[] | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("logo-vote");

    // Use aggregation to get municipalities with their vote counts
    const municipalities = (await db
      .collection<Municipality>("municipalities")
      .aggregate([
        {
          $lookup: {
            from: "votes",
            localField: "muni_code",
            foreignField: "municipalityId",
            as: "votes",
          },
        },
        {
          $addFields: {
            voteCount: { $size: "$votes" },
          },
        },
        {
          $project: {
            _id: 1,
            muni_code: 1,
            mun_name: 1,
            amp_name: 1,
            cwt_name: 1,
            logo: 1,
            voteCount: 1,
            Website: 1,
            Facebook: 1,
          },
        },
      ])
      .toArray()) as Municipality[];

    return res.status(200).json(municipalities);
  } catch (error) {
    console.error("Error fetching municipalities:", error);
    return res.status(500).json({ message: "Error fetching municipalities" });
  }
}
