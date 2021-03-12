import './App.css';
import './fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppContainer from './components/AppContainer';
import Features from './components/Features';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <header className="Weather App">
      </header>
      <body>
        <Router_ />
      </body>
    </div>
  );
}

function Router_() {
  return(
    <Router>
      <Switch>
        <Route path="/home">
          <About />
        </Route>
        <Route path="/features">
          <Features />
        </Route>
        <Route path="/">
          <AppContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
