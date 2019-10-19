import React from "react";

import "./Modal.css";

const modal = props => (
  <div className='modal'>
    <header className='modal-header'>
      <h1>{props.title}</h1>
    </header>
    <section className='modal-content'>{props.children}</section>
    <section className='modal-actions'>
      {props.canConfirm && (
        <button
          type='button'
          className={
            props.disabled ? "btn btn-primary-disabled" : "btn btn-primary"
          }
          onClick={props.onConfirm}>
          {props.confirmText}
        </button>
      )}
      {props.canCancel && (
        <button
          type='button'
          className='btn btn-cancel'
          onClick={props.onCancel}>
          Cancel
        </button>
      )}
    </section>
  </div>
);

export default modal;
