import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function Mstocklist() {

  const [material, setMaterial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    const response = await Axios.get('http://localhost:3001/material2');
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

        <div className="field">
          <div className="control">
            <CSVLink
              data={filtered}
              filename={"material.csv"}
              className="button is-link "
              class="btn btn-success"
              target="_blank"
            >
              ดาวน์โหลดเป็นไฟล์ Excel
            </CSVLink>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">คงเหลือ</th>
              <th scope="col">หน่วยนับ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              <tr key={val.material_Id}>
                <td scope="row">{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.material_remaining}</td>
                <td>{val.material_unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mstocklist