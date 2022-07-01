import Collection from '../../../components/marketplace/Collection';
import { NFTItemType } from '../../../components/marketplace/NftItem/type';
import testImg from '../inventory/test.png';
import testavatarImg from '../inventory/testavatar.png';

const CollectionDetailPage = () => {
  return (
    <Collection
      collectionImageUrl={''}
      name="Myria Sigil Collections"
      createdBy="Myria Sigil Event"
      description="Flannel mlkshk four loko squid shoreditch. Ennui adaptogen kombucha chia, gastropub disrupt YOLO tumblr hexagon copper mug hashtag neutra four dollar toast. Myria helps blockchain projects scale. Whether you’re an established crypto business or simply exploring  the new..."
      assetItems={Array(11)
        .fill(0)
        .map((_, index) => {
          const item: NFTItemType = {
            id: index.toString(),
            rarity: 'rare',
            name: 'Common Alliance Chest',
            image_url: testImg.src,
            collection: 'Sigil Myriaverse',
            creator: 'Myria',
            creatorImg: testavatarImg.src,
            priceETH: Math.round(Math.random() * 5)
          };
          return item;
        })}
    />
  );
};

export default CollectionDetailPage;
