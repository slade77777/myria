import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
interface IProp {}

const LearnMoreWithdrawNFT: React.FC<IProp> = ({}) => {
  return (
    <div className="px-8 mt-4 pb-8 text-base/10">
      <p className="mb-2">
        <Trans>
          Myria uses ZK rollup technology to increase the scalability of the Ethereum network by
          rolling many transactions up into a single batch, and sending it to the main Ethereum
          chain for verification in a single action. This can significantly reduce transaction fees,
          known as gas, required to process Ethereum transactions.
        </Trans>
      </p>
      <p>
        <Trans>
          Depending on where your transaction is in the batch cycle, the processing time can be
          anywhere from minutes up to a maximum of 20 hours.
        </Trans>
      </p>
    </div>
  );
};
export default LearnMoreWithdrawNFT;
