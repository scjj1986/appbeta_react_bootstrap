import React, {Component} from 'react';
import '../../css/estilos.css';
import {bloquearBotonPrimario,consultaBaseDeDatos,logueado,validarEntradaCampos,validarEnteroMayorQueCero} from '../../utilidades/funciones';
import {letras,rutaPhpDepartamento} from '../../utilidades/constantes';
import MensajeAlertaError from '../mensaje-alerta-error/MensajeAlertaError';
import MensajeAlertaExitoso from '../mensaje-alerta-exitoso/MensajeAlertaExitoso';
import { browserHistory } from 'react-router';

export default class DepartamentoFormulario extends Component{

	constructor(){
        super()
        this.state = {
          //--Encabezado del formulario--//
          logo: "",
          titulo:"",
          //----Formulario----------//
          id:-1,
	      codigo: "",
	      nombre:"",
          //----- Alertas -------//
	      mostrarAlertaError: false,
          mostrarAlertaExitoso: false,
	      tituloMensajeAlertaError: " ",
	      mensajeAlertaError:" ",
	      //-----------------------//
	      enlaceListado: "/departamentolistado"
	    }

      this.agregarEditar = this.agregarEditar.bind(this);
      this.volverListado = this.volverListado.bind(this);
      this.mostrarOcultarAlertaError = this.mostrarOcultarAlertaError.bind(this);
      this.mostrarOcultarAlertaExitoso = this.mostrarOcultarAlertaExitoso.bind(this);
        
    }

    componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
        else if (this.props.params.id==-1 || this.props.params.id==undefined){
        	this.setState({logo:"fa fa-plus"});
        	this.setState({titulo:"Agregar Departamento"});
        	consultaBaseDeDatos(rutaPhpDepartamento+'departamento_generarCodigo',null).then((result) => {
        		this.setState({codigo:result[0].codigo});
        	});
        }else if (!validarEnteroMayorQueCero(this.props.params.id))
            browserHistory.push(this.state.enlaceListado);
        else {
            let parametros = { id: this.props.params.id};
            consultaBaseDeDatos(rutaPhpDepartamento+'departamento_buscarPorId',parametros).then((result) => {
                if (result[0].id!=-1){
                  this.setState({logo:"fa fa-edit"});
                  this.setState({titulo:"Editar Departamento"});
                  this.setState({id:result[0].id});
                  this.setState({codigo:result[0].codigo});
                  this.setState({nombre:result[0].nombre});
                }
                else
                  browserHistory.push(this.state.enlaceListado);

            });

        }
    }

    noPegar(e){
      e.preventDefault();
      return false;
    }

    validarLetras(e){
      if (!validarEntradaCampos(e,letras))
        e.preventDefault();
    }

     /*--------------Actualización del estado (obligatorio en todos los formularios)-----------------------*/
	actualizarEstado(e){
	  this.setState({[e.target.name]: e.target.value});
    }

    mostrarOcultarAlertaError() {
      this.setState({mostrarAlertaError: !(this.state.mostrarAlertaError)});
    }

    mostrarOcultarAlertaExitoso() {
      this.setState({mostrarAlertaExitoso: !(this.state.mostrarAlertaExitoso)});
    }

	bloquearBotonGuardar(){
	  return bloquearBotonPrimario(this.state);
	}



	volverListado(){
      browserHistory.push(this.state.enlaceListado);
    }

    agregarEditar(){
      consultaBaseDeDatos(rutaPhpDepartamento+'departamento_agregarEditar',this.state).then((result) => {
          if (result[0].estatusConsulta==-1){
            this.setState({tituloMensajeAlertaError: "Error"});
            this.setState({mensajeAlertaError: "*El nombre debe ser irrepetible"});
            this.mostrarOcultarAlertaError();
          }
          else
            this.mostrarOcultarAlertaExitoso();
      });

    }

     render(){
     	return(

     		<div className="col-lg-12">
              <div className="card">
                <div className="card-header d-flex align-items-center">
                  <h3><i className={this.state.logo}></i> {this.state.titulo}</h3>
                </div>
                <div className="card-body">
                  <form className="form-horizontal">
                  	<div className="form-group row">
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 etiquetaCampo">*Código</label>
                      <div className="col-sm-2">
                      	<input disabled type="text" name="codigo" value={this.state.codigo}  className="form-control form-control-sm"/>
                      </div>
                      <label className="col-sm-2 etiquetaCampo">*Nombre</label>
                      <div className="col-sm-6">
                      	<input type="text" name="nombre" maxLength="80" value={this.state.nombre}  className="form-control form-control-sm" onKeyPress={(e) => this.validarLetras(e)} onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
                      </div>
                    </div>

                    <div className="form-group row">
                    </div>

                    <div className="form-group row">
                      <div align="center" className="col-sm-12">
                    	<button disabled={this.bloquearBotonGuardar()} type="button" className="btn btn-primary btnGuardar" onClick={this.agregarEditar}><i className="fa fa-save"></i> Guardar</button> - <button type="button" className="btn btn-secondary btnVolver" onClick={this.volverListado}><i className="fa fa-reply"></i> Volver</button>
		       		  </div>
                    </div>
                    
                  </form>
                </div>
              </div>
              <MensajeAlertaError mostrarOcultar={this.mostrarOcultarAlertaError} mostrar={this.state.mostrarAlertaError} titulo={this.state.tituloMensajeAlertaError} contenido={this.state.mensajeAlertaError} />
              <MensajeAlertaExitoso redirigir={this.state.enlaceListado} mostrarOcultar={this.mostrarOcultarAlertaExitoso} mostrar={this.state.mostrarAlertaExitoso} />

            </div>

     	);
     }
}