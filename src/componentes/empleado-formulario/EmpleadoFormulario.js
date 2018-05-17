import React, {Component} from 'react';
import '../../css/estilos.css';
import {filtrarArreglo,bloquearBotonPrimario,consultaBaseDeDatos,logueado,validarEntradaCampos,validarEntradaDecimales,validarEnteroMayorQueCero} from '../../utilidades/funciones';
import {letras,numeros,rutaPhpEmpleado,rutaPhpCargo,rutaPhpDepartamento} from '../../utilidades/constantes';
import MensajeAlertaError from '../mensaje-alerta-error/MensajeAlertaError';
import MensajeAlertaExitoso from '../mensaje-alerta-exitoso/MensajeAlertaExitoso';
import { browserHistory } from 'react-router';

export default class EmpleadoFormulario extends Component{

	constructor(){
        super()
        this.state = {
        //--Encabezado del formulario--//
        logo: "",
        titulo:"",
        //----Formulario----------//
        id:-1,
          ficha:-1,
          idDepto:-1,
          idCargo:"",
	      tDoc:"V",
	      nDoc:"",
	      nombre:"",
	      apellido:"",
	      direccion:"",
	      fNac:"",
	      lugarNac:"",
	      telefono:"",
	      hijos:"NO",
	      nHijos:0,
	      tallaCamisa:"XS",
	      tallaPantalon:"28",
	      tallaZapato:"35",
	      estatura:"",
	      activo:"1",
	      sexo:"M",
        //----- Alertas -------//
	      mostrarAlertaError: false,
        mostrarAlertaExitoso: false,
	      tituloMensajeAlertaError: " ",
	      mensajeAlertaError:" ",
	    //------------------------//
	    mostrarDivHijos:"ocultar",
        //----------------------------------------------//
        enlaceListado: '/empleadolistado',
        listadoDepto:[],
        listadoCargo:[],
        listadoCargoFiltro:[]
	    }

      this.agregarEditar = this.agregarEditar.bind(this);
      this.volverListado = this.volverListado.bind(this);
      this.mostrarOcultarAlertaError = this.mostrarOcultarAlertaError.bind(this);
      this.mostrarOcultarAlertaExitoso = this.mostrarOcultarAlertaExitoso.bind(this);
      this.filtrarCargosPorDepto = this.filtrarCargosPorDepto.bind(this);
      this.cargarIdCargo = this.cargarIdCargo.bind(this);
      this.actualizarEstado = this.actualizarEstado.bind(this);
      this.montarCargos = this.montarCargos.bind(this);        
    }

    cargarIdCargo(){
      this.setState({idCargo:this.state.listadoCargoFiltro.length==0?"":this.state.listadoCargoFiltro[0].id});
    }

    filtrarCargosPorDepto(idDepto){
    	this.setState({listadoCargoFiltro:filtrarArreglo(this.state.listadoCargo,"idDepto",idDepto)});
    	
    }

    montarCargos(idDepto){
      consultaBaseDeDatos(rutaPhpCargo+'cargo_listado',null).then((result) => {
              this.setState({listadoCargo:result});
              this.filtrarCargosPorDepto(idDepto);
              this.cargarIdCargo();
      });
    }

    componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
        else if (this.props.params.id==-1 || this.props.params.id==undefined){
        	this.setState({logo:"fa fa-plus"});
        	this.setState({titulo:"Agregar Empleado"});
          consultaBaseDeDatos(rutaPhpEmpleado+'empleado_generarNrFicha',null).then((result) => {
            this.setState({ficha:result[0].ficha});
          });
          consultaBaseDeDatos(rutaPhpDepartamento+'departamento_listado',null).then((result) => {
            this.setState({listadoDepto:result});
            this.setState({idDepto:result[0].id});
          });
          consultaBaseDeDatos(rutaPhpCargo+'cargo_listado',null).then((result) => {
            this.setState({listadoCargo:result});
            this.filtrarCargosPorDepto(this.state.idDepto);
            this.cargarIdCargo();
          });
        }else if (!validarEnteroMayorQueCero(this.props.params.id))
            browserHistory.push(this.state.enlaceListado);
        else {
            consultaBaseDeDatos(rutaPhpDepartamento+'departamento_listado',null).then((result) => {
              this.setState({listadoDepto:result});
            });
            consultaBaseDeDatos(rutaPhpCargo+'cargo_listado',null).then((result) => {
              this.setState({listadoCargo:result});
            });

            let parametros = { id: this.props.params.id};
            consultaBaseDeDatos(rutaPhpEmpleado+'empleado_buscarPorId',parametros).then((result) => {
                if (result[0].id!=-1){
                  this.setState({ficha:result[0].id});
                  this.setState({id:result[0].id});
                  this.setState({logo:"fa fa-edit"});
                  this.setState({titulo:"Editar Empleado"});
                  this.setState({id:result[0].id});
                  this.setState({idCargo:result[0].idCargo});
                  this.setState({idDepto:result[0].idDepto});
                  this.filtrarCargosPorDepto(result[0].idDepto);
                  this.setState({nDoc:result[0].nDoc});
                  this.setState({tDoc:result[0].tDoc});
                  this.setState({nombre:result[0].nombre});
                  this.setState({apellido:result[0].apellido});
                  this.setState({direccion:result[0].direccion});
                  this.setState({fNac:result[0].fNac});
                  this.setState({lugarNac:result[0].lugarNac});
                  this.setState({telefono:result[0].telefono});
                  this.setState({hijos:result[0].hijos});
                  this.setState({mostrarDivHijos: result[0].hijos=="SI"?"mostrar":"ocultar"});
                  this.setState({nHijos:result[0].nHijos});
                  this.setState({tallaCamisa:result[0].tallaCamisa});
                  this.setState({tallaPantalon:result[0].tallaPantalon});
                  this.setState({tallaZapato:result[0].tallaZapato});
                  this.setState({estatura:result[0].estatura});
                  this.setState({sexo:result[0].sexo});
                  this.setState({activo:result[0].activo});
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

     validarDecimales(e){
	    if (!validarEntradaDecimales(e))
	    	e.preventDefault();
	  }

     validarNumeros(e){
      if (!validarEntradaCampos(e,numeros))
          e.preventDefault();
    }

    validarLetras(e){
      if (!validarEntradaCampos(e,letras))
        e.preventDefault();
    }

    actualizarEstado(e){
		 this.setState({[e.target.name]: e.target.value});
		 if(e.target.name=="hijos"){
		 	this.setState({mostrarDivHijos: e.target.value=="SI"?"mostrar":"ocultar"});
		 	if(e.target.value=="NO")
		 		this.setState({nHijos: 0});
		 }
		 else if (e.target.name==="idDepto")
		 	  this.montarCargos(e.target.value);
    }

    mostrarOcultarAlertaError() {
      this.setState({mostrarAlertaError: !(this.state.mostrarAlertaError)});
    }

    mostrarOcultarAlertaExitoso() {
      this.setState({mostrarAlertaExitoso: !(this.state.mostrarAlertaExitoso)});
    }

	bloquearBotonGuardar(){
	  return /*false*/  (bloquearBotonPrimario(this.state));
	}

	agregarEditar(){
	    console.log(this.state);
      consultaBaseDeDatos(rutaPhpEmpleado+'empleado_agregarEditar',this.state).then((result) => {
          if (result[0].estatusConsulta==-1){
            this.setState({tituloMensajeAlertaError: "Error"});
            this.setState({mensajeAlertaError: "*El Documento de Identidad debe ser irrepetible"});
            this.mostrarOcultarAlertaError();
          }
          else
            this.mostrarOcultarAlertaExitoso();
      });

    }

    volverListado(){
      browserHistory.push(this.state.enlaceListado);
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
                      <label className="col-sm-2 etiquetaCampo">*Nr. Ficha</label>
                      <div className="col-sm-1">
                        <input type="text" name="ficha" disabled value={this.state.ficha}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
                      </div>
                      <label className="col-sm-3 etiquetaCampo">*Tipo Documento</label>
                      <div className="col-sm-1 mb-1">
                        <select name="tDoc" value={this.state.tDoc} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
                          <option value="V">V</option>
                          <option value="E">E</option>
                          <option value="P">P</option>
                        </select>
                      </div>


                      <div className="col-sm-1">
                      </div>
                      <label className="col-sm-2 etiquetaCampo">*Nr. Documento</label>
                      <div className="col-sm-2">
                      	<input type="text" name="nDoc" maxLength="15" value={this.state.nDoc}  className="form-control form-control-sm" onKeyPress={(e) => this.validarNumeros(e)} onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
                      </div>
                      
                    </div>

                    <div className="form-group row">
                    	  <label className="col-sm-2 etiquetaCampo">*Nombre</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="nombre" maxLength="50" value={this.state.nombre}  className="form-control form-control-sm" onKeyPress={(e) => this.validarLetras(e)} onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>
                    	  <label className="col-sm-2 etiquetaCampo">*Apellido</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="apellido" maxLength="15" value={this.state.apellido}  className="form-control form-control-sm" onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>

	                      <label className="col-sm-2 etiquetaCampo">*Fecha Nacimiento</label>
	                      <div className="col-sm-2">
	                      	<input type="date" name="fNac" value={this.state.fNac}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>

	                      
                    </div>

                    <div className="form-group row">
                    	  <label className="col-sm-2 etiquetaCampo">*Lugar de Nacimiento</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="lugarNac" maxLength="50" value={this.state.lugarNac}  className="form-control form-control-sm" onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>
                    	  <label className="col-sm-2 etiquetaCampo">*Dirección</label>
	                      <div className="col-sm-6">
	                      	<textarea name="direccion" maxLength="200" value={this.state.direccion}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}></textarea>
	                      </div>

                    	  
                    </div>

                    <div className="form-group row">
                    	<label className="col-sm-2 etiquetaCampo">*Teléfono</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="telefono" maxLength="20" value={this.state.telefono}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>
                    	<label className="col-sm-2 etiquetaCampo">*Sexo</label>
	                      <div className="col-sm-1 mb-1">
	                        <select name="sexo" value={this.state.sexo} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          <option value="M">M</option>
	                          <option value="F">F</option>
	                        </select>
                      	  </div>
	                      <label className="col-sm-1 etiquetaCampo">*Hijos</label>
	                      <div className="col-sm-1 mb-1">
	                        <select name="hijos" value={this.state.hijos} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          <option value="NO">No</option>
	                          <option value="SI">Sí</option>
	                        </select>
                      	  </div>
		                  <label className="col-sm-2 etiquetaCampo">
		                     <div className={this.state.mostrarDivHijos}>
		                      		*N° Hijos
		                      </div>
		                  </label>
		                  <div className="col-sm-1">
		                      <div className={this.state.mostrarDivHijos}>
		                      		<input type="text" name="nHijos" maxLength="2" value={this.state.nHijos}  className="form-control form-control-sm" onKeyPress={(e) => this.validarNumeros(e)} onPaste={(e) => this.noPegar(e)}  onChange={(e) => this.actualizarEstado(e)}/>
	                          		<small className="form-text fuenteRoja">{this.state.errorRespuesta}</small>
	                          </div>
		                   </div>
		                   

                    </div>
                    <div className="form-group row">
                    	<label className="col-sm-2 etiquetaCampo">*Talla Camisa</label>
		                    <div className="col-sm-1 mb-1">
		                        <select name="tallaCamisa" value={this.state.tallaCamisa} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
		                            <option value="XS">XS</option>
								    <option value="S">S</option>
								    <option value="M">M</option>
								    <option value="L">L</option>
								    <option value="XL">XL</option>
								    <option value="XXL">XXL</option>
		                        </select>
	                      	</div>
                    	<label className="col-sm-2 etiquetaCampo">*Talla Pantalón</label>
		                <div className="col-sm-1 mb-1">
		                    <select name="tallaPantalon" value={this.state.tallaPantalon} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
		                        <option value="28">28</option>
								<option value="30">30</option>
								<option value="32">32</option>
								<option value="34">34</option>
								<option value="36">36</option>
								<option value="38">38</option>
								<option value="40">40</option>
								<option value="42">42</option>
		                    </select>
	                    </div>
	                    <label className="col-sm-2 etiquetaCampo">*Talla Zapato</label>
		                <div className="col-sm-1 mb-1">
		                    <select name="tallaZapato" value={this.state.tallaZapato} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
		                        <option value="35">35</option>
							    <option value="36">36</option>
							    <option value="37">37</option>
							    <option value="38">38</option>
							    <option value="39">39</option>
							    <option value="40">40</option>
							    <option value="41">41</option>
							    <option value="42">42</option>
							    <option value="43">43</option>
							    <option value="44">44</option>
		                    </select>
	                    </div>
	                    <label className="col-sm-2 etiquetaCampo">*Estatura</label>
		                  <div className="col-sm-1">
		                      		<input type="text" name="estatura" maxLength="4" value={this.state.estatura}  className="form-control form-control-sm" onKeyPress={(e) => this.validarDecimales(e)} onPaste={(e) => this.noPegar(e)}  onChange={(e) => this.actualizarEstado(e)}/>
	                          		<small className="form-text fuenteRoja">{this.state.errorRespuesta}</small>
	                       </div>
                    </div>
                    <div className="form-group row">
                    	 <label className="col-sm-2 etiquetaCampo">*Departamento</label>
	                      <div className="col-sm-4 mb-4">
	                        <select name="idDepto" value={this.state.idDepto} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          {this.state.listadoDepto.map((item) =>             
	                              <option value={item.id}>{item.nombre}
	                              </option>
	                          )}
	                        </select>
	                      </div>
	                      <label className="col-sm-2 etiquetaCampo">*Cargo</label>
	                      <div className="col-sm-4 mb-4">
	                        <select name="idCargo" value={this.state.idCargo} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          {this.state.listadoCargoFiltro.map((item) =>             
	                              <option value={item.id}>{item.nombre}
	                              </option>
	                          )}
	                        </select>
	                      </div>
                    	
                    </div>
                    <div className="form-group row">
                    	<label className="col-sm-2 etiquetaCampo">*Activo</label>
	                    <div className="col-sm-1 mb-1">
	                        <select name="activo" value={this.state.activo} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          <option value="1">Sí</option>
	                          <option value="0">No</option>
	                        </select>
                      	</div>
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