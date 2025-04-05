import { useEffect, useState } from 'react';
import { FaFileLines } from 'react-icons/fa6';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';


import './DashBoard.css';
import Table from './Table/Table';



function DashBoard() {
    const [table, setTable] = useState([]);
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
                    <button><FaFileImport /> &nbsp;Import</button>
                    <button><FaFileExport />&nbsp;Export</button>
                </div>
            </div>
            <Table data={table} />
        </div>
    );
}

export default DashBoard;