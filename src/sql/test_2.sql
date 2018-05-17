-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2018 a las 16:21:00
-- Versión del servidor: 5.7.17-log
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_2`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_cargoAgregarEditar` (IN `_id` INT, IN `_id_depto` INT, IN `_codigo` VARCHAR(3), IN `_nombre` VARCHAR(60), IN `_sueldo` DOUBLE)  BEGIN
	IF _id=-1 THEN
    	INSERT INTO cargo (id_depto,codigo,nombre,sueldo) VALUES (_id_depto,_codigo,_nombre,_sueldo);
    ELSE
    	UPDATE cargo SET id_depto=_id_depto,nombre=_nombre,sueldo=_sueldo WHERE id=_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_cargoBuscarPorId` (IN `_id` INT)  BEGIN
	SELECT c.id,c.codigo,c.id_depto,c.nombre,c.sueldo,d.nombre AS depto FROM cargo c INNER JOIN departamento d ON c.id_depto=d.id WHERE c.id=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_cargoDuplicadoNombre` (IN `_id` INT, IN `_id_depto` INT, IN `_nombre` VARCHAR(60))  BEGIN
	IF _id=-1 THEN
    	SELECT * FROM cargo WHERE id_depto=_id_depto AND nombre=_nombre;
    ELSE
    	SELECT * FROM cargo WHERE id_depto=_id_depto AND nombre=_nombre AND id<>_id;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_cargoListado` ()  BEGIN
	SELECT c.id,c.id_depto,c.codigo,c.nombre,c.sueldo,d.nombre AS depto FROM cargo c INNER JOIN departamento d ON c.id_depto=d.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_cargoMaximoId` ()  BEGIN
	SELECT MAX(id) AS id FROM cargo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_departamentoAgregarEditar` (IN `_id` INT, IN `_codigo` VARCHAR(3), IN `_nombre` VARCHAR(60))  BEGIN
	IF _id=-1 THEN
    	INSERT INTO departamento (codigo,nombre) VALUES (_codigo,_nombre);
    ELSE
    	UPDATE departamento SET nombre=_nombre WHERE id=_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_departamentoBuscarPorId` (IN `_id` INT)  NO SQL
BEGIN
	SELECT * FROM departamento WHERE id=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_departamentoDuplicadoNombre` (IN `_id` INT, IN `_nombre` VARCHAR(60))  BEGIN
	IF _id=-1 THEN
    	SELECT * FROM departamento WHERE nombre=_nombre;
    ELSE
    	SELECT * FROM departamento WHERE id<>_id AND nombre=_nombre;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_departamentoListado` ()  BEGIN
	SELECT * FROM departamento ORDER BY id DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_departamentoMaximoId` ()  NO SQL
BEGIN
	select MAX(id) as id FROM departamento; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoAgregarEditar` (IN `_id` INT, IN `_id_cargo` INT, IN `_tdoc` VARCHAR(1), IN `_ndoc` VARCHAR(20), IN `_nombre` VARCHAR(60), IN `_apellido` VARCHAR(60), IN `_fnac` VARCHAR(12), IN `_lugar_nac` VARCHAR(250), IN `_direccion` VARCHAR(250), IN `_telefono` VARCHAR(20), IN `_hijos` VARCHAR(2), IN `_n_hijos` INT(2), IN `_talla_camisa` VARCHAR(3), IN `_talla_pantalon` INT(2), IN `_talla_zapato` INT(2), IN `_estatura` DOUBLE, IN `_activo` INT, IN `_sexo` VARCHAR(1))  BEGIN
	IF _id=-1 THEN
    	INSERT INTO empleado (id_cargo,tdoc,ndoc,nombre,apellido,fnac,lugar_nac,direccion,telefono,hijos,n_hijos,talla_camisa,talla_zapato,talla_pantalon,estatura,activo,sexo) VALUES (_id_cargo,_tdoc,_ndoc,_nombre,_apellido,_fnac,_lugar_nac,_direccion,_telefono,_hijos,_n_hijos,_talla_camisa,_talla_zapato,_talla_pantalon,_estatura,_activo,_sexo);
        ELSE
        	UPDATE empleado SET id_cargo=_id_cargo,tdoc=_tdoc,ndoc=_ndoc,nombre=_nombre,apellido=_apellido,fnac=_fnac,lugar_nac=_lugar_nac,direccion=_direccion,telefono=_telefono,hijos=_hijos,n_hijos=_n_hijos,talla_camisa=_talla_camisa,talla_zapato=_talla_zapato,talla_pantalon=_talla_pantalon,estatura=_estatura,activo=_activo,sexo=_sexo WHERE id=_id;
            END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoBuscarPorId` (IN `_id` INT)  NO SQL
BEGIN
	SELECT 	e.id,e.id_cargo,d.id AS id_depto,e.tdoc,e.ndoc,e.nombre,e.apellido,e.fnac,e.lugar_nac,e.sexo,e.direccion,e.telefono,e.hijos,e.n_hijos,e.talla_camisa,e.talla_zapato,e.talla_pantalon,e.estatura,e.activo FROM empleado e INNER JOIN cargo c ON e.id_cargo=c.id INNER JOIN departamento d ON c.id_depto=d.id  WHERE e.id=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoDuplicadoDocumentoIdentidad` (IN `_id` INT, IN `_tdoc` VARCHAR(1), IN `_ndoc` VARCHAR(20))  BEGIN
	IF _id=-1 THEN
    	SELECT * FROM empleado WHERE tdoc=_tdoc and ndoc=_ndoc;
    ELSE
    	SELECT * FROM empleado WHERE tdoc=_tdoc and ndoc=_ndoc and id<>_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoListado` ()  BEGIN
	SELECT e.id, e.tdoc, e.ndoc, e.nombre, e.apellido, c.nombre as nombrecargo, d.nombre as nombredepto, c.sueldo FROM empleado e INNER JOIN cargo c ON e.id_cargo=c.id INNER JOIN departamento d ON c.id_depto=d.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoMaximoId` ()  BEGIN
	SELECT MAX(id) as id FROM empleado;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_empleadoReporteBuscarPorId` (IN `_id` INT)  NO SQL
BEGIN
	SELECT e.id, e.tdoc, e.ndoc, e.nombre, e.apellido, e.fnac, e.lugar_nac, e.sexo,e.direccion, e.telefono, e.hijos,e.n_hijos, e.talla_camisa, e.talla_zapato, e.talla_pantalon, e.estatura, e.activo, c.nombre as nombrecargo, d.nombre as nombredepto, c.sueldo FROM empleado e INNER JOIN cargo c ON e.id_cargo=c.id INNER JOIN departamento d ON c.id_depto=d.id WHERE e.id=_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_loginBuscarUsuario` (IN `_login` VARCHAR(30), IN `_clave` VARCHAR(30))  BEGIN
	SELECT * FROM usuario WHERE  login=_login and clave=_clave;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_loginUsuarioInactivo` (IN `_login` VARCHAR(30), IN `_clave` VARCHAR(30))  BEGIN
	SELECT * FROM usuario WHERE  login=_login and clave=_clave and activo=0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_recuperarContrasenaBuscarUsuarioPorLogin` (IN `_login` VARCHAR(30))  BEGIN
	SELECT pregunta,nombre,apellido from usuario WHERE login=_login;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_recuperarContrasenaCambiarClave` (IN `_login` VARCHAR(30), IN `_clave` VARCHAR(30))  NO SQL
BEGIN
	UPDATE usuario SET clave=_clave WHERE login=_login;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_recuperarContrasenaVerificarRespuesta` (IN `_login` VARCHAR(30), IN `_respuesta` VARCHAR(30))  BEGIN
	SELECT * FROM usuario WHERE login=_login AND respuesta=_respuesta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_usuarioAgregarEditar` (IN `_id` INT, IN `_tdoc` VARCHAR(1), IN `_ndoc` VARCHAR(20), IN `_nombre` VARCHAR(60), IN `_apellido` VARCHAR(60), IN `_login` VARCHAR(30), IN `_clave` VARCHAR(30), IN `_pregunta` VARCHAR(25), IN `_respuesta` VARCHAR(30), IN `_perfil` VARCHAR(15), IN `_activo` INT, IN `_direccion` VARCHAR(300), IN `_telefono` VARCHAR(25))  BEGIN
	IF _id=-1 THEN
    	INSERT INTO usuario(tdoc,ndoc,nombre,apellido,login,clave,pregunta,respuesta,perfil,activo,direccion,telefono) VALUES (_tdoc,_ndoc,_nombre,_apellido,_login,_clave,_pregunta,_respuesta,_perfil,_activo,_direccion,_telefono);
    ELSE
        UPDATE usuario SET tdoc=_tdoc,ndoc=_ndoc,nombre=_nombre,apellido=_apellido,login=_login,clave=_clave,pregunta=_pregunta,respuesta=_respuesta,perfil=_perfil,activo=_activo,direccion=_direccion,telefono=_telefono WHERE id=_id;                    
    END IF;
                 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_usuarioBuscarPorId` (IN `_id` INT)  BEGIN
	SELECT * FROM usuario WHERE id=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_usuarioDuplicadoDocumentoIdentidad` (IN `_id` INT, IN `_tdoc` VARCHAR(1), IN `_ndoc` VARCHAR(20))  BEGIN
	IF _id=-1 THEN
    	SELECT * FROM usuario WHERE tdoc=_tdoc and ndoc=_ndoc;
    ELSE
    	SELECT * FROM usuario WHERE tdoc=_tdoc and ndoc=_ndoc and id<>_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_usuarioDuplicadoLogin` (IN `_id` INT, IN `_login` VARCHAR(30))  NO SQL
BEGIN
	IF _id=-1 THEN
    	SELECT * FROM usuario WHERE login=_login;
    ELSE
        SELECT * FROM usuario WHERE login=_login AND id<>_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_usuarioListado` ()  BEGIN
	SELECT * FROM usuario ORDER BY id DESC;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id` int(11) NOT NULL,
  `id_depto` int(11) NOT NULL,
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `sueldo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id`, `id_depto`, `codigo`, `nombre`, `sueldo`) VALUES
(1, 1, '001', 'GERENTE', 800000),
(2, 3, '002', 'GERENTE', 950000),
(3, 7, '003', 'GERENTE', 900000),
(4, 7, '004', 'COORD DE SISTEMAS', 750000),
(5, 7, '005', 'ANALISTA DE SISTEMAS I', 600000),
(6, 7, '006', 'ANALISTA DE SISTEMAS II', 500000),
(7, 7, '007', 'ANALISTA DE SISTEMAS III', 450000),
(8, 8, '008', 'COORD CUENTAS POR PAGAR', 800000),
(9, 8, '009', 'GERENTE', 1000000),
(10, 9, '010', 'GERENTE', 9000000),
(11, 6, '011', 'GERENTE', 1000000),
(12, 12, '012', 'GERENTE', 1100000),
(13, -1, '013', 'GERENTE', 1200000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `codigo`, `nombre`) VALUES
(1, '001', 'MANTENIMIENTO'),
(2, '002', 'AMA DE LLAVES'),
(3, '003', 'RECURSOS HUMANOS'),
(5, '004', 'SEGURIDAD'),
(6, '006', 'ANIMACION'),
(7, '007', 'SISTEMAS'),
(8, '008', 'ADMINISTRACION'),
(9, '009', 'OPERACIONES'),
(12, '010', 'ATENCION AL PUBLICO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `tdoc` varchar(1) NOT NULL,
  `ndoc` varchar(15) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `fnac` varchar(12) NOT NULL,
  `lugar_nac` varchar(300) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `hijos` varchar(2) NOT NULL,
  `n_hijos` int(11) NOT NULL,
  `talla_camisa` varchar(3) NOT NULL,
  `talla_zapato` int(2) NOT NULL,
  `talla_pantalon` int(2) NOT NULL,
  `estatura` double NOT NULL,
  `activo` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id`, `id_cargo`, `tdoc`, `ndoc`, `nombre`, `apellido`, `fnac`, `lugar_nac`, `sexo`, `direccion`, `telefono`, `hijos`, `n_hijos`, `talla_camisa`, `talla_zapato`, `talla_pantalon`, `estatura`, `activo`) VALUES
(1, 3, 'V', '17000000', 'JORGE LUIS', 'GUEVARA MARCANO', '1980-06-11', 'CUIDAD PIAR', 'M', 'EL VALLE DEL ESPIRITU SANTO', '0412-0000001', 'NO', 0, 'M', 39, 32, 1.7, '1'),
(2, 8, 'V', '17000001', 'ZUTANO', 'DE TAL', '1977-07-23', 'SAN JUAN', 'M', 'FUENTIDEñO', '0426-8888888', 'NO', 0, 'M', 39, 30, 1.73, '1'),
(3, 8, 'V', '17000002', 'LAURA', 'MACHADO', '1977-08-05', 'SANTA ELENA', 'F', 'AV PRINCIPAL', '0286-1111111', 'NO', 0, 'S', 37, 28, 1.66, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `tdoc` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ndoc` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clave` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pregunta` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `perfil` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` int(1) NOT NULL DEFAULT '1',
  `direccion` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `tdoc`, `ndoc`, `nombre`, `apellido`, `login`, `clave`, `pregunta`, `respuesta`, `perfil`, `activo`, `direccion`, `telefono`) VALUES
(1, 'V', '11000000', 'JUAN JOSE', 'SALAZAR CEDEÑO', 'JSALAZAR', '123456', 'NOMBRE DE MASCOTA', 'yeyo', 'ADMINISTRADOR', 1, 'JUAN GRIEGO', '0416-1111111'),
(2, 'V', '11000001', 'ELSA', 'CAPUNTA', 'ECAPUNTA', '123456', 'CANCION FAVORITA', 'piensa en mi', 'ADMINISTRADOR', 1, 'LA ASUNCION', '0412-0000000'),
(3, 'V', '11000002', 'VICENTE', 'LEVI DENTE', 'VLDENTE', '123456', 'COMIDA FAVORITA', 'pizza', 'ADMINISTRADOR', 1, 'PUNTA DE PIEDRAS', '0142-000002'),
(4, 'V', '11000003', 'RICKZABETH MARIANA', 'GONZALEZ BERMUDEZ', 'RGONZALEZ', '123456', 'ARTISTA FAVORITO', 'pipe bueno', 'ADMINISTRADOR', 1, 'LOS MILLANES', '0416-5555555'),
(5, 'V', '11000004', 'ANA LISA', 'MELCOCO', 'AMELCOCO', '123456', 'ARTISTA FAVORITO', 'maluma', 'ADMINISTRADOR', 1, 'LA SALINA', '0426-0000008'),
(6, 'V', '11000005', 'RUBEN', 'MARIN', 'RMARIN', '123456', 'ARTISTA FAVORITO', 'antonio aguilar', 'ADMINISTRADOR', 1, 'porlamar', '0424-000006'),
(11, 'V', '11000006', 'CARLA', 'MAESTRE', 'CMAESTRE', '123', 'ARTISTA FAVORITO', 'Array', 'OPERADOR', 1, 'BOCA DE RIO', '0416-1111111'),
(12, 'V', '11000009', 'BRIAN', 'PALMA', 'BPALMA', '1234', 'COMIDA FAVORITA', 'pizza', 'OPERADOR', 1, 'PUERTO LA CRUZ', '0426-1000000'),
(14, 'V', '11000010', 'MARIEL', 'TAVAREZ', 'MTAVAREZ', '123456', 'COLOR FAVORITO', 'verde', 'OPERADOR', 0, 'BARQUISIMETO', '0414-1116655'),
(15, 'V', '11000011', 'SORANGEL ALEJANDRA', 'GOMEZ LUGO', 'SGOMEZ', '654321', 'MASCOTA', 'floki', 'OPERADOR', 1, 'SAN ANTONIO', '0424-8888887'),
(16, 'V', '11000012', 'MIGUEL', 'BELLO', 'MBELLO', '112233', 'CANCION FAVORITA', 'felices los 4', 'ADMINISTRADOR', 1, 'EL SACO', '0426-9999999'),
(17, 'V', '11000020', 'CARLOS', 'MARICHAL', 'CMARICHAL', '123456', 'COLOR FAVORITO', 'verde', 'OPERADOR', 1, 'PAMPATAR', '0412-8889977'),
(18, 'V', '11000007', 'MILGRED', 'PEROTTI', 'MPEROTTI', '12345678', 'COLOR FAVORITO', 'violeta', 'ADMINISTRADOR', 1, 'PILAR', '549999999'),
(19, 'V', '11000008', 'MARCO', 'POLO', 'MPOLO', '12345678', 'COMIDA FAVORITA', 'pasticho', 'ADMINISTRADOR', 1, 'CARACAS', '0212-9999999'),
(20, 'V', '11000013', 'DIEGO', 'MARTINO', 'DMARTINO', '87654321', 'NOMBRE DE MASCOTA', 'yuyi', 'OPERADOR', 1, 'MARACAIBO', '0281-2222222'),
(21, 'V', '11000014', 'RONNY', 'ESPINOZA', 'RESPINOZA', '11223344', 'CANCION FAVORITA', 'el termo', 'OPERADOR', 1, 'LA PICA', '0258-7777777');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
