import Swal from 'sweetalert2';
import './CommonStyle.scss';

/**
 * Internal helper to trigger the SweetAlert2 popup
 * using your existing logic for classes and types.
 */
const showAlert = (type: 'success' | 'info' | 'warning' | 'error' | 'question', title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Okay',
    customClass: {
      popup: `alert-box ${type}-alert`,
      confirmButton: 'alert-button',
      title: 'alert-title',
      htmlContainer: 'alert-message'
    },
    buttonsStyling: false, // Allows your CSS from CommonStyle.scss to take over
  });
};

export const CreateAlert = () => showAlert('success', 'Success', 'Form Saved Successfully!!');

export const UpdateAlert = () => showAlert('success', 'Success', 'Form Updated Successfully!!');

export const DeleteAlert = () => showAlert('success', 'Success', 'File Deleted Successfully!!');

export const SuccessAlert = (message: string) => showAlert('success', 'Success', message);

export const ErrorAlert = (message: string) => showAlert('error', 'Error', message);

export const InfoAlert = (message: string) => showAlert('info', 'Information', message);

// Uses a simple toast-style if you prefer, or standard alert
export const InfoAlertSimple = (message: string) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 3000
  });
};

export const AutoSaveAlert = () => showAlert('info', 'Auto Save', "Form Auto Saved Successfully!!");

export const WarningAlert = (message: string) => {
  let displayMessage = message;
  if (message === 'save') displayMessage = "Failed to Save Form!!";
  else if (message === 'update') displayMessage = "Failed to Update Form!!";
  else if (message === 'upload') displayMessage = "Failed to Upload File!!";
  
  showAlert('warning', 'Warning', displayMessage);
};

export const ConfirmAlert = (onConfirm: (result: boolean) => void) => {
  Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete this file?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    customClass: {
        confirmButton: 'alert-button mx-2',
        cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false
  }).then((result) => {
    onConfirm(result.isConfirmed);
  });
};

export const CloseConfirmAlert = (onConfirm: (result: boolean) => void) => {
  Swal.fire({
    title: 'Confirm Close',
    text: 'You have unsaved changes. Are you sure you want to leave?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    onConfirm(result.isConfirmed);
  });
};

export const ConfirmAlert1 = (onConfirm: (result: boolean) => void) => {
  Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete the Record?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    onConfirm(result.isConfirmed);
  });
};