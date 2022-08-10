import { FC, memo, useState } from 'react';
import clsx from 'clsx';

const ReadMoreText: FC<{ text: string; textClass?: string }> = ({ text, textClass }) => {
  const [showFull, setShow] = useState(false);
  return (
    <>
      <div className={!showFull ? 'line-clamp-3' : ''}>
        <p className={clsx('text-light', textClass)}>{text}</p>
      </div>
      {showFull ? (
        <p className="cursor-pointer text-blue/7 mt-2" onClick={() => setShow(false)}>
          Show Less
        </p>
      ) : (
        <p className="cursor-pointer text-blue/7 mt-2" onClick={() => setShow(true)}>
          Read more
        </p>
      )}
    </>
  );
};

export default memo(ReadMoreText);
