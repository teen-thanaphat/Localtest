import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dreturnshow() {

  const [returnd, setReturnd] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getReturnd();
  }, []);

  const getReturnd = async () => {
    const response = await Axios.get('http://localhost:3001/return_durablearticles2');
    setReturnd(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filtered = returnd.filter(val =>
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
              <th scope="col">ชื่อครุภัณฑ์</th>
              <th scope="col">สถานะการคืน</th>
              <th scope="col">วันที่</th>
              <th scope="col">ชื่อผู้คืน</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => (
              <tr key={val.return_durablearticles_Id}>
                <td>{index + 1}</td>
                <td>{val.durablearticles_Id}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.return_durablearticles_status}</td>
                <td>{(val.return_durablearticles_date == null) ? "" : new Date(val.return_durablearticles_date).toLocaleDateString()}</td>
                <td>{val.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




export default Dreturnshow