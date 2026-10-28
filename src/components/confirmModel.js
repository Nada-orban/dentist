import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";

export const ConfirmModal = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered contentClassName="border-0 rounded-3xl overflow-hidden">
      <div className="p-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FaTrashAlt size={20} />
        </div>
        <h5 className="mb-2 font-display text-2xl text-main-color">Confirm deletion</h5>
        <p className="mb-6 text-sm text-main-color/70">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="rounded-full border border-main-color/20 px-6 py-2.5 text-sm text-main-color transition-colors hover:bg-cream"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
