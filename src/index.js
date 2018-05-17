import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import RutaNavegacion from './componentes/ruta-navegacion/RutaNavegacion';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( <RutaNavegacion />, 
	document.getElementById('root'));
registerServiceWorker();