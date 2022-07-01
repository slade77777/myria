import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Socials from 'src/components/Social';
import GetInTouch from '../components/GetInTouch';
import { headerHeight } from '../components/Header';
import MailIcon from '../components/icons/MailIcon';
import Page from '../components/Page';
import { paddingX } from '../utils';

const NewsLetter: React.FC = () => {
  if (process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER) {
    return (
      <Page>
        <div className="min-h-[600px] pt-[100px]">
          <div className="klaviyo-form-TSrENd" />
        </div>
      </Page>
    );
  }
  return null;
};

export default NewsLetter;
