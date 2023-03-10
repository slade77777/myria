export type CollectionType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  name: string;
  collectionImageUrl: string;
  description: string;
  iconUrl: string;
  contractAddress: string;
  ownerPublicKey: string;
  metadataApiUrl: string;
  starkKey: string;
  publicId: string;
  metadataSchema: Array<any>;
  project: any;
  __entity: string;
  totalAssets: number;
  totalAssetsForSale: number;
};
export enum PurchaseStatus {
  CHECK,
  SUCCESS,
  FAIL
}
export enum StatusWithdrawNFT {
  MAIN_SCREEN,
  INPROGRESS,
  SUCCESS,
  FAILED,
  COMPLETED
}