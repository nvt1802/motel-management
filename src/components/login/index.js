import React, { useState } from 'react'
import '../../assets/style/login-modal.css'
import { MESSENGER_ERROR } from '../../common/Constant'
import { Link } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

function Login({ handleSubmit, onSubmit, register, errors, closeFormLogin, clearErrors }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  };

  return (
    <>
      <div className="modal fade" id="loginModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <form action="/" onSubmit={handleSubmit(async (values) => await onSubmit(values))} method="post" id="loginForm">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <h5 className="modal-title my-text-primary">Đăng nhập</h5>
                <button type="button" id="hideLoginModal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="text-dark">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <FormControl className="w-100 mb-3">
                    <InputLabel htmlFor="pass">Tên tài khoản</InputLabel>
                    <Input
                      id="user"
                      name="user"
                      autoComplete="off"
                      inputRef={register({
                        required: MESSENGER_ERROR.password_required
                      })}
                      error={errors.user ? true : false}
                    />
                    <FormHelperText error={errors.user ? true : false} id="pass" className="font-italic">{errors?.user?.message}</FormHelperText>
                  </FormControl>
                  <FormControl className="w-100">
                    <InputLabel htmlFor="pass">Mật khẩu</InputLabel>
                    <Input
                      id="pass"
                      name="pass"
                      autoComplete="off"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputRef={register({
                        required: MESSENGER_ERROR.password_required
                      })}
                      error={errors.pass ? true : false}
                    />
                    <FormHelperText error={errors.pass ? true : false} id="pass" className="font-italic">{errors?.pass?.message}</FormHelperText>
                  </FormControl>
                </div>
              </div>
              <div className="modal-footer d-block text-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <button id="submitLogin" type="submit" className="btn btn-sm my-btn-primary w-100">Đăng nhập</button>
                <br />
                <br />
                <div className="row">
                  <div className="col-sm-12 col-md-6 pl-0" style={{ textAlign: 'left' }}>
                    <i style={{ fontSize: '12px' }}>
                      <a href="/" id="openResetPass" data-toggle="modal" data-dismiss="modal" data-target="#resetPasswordModal" style={{ fontSize: '12px' }}>Quên mật khẩu?</a>
                    </i>
                  </div>
                  <div className="col-sm-12 col-md-6 px-0">
                    <i style={{ fontSize: '12px' }}>Bạn chưa có tài khoản ?</i>
                    <u><Link to="/signUp" onClick={closeFormLogin} style={{ fontSize: '12px' }}> Đăng ký</Link></u>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login