import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import AccountCustomTable from './AccountCustomTable'
import { accountManagement } from '../../../redux/actions'
document.title = "Quản lý tài khoản"
function AccountManagement({ accountManagement, fetchListAccount }) {
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    if (loading) {
      fetchListAccount({ page: 0, pageSize: pageSize })
      setLoading(false)
    }
  }, [fetchListAccount, loading, pageSize])

  useEffect(() => {
    fetchListAccount({ page: 0, pageSize: pageSize })
  }, [fetchListAccount, pageSize])

  return (
    <AccountCustomTable
      accountManagement={accountManagement}
      fetchListAccount={fetchListAccount}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  )
}

const mapStateToProps = state => ({
  accountManagement: state.accountManagement
})

const mapDispatchToProps = dispatch => ({
  fetchListAccount: (pageCommon) => dispatch(accountManagement.fecthListAccount(pageCommon))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement)
