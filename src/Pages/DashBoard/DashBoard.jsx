import { useEffect, useState } from 'react';
import { FaFileLines, FaUserPlus } from 'react-icons/fa6';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import DataTable from 'datatables.net-react';
import 'datatables.net-select-dt';

import './DashBoard.css';
import Table from './Table/Table';
import AddUser from '../../Components/AddUser/AddUser';
import Modal from '../../Components/Modal/Modal';




function DashBoard() {
    const [table, setTable] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetch("https://67c7c544c19eb8753e7aac5f.mockapi.io/api/gc")
            .then((res) => res.json())
            .then((table) => {
                const statuses = ["New", 'In-progress', 'Complete'];
                table.forEach((item) => {
                    item.status = statuses[Math.floor(Math.random() * statuses.length)];
                })
                setTable(table);
            })
    }, []);



    return (
        <div className="darhboard">
            <div className="title-darhboard">
                <div>
                    <FaFileLines />
                    <h3>Detailed report</h3>
                </div>
                <div>
                    <button onClick={() => setShowModal(true)}><FaUserPlus />&nbsp; Add User</button>
                    <button><FaFileImport /> &nbsp;Import</button>
                    <button><FaFileExport />&nbsp;Export</button>
                </div>
            </div>
            <Table data={table} setData={setTable} />
            <AddUser isOpen={showModal} setIsOpen={setShowModal} setDataParent={setTable} />

        </div>
    );
}

export default DashBoard;
