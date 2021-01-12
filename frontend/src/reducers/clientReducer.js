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

export const clientListReducer = (state = { clients: [], error: null }, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return { ...state, loading: true, clients: [] }
    case CLIENT_LIST_SUCCESS:
      return { ...state, loading: false, clients: action.payload }
    case CLIENT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const clientCreateReducer = (
  state = { clients: [], isNewClientModalShow: false, err: null },
  action
) => {
  switch (action.type) {
    case CLIENT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        client: action.payload,
      }
    case CLIENT_CREATE_FAIL:
      return {
        loading: false,
        err: action.payload,
      }
    case CLIENT_MODAL_SHOW:
      return {
        ...state,
        isNewClientModalShow: true,
      }
    case CLIENT_MODAL_HIDE:
      return {
        ...state,
        isNewClientModalShow: false,
      }
    default:
      return state
  }
}
