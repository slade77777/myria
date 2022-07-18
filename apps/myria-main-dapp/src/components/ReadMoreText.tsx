import { FC, memo, useState } from 'react';
import clsx from 'clsx';

const limitNumber = 300;

const ReadMoreText: FC<{ text: string; textClass?: string }> = ({ text, textClass }) => {
  const [showFull, setShow] = useState(false);
  return (
    <div>
      <p className={clsx('text-[#97AAB5]', textClass)}>
        {showFull
          ? text
          : `${text?.substring(0, limitNumber)}${text?.length > limitNumber ? '...' : ''}`}
      </p>
      {text?.length > limitNumber && !showFull && (
        <p className="cursor-pointer text-[#A4CEE6]" onClick={() => setShow(true)}>
          Read more
        </p>
      )}
      {showFull && (
        <p className="cursor-pointer text-[#A4CEE6]" onClick={() => setShow(false)}>
          Show Less
        </p>
      )}
    </div>
  );
};

export default memo(ReadMoreText);
