import { useRouter } from 'next/router';
import AssetDetails from 'src/components/marketplace/AssetDetails';
import Page from 'src/components/Page';

const AssetDetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Page>
      <AssetDetails id={id} />
    </Page>
  );
};

export default AssetDetailPage;
