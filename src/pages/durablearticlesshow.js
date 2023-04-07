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
                            <th scope="col">เลขครุภัณฑ์</th>
                            <th scope="col">ชื่อ</th>
                            <th scope="col">ยี่ห้อ</th>
                            <th scope="col">หน่วยนับ</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">วันที่ซื้อ</th>
                            <th scope="col">วันที่รับ</th>
                            <th scope="col">วันที่ซ่อม</th>
                            <th scope="col">วันที่ซ่อมเสร็จ</th>
                            <th scope="col">ประเภทครุภัณฑ์</th>
                            <th scope="col">เลขบริษัท</th>
                            <th scope="col">เลขห้อง</th>
                            <th scope="col">สถานะการเบิก</th>
                            <th scope="col">แก้ไข</th>
                            <th scope="col">QR_Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDurablearticles.map((val, index) => (
                            <tr key={val.durablearticles_Id}>
                                <td scope="row">{val.durablearticles_Id}</td>
                                <td>{val.durablearticles_name}</td>
                                <td>{val.durablearticles_brand}</td>
                                <td>{val.durablearticles_unit}</td>
                                <td>{val.durablearticles_price}</td>
                                <td>{(val.durablearticles_order_date == null) ? "" : new Date(val.durablearticles_order_date).toLocaleDateString()}</td>
                                <td>{(val.durablearticles_delivery_date == null) ? "" : new Date(val.durablearticles_delivery_date).toLocaleDateString()}</td>
                                <td>{(val.durablearticles_repair_date == null) ? "" : new Date(val.durablearticles_repair_date).toLocaleDateString()}</td>
                                <td>{(val.durablearticles_finish_date == null) ? "" : new Date(val.durablearticles_finish_date).toLocaleDateString()}</td>
                                <td>{val.type_durablearticles_Id}</td>
                                <td>{val.company_Id}</td>
                                <td>{val.room_Id}</td>
                                <td>{val.durablearticles_status}</td>
                                <td><Link to={`/durablearticlesedit/${val.durablearticles_Id}`} className="btn btn-warning">แก้ไข</Link></td>
                                <td><Link to={`/qrcode/${val.durablearticles_Id}`} className="btn btn-success">สร้าง</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Durablearticlesshow