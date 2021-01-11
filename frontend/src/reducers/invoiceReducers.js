import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_FAIL,
  INVOICE_LIST_SUCCESS,
} from '../constants/invoiceConstants'

export const invoiceListReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case INVOICE_LIST_REQUEST:
      return { ...state, loading: true, invoices: [] }
    case INVOICE_LIST_SUCCESS:
      return { ...state, loading: false, invoices: action.payload }
    case INVOICE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
