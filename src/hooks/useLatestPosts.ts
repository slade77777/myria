import { useState, useEffect } from 'react';

function clean(input: string) {
  // raw data is html, need to remove text like <p>, etc.
  const newInput = input.replace(/(<([^>]+)>)/gi, '');
  return newInput;
}

export type Item = {
  title: string;
  content: string;
  thumbnail: string;
  pubDate: string;
  guid: string;
  link: string;
};

export const encodedMediumPage = 'https://medium.com/feed/@myriagames';
export default function useLatestPosts() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchLatestItems() {
      const response = await fetch(
        //temporary fetch from temp external proxy to prevent the cors
        'https://limitless-falls-89564.herokuapp.com/load-medium-posts',
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
          // extract first image
          const srcs = item.content.match(/<img.*?src="(.*?)"/g)?.map(x => x.replace(/.*src="([^"]*)".*/, '$1'))
          item.thumbnail= srcs?.[0] as string;
          return item;
        })
      );
    }
    fetchLatestItems();
  }, []);

  return items;
}
