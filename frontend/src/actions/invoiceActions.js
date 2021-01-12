import axios from 'axios'
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
} from '../constants/invoiceConstants'

export const listInvoices = () => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_LIST_REQUEST })

    const { data } = await axios('/api/invoices')

    dispatch({ type: INVOICE_LIST_SUCCESS, payload: data })

    const lastNumber = await data.reduce((prev, current) =>
      prev.number > current.number ? prev : current
    )
    const nextNumber = lastNumber.number + 1
    console.log(nextNumber)
    dispatch({ type: SET_NEXT_INVOICE_NUMBER, payload: nextNumber })
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

export const listInvoiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_DETAILS_REQUEST })

    const { data } = await axios(`/api/invoices/${id}`)

    dispatch({ type: INVOICE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVOICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createInvoice = (invoice) => async (dispatch, getState) => {
  console.log('NEW INVOICE: ', invoice)
  try {
    dispatch({
      type: INVOICE_CREATE_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/invoices',
      JSON.stringify(invoice),
      config
    )

    dispatch({
      type: INVOICE_CREATE_SUCCESS,
      payload: data,
    })
    dispatch(listInvoices())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())

    dispatch({
      type: INVOICE_CREATE_FAIL,
      payload: message,
    })
    dispatch({ type: INVOICE_MODAL_HIDE })
  }
}
