import React from "react";
import { IoClose } from "react-icons/io5";
import { Tabs, Tab, Form, Row, Col, Modal, Button } from "react-bootstrap";

export const ConfirmModal = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <div className="">
        <div className="flex justify-between items-start pt-4 pb-1 border-b-2 border-white px-3 ">
          <h5 className="">Confirm Deletion:</h5>
          <IoClose
            style={{ width: "30px", height: "20px" }}
            onClick={onHide}
            className="cursor-pointer"
          />
        </div>

        <div className="py-3 pb-5 px-3">
          <p className="pb-2">{message}</p>
          <div className="flex justify-end items-center gap-2">
            <button variant="secondary" className="" onClick={onHide}>
              Cancel
            </button>
            <button className="btn1 btn-primary1" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
