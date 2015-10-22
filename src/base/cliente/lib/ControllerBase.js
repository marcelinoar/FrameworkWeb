/***************************************************************************************************
 *
 * Archivo: ControllerBase.js
 * ------------------------------------------------------------------------------------------------
 *
 * Autor: Marcelino Morales
 *
 * Version: 1.0
 *
 * Descripcion: Es la entidad de mas alto nivel en la jerarquia de Formularios y Listados Controller.
 * 				Contiene los metodos comunes a todas esas clases.
 *
 ***************************************************************************************************/

 var ControllerBase = {
 	/**
 	 *
 	 * Agrega al controller pasado por parametro los metodos de esta clase
 	 *
 	 * @param	controller	Controller de un formulario o Listado, u otra entidad de mas alto nivel.
 	 *
 	 */

 	InyectarDependencia: function (controller) {
 		controller.tbChangeToUpperCase 			= this.tbChangeToUpperCase;
 		controller.FormatearCampoDinero			= this.FormatearCampoDinero;
 		controller.FormatearCampoPuntoFlotante	= this.FormatearCampoPuntoFlotante;
 	},

 	//---------- Metodos exportables ----------

	//
	// Pasa a mayusculas el contenido de un textfield a medida que se escribe.
	//
	tbChangeToUpperCase: function(field, newValue, oldValue){
		field.setValue(newValue.toUpperCase());
	},

	//
	// Se asocia al evento onBlur del textfield y al ejecutarse formatea el valor
	// del campo.
	//
    FormatearCampoDinero: function (ctl) {
    	ctl.setValue (Formato.Dinero.Transformar (ctl.getValue ()));
    },

	//
	// Se asocia al evento onBlur del textfield y al ejecutarse formatea el valor
	// del campo.
	//
    FormatearCampoPuntoFlotante: function (ctl) {
    	if (ctl.getValue () == '') {
    		ctl.setValue (Formato.PuntoFlotante.Transformar (0));

    	} else {
    		ctl.setValue (Formato.PuntoFlotante.Transformar (ctl.getValue ()));
    	}
    }
};
