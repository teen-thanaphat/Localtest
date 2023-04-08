import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Durablearticlesshow() {

    const [durablearticles, setDurablearticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getDurablearticles();
    }, []);

    const getDurablearticles = async () => {
        const response = await Axios.get('http://localhost:3001/durablearticles');
        setDurablearticles(response.data);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }

    const filteredDurablearticles = durablearticles.filter(val =>
        val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ค้นหาครุภัณฑ์"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลขครุภัณฑ์</th>
                            <th scope="col">ชื่อ</th>    
                            <th scope="col">หน่วยนับ</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">แก้ไข</th>
                            <th scope="col">QR_Code</th>
                            <th scope="col">รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDurablearticles.map((val, index) => (
                            <tr key={val.durablearticles_Id}>
                                <td>{index + 1}</td>
                                <td scope="row">{val.durablearticles_Id}</td>
                                <td>{val.durablearticles_name}</td>                 
                                <td>{val.durablearticles_unit}</td>
                                <td>{val.durablearticles_price}</td>
                                <td><Link to={`/durablearticlesedit/${val.durablearticles_Id}`} className="btn btn-warning">แก้ไข</Link></td>
                                <td><Link to={`/qrcode/${val.durablearticles_Id}`} className="btn btn-success">สร้าง</Link></td>
                                <td><Link to={`/ddetail/${val.durablearticles_Id}`} className="btn btn-primary">ดู</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Durablearticlesshow