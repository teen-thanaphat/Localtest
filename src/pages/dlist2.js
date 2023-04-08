import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dlist() {

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

  const filtered = durablearticles.filter(val =>
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
              <th scope="col">ชื่อครุภัณฑ์</th>
              <th scope="col">หน่วยนับ</th>
              <th scope="col">สถานะการเบิก</th>
              <th scope="col">เบิก</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              <tr key={val.durablearticles_Id}>
                <td>{index + 1}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.durablearticles_unit}</td>
                <td>{val.durablearticles_status}</td>
                <td>{val.durablearticles_status != "เบิกไม่ได้" ? (
                  <Link to={`/dcart2/${val.durablearticles_Id}`} class="btn btn-success">เบิก</Link>
                ) : (
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

export default Dlist