import React from 'react';
import Inventory from 'src/components/marketplace/Inventory';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import testImg from './test.png';
import testavatarImg from './testavatar.png';

function InventoryPage() {
  return (
    <Inventory
      userAddress="0xc2bdsdfjsdbfjsfff0956"
      userAvatar={testavatarImg.src}
      userName="Ronald Richards"
      userJoinDate={new Date()}
      items={Array(11)
        .fill(0)
        .map(
          (_, index) => {
            const item: NFTItemType = {
              id: index.toString(),
              rarity: 'rare',
              name: 'Common Alliance Chest',
              image_url: testImg.src,
              collection: 'Sigil Myriaverse',
              creator: 'Myria',
              creatorImg: testavatarImg.src,
              priceETH: Math.round(Math.random() * 5)
            }
            return item;
          }
        )}
    />
  );
}

export default InventoryPage;
