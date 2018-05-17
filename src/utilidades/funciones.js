//------------- Validadores ----------------------//
export function validarEntradaCampos(evento,patron) {
			  var k; 
			  k=document.all?parseInt(evento.keyCode): parseInt(evento.which); 
			  return (patron.indexOf(String.fromCharCode(k))!=-1); 
}

export function validarFormatoLogin(valor){
	let patron = /^[\w\.\_\-]+$/;
	return (patron.test(valor));
}

export function validarEnteroMayorQueCero(valor){
	var cadena = valor.toString();
	return (!(isNaN(valor) || cadena.indexOf('.')!=-1));
}

export function validarEntradaDecimales(evento){
	evento = evento || window.event;
    var caracterAscii = evento.keyCode || evento.which;
    var primero = (caracterAscii <= 57 && caracterAscii >= 48);
    var elemento = evento.srcElement || evento.target;
    return primero || (elemento.value.indexOf('.') == -1 ? caracterAscii == 46 : false);
}

//----------------- Bloqueo de Botón Primario (Guardar)-------------------//
export function bloquearBotonPrimario(formulario){
	for (var item in formulario){
		if (formulario[item]==="")
			return true;
	}
	return false;
}

//-------------------- Preparación de un formulario de datos para enviarlo al backend (php)----//
export function formularioDatos(objeto){
   let datos = new FormData();
	for (var item in objeto)
		datos.append(item,objeto[item].toString());
	return datos;
}

//--------------------- Consulta a la base de datos ------------------------------------------
export function consultaBaseDeDatos(rutaArchivoPhp, parametros) {
 	return new Promise((resolve, reject) =>{
		fetch(rutaArchivoPhp+'.php', {
		method: 'POST',
		body: formularioDatos(parametros)
		})
		.then((respuesta) => respuesta.json())
		.then((res) => {
		 resolve(res);
		})
		.catch((error) => {
		 reject(error);
		});
	});
}

//----------------------- Vrificar logueo -------------------//
export function logueado(){
	return !(localStorage.getItem("Usuario")===null);
}


//-------------------- Gestión de localStorages --------------//
export function cargarLocalStorages(nombre,login,perfil){
	localStorage.setItem("Nombre",nombre);
	localStorage.setItem("Usuario",login);
	localStorage.setItem("Perfil",perfil);
}

export function removerLocalStorages(){
	 localStorage.removeItem("Nombre");
	 localStorage.removeItem("Usuario");
	 localStorage.removeItem("Perfil");
}
//----------------------- Filtrado de arreglos JSON --------------------------//
export function filtrarArreglo(arreglo:any[],campo: string,valor: string) {
    return arreglo.filter(filtro => filtro[campo] === valor);
 }