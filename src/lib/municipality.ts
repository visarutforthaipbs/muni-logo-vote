import { Municipality } from "@/types/mongodb";
import clientPromise from "@/lib/mongodb";

export async function getMunicipalityByCode(
  code: string
): Promise<Municipality | null> {
  const client = await clientPromise;
  const db = client.db("logo-vote");
  return db
    .collection<Municipality>("municipalities")
    .findOne({ muni_code: code });
}
