import './App.css';
import NavBar from './Components/Navbar';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react'
import Home from './pages/Home';
import Things from './pages/Things';
import ComponentExample from './Components/ComponentExample';
import NoMatch from './Components/NoMatch';
import Login from './pages/Login';
import Register from './pages/Register';
import FetchUser from './Components/FetchUser';
import ProtectedRoute from './Components/ProtectedRoute';
import Products from './pages/Products';
import Categories from './pages/Categories';
import FindProduct from './pages/FindProduct';
import ChartsByCategory from './pages/ChartsByCategory';
import ChartAverageBar from './pages/ChartAverageBar';
import ChartBuyerLine from './pages/ChartBuyerLine';
import ChartSellerPie from './pages/ChartSellerPie';

function App() {
  return (
    <>
      <NavBar />
      {/* <FetchUser> */}
        <Container>
          <Switch>
            <Route exact path='/' component={Home}/>    
            <Route exact path='/sellers' component={Products}/>
            <Route exact path='/categories' component={Categories}/>
            <Route exact path='/chartsByCategory' component={ChartsByCategory}/>
            <Route exact path='/chartBar' component={ChartAverageBar}/>
            <Route exact path='/chartLine' component={ChartBuyerLine}/>
            <Route exact path='/chartPie' component={ChartSellerPie}/>
            <Route exact path='/find' component={FindProduct}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route component={NoMatch}/>
          </Switch>
        </Container>
      {/* </FetchUser> */}
    </>
  );
}

export default App;
