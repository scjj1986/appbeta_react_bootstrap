import React, {Component} from 'react';
import '../../css/estilos.css';
import {consultaBaseDeDatos,logueado} from '../../utilidades/funciones';
import {rutaPhpCargo} from '../../utilidades/constantes';
import { browserHistory } from 'react-router';

class ContenidoLista extends Component{

    constructor(){
        super()
        this.state = {
            listado:[]
        }
        this.redirigirFormulario = this.redirigirFormulario.bind(this);
    }

    //------Recopilación del listado al cargar el componente-------------------------//
    componentWillMount() {
        consultaBaseDeDatos(rutaPhpCargo+'cargo_listado',null).then((result) => {
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
        browserHistory.push('/cargoformulario/'+e.target.value);
    }

     render(){
        return (
            <tbody>
            {this.state.listado.map((item) =>
                <tr>
                   <td>{item.codigo}</td>
                   <td>{item.nombre}</td>
                   <td>{item.departamento}</td>
                   <td>{item.sueldo}</td>
                   <td><button type="button" value={item.id} onClick={this.redirigirFormulario} className="fuenteBlanca btn btn-warning"><i className="fa fa-edit"> </i> Editar</button></td>
                 </tr>
              )}
            </tbody>
        );
        
    }
}

export default class CargoListado extends Component{

    constructor(){
        super()
        
    }

    componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
     }

     redirigirFormulario(e){
        browserHistory.push('/cargoformulario/'+e.target.value);
    }

	render(){
		return(
            <div>
    			<div className="col-lg-12">
    		              <div className="card">
    		                <div className="card-header d-flex align-items-center">
    		                  <h3><i className="fa fa-list"></i> Listado de Cargos</h3>
    		                </div>
                            <p align="left"></p>
                            <p align="center">
                                <button type="button" value="-1" onClick={this.redirigirFormulario} className="btn btn-primary btn-block btnAgregar"><i className="fa fa-plus"> </i> Agregar</button>
                            </p>
    		                <div className="card-body">
    		                <p>
    		                	
    		                	<table id="tabla" className="tabla table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Departamento</th>
                                            <th>Sueldo (Bs.)</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <ContenidoLista/>
                                </table>
    		                </p>
    		            </div>
    		      </div>
    		    </div>
            </div>
		);
	}
}