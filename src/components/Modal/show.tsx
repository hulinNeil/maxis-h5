import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import renderToBody from '../utils/render-to-body';
import { Modal, ModalProps } from './modal';

// remove 'visible', 'visible' should been set in 'show' function.
export type ModalShowProps = Omit<ModalProps, 'visible'>;

export type ModalShowRef = {
  close: () => void;
};

export function show(props: ModalShowProps) {
  let unmount: any = null;
  const Wrapper = forwardRef<ModalShowRef>((_, ref) => {
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
      <Modal
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

  const ref = createRef<ModalShowRef>();
  unmount = renderToBody(<Wrapper ref={ref} />);

  return {
    close: () => {
      ref.current?.close();
    },
  };
}
