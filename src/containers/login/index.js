import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import Login from '../../components/login'
import AuthService from '../../services/Authentication.Service'
import Services from '../../services'
import { MESSENGER_ERROR } from '../../common/Constant'
import { authenticateAction } from '../../redux/actions'

function LoginContainer({ fetchAccountData }) {
	const { handleSubmit, register, errors, setError, clearErrors } = useForm()

	const onSubmit = values => {
		AuthService.executeJwtAuthenticateService(values.user, values.pass)
			.then((res) => {
				AuthService.createJwtAuthToken(res.data.token)
				AuthService.registerSuccessFullLogin(values.user, values.pass, res.data.token)
				closeFormLogin()
				Services.account.findAccountByUserName(AuthService.getUsername()).then(res => {
					fetchAccountData(AuthService.getUsername())
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

	const closeFormLogin = () => {
		document.getElementById('hideLoginModal').click()
	}

	return <Login
		handleSubmit={handleSubmit}
		register={register}
		errors={errors}
		onSubmit={onSubmit}
		clearErrors={clearErrors}
	/>
}
const mapStateToProps = state => ({
	authenticate: state.authenticate
})

const mapDispatchToProps = dispatch => ({
	fetchAccountData: (username) => dispatch(authenticateAction.initAuthenticate(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
