import { ToastEvent, ToastProps, ToastType } from '@foundation/Toast/type';
import { eventManager } from '@foundation/Toast/eventManger';

type ToastFunctionProps = Omit<ToastProps, 'toastId' | 'type'>;
type ToastOptions = Omit<ToastProps, 'toastId' | 'type' | 'text'>;
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(4);
};

const emitToast = (type: ToastType, toastProps: ToastFunctionProps) => {
  const id = generateUniqueId();
  eventManager.emit(ToastEvent.Add, {
    ...toastProps,
    toastId: id,
    type,
  });
};

export const toast = {
  default: (text: string, toastOptions?: ToastOptions) =>
    emitToast('default', { text: text, ...toastOptions }),
  info: (text: string, toastOptions?: ToastOptions) =>
    emitToast('info', { text: text, ...toastOptions }),
  success: (text: string, toastOptions?: ToastOptions) =>
    emitToast('success', { text: text, ...toastOptions }),
  warning: (text: string, toastOptions?: ToastOptions) =>
    emitToast('warning', { text: text, ...toastOptions }),
  error: (text: string, toastOptions?: ToastOptions) =>
    emitToast('error', { text: text, ...toastOptions }),
};