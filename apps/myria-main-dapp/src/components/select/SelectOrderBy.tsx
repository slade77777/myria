import React, { useState, Fragment, useCallback, useRef, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import ChevronIcon from 'src/packages/l2-wallet/src/components/Icons/ChevronIcon';
import ErrorIcon from '../icons/ErrorIcon';
import { dataSorting } from '../marketplace/Collection';

const items = [
  { id: 1, val: 1, name: '1-10 employees', unavailable: false },
  { id: 2, val: 2, name: '11-100 employees', unavailable: false },
  { id: 3, val: 3, name: '101-500 employees', unavailable: false },
  { id: 4, val: 4, name: '500+ employees', unavailable: true }
];

export default function SelectOrderBy(props: any) {
  const [companySize, setCompanySize] = useState<any>(props.selectedDefault);
  const dataDefault = {
    data: props.data || items,
    selectedDefault: props.selectedDefault || 'Company Size'
  };

  return (
    <Listbox
      value={companySize}
      onChange={(e) => {
        props.changeHandler(e);
        setCompanySize(e);
      }}>
      {({ open }) => (
        <div className={clsx('relative pb-3', props.containerStyle)}>
          <Listbox.Button
            className={clsx(
              props.buttonStyle,
              { ' border-blue/6 bg-base/6 ': open },
              'bg-base/4 border-base/4 relative w-full cursor-default rounded-lg border-[1px] py-3 pl-4 pr-10 text-left text-[#A1AFBA] shadow-md focus:outline-none sm:text-[14px]'
            )}>
            <span className="block truncate">
              {companySize?.name ?? dataDefault.selectedDefault}{' '}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronIcon className="text-[##A1AFBA]" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="bg-base/3 absolute right-0 z-[1] mt-2 max-h-60 w-full min-w-[300px] overflow-auto rounded-xl  py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {dataDefault.data.map((person: any, personIdx: any) => {
                return (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) => {
                      return clsx(
                        props.itemStyle,
                        `relative cursor-default select-none py-4 pl-6 pr-4  ${
                          active ? 'bg-base/4 text-base/10' : 'text-base/10'
                        }`
                      );
                    }}>
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
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
      )}
    </Listbox>
  );
}
