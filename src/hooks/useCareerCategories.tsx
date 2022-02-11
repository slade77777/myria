import { useEffect, useState } from 'react';

type Job = {
  id: number;
  label: string;
  description: string;
  link: string;
};

type Category = {
  id: number;
  label: string;
  jobs: Job[];
};

export default function useCareerCategories() {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://cms-api.myria.com/position-categories')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return data;
}
