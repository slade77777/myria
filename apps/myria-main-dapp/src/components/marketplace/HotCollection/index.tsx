import { Trans } from '@lingui/macro';
import React from 'react';

type ItemCollection = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  collectionImageUrl: string;
  description: string;
  iconUrl: string;
  contractAddress: string;
  ownerPublicKey: string;
  metadataApiUrl: string;
  starkKey: string;
  publicId: string;
  metadataSchema: [];
  project: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    companyName: string;
    contactEmail: string;
    collectionLimitExpiresAt: string;
    collectionMonthlyLimit: number;
    collectionRemaining: number;
    mintLimitExpiresAt: null;
    mintMonthlyLimit: number;
    mintRemaining: number;
    publicId: string;
    __entity: string;
  };
  __entity: string;
};

const HotCollectionData:Array<ItemCollection> = [
  {
    id: 15,
    createdAt: '2022-07-01T09:28:18.844Z',
    updatedAt: '2022-07-01T09:28:18.844Z',
    name: 'MockCollection2',
    collectionImageUrl: 'https://myria.com/seo/defaultImage.png',
    description:
      'The first NFT Collection from Myria Game Studio that allows fan to participate in the metaverse of Myria gaming',
    iconUrl: 'https://myria.com/seo/defaultImage.png',
    contractAddress: '0xeE6c62f3fC225f4CA7b9ffAa71CD6BC4918369c6',
    ownerPublicKey: '0x724f337bF0Fa934dB9aa3ec6dEa49B03c54AD3cc',
    metadataApiUrl:
      'https://dev.myriacore-marketp-api.nonprod-myria.com/v1/bench-tests/assets/metadata-collection',
    starkKey: '0x6498bb9229b8f7d1de6ad6034e10262c335c471be05038121c7b8886ee9b48a',
    publicId: 'abe3d5bf-79bb-49df-9649-55dd575fdf16',
    metadataSchema: [],
    project: {
      id: 3,
      createdAt: '2022-06-15T02:37:28.361Z',
      updatedAt: '2022-07-01T09:28:18.876Z',
      name: 'string',
      companyName: 'da',
      contactEmail: 'string@a.com',
      collectionLimitExpiresAt: '2022-07-22T05:14:02.836Z',
      collectionMonthlyLimit: 5,
      collectionRemaining: 1,
      mintLimitExpiresAt: null,
      mintMonthlyLimit: 50000,
      mintRemaining: 50000,
      publicId: '7f92070f-0488-4f5f-9b5d-3dd06d6fc834',
      __entity: 'ProjectEntity'
    },
    __entity: 'CollectionEntity'
  },
  {
    id: 16,
    createdAt: '2022-07-01T09:28:18.844Z',
    updatedAt: '2022-07-01T09:28:18.844Z',
    name: 'MockCollection2',
    collectionImageUrl: 'https://myria.com/seo/defaultImage.png',
    description:
      'The first NFT Collection from Myria Game Studio that allows fan to participate in the metaverse of Myria gaming',
    iconUrl: 'https://myria.com/seo/defaultImage.png',
    contractAddress: '0xeE6c62f3fC225f4CA7b9ffAa71CD6BC4918369c6',
    ownerPublicKey: '0x724f337bF0Fa934dB9aa3ec6dEa49B03c54AD3cc',
    metadataApiUrl:
      'https://dev.myriacore-marketp-api.nonprod-myria.com/v1/bench-tests/assets/metadata-collection',
    starkKey: '0x6498bb9229b8f7d1de6ad6034e10262c335c471be05038121c7b8886ee9b48a',
    publicId: 'abe3d5bf-79bb-49df-9649-55dd575fdf16',
    metadataSchema: [],
    project: {
      id: 3,
      createdAt: '2022-06-15T02:37:28.361Z',
      updatedAt: '2022-07-01T09:28:18.876Z',
      name: 'string',
      companyName: 'da',
      contactEmail: 'string@a.com',
      collectionLimitExpiresAt: '2022-07-22T05:14:02.836Z',
      collectionMonthlyLimit: 5,
      collectionRemaining: 1,
      mintLimitExpiresAt: null,
      mintMonthlyLimit: 50000,
      mintRemaining: 50000,
      publicId: '7f92070f-0488-4f5f-9b5d-3dd06d6fc834',
      __entity: 'ProjectEntity'
    },
    __entity: 'CollectionEntity'
  }
];

const HotCollection: React.FC = () => {
  return (
    <>
      <h2 className="heading-sm  md:heading-md">
        <Trans>Hot Collections 🔥</Trans>
      </h2>
      <div className="mt-[24px] grid gap-8 overflow-x-scroll md:grid-cols-2 ">
        {HotCollectionData?.map((itm: ItemCollection, idx) => {
          return (
            <div key={idx} className={`overflow-hidden rounded-[20px] bg-base/3`}>
              <div
                className="h-[248px] bg-cover bg-center "
                style={{ backgroundImage: `url(${itm.collectionImageUrl})` }}></div>
              <div className="relative flex flex-col  items-center  bg-base/3 pb-[32px]">
                <div
                  className="absolute left-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 transform rounded-[40px] border-[4px] border-base/3 bg-center "
                  style={{ backgroundImage: `url(${itm.iconUrl})` }}>
                  {' '}
                </div>
                <div className="mt-[40px] text-center">
                  <p className="mt-[16px] text-[20px]">
                    <Trans>{itm.name}</Trans>
                  </p>
                  <p className="mt-[9px] text-[16px] text-light">
                    by
                    <Trans>
                      <span className="text-blue/6">{' ' + itm.project.companyName} </span>
                    </Trans>
                  </p>
                  <p className="mt-[16px] px-[32px] text-center text-[16px] text-light">
                    <Trans>{itm.description}</Trans>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HotCollection;
