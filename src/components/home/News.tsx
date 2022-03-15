import Link from 'next/link';
import React from 'react';
import useLatestPosts from 'src/hooks/useLatestPosts';
import type { Item as TItem } from 'src/hooks/useLatestPosts';
import { Trans } from '@lingui/macro';

const Item: React.FC<{ item: TItem }> = ({ item }) => {
  return (
    <a href={item.link} target="_blank" rel="noreferrer" className="flex flex-col space-y-4">
      <img
        src={item.thumbnail}
        alt=""
        className="flex h-[228px] w-full rounded-[10px] object-cover"
      />
      <p className="text-[18px] font-medium leading-[1.5] line-clamp-2">{item.title}</p>
      <span className="link">
        <Trans>Read more</Trans>
      </span>
    </a>
  );
};

const News: React.FC = () => {
  const data = useLatestPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-medium leading-[1.25] md:text-[30px]">
          <Trans>Latest Updates & News</Trans>
        </h2>
        <Link href="/">
          <a className="link">
            <Trans>Read more</Trans>
          </a>
        </Link>
      </div>
      <div className="mt-8 grid grid-flow-col gap-6 overflow-x-auto overflow-y-hidden md:grid-flow-row md:grid-cols-3 md:gap-8 md:overflow-visible">
        {data.map((item, idx) => (
          <div key={idx} className="min-w-[330px] md:min-w-0">
            <Item key={idx} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
