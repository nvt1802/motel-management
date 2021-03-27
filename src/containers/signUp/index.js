import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import SignUp from '../../components/signUp'
import Services from '../../services'
import { districtAction } from '../../redux/actions'

function SignUpContainer({ province, district, fetchProvince, fetchDistrict }) {

  const { handleSubmit, register, errors, reset, getValues } = useForm()
  const [showAlert, setShowAlert] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [messages, setMessages] = useState('')

  const onSubmit = values => {
    let account = {
      "userName": values.username,
      "password": values.password,
      "role": 2,
      "name": values.name,
      "gender": parseInt(values.gender),
      "birthday": values.birthday,
      "phone": values.phone,
      "email": values.email,
      "provinceId": parseInt(values.province),
      "districtId": parseInt(values.district)
    }
    Services.account.addOneAccount(account).then(value => {
      if (value) {
        setShowAlert(true)
        setSeverity("success")
        setMessages("Đăng ký tài khoản thành công!")
        reset()
      } else {
        setShowAlert(true)
        setSeverity("error")
        setMessages("Đăng ký tài khoản không thành công!")
      }
    }).catch(err => {
      setShowAlert(true)
      setSeverity("error")
      setMessages("Đăng ký tài khoản không thành công!")
    })
  }

  const handleChangeProvince = (e) => {
    fetchDistrict(e.target.value)
  }

  return <SignUp
    handleSubmit={handleSubmit}
    register={register}
    errors={errors}
    getValues={getValues}
    showAlert={showAlert}
    setShowAlert={setShowAlert}
    onSubmit={onSubmit}
    province={province}
    district={district}
    handleChangeProvince={handleChangeProvince}
    severity={severity}
    messages={messages}
  />
}

const mapStateToProps = state => ({
  province: state.province,
  district: state.district,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDistrict: (provinceId) => dispatch(districtAction.initDistrict(provinceId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)