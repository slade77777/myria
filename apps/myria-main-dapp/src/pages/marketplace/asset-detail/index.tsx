import { useRouter } from 'next/router';
import AssetDetails from 'src/components/marketplace/AssetDetails';
import Page from 'src/components/Page';
import NotFoundPage from 'src/pages/404';
import { useEffect, useState } from 'react';
import useCheckStatusMarketplacePage from 'src/hooks/useCheckStatusMarketplacePage';
import MaintainPage from 'src/components/marketplace/MaintainPage/MaintainPage';
import { STATUS_PAGE } from '..';

const AssetDetailPage = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, error, data } = useCheckStatusMarketplacePage();

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router]);

  if (data && data?.data.status !== STATUS_PAGE.AVAILABLE) return <MaintainPage />;

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

  if (data && data?.data.status === STATUS_PAGE.AVAILABLE)
    return (
      <Page includeFooter={false}>
        <AssetDetails id={id} />
      </Page>
    );

  return <div className="bg-base/3 h-screen w-screen"></div>;
};

export default AssetDetailPage;
