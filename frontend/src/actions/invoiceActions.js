import axios from 'axios'
import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_FAIL,
  INVOICE_LIST_SUCCESS,
} from '../constants/invoiceConstants'

export const listInvoices = () => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_LIST_REQUEST })

    const { data } = await axios.get('api/invoices')

    dispatch({ type: INVOICE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVOICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
