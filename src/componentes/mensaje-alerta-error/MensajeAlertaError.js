import React, {Component}  from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


export default class MensajeAlertaError extends Component{
	constructor (props) {
	    super()
	    this.ocultar = this.ocultar.bind(this);
	  }


	  ocultar() {
	  	this.props.mostrarOcultar();
	  }
	render () {
	    return (
	    	<SweetAlert error style={{height:'45%', width:'30%'}} confirmBtnText="Aceptar" show={this.props.mostrar} title={this.props.titulo} onConfirm={this.ocultar}>
	    		{this.props.contenido}
	    	</SweetAlert>
	    )
	 }

}
