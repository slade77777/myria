import React, { useState } from 'react';
import Asset from './Asset';

const availableMint = [
  {
    id: 'A1',
    image: '/images/nodes/sigil/alliance-modal-item.png',
    title: 'Common Sigil',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
    time: '2 hours ago',
    type: 'common'
  },
  {
    id: 'A2',
    image: '/images/nodes/sigil/alliance-modal-item.png',
    title: 'Rare Sigil',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
    time: '2 hours ago',
    type: 'rare'
  },
  {
    id: 'A3',
    image: '/images/nodes/sigil/alliance-modal-item.png',
    title: 'Ultra Rare Sigil',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
    time: '2 hours ago',
    type: 'ultra-rare'
  }
];

const offchainAssets = [
  {
    id: 'B1',
    image: '/images/nodes/sigil/alliance-1.png',
    title: 'Common Alliance Chest',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
    time: '2 hours ago'
  },
  {
    id: 'B2',
    image: '/images/nodes/dashboard/reward.png',
    title: 'Common Title',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
    time: '2 hours ago'
  }
];

const MinAssetList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>(['1']);

  const handleToggle = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-brand-deep-blue">
        <div className=" flex flex-col space-y-2 p-6 md:flex-row md:items-center md:justify-between md:space-y-0 md:px-8">
          <p className="text-[20px] font-medium leading-[1.25] md:text-[24px]">Mint Assets</p>
          <div className="flex items-center space-x-4 md:space-x-10">
            <button
              onClick={() => alert('MINT ALL')}
              className="btn-sm btn-white flex items-center px-4 md:btn-lg">
              MINT ALL
            </button>
            <button
              onClick={() => alert('MINT SELECTED')}
              disabled={checkedItems.length === 0}
              className="btn-sm btn-dark-blue flex items-center px-4 md:btn-lg">
              MINT SELECTED
            </button>
          </div>
        </div>
        <div className="max-h-[1014px] space-y-10 overflow-auto p-4 md:px-8 md:py-[6px]">
          <div className="space-y-4">
            <p className="text-[14px] font-medium leading-[1.25] text-light md:text-[16px]">
              Available to mint
            </p>
            {availableMint.map((i, idx) => (
              <Asset
                key={idx}
                id={i.id}
                title={i.title}
                description={i.description}
                time={i.time}
                image={i.image}
                checked={checkedItems.includes(i.id)}
                onCheck={handleToggle}
                type={i.type}
              />
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-[14px] font-medium leading-[1.25] text-light md:text-[16px]">
              Off Chain Assets
            </p>
            {offchainAssets.map((i, idx) => (
              <Asset
                key={idx}
                id={i.id}
                title={i.title}
                description={i.description}
                time={i.time}
                image={i.image}
                checked={checkedItems.includes(i.id)}
                onCheck={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MinAssetList;
