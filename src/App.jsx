import { Switch, Route } from 'react-router-dom'
import './App.css'
import "./index.css"
import HomePage from "./pages/HomePage"
import ShopPage from './pages/ShopPage'
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from "./redux/store"

function App() {

  return (
    <div>
      <Provider store={store}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
      </Switch>
      <ToastContainer />
      </Provider>
    </div>
  )
}

export default App
