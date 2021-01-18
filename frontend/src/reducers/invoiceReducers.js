import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_FAIL,
  INVOICE_LIST_SUCCESS,
  SET_NEXT_INVOICE_NUMBER,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_DETAILS_FAIL,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAIL,
  INVOICE_MODAL_SHOW,
  INVOICE_MODAL_HIDE,
  SET_CURRENT_INVOICE,
  INVOICE_UPDATE_REQUEST,
  INVOICE_UPDATE_SUCCESS,
  INVOICE_UPDATE_FAIL,
  INVOICE_DELETE_REQUEST,
  INVOICE_DELETE_SUCCESS,
  INVOICE_DELETE_FAIL,
  SET_AVR_DATE,
  SET_AVR_DATE_MODAL_ON,
  SET_AVR_DATE_MODAL_OFF,
} from '../constants/invoiceConstants'

export const invoiceListReducer = (
  state = { invoices: [], nextInvoiceNumber: 0 },
  action
) => {
  switch (action.type) {
    case INVOICE_LIST_REQUEST:
      return { ...state, loading: true, invoices: [] }
    case INVOICE_LIST_SUCCESS:
      return { ...state, loading: false, invoices: action.payload }
    case INVOICE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case SET_NEXT_INVOICE_NUMBER:
      return { ...state, nextInvoiceNumber: action.payload }
    case INVOICE_DELETE_REQUEST:
      return { ...state, loading: true }
    case INVOICE_DELETE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter((i) => i._id !== action.payload),
        loading: false,
        success: true,
      }
    case INVOICE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
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
    case SET_CURRENT_INVOICE:
      return {
        ...state,
        current: action.payload,
      }
    case INVOICE_UPDATE_REQUEST:
      return { loading: true }
    case INVOICE_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case INVOICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const invoiceCreateReducer = (
  state = { invoices: [], isNewInvoiceModalShow: false, isAvrModalShow: false, error: null },
  action
) => {
  switch (action.type) {
    case INVOICE_CREATE_REQUEST:
      return {
        loading: true,
      }
    case INVOICE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        invoice: action.payload,
      }
    case INVOICE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case INVOICE_MODAL_SHOW:
      return {
        ...state,
        isNewClientModalShow: true,
      }
    case INVOICE_MODAL_HIDE:
      return {
        ...state,
        isNewClientModalShow: false,
      }
    case SET_AVR_DATE_MODAL_ON:
      return {
        ...state, isAvrModalShow: true
      }
    case SET_AVR_DATE_MODAL_OFF:
      return {
        ...state, isAvrModalShow: false
      }
    case SET_AVR_DATE:
      return {
        ...state,
        avrDate: action.payload
      }
    default:
      return state
  }
}
