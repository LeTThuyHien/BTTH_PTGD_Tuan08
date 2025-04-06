import Modal from "../Modal/Modal";
import "./EditForm.css"
function EditForm({ isOpen, setIsOpen }) {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h3>CHỈNH SỬA THÔNG TIN</h3>
        </Modal>
    );
}

export default EditForm;