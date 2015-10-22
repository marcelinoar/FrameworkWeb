<?
	session_start ();
	if (!isset ($_SESSION['sesion'])) {
		header ("location: login.php");
		exit ();
	}
?>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
    <title>Plasticos del Comahue</title>

	<script src="lib/Formato.js"></script>
	<script src="lib/Global.js"></script>
	<script src="lib/CampoBusqueda.js"></script>
	<script src="lib/ConsultaWS.js"></script>
	<script src="lib/ModelEncoder.js"></script>
	<script src="lib/ListadoControllerBase.js"></script>
	<script src="lib/FormularioControllerBase.js"></script>
	<script src="lib/ListadoDetalleControllerBase.js"></script>
	<script src="lib/FormularioDetalleControllerBase.js"></script>

	<link rel="stylesheet" type="text/css" href="estandar.css">

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="bootstrap.js"></script>

</head>
<body></body>
</html>
