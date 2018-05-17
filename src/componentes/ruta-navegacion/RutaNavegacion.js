import React, {Component} from 'react';
import App from '../../App';
import InicioSesion from '../inicio-sesion/InicioSesion';
import RecuperarContrasena from '../recuperar-contrasena/RecuperarContrasena';
import Inicio from '../inicio/Inicio';
import UsuarioListado from '../usuario-listado/UsuarioListado';
import UsuarioFormulario from '../usuario-formulario/UsuarioFormulario';
import DepartamentoListado from '../departamento-listado/DepartamentoListado';
import DepartamentoFormulario from '../departamento-formulario/DepartamentoFormulario';
import CargoListado from '../cargo-listado/CargoListado';
import CargoFormulario from '../cargo-formulario/CargoFormulario';
import EmpleadoListado from '../empleado-listado/EmpleadoListado';
import EmpleadoFormulario from '../empleado-formulario/EmpleadoFormulario';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

export default class RutaNavegacion extends Component{

	render(){
		return(
			<Router history={browserHistory}>
				<Route path='/iniciosesion' component={InicioSesion}/>
				<Route path='/recuperarcontrasena' component={RecuperarContrasena}/>
				<Route path='/' component={App}>
					    <Route path='/inicio' component={Inicio}/>
						<Route path='/usuariolistado' component={UsuarioListado}/>
						<Route path='/usuarioformulario/:id' component={UsuarioFormulario}/>
						<Route path='/departamentolistado' component={DepartamentoListado}/>
						<Route path='/departamentoformulario/:id' component={DepartamentoFormulario}/>
						<Route path='/cargolistado' component={CargoListado}/>
						<Route path='/cargoformulario/:id' component={CargoFormulario}/>
						<Route path='/empleadolistado' component={EmpleadoListado}/>
						<Route path='/empleadoformulario/:id' component={EmpleadoFormulario}/>

				</Route>
			</Router>
		);
	}
}