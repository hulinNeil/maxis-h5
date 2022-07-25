import { show } from './show';
import attachPropertiesToComponent from '../utils/attach-properties-to-component';
import { Dialog } from './dialog';

export type { DialogProps } from './dialog';
export type { DialogShowProps, DialogShowRef } from './show';

export default attachPropertiesToComponent(Dialog, {
  show,
});
