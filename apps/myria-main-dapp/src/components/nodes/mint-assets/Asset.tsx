import React from 'react';
import Image from 'next/image';
import Input from 'src/components/Input';

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  checked: boolean;
  type?: string;
  onCheck: (id: string) => void;
}
function Asset({ id, title, description, image, time, onCheck, checked, type = 'common' }: Props) {
  const titleColor =
    type === 'ultra-rare'
      ? 'text-[#4FA6B9]'
      : type === 'rare'
      ? 'text-[#A9CB68]'
      : 'text-[#A9A6B1]';

  return (
    <div className="flex items-start space-x-4 rounded-xl bg-dark p-4 md:space-x-8 md:p-8">
      <div className=" relative h-[56px] w-[56px] flex-shrink-0 overflow-hidden rounded-full md:h-[76px] md:w-[76px]">
        <Image
          src={image}
          layout="responsive"
          alt=""
          objectFit="contain"
          width={128}
          height={102}
        />
      </div>
      <div className="flex-grow space-y-1">
        <p className={`text-[16px] font-medium leading-[1.27] md:text-[18px] ${titleColor}`}>
          {title}
        </p>
        <p className="text-[12px] leading-[1.5] text-light md:text-[16px]">{description}</p>
        <p className="text-[12px] leading-[1.2] text-light md:text-[14px]">{time}</p>
      </div>
      <div className="md:self-center">
        <Input type="checkbox" onChange={() => onCheck(id)} checked={checked} />
      </div>
    </div>
  );
}

export default Asset;
