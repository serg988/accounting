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

const App = () => {
  return (
    <>
      <Router>
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
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
