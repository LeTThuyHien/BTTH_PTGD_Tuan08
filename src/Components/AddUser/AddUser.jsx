import { useRef, useState } from "react";
import { FaBuilding, FaCalendar, FaCalendarWeek, FaDollarSign, FaFileSignature, FaHashtag, FaImage, FaSignHanging } from "react-icons/fa6";
import { FaSignature } from "react-icons/fa";
import { toast } from "react-toastify";

import BoxInput from "../BoxInput/BoxInput";
import Modal from "../Modal/Modal";
import "./AddUser.css"
import uploadToCloudinary from "../UploadImg/UploadToCloudinary";
function AddUser({ isOpen, setIsOpen, setDataParent }) {
    const [forms, setForms] = useState({
        avatar: '',
        name: '',
        company: '',
        orderValue: '',
        orderDate: '',
    })
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const avatarRef = useRef();

    const statusArray = ['In-progress', 'New', 'Completed'];

    const handChangeInput = (e) => {
        const { value, files, name, type } = e.target;
        if (type === 'file' && files.length > 0) {
            const inputFile = files[0];
            setErrors((prev) => ({
                ...prev,
                [name]: validateInput(name, inputFile),
            }));
            inputFile.preview = URL.createObjectURL(inputFile);

            setForms((prev) => ({
                ...prev,
                [name]: inputFile,
            }));

        } else {
            setForms((prev) => ({
                ...prev,
                [name]: value.trimStart(),
            }));

            setErrors((prev) => ({
                ...prev,
                [name]: validateInput(name, value),
            }));
        }
    };
    const validationRules = {
        avatar: {
            required: true,
            fileType: ['image/jpeg', 'image/png'],
            maxSize: 2 * 1024 * 1024, // 2MB
            emptyMessage: 'Vui lòng tải lên ảnh đại diện.',
        },
        name: {
            required: true,
            regex: /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/,
            emptyMessage: 'Vui lòng nhập họ tên.',
            errorMessage: 'Tên không đúng định dạng',
        },
        company: {
            required: true,
            regex: /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/,
            emptyMessage: 'Vui lòng nhập tên công ty.',
            errorMessage: 'Tên không đúng định dạng',
        },
        orderValue: {
            required: true,
            regex: /^[0-9]+$/,
            emptyMessage: 'Vui lòng nhập giá trị đơn hàng.',
            errorMessage: 'Giá trị đơn hàng phải là số.',
        },
        orderDate: {
            required: true,
            emptyMessage: 'Vui lòng chọn ngày đặt hàng.',
            validateDateRange: true,
        },
    };


    const validateInput = (name, value) => {
        const rule = validationRules[name];

        if (!rule) return '';

        if (rule.required && !value) {
            return rule.emptyMessage || 'Trường này là bắt buộc.';
        }

        if (rule.regex && !rule.regex.test(value)) {
            return rule.errorMessage || 'Giá trị không hợp lệ.';
        }

        if (value instanceof File) {
            if (rule.fileType && !rule.fileType.includes(value.type)) {
                return 'Định dạng tệp không hợp lệ.';
            }
            if (rule.maxSize && value.size > rule.maxSize) {
                return `Tệp quá lớn. Giới hạn là ${rule.maxSize / (1024 * 1024)}MB.`;
            }
        }

        if (rule.validateDateRange) {
            const inputDate = new Date(value);
            const minDate = new Date('1900-01-01');
            const maxDate = new Date();

            if (inputDate < minDate || inputDate > maxDate) {
                return 'Ngày đặt hàng phải nằm trong khoảng từ 01/01/1900 đến hôm nay!';
            }
        }

        return '';
    };


    const handleRadioChange = (selectedStatus) => {
        setStatus(selectedStatus);
        setErrors((prev) => ({
            ...prev,
            status: '',
        }));
    };
    const validateForm = () => {
        const newErrors = {};

        Object.keys(forms).forEach((key) => {
            const value = forms[key];
            const error = validateInput(key, value);
            if (error) {
                newErrors[key] = error;
            }
        });

        if (!status) {
            newErrors.status = 'Không được để trống';
        }

        return newErrors;
    };

    const handleAddUser = async () => {
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        let avatarUrl = 'https://via.placeholder.com/150';

        if (forms.avatar instanceof File) {
            const uploadedUrl = await uploadToCloudinary(forms.avatar);
            if (uploadedUrl) {
                avatarUrl = uploadedUrl;
            } else {
                return;
            }
        }

        const newUser = {
            name: forms.name,
            company: forms.company,
            img: avatarUrl,
            orderValue: forms.orderValue,
            orderDate: forms.orderDate,
            status: status,
        };

        try {
            const response = await fetch(
                'https://67c7c544c19eb8753e7aac5f.mockapi.io/api/gc',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                },
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            setIsOpen(false);

            const data = await response.json();
            toast.success("Thêm thành công");


            setDataParent((prevData) => [...prevData, data]);

            // Set default values
            forms.avatar = null;
            setForms({
                name: '',
                company: '',
                avatar: '',
                orderValue: '',
                orderDate: '',
            });
            setStatus(null);
            setErrors({});
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div className="add-form">
                <h3>ADD USER </h3 >
                <div className="box-avt">
                    {
                        !errors.avatar && forms.avatar && (
                            <div >
                                <img
                                    className="add-avt"
                                    src={forms.avatar?.preview}
                                    alt="Avatar preview"
                                />
                            </div>
                        )
                    }
                    <BoxInput
                        label="Avatar"
                        name="avatar"
                        ref={avatarRef}
                        type="file"
                        placeholder="Upload Avatar..."
                        icon={<FaImage />}
                        error={errors.avatar}
                        onChange={handChangeInput}
                    />
                </div>

                <BoxInput
                    label="Customer Name"
                    name="name"
                    placeholder="Enter Customer Name..."
                    icon={<FaFileSignature />}
                    error={errors.name}
                    value={forms.name}
                    onChange={handChangeInput}
                />

                <BoxInput
                    label="Company Name"
                    name="company"
                    placeholder="Enter Company Name..."
                    icon={<FaBuilding />}
                    error={errors.company}
                    value={forms.company}
                    onChange={handChangeInput}
                />

                <BoxInput
                    label="Order Value"
                    name="orderValue"
                    placeholder="Enter Order Value..."
                    icon={<FaDollarSign />}
                    error={errors.orderValue}
                    value={forms.orderValue}
                    onChange={handChangeInput}
                />

                <BoxInput
                    label="Order Date"
                    name="orderDate"
                    error={errors.orderDate}
                    value={forms.orderDate}
                    icon={<FaCalendarWeek />}

                    type="date"
                    onChange={handChangeInput}
                />
                <div>
                    <div className="status">
                        <label>Status</label>
                        <div className="radio-status">
                            {statusArray.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={`status-${index}`}
                                        checked={item.includes(status)}
                                        onChange={() => handleRadioChange(item)}
                                    />
                                    <label htmlFor={`status-${index}`}>{item}</label>
                                </div>
                            ))}


                        </div>
                    </div>
                    {errors.status && (
                        <p className="error">{errors.status}</p>
                    )}

                </div>

                <div >
                    <button className="btn-add" onClick={handleAddUser}>ADD USER</button>
                </div>
            </div>

        </Modal>
    );
}

export default AddUser;