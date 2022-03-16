import { useState, useEffect } from 'react';

function clean(input: string) {
  // raw data is html, need to remove text like <p>, etc.
  const newInput = input.replace(/(<([^>]+)>)/gi, '');
  return newInput;
}

export type Item = {
  title: string;
  description: string;
  thumbnail: string;
  pubDate: string;
  guid: string;
  link: string;
};

export const mediumPage ='https://medium.com/feed/@myriagames';
export default function useLatestPosts() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchLatestItems() {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          mediumPage
        )}&x=${new Date().getTime()}`,
        {
          mode: 'cors'
        }
      );

      if (!response.ok) {
        return;
      }

      const json = (await response.json()) as { items: Item[] };

      const items = json.items.sort((i1, i2) => {
        return new Date(i2.pubDate).getTime() - new Date(i1.pubDate).getTime();
      });

      setItems(
        items.slice(0, 3).map((item) => {
          item.description = clean(item.description);
          return item;
        })
      );
    }
    fetchLatestItems();
  }, []);

  return items;
}
