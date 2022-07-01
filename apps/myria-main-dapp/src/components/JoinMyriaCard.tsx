import { Trans } from '@lingui/macro';
import Link from 'next/link';

const JoinMyriaCard = () => (
  <div className="relative isolate rounded-xl bg-[url('/images/studios/character-panel_op.png')] bg-cover bg-right p-8 pb-[230px] md:pb-[86px]">
    <p className="max-w-[468px] text-[24px] font-bold leading-[1.25] md:text-[28px]">
      <Trans> Join Myria in building the next blockchain revolution </Trans>
    </p>
    <p className="mt-4 max-w-[467px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
      <Trans>Learn more about our job current openings and see how you can get involved!</Trans>
    </p>
    <Link href={'/careers'}>
      <a className="btn-lg btn-primary mt-8 md:mt-10">
        <Trans>Join MYRIA</Trans>
      </a>
    </Link>
  </div>
);

export default JoinMyriaCard;
