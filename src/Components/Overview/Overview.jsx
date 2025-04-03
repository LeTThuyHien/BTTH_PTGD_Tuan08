import { FaCaretUp, FaCartPlus, FaDollarSign, FaLayerGroup, FaUser } from "react-icons/fa";
import "./Overview.css";
import { useEffect, useState } from "react";
import { TbBackground } from "react-icons/tb";

function Overview() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://67c7c544c19eb8753e7aac5f.mockapi.io/api/data")
            .then((res) => res.json())
            .then((data) => setData(data))
    }, []);
    return (
        <div className="overview">
            <div className="overview-header">
                <FaLayerGroup />
                <h3>Overview</h3>
            </div>
            <div className="list-item">
                {data.map((item, index) => {
                    const icon = [<FaCartPlus />, <FaDollarSign />, <FaUser />]
                    const iconColor = ["rgb(248, 230, 239)", "rgb(227, 249, 255)", "rgb(229, 249, 255)"]
                    const Color = ["rgb(242, 33, 96)", "rgb(0, 145, 255)", "rgb(27, 99, 224)"]
                    const iconStyle = {
                        backgroundColor: iconColor[index],

                    }
                    const borderStyle = {
                        borderColor: Color[index],
                        color: Color[index],
                    }
                   
                    return (
                        <div key={index} className="item" style={iconStyle}>
                            <div>
                                <h4>{item.name}</h4>
                                <h2>{item.price}</h2>
                                <p className="note-item"><span style={{ color: "rgb(25, 124, 32)" }}><FaCaretUp /> {item.note}</span> period of change</p>
                            </div>
                            <div style={borderStyle}>
                                {icon[index]}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Overview;