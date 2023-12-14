import React,{ useEffect, useState } from "react";
function Modal(props) {
    const [showModal, setshowModal] = useState('modal modal-open');
   
  return (
    <>
      <dialog id="my_modal_2" className={showModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Alert!</h3>
          <p className="py-4">{props.mesg}</p>
        </div>
          <button onClick={()=>{ setshowModal('modal')}} className="modal-backdrop">close</button>
      </dialog>
    </>
  );
}
export default Modal;
