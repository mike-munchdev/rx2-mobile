import { Modal } from 'react-native';

export class LoadingHelper {
  static modal: Modal | null;
  static onClose: any;
  static message: string;
  static isVisible: boolean;

  static setModal(modal: Modal | null) {
    this.modal = modal;
  }

  static show(message?: string) {
    if (this.modal) {
      if (message) {
        this.message = message;
      }
      this.isVisible = true;
    }
  }
  static hide() {
    if (this.modal) {
      this.message = '';
      this.isVisible = false;
    }
  }

  static toggle() {
    if (this.modal) {
      this.isVisible = !this.isVisible;
    }
  }
}
