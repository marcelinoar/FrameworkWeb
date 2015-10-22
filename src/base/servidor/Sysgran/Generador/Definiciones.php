<?
/*
todo:
	- En realidad el DetalleFormulario.NombreEntidad deber'ia ser el nombre del "campo" en la entidad maestro que contiene el array de registros relacionados y no 
	crear un campo extra en el formulario maestro con eso.
	
FormularioBase:
	- Agregue Tipo, lo saque de formulario maestro. Ahora todos los forms tienen tipo.
	- Agregue Etiqueta a detalle.
	
*/

const TLIST_WS 						= 1;	// Listado maestro
const TLIST_MEMORIA 				= 2;	// Listado Detalle

const TFORM_ABM_TABLA 				= 1;
const TFORM_ABM_MAESTRO_DETALLE 	= 2;
const TFORM_ABM_MEMORIA				= 3;

const TDET_MUCHOS_MUCHOS 			= 1;
const TDET_ENTIDAD_DEBIL 			= 2;

const TCAMPO_COMBO 					= 1;	// Combo Box
const TCAMPO_TEXTO 					= 2;	// TextField
const TCAMPO_DESCRIPCION 			= 3;	// TextArea
const TCAMPO_VENTANA_BUSC			= 4;	// Combo box preparado con la ventana de busqueda. Por ahora vamos a cargar estos campos como ComboBox y meter el cambio a mano.
const TCAMPO_NUMERICO_ENTERO		= 5;	// Textfield con validador numerico
const TCAMPO_NUMERICO_FLOTANTE		= 6;	// TextField con validador de punto flotante.
const TCAMPO_CODIGO_NUMERICO		= 7;	// TextField convalidador de codigo numerico
const TCAMPO_CHECKBOX				= 8;	// Checkbox
const TCAMPO_ID						= 9;	// Campo no visible ('id')
const TCAMPO_RELACION				= 10;	// Contiene los datos de una relacion con otro modelo.
const TCAMPO_MONTO					= 11;	// Monto de punto flotante. Se incluyen los eventos para tratar este tipo de campos y el cambio de formato.
?>