import { Trans } from '@lingui/macro';
import React from 'react';
import { useAuthenticationContext } from 'src/context/authentication';

type Props = {};

const Register: React.FC<Props> = ({}) => {
  const { register, user } = useAuthenticationContext();

  return (
    <div className="relative h-screen min-h-[inherit] bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat">
      <div className="mx-auto max-w-[464px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">
          <Trans>The Sigil campaign has come to an end</Trans>
        </h1>
        {(user?.credits !== 0 || !user.user_name) && (
          <>
            <p className="text-light mt-8 text-[16px] leading-[1.5]">
              <Trans>
                Thank you for your interest in our Sigil launch campaign. Register below to be
                notified about future campaigns.
              </Trans>
            </p>
            <button type="button" onClick={register} className="btn-lg btn-primary mt-10">
              <Trans>Register Now</Trans>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
