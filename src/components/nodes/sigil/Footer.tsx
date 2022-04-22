import React, { useRef } from 'react';
import Link from 'next/link';
import ChevronLeftIcon from 'src/components/icons/ChevronLeftIcon';
import Logo from 'src/components/icons/Logo';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { Trans } from '@lingui/macro';
import ProfileComponent from 'src/components/Header/ProfileComponent';
import MuteIcon from 'src/components/icons/MuteIcon';

const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 z-10 flex h-[80px] w-full items-center justify-end p-4 px-6">
      <div className='flex items-center justify-between cursor-pointer'>
        <div className='mr-3'>
        <MuteIcon />
        </div>
        <p className="body-sm font-medium	">Mute sound</p>
      </div>
    </footer>
  );
};

export default Footer;
