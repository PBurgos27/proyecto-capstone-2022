-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2022 a las 09:32:36
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_proyec_final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `id_calificacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `comentario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `tipo_ci` varchar(50) NOT NULL,
  `descripcion_ci` varchar(250) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado_ci` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `id_usuario`, `id_solicitud`, `tipo_ci`, `descripcion_ci`, `fecha`, `hora`, `estado_ci`) VALUES
(1, 4, 1, 'Control', 'Control para receta medica', '2022-11-23', '08:30:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL,
  `foto_es` longblob DEFAULT NULL,
  `nombre_es` varchar(150) NOT NULL,
  `descripcion_es` varchar(250) NOT NULL,
  `estado_esp` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `foto_es`, `nombre_es`, `descripcion_es`, `estado_esp`) VALUES
(1, NULL, 'Neurologia', 'La neurología es la rama de la medicina que estudia el sistema nervioso y sus trastornos.​ Específicamente se ocupa de la prevención, diagnóstico, tratamiento y rehabilitación de todas las enfermedades que involucran al sistema nervioso central.', 0),
(2, NULL, 'Cardiologia', 'La cardiología es la rama de la medicina que se encarga del estudio, prevención, diagnóstico y tratamiento de las enfermedades del corazón y del sistema circulatorio. Es médica, pero no quirúrgica; los especialistas en el abordaje quirúrgico del cora', 0),
(3, NULL, 'Odontología', 'La odontología es una de las ciencias de la salud que se encarga del diagnóstico, tratamiento y prevención de las enfermedades del aparato estomatognático.', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `lunes` varchar(15) NOT NULL DEFAULT '',
  `hora_i_l` time NOT NULL,
  `hora_f_l` time NOT NULL,
  `martes` varchar(15) NOT NULL DEFAULT '',
  `hora_i_m` time NOT NULL,
  `hora_f_m` time NOT NULL,
  `miercoles` varchar(15) NOT NULL DEFAULT '',
  `hora_i_mi` time NOT NULL,
  `hora_f_mi` time NOT NULL,
  `jueves` varchar(15) NOT NULL DEFAULT '',
  `hora_i_j` time NOT NULL,
  `hora_f_j` time NOT NULL,
  `viernes` varchar(15) NOT NULL DEFAULT '',
  `hora_i_v` time NOT NULL,
  `hora_f_v` time NOT NULL,
  `sabado` varchar(15) NOT NULL DEFAULT '',
  `hora_i_s` time NOT NULL,
  `hora_f_s` time NOT NULL,
  `domingo` varchar(15) NOT NULL DEFAULT '',
  `hora_i_d` time NOT NULL,
  `hora_f_d` time NOT NULL,
  `tiempo_con` int(5) NOT NULL DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_solicitud`, `lunes`, `hora_i_l`, `hora_f_l`, `martes`, `hora_i_m`, `hora_f_m`, `miercoles`, `hora_i_mi`, `hora_f_mi`, `jueves`, `hora_i_j`, `hora_f_j`, `viernes`, `hora_i_v`, `hora_f_v`, `sabado`, `hora_i_s`, `hora_f_s`, `domingo`, `hora_i_d`, `hora_f_d`, `tiempo_con`) VALUES
(12, 1, 'true', '08:00:00', '12:00:00', 'true', '08:00:00', '12:00:00', '', '00:00:00', '00:00:00', '', '00:00:00', '00:00:00', '', '00:00:00', '00:00:00', '', '00:00:00', '00:00:00', '', '00:00:00', '00:00:00', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamacion`
--

CREATE TABLE `reclamacion` (
  `id_reclamacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `titulo_re` varchar(50) NOT NULL,
  `descripcion_re` varchar(250) NOT NULL,
  `estado_re` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reclamacion`
--

INSERT INTO `reclamacion` (`id_reclamacion`, `id_usuario`, `id_solicitud`, `titulo_re`, `descripcion_re`, `estado_re`) VALUES
(1, 1, 1, 'Mala practica', 'Realizo una mala operacion ', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id_solicitud` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `foto` longblob NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `cmp` varchar(20) NOT NULL,
  `rne` varchar(20) NOT NULL,
  `direc_consultorio` varchar(150) NOT NULL,
  `calificacion` int(2) DEFAULT NULL,
  `estado_so` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id_solicitud`, `id_usuario`, `foto`, `especialidad`, `cmp`, `rne`, `direc_consultorio`, `calificacion`, `estado_so`) VALUES
(1, 2, '', 'Neurologia', '128', '123', 'Nose', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `tipo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `dni`, `correo`, `pass`, `celular`, `tipo`) VALUES
(1, 'Leonars ', 'Villanueva', '71042037', 'leonars@hotmail.com', '$2a$08$duLvfS6aSnNN5jh7AkLGKuqaOjPc.iEUl7c3Bk18HL5kcWiXy7G1y', '901325139', 0),
(2, 'Pedro', 'Mendoza', '71042037', 'pedro@gmail.com', '$2a$08$duLvfS6aSnNN5jh7AkLGKuqaOjPc.iEUl7c3Bk18HL5kcWiXy7G1y', '901325139', 1),
(3, 'admin', 'admin', 'admin', 'admin@gmail.com', '$2a$08$duLvfS6aSnNN5jh7AkLGKuqaOjPc.iEUl7c3Bk18HL5kcWiXy7G1y', 'admin', 2),
(4, 'Brayan', 'Vasquez', '71042038', 'brayan@gmail.com', '$2a$08$uILhciorytbEeHQoWPBu8uYdVZAm4fXVdCYciEB7gake23NrbGlTi', '901325140', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id_calificacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `reclamacion`
--
ALTER TABLE `reclamacion`
  ADD PRIMARY KEY (`id_reclamacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `id_calificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `reclamacion`
--
ALTER TABLE `reclamacion`
  MODIFY `id_reclamacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`);

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`);

--
-- Filtros para la tabla `reclamacion`
--
ALTER TABLE `reclamacion`
  ADD CONSTRAINT `reclamacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `reclamacion_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`);

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
