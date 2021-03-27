import React from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'

export default function SearchBasic({ province, fetchDistrict }) {

  const district = useSelector((state) => state.district)
  const listDistrict = get(district, 'data', [])

  const handleProvinceChange = (e) => {
    fetchDistrict(e.target.value)
  }

  // const handleDistrictChange = (e) => {
  //   props.setDistrictId(parseInt(e.target.value))
  // }

  return <>
    <div className="row">
      <div className="form-group col-12">
        <select name="province" id="province" onChange={handleProvinceChange} className="form-control form-control-sm cursor border-radius-45">
          <option value={-1}>Chọn Tỉnh/Thành phố</option>
          {province?.data?.map((value, index) => {
            return <option value={value.province_id} key={index}>{value.province_name}</option>
          })}
        </select>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-12">
        {
          <select defaultValue={-1} name="district" id="district" className="form-control form-control-sm cursor border-radius-45">
            <option value={-1}>Chọn Quận/Huyện</option>
            {listDistrict?.map((value, index) => {
              return <option value={value.district_id} key={index}>{value.district_name}</option>
            })}
          </select>
        }
      </div>
    </div>
  </>
}