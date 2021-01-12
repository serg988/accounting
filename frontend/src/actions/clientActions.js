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

export const listClients = () => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_LIST_REQUEST })
    let clients = []
    const { data } = await axios('/api/clients')
    data.map((client) => clients.push(client.name))

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
  console.log('NEW CLIENT: ', client)
  try {
    dispatch({
      type: CLIENT_CREATE_REQUEST,
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

    const { data } = await axios.post('/api/clients', client, config)

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
