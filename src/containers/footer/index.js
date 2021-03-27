import React from 'react'
import { connect } from 'react-redux'
import Footer from '../../components/layout/footer'

function FooterContainer(props) {
    return <Footer />
}

const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer)