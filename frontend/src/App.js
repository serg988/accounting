import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import SingleInvoice from './invoices/SingleInvoice'
import NewInvoice from './invoices/NewInvoice'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import EditInvoice from './invoices/EditInvoice'
import CopyInvoice from './invoices/CopyInvoice'
import InvoicePrint from './invoices/InvoicePrint'

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/invoices/print' exact>
            <InvoicePrint />
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
}

export default App
