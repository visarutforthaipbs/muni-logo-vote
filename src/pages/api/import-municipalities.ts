import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Municipality } from "@/types/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("logo-vote");

    const municipalities: Municipality[] = req.body;

    if (!Array.isArray(municipalities)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Prepare the municipalities for insertion
    const municipalitiesWithVoteCount = municipalities.map((m) => ({
      ...m,
      voteCount: 0,
    }));

    // Use bulk operations for better performance
    const operations = municipalitiesWithVoteCount.map((m) => ({
      updateOne: {
        filter: { muni_code: m.muni_code },
        update: { $set: m },
        upsert: true,
      },
    }));

    const result = await db.collection("municipalities").bulkWrite(operations);

    return res.status(200).json({
      message: "Municipalities imported successfully",
      result,
    });
  } catch (error) {
    console.error("Error importing municipalities:", error);
    return res.status(500).json({ message: "Error importing municipalities" });
  }
}
