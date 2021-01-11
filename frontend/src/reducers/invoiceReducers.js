import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_FAIL,
  INVOICE_LIST_SUCCESS,
  SET_NEXT_INVOICE_NUMBER,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_DETAILS_FAIL,
} from '../constants/invoiceConstants'

export const invoiceListReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case INVOICE_LIST_REQUEST:
      return { ...state, loading: true, invoices: [] }
    case INVOICE_LIST_SUCCESS:
      return { ...state, loading: false, invoices: action.payload }
    case INVOICE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case SET_NEXT_INVOICE_NUMBER:
      return { ...state, nextInvoiceNumber: action.payload }
    default:
      return state
  }
}

export const invoiceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case INVOICE_DETAILS_SUCCESS:
      return { ...state, loading: false, invoice: action.payload }
    case INVOICE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
