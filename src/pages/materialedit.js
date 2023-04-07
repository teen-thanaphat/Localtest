import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Materialedit() {

  const [material_name, setMaterial_name] = useState("");
  const [material_brand, setMaterial_brand] = useState("");
  const [material_unit, setMaterial_unit] = useState("");
  const [material_price, setMaterial_price] = useState("");
  const [material_remaining, setMaterial_remaining] = useState("");
  const [material_order_date, setMaterial_order_date] = useState("");
  const [material_delivery_date, setMaterial_delivery_date] = useState("");
  const [type_material_Id, setType_material_Id] = useState("");
  const [company_Id, setCompany_Id] = useState("");

  const navigate = useNavigate();
  const { material_Id } = useParams();

  const updateMaterial = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:3001/updatematerial/${material_Id}`, {
        material_Id,
        material_name,
        material_brand,
        material_unit,
        material_price,
        material_remaining,
        material_order_date,
        material_delivery_date,
        type_material_Id,
        company_Id,
      });
      navigate("/materialshow");
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialById = async () => {
    const response = await Axios.get(`http://localhost:3001/getmaterial/${material_Id}`);
    console.log(response);
    setMaterial_name(response.data[0].material_name);
    setMaterial_brand(response.data[0].material_brand);
    setMaterial_unit(response.data[0].material_unit);
    setMaterial_price(response.data[0].material_price);
    setMaterial_remaining(response.data[0].material_remaining);
    setMaterial_order_date(response.data[0].material_order_date);
    setMaterial_delivery_date(response.data[0].material_delivery_date);
    setType_material_Id(response.data[0].type_material_Id);
    setCompany_Id(response.data[0].company_Id);
  };

  useEffect(() => {
    getMaterialById();
  }, []);

  return (
    <div className="App container">
      <div className="information">
        <form onSubmit={updateMaterial}>
          <br />
          <div className="field">
            <label className="label">เลขวัสดุ</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={material_Id}
                //onChange={(e) => setMaterial_Id(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ชื่อวัสดุ</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={material_name}
                onChange={(e) => setMaterial_name(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ยี่ห้อ</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={material_brand}
                onChange={(e) => setMaterial_brand(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">หน่วยนับ</label>
            <div className="control">
              <input
                type="text"
                className="input"
                pattern="[ก-๙a-zA-Z\s]*"
                value={material_unit}
                onChange={(e) => setMaterial_unit(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ราคา</label>
            <div className="control">
              <input
                type="text"
                className="input"
                pattern="[0-9]*" min="0"
                value={material_price}
                onChange={(e) => setMaterial_price(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">คงเหลือ</label>
            <div className="control">
              <input
                type="text"
                className="input"
                pattern='999|[0-9]*'
                value={material_remaining}
                onChange={(e) => setMaterial_remaining(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field">
            <label className="label">วันที่ซื้อ</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={(material_order_date == undefined) ? "" : material_order_date.toString().split('T')[0]}
                onChange={(e) => setMaterial_order_date(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">วันที่รับ</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={(material_delivery_date == undefined) ? "" : material_delivery_date.toString().split('T')[0]}
                onChange={(e) => setMaterial_delivery_date(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ประเภทวัสดุ</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={type_material_Id}
                  onChange={(e) => setType_material_Id(e.target.value)}
                >
                  <option value="">เลือกประเภทของวัสดุ</option>
                  <option value="1">1.วัสดุสิ้นเปลืองสำนักงาน</option>
                  <option value="2">2.วัสดุสิ้นเปลืองไฟฟ้าและวิทยุ</option>
                  <option value="3">3.วัสดุสิ้นเปลืองคอมพิวเตอร์</option>
                  <option value="4">4.วัสดุสิ้นเปลืองบ้านงานครัว</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field1">
            <label className="label">บริษัท :</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={company_Id}
                onChange={(e) => setCompany_Id(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <br />
          <div className="field">
            <button type="submit" class="btn btn-primary">
              อัพเดต
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Materialedit