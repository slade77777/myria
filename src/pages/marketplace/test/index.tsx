import React from 'react';
import NftItem from 'src/components/marketplace/NftItem';
import testImg from './test.png';
import testavatarImg from './testavatar.png';

function Testmarketplace() {
  return (
    <div>
      <NftItem
        item={{
          rarity: 'rare',
          name: 'Common Alliance Chest',
          image_url: testImg.src,
          collection: 'Sigil Myriaverse',
          creator: 'Myria',
          creatorImg: testavatarImg.src,
          priceETH: 2
        }}
      />
    </div>
  );
}

export default Testmarketplace;
