import { useRouter } from 'next/router';
import AssetDetails from 'src/components/marketplace/AssetDetails';
import Page from 'src/components/Page';
import NotFoundPage from "src/pages/404";

const AssetDetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <Page>
      <AssetDetails id={id} />
    </Page>
  );
};

export default AssetDetailPage;
