import { Trans } from '@lingui/macro';
import Link from 'next/link';

const BuyANodeLink: React.FC<any> = (props) => (
  <Link href={'/nodes'}>
    <a {...props}>
      <Trans>BUY A NODE</Trans>
    </a>
  </Link>
);

export default BuyANodeLink;
