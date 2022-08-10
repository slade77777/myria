import { CollectionType } from 'src/types/marketplace';
import { RarityType } from 'src/types/sigil';

export type NFTItemType = {
  id: string;
  rarity: RarityType;
  image_url: string;
  name: string;
  collection?: CollectionType;
  creator: string;
  creatorImg: string;
  priceETH: string | number;
};
