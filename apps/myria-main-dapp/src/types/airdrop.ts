export type AirdropUser = {
  id: number;
  starkKey: string;
  userId: string;
  walletAddress: string;
  email: string;
  verifiedAt: string;
  username: string | null;
  referrerId: number;
  allianceId: number;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
};
