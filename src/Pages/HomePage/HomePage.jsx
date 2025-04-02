import { useEffect, useState } from "react";
import "./Home.css";
import { FaCartPlus, FaDollarSign, FaTableColumns, FaUpDown, FaUser } from "react-icons/fa6";
function HomePage() {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch("https://67c7c544c19eb8753e7aac5f.mockapi.io/api/data"),
                    fetch("https://67c7c544c19eb8753e7aac5f.mockapi.io/api/gc"),
                ]);

                const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

                setData(data1);
                setData2(data2);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="container">
            <div className="container-menu">

            </div>
            <div className="container-content">
                <div className="header">

                </div>
                <div className="overview">
                    <div className="title">
                        <FaTableColumns className="icon" />
                        Overview</div>
                    <div className="info">
                        {data.slice(0, 1).map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div className="item-info">
                                        <div className="title">{item.name}</div>
                                        <div className="price">{item.price}</div>
                                        <div className="note">{item.note}</div>
                                    </div>
                                    <div className="item-icon">
                                        <FaCartPlus className="icon" />
                                    </div>



                                </div>
                            )
                        })}
                        {data2.slice(0, 1).map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div className="item-info">
                                        <div className="title">{item.name}</div>
                                        <div className="price">{item.price}</div>
                                        <div className="note" >{item.note}</div>
                                    </div>
                                    <div className="item-icon">
                                        <FaDollarSign className="icon" />
                                    </div>



                                </div>
                            )
                        })}
                        {data.slice(2, 3).map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div className="item-info">
                                        <div className="title">{item.name}</div>
                                        <div className="price">{item.price}</div>
                                        <div className="note">{item.note}</div>
                                    </div>
                                    <div className="item-icon">
                                        <FaUser className="icon" />
                                    </div>



                                </div>
                            )
                        })}
                    </div>


                </div>
                <div className="datatable"></div>
            </div>
        </div>
    );
}

export default HomePage;