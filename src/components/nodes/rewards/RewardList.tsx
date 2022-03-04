import Image from 'next/image';
import React, { useState } from 'react';
import Input from 'src/components/Input';
import ClaimModal from './ClaimModal';
import WalletModal from './WalletModal';

const data = [
  {
    date: '13 February 2022',
    items: [
      {
        id: '1',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '2',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '3',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '4',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      }
    ]
  },
  {
    date: '13 February 2022',
    items: [
      {
        id: '5',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '6',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '7',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '8',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      }
    ]
  },
  {
    date: '13 February 2022',
    items: [
      {
        id: '9',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '10',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '11',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        id: '12',
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      }
    ]
  }
];
const RewardList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>(['1']);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openClaimModal, setOpenClaimModal] = useState(false);

  const handleToggle = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <>
      <WalletModal open={openWalletModal} onClose={() => setOpenWalletModal(false)} />
      <ClaimModal open={openClaimModal} onClose={() => setOpenClaimModal(false)} />
      <div className=" overflow-hidden rounded-xl bg-brand-deep-blue">
        <div
          style={{
            boxShadow: '0px 0px 40px #000000'
          }}
          className=" flex flex-col space-y-2 p-6 md:flex-row md:items-center md:justify-between md:space-y-0 md:px-8">
          <p className="text-[20px] font-medium leading-[1.25] md:text-[24px]">NFT Rewards</p>
          <div className="flex items-center space-x-4 md:space-x-10">
            <button
              onClick={() => setOpenClaimModal(true)}
              className="btn-sm btn-white flex items-center px-4 md:btn-lg">
              Collect ALL
            </button>
            <button
              onClick={() => setOpenWalletModal(true)}
              disabled={checkedItems.length === 0}
              className="btn-sm btn-primary flex items-center px-4 md:btn-lg">
              Collect REWARDS
            </button>
          </div>
        </div>
        <div className="max-h-[1014px] space-y-10 overflow-auto p-4 md:px-8 md:py-[30px]">
          {data.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <p className="text-[14px] font-medium leading-[1.25] text-light md:text-[16px]">
                {item.date}
              </p>
              {item.items.map((i, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 rounded-xl bg-dark p-4 md:space-x-8 md:p-8">
                  <div className=" relative h-[56px] w-[56px] flex-shrink-0 overflow-hidden rounded-full md:h-[76px] md:w-[76px]">
                    <Image src={i.image} layout="fill" alt="" objectFit="cover" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-[16px] font-medium leading-[1.27] md:text-[18px]">
                      {i.title}
                    </p>
                    <p className="text-[12px] leading-[1.5] text-light md:text-[16px]">
                      {i.description}
                    </p>
                    <p className="text-[12px] leading-[1.2] text-light md:text-[14px]">{i.time}</p>
                  </div>
                  <div className="md:self-center">
                    <Input
                      type="checkbox"
                      onChange={() => handleToggle(i.id)}
                      checked={checkedItems.includes(i.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RewardList;
