import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import ChevronIcon from 'src/packages/l2-wallet/src/components/Icons/ChevronIcon';
import ErrorIcon from '../icons/ErrorIcon';

const items = [
  { id: 1, val: 1, name: '1-10 employees', unavailable: false },
  { id: 2, val: 2, name: '11-100 employees', unavailable: false },
  { id: 3, val: 3, name: '101-500 employees', unavailable: false },
  { id: 4, val: 4, name: '500+ employees', unavailable: true }
];

export default function Select(props: any) {
  const [companySize, setCompanySize] = useState<any>(null);
  return (
    <Listbox
      value={companySize}
      onChange={(e) => {
        props.changeHandler(e);
        setCompanySize(e);
      }}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#0B2231] py-3 pl-4 pr-10 text-left text-[#A1AFBA] shadow-md focus:text-white focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-[14px]">
          <span className="block truncate">{companySize?.name ?? 'Company Size'}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronIcon className="text-[##A1AFBA]" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#0B2231] py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-white/20 text-[#A1AFBA]' : 'text-[#A1AFBA]'
                  }`
                }
                value={person}>
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
        {props.error && (
          <div className="mt-2 flex">
            <ErrorIcon />
            <p
              className={clsx('ml-[10px] text-[14px] leading-[1.5]', {
                'text-brand-orange': props.error
              })}>
              {props.errorText}
            </p>
          </div>
        )}
      </div>
    </Listbox>
  );
}
