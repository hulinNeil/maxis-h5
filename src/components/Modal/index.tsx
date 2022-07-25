import { show } from './show';
import attachPropertiesToComponent from '../utils/attach-properties-to-component';
import { Modal } from './modal';

export type { ModalProps } from './modal';
export type { ModalShowProps, ModalShowRef } from './show';

export default attachPropertiesToComponent(Modal, {
  show,
});