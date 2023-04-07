import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './materialshow.css';

function Materialshow() {

  const [material, setMaterial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    const response = await Axios.get('http://localhost:3001/material');
    setMaterial(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filteredMaterial = material.filter(val =>
    val.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาวัสดุ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">ยี่ห้อ</th>
              <th scope="col">หน่วยนับ</th>
              <th scope="col">ราคา</th>
              <th scope="col">คงเหลือ</th>
              <th scope="col">วันที่ซื้อ</th>
              <th scope="col">วันที่รับ</th>
              <th scope="col">ประเภทวัสดุ</th>
              <th scope="col">เลขบริษัท</th>
              <th scope="col">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterial.map((val, index) => (
              <tr key={val.material_Id}>
                <td scope="row">{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.material_brand}</td>
                <td>{val.material_unit}</td>
                <td>{val.material_price}</td>
                <td>{val.material_remaining}</td>
                <td>{(val.material_order_date == null) ? "" : new Date(val.material_order_date).toLocaleDateString()}</td>
                <td>{(val.material_delivery_date == null) ? "" : new Date(val.material_delivery_date).toLocaleDateString()}</td>
                <td>{val.type_material_Id}</td>
                <td>{val.company_Id}</td>
                <td><Link to={`/materialedit/${val.material_Id}`} className="btn btn-warning">แก้ไข</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Materialshow;