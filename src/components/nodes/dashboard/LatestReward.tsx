import Image from 'next/image';
import React from 'react';
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon';

const data = [
  {
    date: '13 February 2022',
    items: [
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
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
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
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
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      },
      {
        image: '/images/nodes/dashboard/reward.png',
        title: 'Mythical Myria Egg',
        description:
          'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.',
        time: '4:41pm • 8 Feb 2022'
      }
    ]
  }
];
const LatestReward: React.FC = () => {
  return (
    <div className=" overflow-hidden rounded-xl bg-brand-deep-blue">
      <div
        style={{
          boxShadow: '0px 0px 40px #000000'
        }}
        className="flex items-center justify-between space-x-4 p-6 md:px-8 md:py-9">
        <p className="text-[20px] leading-[1.25]">Latest Rewards</p>
        <button className="btn-icon-sm btn-primary flex items-center px-4 text-dark">
          <span>CLAIM REWARDS</span>
          <span className="w-[22px]">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
      <div className="max-h-[1014px] space-y-7 overflow-auto p-4 md:px-8 md:py-[30px]">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-4">
            <p className="text-[14px] leading-[1.25] text-light">{item.date}</p>
            {item.items.map((i, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-4 rounded-xl bg-dark p-4 md:space-x-8 md:p-8">
                <div className=" relative h-[56px] w-[56px] flex-shrink-0 overflow-hidden rounded-full md:h-[76px] md:w-[76px]">
                  <Image src={i.image} layout="fill" alt="" objectFit="cover" />
                </div>
                <div className="space-y-1">
                  <p className="text-[16px] font-medium leading-[1.27] md:text-[18px]">{i.title}</p>
                  <p className="text-[12px] leading-[1.5] text-light md:text-[16px]">
                    {i.description}
                  </p>
                  <p className="text-[12px] leading-[1.2] text-light md:text-[14px]">{i.time}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReward;
