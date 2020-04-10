import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'

import Search from './pages/search';
import Released from './pages/released';

class Rotas extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path='/pages/Search' component={Search}></Route>
                <Route exact path='/pages/Released' component={Released}></Route>                                       
            </Switch>
        )
    }
}
class Navegacao extends React.Component {
    render() {
        return (
            // <ul>              
            //     <li>
            //         <NavLink exact to="/pages/Search">Search</NavLink>
            //     </li> 
            //     <li>
            //         <NavLink exact to="/pages/Released">History</NavLink>
            //     </li>                                          
            // </ul>
            <div className="row menudiv">
                <div className="col-md-2">                    
                        <NavLink className="button" exact to="/pages/Search">Search</NavLink>                     
                </div>
                <div className="col-md-2">
                    
                    <NavLink className="button" exact to="/pages/Released">History</NavLink>
                    
                </div>
            </div>            
        )
    }
}
class Newapp extends  React.Component  {
    render() {
        return (
            <BrowserRouter>
                <div className="container">  
                    <Navegacao/>                   
                    <Rotas />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Newapp />, document.getElementById('root'));
