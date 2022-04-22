import React from 'react';

const Licenses: React.FC = () => {
  return (
    <div className=" rounded-xl bg-brand-deep-blue bg-[url('/images/nodes/dashboard/network-bg_op.png')] bg-cover bg-center p-6 shadow-dark-panel md:p-8">
      <p className="text-[20px] font-medium leading-[1.25] text-brand-light-blue">
        Maximise your network
      </p>
      <button className="btn-lg btn-white mt-6">GET MORE LICENSES</button>
    </div>
  );
};

export default Licenses;
