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
  console.log('IDIII', id);
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

export const setCurrentInvoice = (invoice) => (dispatch, getState) => {
  console.log('CURRENT INVOICE: ', invoice)

  dispatch({ type: SET_CURRENT_INVOICE, payload: invoice })
}

export const updateInvoice = (invoice) => async (dispatch, getState) => {
  console.log('UPDATE INVOICE', invoice)
  try {
    dispatch({
      type: INVOICE_UPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/invoices/${invoice._id}`,
      invoice,
      config
    )

    dispatch({
      type: INVOICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: INVOICE_UPDATE_FAIL,
      payload: message,
    })
  }
}
export const deleteInvoice = (id) => async (dispatch, getState) => {
  console.log(id)
  try {
    dispatch({
      type: INVOICE_DELETE_REQUEST,
      payload: id,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    await axios.delete(`/api/invoices/${id}`) //, config

    dispatch({
      type: INVOICE_DELETE_SUCCESS,
      payload: id,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    // dispatch({
    //   type: INVOICE_DELETE_FAIL,
    //   payload: message,
    // })
  }
}

export const setAvrDateModalOn = () => (dispatch) => {
  dispatch({
    type: SET_AVR_DATE_MODAL_ON,
  })
}
export const setAvrDateModalOff = () => (dispatch) => {
  dispatch({
    type: SET_AVR_DATE_MODAL_OFF,
  })
}

export const setAvrDate = (date) => (dispatch) => {
  dispatch({
    type: SET_AVR_DATE,
    payload: date
  })
}
