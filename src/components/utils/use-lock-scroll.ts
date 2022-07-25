import { useEffect, RefObject } from 'react';

const useLockScroll = (rootRef: RefObject<HTMLElement>) => {
  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const lock = () => {
    const parentEle = rootRef.current?.parentElement;
    parentEle?.addEventListener('touchmove', onTouchMove);
  };

  const unlock = () => {
    const parentEle = rootRef.current?.parentElement;
    parentEle?.removeEventListener('touchmove', onTouchMove);
  };

  useEffect(() => {
    lock();
    return () => {
      unlock();
    };
  }, []);
};

export default useLockScroll;
