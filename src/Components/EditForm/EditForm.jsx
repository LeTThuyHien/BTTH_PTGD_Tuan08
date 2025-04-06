import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./EditForm.css"
import { FaCheck, FaPen } from "react-icons/fa6";
import { toast } from "react-toastify";
// import images from "../../assets/images";

function EditForm({ isOpen, setIsOpen, rowData, setDataParent }) {
    const [data, setData] = useState({});
    const [editField, setEditField] = useState(null);
    const [editData, setEditData] = useState(data);

    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '/');

    useEffect(() => {
        if (rowData) {
            setData(rowData);
            setEditData({ ...rowData }); // copy object để tránh tác động trực tiếp lên rowData
        }
    }, [rowData]);


    const handleBoxClick = (field) => {
        setEditField(field);
    };

    const handleChange = (e, field) => {
        setEditData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleTempSave = (field) => {
        setData((prev) => {
            const newData = { ...prev, [field]: editData[field] };
            setEditField(null); // Đặt lại trạng thái của trường edit
            return newData;
        });
    };


    const handleSave = async () => {
        try {
            const response = await fetch(
                `https://67c7c544c19eb8753e7aac5f.mockapi.io/api/gc/${data.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editData),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const updatedData = await response.json();
            toast.success("Cập nhật thành công");


            setData(updatedData);

            setDataParent((prevData) =>
                prevData.map((item) =>
                    item.id === updatedData.id ? updatedData : item,
                ),
            );

            setIsOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='box-edit'>
            <div className='info'>
                <h3>CHỈNH SỬA THÔNG TIN</h3>
                <div className="box-info" onClick={() => handleBoxClick('img')}>
                    <div >
                        <p className="title">AVATAR</p>
                        {editField === 'img' ? (
                            <input type="file"
                                className="input-file"
                                value={editData.img}
                                onChange={(e) => handleChange(e, 'img')}
                            />
                        ) :
                            <p className="img">
                                <img
                                    src={data.img || null}
                                    alt={data.name || 'no img'}
                                />
                            </p>
                        }
                    </div>
                    {editField === 'img' ? (
                        <FaCheck onClick={() => handleTempSave('img')} />
                    ) : (
                        <FaPen />
                    )}
                </div>

                <div className="box-info" onClick={() => handleBoxClick('name')}>
                    <div>
                        <p className="title">CUSTOMER NAME</p>
                        {editField === 'name' ? (
                            <input type="text"
                                className="input-text"
                                value={editData.name}
                                onChange={(e) => handleChange(e, 'name')}
                            />
                        ) : (
                            <p>{data.name}</p>
                        )}
                    </div>
                    {editField === 'name' ? (
                        <FaCheck onClick={() => handleTempSave('name')} />
                    ) : (
                        <FaPen />
                    )}
                </div>

                <div className="box-info" onClick={() => handleBoxClick('company')}>
                    <div>
                        <p className="title">COMPANY</p>
                        {editField === 'company' ? (
                            <input type="text"
                                className="input-text"
                                value={editData.company}
                                onChange={(e) => handleChange(e, 'company')}
                            />
                        ) : (
                            <p>{data.company}</p>
                        )}
                    </div>
                    {editField === 'company' ? (
                        <FaCheck onClick={() => handleTempSave('company')} />
                    ) : (
                        <FaPen />
                    )}
                </div>
                <div className="box-info" onClick={() => handleBoxClick('value')}>
                    <div>
                        <p className="title">ORDER VALUE</p>
                        {editField === 'value' ? (
                            <input type="text"
                                value={editData.value}
                                onChange={(e) => handleChange(e, 'value')}
                            />
                        ) : (
                            <p>{data.value}</p>
                        )}
                    </div>
                    {editField === 'value' ? (
                        <FaCheck onClick={() => handleTempSave('value')} />
                    ) : (
                        <FaPen />
                    )}
                </div>

                <div className="box-info" onClick={() => handleBoxClick('date')}>
                    <div>
                        <p className="title">ORDER DATE</p>
                        {editField === 'date' ? (
                            <input type="date"
                                value={editData.date}
                                onChange={(e) => handleChange(e, 'date')}
                            />
                        ) : (
                            <p>{formattedDate}</p>
                        )}
                    </div>
                    {editField === 'date' ? (
                        <FaCheck onClick={() => handleTempSave('date')} />
                    ) : (
                        <FaPen />
                    )}

                </div>
                <div className="box-info" onClick={() => handleBoxClick('status')}>
                    <div>
                        <p className="title">STATUS</p>
                        {editField === 'status' ? (
                            <input type="text"
                                value={editData.status}
                                onChange={(e) => handleChange(e, 'status')}
                            />
                        ) : (
                            <p>{data.status}</p>
                        )}
                    </div>
                    {editField === 'status' ? (
                        <FaCheck onClick={() => handleTempSave('status')} />
                    ) : (
                        <FaPen />
                    )}

                </div>
                <div className="btn-confirm">
                    <button onClick={handleSave}>CONFIRM</button>
                </div>
            </div>



        </Modal>
    );
}

export default EditForm;