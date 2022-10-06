import { useRouter } from 'next/router';
import AssetDetails from 'src/components/marketplace/AssetDetails';
import Page from 'src/components/Page';
import NotFoundPage from 'src/pages/404';
import { useEffect, useState } from 'react';

const AssetDetailPage = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router]);

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
