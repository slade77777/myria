import React from 'react';
import Input from './Input';

const Subscribe: React.FC = () => {
  return (
    <div
      style={{
        boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
      }}
      className="max-w-content mx-auto bg-[url('/images/games/panel.png')] bg-cover bg-center rounded-[20px] flex flex-col items-center md:py-[158px] p-[32px]">
      <h2 className="text-center heading-sm md:heading-md">Pre register to stay up to date</h2>
      <div className="max-w-[585px] w-full mt-6 ">
        <p className="text-center body text-light">
          Sign up to our newsletter to for development updates, token and NFT drops, and exclusive
          promotions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] mt-10 gap-4">
          <Input placeholder="Enter your email address" />
          <button className="btn-lg btn-primary">SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
