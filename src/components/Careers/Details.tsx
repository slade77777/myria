import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import useCareerCategories from 'src/hooks/useCareerCategories';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import { Trans } from '@lingui/macro';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import useClickOutside from 'src/hooks/useClickOutside';
import { useRouter } from 'next/router';
import parser from 'html-react-parser';

type Department = {
  id: number,
  name: string,
}

type Office = {
  id: number,
  name: string,
}

type Details = {
  title: string,
  location: {
    name: string,
  },
  content: string,
  departments: Department[],
  offices: Office[]
}

const Details: React.FC = () => {
  const [details, setDetails] = React.useState<Details>();
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (id) {
      async function fetchJobDetail() {
        const response = await fetch(`https://api.greenhouse.io/v1/boards/myria/jobs/${id}`);

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setDetails(data);
      }
      fetchJobDetail();
    }
  }, [id]);

  if (typeof id !== 'string') {
    return null;
  }

  const contents: string = parser(`${details?.content}`, {}) as string;

  return (
    <div>
      <div className="mx-auto mt-[60px]">
        <h1 className="heading-sm text-center md:heading-massive md:text-left">{details?.title}</h1>
        <p className="mt-7 mb-16 text-light">{details?.location?.name}</p>
        <div className="border-b border-light pb-16">{parser(contents)}</div>

        <h1 className="heading-sm text-center md:heading-massive mt-10">
          <Trans>Apply for this job</Trans>
        </h1>
      </div>
    </div>
  );
};

export default Details;
