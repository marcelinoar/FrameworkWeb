/**************************************************************************************************
 * Archivo: Listado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.RegistroHistorico.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-hist-ListadoController',
    alias			: 'widget.prod-ot-hist-Listado',
	closable		: false,
	width			: '100%',

	items: [{
		height: 10
	}, {
		xtype: 'prod-ot-hist-ListadoGrilla'
	}]
});