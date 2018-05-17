import React, {Component} from 'react';
import '../../css/estilos.css';
import {consultaBaseDeDatos,logueado} from '../../utilidades/funciones';
import {rutaPhpEmpleado,rutaPhpReportesEmpleado} from '../../utilidades/constantes';
import { browserHistory } from 'react-router';

class ContenidoLista extends Component{

    constructor(){
        super()
        this.state = {
            listado:[]
        }
        this.redirigirFormulario = this.redirigirFormulario.bind(this);
        this.generarPlanillaEmpleado = this.generarPlanillaEmpleado.bind(this);
    }

    //------Recopilación del listado al cargar el componente-------------------------//
    componentWillMount() {
        consultaBaseDeDatos(rutaPhpEmpleado+'empleado_listado',null).then((result) => {
                this.setState({listado:result});
        });
     }

     //-------- Carga del archivo js para el idioma del datatable (español)---------//
     componentDidMount () {
        const script = document.createElement("script");
        script.src = "js/tabla.js";
        script.async = true;
        document.body.appendChild(script);
    }

    redirigirFormulario(e){
        browserHistory.push('/empleadoformulario/'+e.target.value);
    }

    generarPlanillaEmpleado(e){
        window.open(rutaPhpReportesEmpleado+"reporte-empleado-ficha.php?id="+e.target.value,"Reporte de Ficha de Empleado","width=900,height=500,scrollbars=NO");
      }

     render(){
        return (
            <tbody>
            {this.state.listado.map((item) =>
                <tr key={item.id}>
                   <td>{item.tDoc}-{item.nDoc}</td>
                   <td>{item.nombre}</td>
                   <td>{item.cargo}</td>
                   <td>{item.departamento}</td>
                   <td>{item.sueldo}</td>
                   <td><button type="button" value={item.id} onClick={(e) => this.redirigirFormulario(e)} className="fuenteBlanca btn btn-warning btn-sm" data-toggle="tooltip" title="Editar"><i className="fa fa-edit"> </i></button>-
                   	   <button type="button" value={item.id} onClick={(e) => this.generarPlanillaEmpleado(e)} className="fuenteBlanca btn btn-danger btn-sm" data-toggle="tooltip" title="Ficha"><i className="fa fa-file"> </i></button>
                   </td>
                 </tr>
              )}
            </tbody>
        );
        
    }
}

export default class EmpleadoListado extends Component{
    constructor(){
        super()
        
    }

    componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
     }

     redirigirFormulario(e){
        browserHistory.push('/empleadoformulario/'+e.target.value);
    }

	render(){
		return(
            <div>
    			<div className="col-lg-12">
    		              <div className="card">
    		                <div className="card-header d-flex align-items-center">
    		                  <h3><i className="fa fa-list"></i> Listado de Empleados</h3>
    		                </div>
                            <p align="left"></p>
                            <p align="center">
                                <button type="button" value="-1" onClick={this.redirigirFormulario} className="btn btn-primary btn-block btnAgregar"><i className="fa fa-plus"> </i> Agregar</button>
                            </p>
    		                <div className="card-body">
    		                	
    		                	<table id="tabla" className="tabla table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Doc. Identidad</th>
                                            <th>Nombre</th>
                                            <th>Cargo</th>
                                            <th>Departamento</th>
                                            <th>Sueldo (Bs.)</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <ContenidoLista/>
                                </table>
    		                
    		            </div>
    		      </div>
    		    </div>
            </div>
		);
	}
}