import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import renderToBody from '../utils/render-to-body';
import { Dialog, DialogProps } from './dialog';

// remove 'visible', 'visible' should been set in 'show' function.
export type DialogShowProps = Omit<DialogProps, 'visible'>;

export type DialogShowRef = {
  close: () => void;
};

export function show(props: DialogShowProps) {
  let unmount: any = null;
  const Wrapper = forwardRef<DialogShowRef>((_, ref) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

    function handleClose() {
      setVisible(false);
      props.onClose?.();
    }

    useImperativeHandle(ref, () => ({
      close: handleClose,
    }));

    return (
      <Dialog
        {...props}
        visible={visible}
        onClose={handleClose}
        afterClose={() => {
          props.afterClose?.();
          if (unmount) {
            unmount();
          }
        }}
      />
    );
  });

  const ref = createRef<DialogShowRef>();
  unmount = renderToBody(<Wrapper ref={ref} />);

  return {
    close: () => {
      ref.current?.close();
    },
  };
}
