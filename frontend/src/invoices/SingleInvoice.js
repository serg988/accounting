import React from 'react'
import { withRouter } from 'react-router-dom'

const SingleInvoice = (props) => {

  return <div>SINGLE INV NO.{props.match.params.iid}</div>
}

export default withRouter(SingleInvoice)
