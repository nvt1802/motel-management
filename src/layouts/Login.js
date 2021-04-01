import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux'
import AuthenServices from '../services/Authentication.Service'
import { authenticateAction } from '../redux/actions'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Services from '../services'
import { MESSENGER_ERROR } from '../common/Constant'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Admin = ({ authenticate, fetchAccountFromToken, history, fetchAccountData }) => {
  let { token } = useParams()
  const classes = useStyles();

  useEffect(() => {
    if (token) {
      fetchAccountFromToken(token)
    }
    else if (AuthenServices.getJwtAuthToken()) {
      fetchAccountFromToken(AuthenServices.getJwtAuthToken().substring(7))
    }
  }, [fetchAccountFromToken, token])

  useEffect(() => {
    if (authenticate?.data?.role === 1) {
      history?.push("/admin")
    } else if (authenticate?.data?.role === 2) {
      history?.push("/users")
    }
  }, [history, authenticate])

  const { handleSubmit, register, errors, setError } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  };

  const onSubmit = values => {
    AuthenServices.executeJwtAuthenticateService(values.username, values.password)
      .then((res) => {
        AuthenServices.createJwtAuthToken(res.data.token)
        AuthenServices.registerSuccessFullLogin(values.username, res.data.token)
        Services.account.findAccountByUserName(AuthenServices.getUsername()).then(res => {
          fetchAccountData(AuthenServices.getUsername())
          if (res.data?.role === 1) {
            history?.push("/admin")
          } else if (res.data?.role === 2) {
            history?.push("/users")
          }
        }).catch(res => { })
      }).catch((err) => {
        if (err) {
          let errMess = err.response.data
          switch (errMess) {
            case 'INVALID_USERNAME':
              setError('user', {
                type: "manual",
                message: MESSENGER_ERROR.username
              })
              break
            case 'INVALID_PASSWORD':
              setError('pass', {
                type: "manual",
                message: MESSENGER_ERROR.password
              })
              break
            case 'ACCOUNT_LOCKED':
              setError('user', {
                type: "manual",
                message: MESSENGER_ERROR.account_locked
              })
              break
            default:
              break
          }
        }
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng Nhập
        </Typography>
        <form className={classes.form} noValidate method="POST" onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên tài khoản"
            name="username"
            autoFocus
            autoComplete="off"
            inputRef={register({
              required: MESSENGER_ERROR.username
            })}
            error={errors.username ? true : false}
          />
          <FormHelperText error={errors.username ? true : false} id="user" className="font-italic">{errors?.username?.message}</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            endadornment={
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
            error={errors.password ? true : false}
          />
          <FormHelperText error={errors.password ? true : false} id="password" className="font-italic">{errors?.password?.message}</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng Nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

const mapDispatchToProps = dispatch => ({
  fetchAccountData: (username) => dispatch(authenticateAction.initAuthenticate(username)),
  fetchAccountFromToken: (token) => dispatch(authenticateAction.initAuthenticateFromToken(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(Admin)