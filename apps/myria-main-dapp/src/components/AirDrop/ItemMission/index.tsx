import clsx from 'clsx';
import React, { memo } from 'react';
import SubtractBottom from 'src/components/icons/SubtractBottom';
import SubtractTop from 'src/components/icons/SubtractTop';
import { utilTaskId } from 'src/utils';
import ButtonMission, { STATUS_MISSTION } from './ButtonMission';

export interface Item {
  titleMission: string;
  description: string;
  statuMisstion: string;
  point: number;
  lableButton: string;
}
interface IProp {
  status: string;
  item: Item;
  id: string;
}

const ItemMission: React.FC<IProp> = ({ status, item, id }) => {
  const isLocked = status === STATUS_MISSTION.LOCKED;
  const enableClick = status === STATUS_MISSTION.ACTIVE;

  return (
    <div
      className={clsx(
        `relative`,
        `${id === utilTaskId.verifyEmail ? 'z-[2]' : 'z-[1]'}`,
        `${isLocked ? 'opacity-50' : 'opacity-100'}`
      )}>
      <div className="absolute -left-1 -bottom-1 z-[-1]">
        <SubtractBottom />
      </div>
      <div className="bg-base/3 border-base/3 flex min-h-[128px] w-full justify-between rounded-lg border p-6 pl-8">
        <div>
          <div className="flex items-center uppercase text-white">
            <p className=" mr-2 text-xl font-bold">{item.titleMission}</p>
            <span className="min-w-[74px] rounded-lg bg-[#0D273A] py-[6px] px-[10px] text-center text-xs font-medium leading-3">
              {item.point} {item.point > 1 ? 'POINTS' : 'POINT'}
            </span>
          </div>
          <div className="text-light mt-4 max-w-[65%] text-base">
            <span>{item.description}</span>
          </div>
        </div>
        <div className="text-center">
          <ButtonMission status={status} item={item} id={id} enableClick={enableClick} />
          <p className="text-light mt-4 text-xs font-medium">{item.point} POINTS EARNED</p>
        </div>
      </div>
      <div className="absolute -top-1 -right-1 z-[-1]">
        <SubtractTop />
      </div>
    </div>
  );
};

export default memo(ItemMission);
