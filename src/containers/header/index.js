import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/layout/header'
import { authenticateAction } from '../../redux/actions'

function HeaderContainer({ authenticate, removeAuthenticate }) {
    return <Header authenticate={authenticate} removeAuthenticate={removeAuthenticate} />
}

const mapStateToProps = state => ({
    authenticate: state.authenticate,
})


const mapDispatchToProps = dispatch => ({
    removeAuthenticate: () => dispatch(authenticateAction.removeAuthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)