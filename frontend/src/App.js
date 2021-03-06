import React from 'react'
import {useSelector} from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import SingleInvoice from './invoices/SingleInvoice'
import NewInvoice from './invoices/NewInvoice'
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EditInvoice from './invoices/EditInvoice'
import CopyInvoice from './invoices/CopyInvoice'
import PrintScreen from './screens/PrintScreen'



const App = () => {
  const login = useSelector((state) => state.Login)
  const { token } = login

  let routes = <></>
  if (token) {
    routes = (
      <>
        <Router>
          <Switch>
            <Route path='/invoices/print' exact>
              <PrintScreen data='InvoicePrint' />
            </Route>
            <Route path='/invoices/AvrPrint' exact>
              <PrintScreen data='AvrPrint' />
            </Route>

            <>
              <Header />
              <main className='py-3'>
                <Container>
                  <Route path='/' exact>
                    <HomeScreen />
                  </Route>
                  <Route path='/invoice/:iid' exact>
                    <SingleInvoice />
                  </Route>
                  <Route path='/new-invoice' exact>
                    <NewInvoice />
                  </Route>
                  <Route path='/invoices/edit' exact>
                    <EditInvoice />
                  </Route>
                  <Route path='/invoices/copy' exact>
                    <CopyInvoice />
                  </Route>
                </Container>
              </main>
              <Footer />
            </>
          </Switch>
        </Router>
      </>
    )
  } else {
    routes = <Router><LoginScreen /></Router>
  }
  return (
    routes
  )
}

export default App
