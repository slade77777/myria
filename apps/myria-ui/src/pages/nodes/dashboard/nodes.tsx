import { Trans } from '@lingui/macro';
import Image from 'next/image';
import * as React from 'react';
import NodesLayout from 'src/components/nodes/NodesLayout';
import { useAuthenticationContext } from 'src/context/authentication';

const DashboardNodes: React.FC = () => {
  const { register } = useAuthenticationContext();
  const isRegistered = false;

  return (
    <NodesLayout>
      <div className="relative isolate flex min-h-[810px] flex-col overflow-hidden">
        <div className="absolute top-0 left-0 z-[-1] w-full max-w-[797px]">
          <Image src="/images/nodes/character.png" alt="" width={2394} height={2408} />
        </div>
        <div className="flex flex-grow flex-col items-start justify-center lg:ml-auto lg:w-[55%] lg:pr-[119px]">
          <p className="text-blue/10">
            <Trans>
              Your node app and dashboard will be available after the public node sale. Product
              related updates and releases will be sent to your email. Stay tuned.
            </Trans>
          </p>
          <button onClick={register} className="btn-lg btn-primary mt-8">
            CREATE AN ACCOUNT
          </button>
        </div>
      </div>
    </NodesLayout>
  );
};

export default DashboardNodes;
