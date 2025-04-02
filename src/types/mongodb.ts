import { ObjectId } from "mongodb";

export interface Vote {
  _id?: ObjectId;
  municipalityId: string;
  ip: string;
  timestamp: Date;
  userAgent?: string;
}

export interface Municipality {
  _id?: string;
  muni_code: string;
  mun_name: string;
  amp_name: string;
  cwt_name: string;
  logo: string;
  voteCount: number;
  Website?: string;
  Facebook?: string;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  voteCount?: number;
}
