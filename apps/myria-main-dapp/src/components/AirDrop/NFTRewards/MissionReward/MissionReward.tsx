import React, { useState } from 'react';
import ItemMission from '../../ItemMission';
import DATA from '../../data-dummy.json'; //Call API sau đó map

export const MissionReward = () => {

  return (
    <>
      <div className="h-full pr-3">
        <p className="mb-6 mt-8">Complete the missions below to unlock your rewards</p>
        <div className="h-[calc(100%-24px-32px)] overflow-auto pl-1 pt-1">
          <div className="grid grid-cols-1 gap-y-6 pr-4">
            {DATA.map((item, index) => {
              return (
                <ItemMission
                  status={item.statuMisstion}
                  item={item}
                  key={index}
                  id={item.titleMission}
                />
              ); //id = taskId from API
            })}
          </div>
        </div>
      </div>
    </>
  );
};
