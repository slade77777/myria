import React from 'react';
import NodesPage from 'src/components/nodes/NodesPage';
import MinAssetList from 'src/components/nodes/mint-assets';

const MintAssets: React.FC = () => {
  return (
    <NodesPage>
      <MinAssetList />
    </NodesPage>
  );
};

export default MintAssets;
