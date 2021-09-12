// CSS
import './App.css';
import './fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Components
import AppContainer from './components/small-components/AppContainer';
// Pages
import About from './components/pages/About';
import Home from './components/pages/Home';
import Introduction from './components/pages/Introduction';
import Feature from './components/pages/Feature';
import Search from './components/pages/Search';
import Result from './components/pages/Result';

/**
 *  This file is responsible for routing and
 *  global app states
 */

function App() {
  /**
   * This is the root of the front-end
   * I plan to use navbar for all pages so I added it in the root
   * AppContainer is also a skeleton for all pages, which is also added
   */
  return (
    <div className="app">
      <MyRouter />
    </div>
  );
}

/**
 * Adds the nav bar and box-container to the page
 * @param {import('react').JSXElementConstructor} pageComponent 
 * @returns the page with the skeleton (navbar and box-container)
 */
function addPageSkeleton(pageComponent) {
  return (
    <AppContainer childComponent={pageComponent} />
  );
}

function MyRouter() {
  /**
   * Page Routing controller
   */
  return(
    <Router>
      <Switch>
        <Route path="/home">
          {addPageSkeleton(<Home />)}
        </Route>
        <Route path="/about">
          {addPageSkeleton(<About />)}
        </Route>
        <Route path="/features">
          {addPageSkeleton(<Feature />)}
        </Route>
        <Route path="/search">
          {addPageSkeleton(<Search />)}
        </Route>
        <Route path="/search/:cityName">
          {addPageSkeleton(<Result />)}
        </Route>
        <Route path="/">
          <Introduction />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
