import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dshow() {

    const [orderd, setOrderd] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getOrderd();
    }, []);

    const getOrderd = async () => {
        const response = await Axios.get('http://localhost:3001/order_durablearticles3');
        setOrderd(response.data);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }

    const filtered = orderd.filter(val =>
        val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const displayname = sessionStorage.getItem('displayname');

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
                            <th scope="col">เลขครุภัณฑ์ที่เบิก</th>
                            <th scope="col">ชื่อครุภัณฑ์</th>
                            <th scope="col">เบิกไปใช้ที่ไหน</th>
                            <th scope="col">วันที่เบิก</th>
                            <th scope="col">ชื่อผู้เบิก</th>
                            <th scope="col">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((val, index) => {
                            if (val.username === displayname) {
                                return (
                                    <tr key={val.order_durablearticles_Id}>
                                        <td>{val.durablearticles_Id}</td>
                                        <td>{val.durablearticles_name}</td>
                                        <td>{val.order_durablearticles_location}</td>
                                        <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString()}</td>
                                        <td>{val.username}</td>
                                        <td>{val.order_durablearticles_status}</td>
                                    </tr>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
};




export default Dshow