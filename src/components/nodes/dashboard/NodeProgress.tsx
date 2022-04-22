import React from 'react';
import NodeIcon from 'src/components/icons/NodeIcon';

const Progress: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className="relative h-[5px] w-[102px] rounded-2xl bg-dark">
      <div
        style={{ width: `${percentage}%` }}
        className="absolute top-0 left-0 h-full rounded-2xl bg-brand-gold"
      />
    </div>
  );
};
const NodeProgress: React.FC = () => {
  return (
    <div className="rounded-xl bg-brand-deep-blue p-6 shadow-dark-panel md:p-8">
      <p className="text-[20px] leading-[1.25] text-light">Node progress this cycle</p>
      <div className="mt-6 space-y-6 md:mt-8">
        <div className="flex items-center">
          <span className="w-5 text-light-green">
            <NodeIcon />
          </span>
          <p className="ml-[11px] text-[16px] leading-[1.5]">Node #8320324</p>
          <div className="ml-5">
            <Progress percentage={47} />
          </div>
          <p className="ml-4 text-[16px] leading-[1.5] text-light">47%</p>
        </div>
        <div className="flex items-center">
          <span className="w-5 text-light-red">
            <NodeIcon />
          </span>
          <p className="ml-[11px] text-[16px] leading-[1.5]">Node #8320324</p>
          <div className="ml-5">
            <Progress percentage={47} />
          </div>
          <p className="ml-4 text-[16px] leading-[1.5] text-light">47%</p>
        </div>
      </div>
    </div>
  );
};

export default NodeProgress;
