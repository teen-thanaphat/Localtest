import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Mlist() {

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

  const filtered = material.filter(val =>
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

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">หน่วยนับ</th>
              <th scope="col">คงเหลือ</th>
              <th scope="col">เบิก</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              <tr key={val.material_Id}>
                <td>{index + 1}</td>
                <td>{val.material_name}</td>
                <td>{val.material_unit}</td>
                <td>{val.material_remaining}</td>
                <td>{val.material_remaining > 0 ?
                  <Link to={`/mcart/${val.material_Id}`} className="btn btn-success">เบิก</Link>
                  : (
                    <button class="btn btn-danger" disabled>เบิก</button>
                  )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mlist