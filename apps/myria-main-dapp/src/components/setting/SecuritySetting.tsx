import React, { memo, useMemo, useState } from 'react';
import clsx from 'clsx';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import { useRouter } from 'next/router';

const SecuritySetting = () => {
  const [tab, setTab] = useState<'email' | 'password'>('email');
  const router = useRouter();

  const content = useMemo(() => {
    switch (tab) {
      case 'email':
        return <EmailForm />;
      case 'password':
        return <PasswordForm onSuccess={() => router.push('/settings')} />;
      default:
        return null;
    }
  }, [tab]);

  return (
    <div>
      <div className="w-full bg-base/3 p-8">
        <p className="text-white text-3xl font-bold">Login & Security</p>
        <div className="flex flew-row">
          <div className="pr-12 border-r-2 border-gray/2 w-1/4">
            <div
              onClick={() => setTab('email')}
              className={clsx(
                'mt-3 cursor-pointer text-gray/6 p-2',
                tab === 'email' ? 'bg-base/4 text-white rounded' : ''
              )}>
              Email Address
            </div>
            <div
              onClick={() => setTab('password')}
              className={clsx(
                'mt-3 cursor-pointer text-gray/6 p-2',
                tab === 'password' ? 'bg-base/4 text-white rounded' : ''
              )}>
              Password
            </div>
          </div>
          <div className="w-1/2">{content}</div>
        </div>
      </div>
      <div className="h-screen" />
    </div>
  );
};

export default memo(SecuritySetting);
