import React, {Component} from 'react';
import {logueado} from '../../utilidades/funciones';
import { browserHistory } from 'react-router';

export default class Inicio extends Component{

	componentWillMount() {
	  	if (!logueado())
	    	browserHistory.push('/iniciosesion');
	 }

	render(){
		return(
			<div className="col-lg-12">
		              <div className="card">
		                <div className="card-header d-flex align-items-center">
		                  <h3><i className="fa fa-home"></i> Inicio</h3>
		                </div>
		                <div className="card-body">
		                <p>
		                	AppBeta: Sistema Informático de prueba (desarrollado React y Bootstrap), que contiene módulos cotidianos de aplicaciones (Inicio de Sesión, Usuarios, etc), con la finalidad de exhibir ciertas herramientas de software a distintas empresas.
		                </p>
		                </div>
		              </div>
		    </div>
		);
	}
}