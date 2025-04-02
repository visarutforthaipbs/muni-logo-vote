import "dotenv/config";
import clientPromise from "../lib/mongodb";

async function setupDatabase() {
  try {
    const client = await clientPromise;
    console.log("✅ Connected to MongoDB successfully!");

    const db = client.db("logo-vote");

    // Create collections if they don't exist
    await db.createCollection("municipalities");
    await db.createCollection("votes");
    console.log("✅ Collections created successfully!");

    // Create indexes
    await db.collection("votes").createIndex({
      municipalityId: 1,
      ipAddress: 1,
      timestamp: 1,
    });
    await db
      .collection("municipalities")
      .createIndex({ muni_code: 1 }, { unique: true });
    console.log("✅ Indexes created successfully!");

    // Check if we have any municipalities
    const municipalityCount = await db
      .collection("municipalities")
      .countDocuments();
    console.log(`Found ${municipalityCount} municipalities in the database`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();
