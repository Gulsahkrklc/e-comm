import { Route, Switch } from 'react-router-dom'
import './App.css'
import "./index.css"
import HomePage from "./pages/HomePage"
import ShopPage from './pages/ShopPage'
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
        <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage/>
        </Route>
      </Switch>
      
    </div>
  )
}
export default App
