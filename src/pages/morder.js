import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function Mshow() {

  const [orderm, setOrderm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrderm();
  }, []);

  const getOrderm = async () => {
    const response = await Axios.get('http://localhost:3001/order_material2');
    setOrderm(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filtered = orderm.filter(val =>
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
              filename={"order_material.csv"}
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
              <th scope="col">ชื่อวัสดุ</th>
              <th scope="col">จำนวนที่เบิก</th>
              <th scope="col">วันที่</th>
              <th scope="col">ชื่อผู้เบิก</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              val.order_material_status === 'อนุมัติ' || val.order_material_status === 'ไม่อนุมัติ' ? (
                <tr key={val.order_material_Id}>
                  <td>{val.material_Id}</td>
                  <td>{val.material_name}</td>
                  <td>{val.order_material_quantity}</td>
                  <td>{(val.order_material_date == null) ? "" : new Date(val.order_material_date).toLocaleDateString()}</td>
                  <td>{val.username}</td>
                  <td>{val.order_material_status}</td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Mshow