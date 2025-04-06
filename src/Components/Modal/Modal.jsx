import { FaXmark } from 'react-icons/fa6';
import './Modal.css';
function Modal({isOpen, setIsOpen, children}) {
    if(!isOpen) return null;

    const handClickClose = (e) => {
        if(e.target === e.currentTarget){
            setIsOpen(false);
        }
    }

    return (
        <div className='modal' onClick={(e)=>handClickClose(e)}>
            <div className="form">
                <div className="icon" onClick={()=>setIsOpen(false)}>
                    <FaXmark />
                </div>
                {children}
            </div>
        </div> 
      
     );
}

export default Modal;