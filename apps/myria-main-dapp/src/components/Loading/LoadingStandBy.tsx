import { t } from '@lingui/macro';
import React from 'react';
import Loading from './Loading';

function LoadingStandBy() {
  return <Loading label={t`Stand by`} labelSize={16} loadingSize={64} />;
}

export default LoadingStandBy;
