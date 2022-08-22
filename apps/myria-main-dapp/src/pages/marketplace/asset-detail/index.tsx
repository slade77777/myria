import { useRouter } from 'next/router';
import AssetDetails from 'src/components/marketplace/AssetDetails';
import Page from 'src/components/Page';
import NotFoundPage from 'src/pages/404';
import { useEffect, useState } from 'react';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import MessageMobileView from 'src/components/marketplace/Modals/MessageMobileView';

const AssetDetailPage = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router]);

  if (isMobile) {
    return <MessageMobileView isShow={isResolution} handleClose={() => setIsSolution(false)} />;
  }

  if (!isReady) {
    return (
      <Page includeFooter={false}>
        <div className="min-h-screen" />
      </Page>
    );
  }

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <Page includeFooter={false}>
      <AssetDetails id={id} />
    </Page>
  );
};

export default AssetDetailPage;
