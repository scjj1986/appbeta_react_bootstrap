import React, {Component}  from 'react';
import {Link} from 'react-router';
import './BarraNavegacion.css';

export default class Barravegacion extends Component{
  constructor (props) {
    super(props)
  }
  render (){

    return (
      <nav className="side-navbar">
        <div className="side-navbar-wrapper">
          <div className="sidenav-header d-flex align-items-center justify-content-center">
            
            <div className="sidenav-header-inner text-center"><img src="img/AppBeta_New.png" className="img-fluid"/>
              <h2 className="h5">AppBeta</h2><span>Sistema de Prueba</span>
            </div>
            
            <div className="sidenav-header-logo"><a href="" className="brand-small text-center"> <strong>AB</strong></a></div>
          </div>
          
          <div className="main-menu">
            <h5 className="sidenav-heading">Menú</h5>
            <ul id="side-main-menu" className="side-menu list-unstyled">                  
              <li><Link to='/inicio'><i className="fa fa-home"></i>Inicio</Link></li>
              <li><Link to='/usuariolistado'><i className="fa fa-user"></i>Usuarios</Link></li>
              <li><Link><a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse"> <i className="fa fa-building"></i>Empresa</a></Link>
                <ul id="exampledropdownDropdown" className="collapse list-unstyled ">
                  <li><Link to='/departamentolistado'>Departamentos</Link></li>
                  <li><Link to='/cargolistado'>Cargos</Link></li>
                  <li><Link to='/empleadolistado'>Empleados</Link></li>
                </ul>
              </li>
              
            </ul>
          </div>
          
        </div>
      </nav>
        
    )
  }
}


/*
<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">{this.props.parametro}</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link">Inicio <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/itemuno'>Link 1</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/itemdos'>Link 2</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Link 3 Desplegable
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item">Action</a>
                  <a className="dropdown-item">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fas fa-ambulance"></i> Search</button>
            </form>
          </div>
        </nav>
*/