import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarraNavegacion from './componentes/barra-navegacion/BarraNavegacion';
import Pagina from './componentes/pagina/Pagina';
import {removerLocalStorages,logueado} from './utilidades/funciones';
import { browserHistory } from 'react-router';


class App extends Component {

  componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
  }

  cerrarSesion(){
    removerLocalStorages();
    browserHistory.push('/iniciosesion');
  }

  render() {
    return (
      <div className="container-fluid">
        <BarraNavegacion/>
        <div className="page">
          <header className="header">
            <nav className="navbar">
              <div className="container-fluid">
                <div className="navbar-holder d-flex align-items-center justify-content-between">
                  <div className="navbar-header"><a id="toggle-btn" href="" className="menu-btn"><i className="icon-bars"> </i></a><a href="index.html" className="navbar-brand">
                      </a></div>
                  <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                    <li className="nav-item dropdown">
                      
                    </li>
                    <li className="nav-item dropdown">
                    </li>
                    <li className="nav-item"><a href="" onClick={this.cerrarSesion} className="nav-link logout">Cerrar Sesi&oacute;n<i className="fa fa-sign-out"></i></a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>


          <div className=" divScrollable">
          <section className="dashboard-counts section-padding seccion">
            {this.props.children}
          </section>
          </div>
          
          
          <footer className="main-footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <p>AppBeta &copy; 2018</p>
                </div>
                
              </div>
            </div>
          </footer>
      </div>

      </div>
    );
  }
}

export default App;
