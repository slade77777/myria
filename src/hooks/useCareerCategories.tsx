import { useEffect, useState } from 'react';

type Job = {
  id: number;
  title: string;
  description: string;
  absolute_url: string;
  location: {
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
  jobs: Job[];
};

export default function useCareerCategories() {
  const [data, setData] = useState<Category[]>([]);

  // useEffect(() => {
  //   fetch('https://api.greenhouse.io/v1/boards/myria/jobs')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);

  useEffect(() => {
    fetch('https://api.greenhouse.io/v1/boards/myria/departments')
      .then((res) => res.json())
      .then((data) => {
        setData(data?.departments || []);
      });
  }, []);
  return data;
}
