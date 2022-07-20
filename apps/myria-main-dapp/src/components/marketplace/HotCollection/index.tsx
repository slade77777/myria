import { Trans } from '@lingui/macro';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import { CommonPaginateDataTypes } from 'myria-core-sdk/dist/types/src/types/CommonTypes';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { collectionModule } from 'src/services/myriaCore';
import { validatedImage } from 'src/utils';

const HotCollection: React.FC = () => {
  const payload = {
    limit: 10,
    page: 1,
    isHot: true
  };

  const { data, isLoading, error } = useQuery(['marketplace', 'hotCollection'], () =>
    collectionModule?.getCollectionList(payload)
  );

  const hotCollection: CommonPaginateDataTypes<CollectionItems[]> | undefined = data?.data;

  if (isLoading) return <></>;
  return (
    <>
      <h2 className="h6">
        <Trans>Hot Collections 🔥</Trans>
      </h2>
      <div className="mt-[24px] grid gap-8 overflow-x-scroll md:grid-cols-2 ">
        {hotCollection?.items.map((itm: CollectionItems, idx: number) => {
          return (
            <Link href={`/marketplace/collection?id=${itm.publicId}`} key={idx}>
              <a
                href={`/marketplace/collection?id=${itm.publicId}`}
                className="rounded-lg bg-base/3 cursor-pointer">
                <div key={idx} className={`overflow-hidden rounded-lg bg-base/3`}>
                  <div
                    className="h-[248px] bg-cover bg-center "
                    style={{
                      backgroundImage: `url(${validatedImage(itm.collectionImageUrl)})`
                    }}></div>
                  <div className="relative flex flex-col  items-center  bg-base/3 pb-[32px]">
                    <div
                      className="absolute left-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 transform rounded-[40px] border-[4px] border-base/3 bg-center "
                      style={{
                        backgroundImage: `url(${
                          itm.iconUrl ? itm.iconUrl : '/images/marketplace/collection-2-logo.png'
                        })`
                      }}></div>
                    <div className="mt-[40px] text-center">
                      <p className="mt-[16px] text-xl font-bold">
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
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HotCollection;
