import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Diagram: React.FC = () => {
  return (
    <div>
      <div className="h-[427px] rounded-xl bg-brand-deep-blue bg-[url('/images/ecosystem/diagram-mobile_op.png')] bg-cover bg-right-bottom bg-no-repeat p-8 sm:hidden">
        <h2 className="text-[32px] font-bold leading-[1.25]">Myria Blockchain Ecosystem Map</h2>
        <Link href="/blockchain-map">
          <a target="_blank" className="btn-lg btn-primary mt-8">
            <Trans>view now</Trans>
          </a>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Image
          src="/images/ecosystem/diagram_update.svg"
          alt=""
          width={1048}
          height={1148}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default Diagram;
