import React, {Component}  from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { browserHistory } from 'react-router';

export default class MensajeAlertaExitoso extends Component{
	constructor (props) {
	    super()
	    this.ocultar = this.ocultar.bind(this);
	  }


	  ocultar() {
	  	this.props.mostrarOcultar();
	  	browserHistory.push(this.props.redirigir);
	  }
	render () {
	    return (
	    	<SweetAlert success style={{height:'45%', width:'30%'}} confirmBtnText="Aceptar" show={this.props.mostrar} title="Exitoso" onConfirm={this.ocultar}>
	    		Datos guardados satisfactoriamente
	    	</SweetAlert>
	    )
	 }

}