import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {invoiceCreateReducer, invoiceDetailsReducer, invoiceListReducer} from './reducers/invoiceReducers'
import { clientCreateReducer, clientListReducer } from './reducers/clientReducer'

const reducer = combineReducers({
  invoiceList: invoiceListReducer,
  invoiceDetails: invoiceDetailsReducer,
  invoiceCreate: invoiceCreateReducer,
  clientList: clientListReducer,
  clientCreate: clientCreateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
