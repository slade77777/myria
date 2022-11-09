import { FC } from 'react';
import Link from 'next/link';

const MaintainPage: FC<{}> = () => {
  return (
    <div className="bg-base/3 h-screen w-screen overflow-hidden text-white flex justify-center items-center">
      <div className="text-center">
        <p className="mt-5 text-[34px] font-extrabold leading-[1.15]">
          Sorry, we're down for maintenance
        </p>
        <p className="mt-5 text-2xl font-extrabold leading-[1.15]">We'll be back to soon</p>
        <Link href={`/`}>
          <button className="bg-primary/6 text-base/1 px-5 py-3 rounded-lg font-medium mt-6">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MaintainPage;
