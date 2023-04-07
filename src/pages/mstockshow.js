import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Mstockshow() {

  const [stockm, setStockm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getStockm();
  }, []);

  const getStockm = async () => {
    const response = await Axios.get('http://localhost:3001/stock_material2');
    setStockm(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filtered = stockm.filter(val =>
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
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อวัสดุ</th>
              <th scope="col">จำนวนที่เพิ่ม</th>
              <th scope="col">วันที่</th>
              <th scope="col">ชื่อผู้เพิ่ม</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              <tr key={val.stock_material_Id}>
                <td>{index + 1}</td>
                <td>{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.stock_material_add}</td>
                <td>{(val.stock_material_date == null) ? "" : new Date(val.stock_material_date).toLocaleDateString()}</td>
                <td>{val.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Mstockshow