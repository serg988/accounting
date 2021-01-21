import axios from 'axios'
import {
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_FAIL,
  CLIENT_LIST_SUCCESS,
  CLIENT_CREATE_REQUEST,
  CLIENT_CREATE_SUCCESS,
  CLIENT_CREATE_FAIL,
  CLIENT_MODAL_SHOW,
  CLIENT_MODAL_HIDE,
} from '../constants/clientConstants'

export const listClients = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = state.Login.token.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch({ type: CLIENT_LIST_REQUEST })
    let clients = []
    const { data } = await axios(
      process.env.REACT_APP_BACKEND_URL + '/clients',
      config
    )
    data.map((client) =>
      clients.push({ name: client.name, address: client.address })
    )

    dispatch({ type: CLIENT_LIST_SUCCESS, payload: clients })
  } catch (error) {
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createClient = (client) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_CREATE_REQUEST,
    })

    const state = getState()
    const token = state.Login.token.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/clients',
      client,
      config
    )

    dispatch({
      type: CLIENT_CREATE_SUCCESS,
      payload: data,
    })
    dispatch(listClients())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())

    dispatch({
      type: CLIENT_CREATE_FAIL,
      payload: message,
    })
    dispatch({ type: CLIENT_MODAL_HIDE })
  }
}

export const newClientModalShow = () => (dispatch) => {
  dispatch({
    type: CLIENT_MODAL_SHOW,
  })
}
export const newClientModalHide = () => (dispatch) => {
  dispatch({
    type: CLIENT_MODAL_HIDE,
  })
}
