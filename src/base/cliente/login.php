<?
	require_once ("template.php");
	
	if (isset ($_SESSION['sesion'])) {
		$_SESSION['sesion']->Logout ();
	}

	if (array_key_exists ('username', $_POST) && array_key_exists ('password', $_POST)) {
		$_SESSION['sesion'] = new Sesion ();
		
		$msg_error = '';
		if ($_SESSION['sesion']->Login ($_POST['username'], $_POST['password'])) {
			header ("location:/desarrollo");
			exit ();

		} else {
			$msg_error = 'Login inválido';			
		}
	}
?>
<!DOCTYPE HTML>
<html>
<head>
<title>Plasticos del Comahue S.A.</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="stylesheet" type="text/css" href="reset.css">
<link rel="stylesheet" type="text/css" href="structure.css">
</head>

<body>
<form class="box login" action='login.php' method='post'>
	<fieldset class="boxBody">
	  <label>Nombre de Usuario</label>
	  <input type="text" tabindex="1" placeholder="Usuario" autofocus name='username' value='admin'>
	  <label><a href="#" class="rLink" tabindex="5">Olvidó su password?</a>Password</label>
	  <input type="password" tabindex="2" placeholder="Password" name='password' value='admin'>
	  <table width='100%'>
	  	<tr height='35'>
	  		<td align='center'><label><font face='arial' size='2' color='red'><? print $msg_error; ?></font></label></td>
	  	</tr>
	  </table>
	</fieldset>
	<footer>
<!-- <label><input type="checkbox" tabindex="3">Mantenerme logeado</label> -->
	  <input type="submit" class="btnLogin" value="Login" tabindex="4">
	</footer>
</form>
<footer id="main">
  <a href="http://wwww.sysgran.com.ar">(C) 2014 Sysgran S.R.L.</a>
</footer>
</body>
</html>
