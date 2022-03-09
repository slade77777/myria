import Link from 'next/link';
import React from 'react';
import useLatestPosts from 'src/hooks/useLatestPosts';
import type { Item as TItem } from 'src/hooks/useLatestPosts';
import { Trans } from '@lingui/macro';

const Item: React.FC<{ item: TItem }> = ({ item }) => {
  return (
    <div className="flex flex-col space-y-4">
      <img
        src={item.thumbnail}
        alt=""
        className="flex h-[228px] w-full rounded-[10px] object-cover"
      />
      <p className="text-[18px] leading-[1.5] line-clamp-2">{item.description}</p>
      <a href={item.link} target="_blank" className="link" rel="noreferrer">
        <Trans>Read more</Trans>
      </a>
    </div>
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
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {data.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default News;
