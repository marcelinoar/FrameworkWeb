function FiltroRangoAtributoNumerico(c,b,d,f,h,a,e,g){this.Nombre=c;this.Controller=b;this.ComboAtributo=this.Controller.getView().down("combo[name='"+d+"']");this.CampoDesde=this.Controller.getView().down("textfield[name='"+f+"']");this.CampoHasta=this.Controller.getView().down("textfield[name='"+h+"']");this.ParamAtributo=a;this.ParamDesde=e;this.ParamHasta=g;this.ValorPreseleccionado=null;this.ComboAtributo.store.load();this.AgregarParametros=function(i){if(this.ValorPreseleccionado!=null){i[this.ParamAtributo]=this.ValorPreseleccionado.id;i[this.ParamDesde]=this.ValorPreseleccionado.desde;i[this.ParamHasta]=this.ValorPreseleccionado.hasta}else{if(this.ComboAtributo.value!=null&&this.CampoDesde.value!=""&&this.CampoHasta.value!=""){i[this.ParamAtributo]=this.ComboAtributo.value;i[this.ParamDesde]=this.CampoDesde.value;i[this.ParamHasta]=this.CampoHasta.value}}},this.Limpiar=function(){this.ComboAtributo.clearValue();this.CampoDesde.setValue("");this.CampoHasta.setValue("")},this.Refrescar=function(){this.ComboAtributo.store.load()};this.PreSeleccionar=function(i){this.ValorPreseleccionado=i;this.ComboAtributo.disable();this.CampoDesde.disable();this.CampoHasta.disable()}}function FiltroCheckBox(c,b,d,a){this.Nombre=c;this.Controller=b;this.Componente=this.Controller.getView().down("checkbox[name='"+d+"']");this.NombreParam=a;this.ValorPreseleccionado=null;this.AgregarParametros=function(e){if(this.ValorPreseleccionado!=null){e[this.NombreParam]=this.ValorPreseleccionado.valor}else{if(LibGeneral.IsChecked(this.Componente)){e[this.NombreParam]=true}}},this.Limpiar=function(){this.Componente.reset()},this.Refrescar=function(){},this.PreSeleccionar=function(e){this.ValorPreseleccionado=e;this.Componente.disable()}}function FiltroCombo(d,c,e,b,a){this.Nombre=d;this.Controller=c;this.Combo=this.Controller.getView().down("combo[name='"+e+"']");this.NombreParam=b;this.ValorPreseleccionado=null;this.Combo.setStore(Ext.create(a,{autoDestroy:true}));this.Combo.store.load();this.AgregarParametros=function(f){if(this.ValorPreseleccionado!=null){f[this.NombreParam]=this.ValorPreseleccionado.id}else{if(this.Combo.value!=null){f[this.NombreParam]=this.Combo.value}}},this.Limpiar=function(){this.Combo.clearValue()},this.Refrescar=function(){this.Combo.store.load()},this.PreSeleccionar=function(f){this.ValorPreseleccionado=f;this.Combo.disable()}}function FiltroParametro(b,a){this.Nombre=b;this.NombreParam=a;this.ValorPreseleccionado=null;this.AgregarParametros=function(c){if(this.ValorPreseleccionado!=null){c[this.NombreParam]=this.ValorPreseleccionado}},this.Limpiar=function(){},this.Refrescar=function(){},this.PreSeleccionar=function(c){this.ValorPreseleccionado=c.id}}function FiltroTexto(b,a,f,e,c,d){this.Nombre=b;this.Controller=a;this.ParametroSelTipo=c;this.ParametroTexto=d;this.ComboTipo=this.Controller.getView().down("combo[name='"+f+"']");this.TbTexto=this.Controller.getView().down("textfield[name='"+e+"']");this.ValorPreseleccionado=null;this.ComboTipo.setStore(Ext.create("Ext.data.Store",{extend:"Ext.data.Store",fields:["tipo","nombre"],proxy:{type:"memory"},data:[{tipo:"emp",nombre:"Empieza"},{tipo:"con",nombre:"Contiene"},{tipo:"igu",nombre:"Igual"},{tipo:"ter",nombre:"Termina"}]}));this.AgregarParametros=function(g){if(this.ValorPreseleccionado!=null){g[this.ParametroSelTipo]=this.ValorPreseleccionado.tipo;g[this.ParametroTexto]=this.ValorPreseleccionado.texto}else{if(this.TbTexto.value!=""&&this.ComboTipo.value!=null){g[this.ParametroSelTipo]=this.ComboTipo.value;g[this.ParametroTexto]=this.TbTexto.value}}},this.Limpiar=function(){this.TbTexto.setValue("");this.ComboTipo.clearValue()},this.Refrescar=function(){},this.PreSeleccionar=function(g){this.ValorPreseleccionado=g;this.ComboTipo.disable();this.TbTexto.disable()}}function FiltroCampoBusqueda(b,a,d,c){this.Nombre=b;this.CampoBusqueda=d;this.Controller=this;this.Parametro=c;this.ValorPreseleccionado=null;this.AgregarParametros=function(e){if(this.ValorPreseleccionado!=null){e[this.Parametro]=this.ValorPreseleccionado.id}else{if(this.CampoBusqueda.itemId!=0){e[this.Parametro]=this.CampoBusqueda.itemId}}},this.Limpiar=function(){this.CampoBusqueda.Limpiar()},this.Refrescar=function(){},this.PreSeleccionar=function(e){this.ValorPreseleccionado=e;this.CampoBusqueda.Deshabilitar()}}function FiltroRangoNumerico(b,a,d,f,c,e){this.Nombre=b;this.Controller=a;this.ParametroDesde=c;this.ParametroHasta=e;this.TbDesde=this.Controller.getView().down("textfield[name='"+d+"']");this.TbHasta=this.Controller.getView().down("textfield[name='"+f+"']");this.ValorPreseleccionado=null;this.AgregarParametros=function(g){if(this.ValorPreseleccionado!=null){g[this.ParametroDesde]=this.ValorPreseleccionado.desde;g[this.ParametroHasta]=this.ValorPreseleccionado.hasta}else{if(this.TbDesde.value!=""&&this.TbHasta.value!=""){g[this.ParametroDesde]=this.TbDesde.value;g[this.ParametroHasta]=this.TbHasta.value}}},this.Limpiar=function(){this.TbDesde.setValue("");this.TbHasta.setValue("")},this.Refrescar=function(){},this.PreSeleccionar=function(g){this.ValorPreseleccionado=g;this.TbDesde.disable();this.TbHasta.disable()}}function FiltroCodigoNumerico(b,a,d,c){this.Nombre=b;this.Controller=a;this.ParametroTexto=c;this.TbTexto=this.Controller.getView().down("textfield[name='"+d+"']");this.ValorPreseleccionado=null;this.AgregarParametros=function(e){if(this.ValorPreseleccionado!=null){e[this.ParametroTexto]=this.ValorPreseleccionado.valor}else{if(this.TbTexto.value!=""){e[this.ParametroTexto]=this.TbTexto.value}}},this.Limpiar=function(){this.TbTexto.setValue("")},this.Refrescar=function(){},this.PreSeleccionar=function(e){this.ValorPreseleccionado=e;this.TbTexto.disable()}}function FiltroRangoFechas(b,a,e,c,f,d){this.Nombre=b;this.Controller=a;this.CampoDesde=this.Controller.getView().down("datefield[name='"+e+"']");this.CampoHasta=this.Controller.getView().down("datefield[name='"+c+"']");this.ParamDesde=f;this.ParamHasta=d;this.ValorPreseleccionado=null;this.AgregarParametros=function(g){if(this.ValorPreseleccionado!=null){g[this.ParamDesde]=this.ValorPreseleccionado.desde;g[this.ParamHasta]=this.ValorPreseleccionado.hasta}else{if(this.CampoDesde.getRawValue()!=""){g[this.ParamDesde]=this.CampoDesde.getRawValue()}if(this.CampoHasta.getRawValue()!=""){g[this.ParamHasta]=this.CampoHasta.getRawValue()}}},this.Limpiar=function(){this.CampoDesde.setValue("");this.CampoHasta.setValue("")},this.Refrescar=function(){},this.PreSeleccionar=function(g){this.ValorPreseleccionado=g;this.CampoDesde.disable();this.CampoHasta.disable()}};