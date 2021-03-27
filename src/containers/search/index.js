import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Search from '../../components/search'
import { provinceAction, districtAction } from '../../redux/actions'

function SearchContainer({ province, fetchProvince, fetchDistrict }) {
    useEffect(() => {
        fetchProvince()
    }, [fetchProvince])

    return <Search province={province} fetchDistrict={fetchDistrict} />
}

const mapStateToProps = state => ({
    province: state.province
})


const mapDispatchToProps = dispatch => ({
    fetchProvince: () => dispatch(provinceAction.initProvince()),
    fetchDistrict: (provinceId) => dispatch(districtAction.initDistrict(provinceId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)