import React from 'react';
import NodeIcon from 'src/components/icons/NodeIcon';

const TotalNodes: React.FC = () => {
  return (
    <div className="rounded-xl bg-brand-deep-blue p-6 shadow-dark-panel md:p-8">
      <p className="text-[20px] font-medium leading-[1.25] text-light">
        Total nodes in Myria network
      </p>
      <div className="mt-2 flex items-center md:mt-8">
        <span className="w-8 text-brand-light-blue">
          <NodeIcon />
        </span>
        <p className="ml-4 text-[32px] font-extrabold leading-[1.15]">24,981</p>
        <p className="ml-2 text-[16px] leading-[1.5] text-light">Nodes</p>
      </div>
    </div>
  );
};

export default TotalNodes;
