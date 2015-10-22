/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     18/06/2015 12:10:15                          */
/*==============================================================*/


drop table CampoFormulario;

drop table CampoFormularioDetalle;

drop table CampoFormularioMaestro;

drop table CampoListado;

drop table DetalleCombo;

drop table DetalleFormulario;

drop table FormularioDetalle;

drop table FormularioMaestro;

drop table Listado;

drop table Modulo;

drop table TipoCampo;

drop table TipoDetalleFormulario;

drop table TipoFormulario;

drop table TipoListado;

drop sequence seq_campo_formulario_id;

drop sequence seq_campo_listado;

drop sequence seq_detalle_combo;

drop sequence seq_detalle_formulario;

drop sequence seq_formulario_detalle;

drop sequence seq_formulario_maestro;

drop sequence seq_listado;

drop sequence seq_modulo;

create sequence seq_campo_formulario_id;

create sequence seq_campo_listado;

create sequence seq_detalle_combo;

create sequence seq_detalle_formulario;

create sequence seq_formulario_detalle;

create sequence seq_formulario_maestro;

create sequence seq_listado;

create sequence seq_modulo;

/*==============================================================*/
/* Table: CampoFormulario                                       */
/*==============================================================*/
create table CampoFormulario (
   iCampoFormularioId   integer              not null,
   iDetalleComboId      integer              null,
   iTipoCampoId         integer              null,
   cNombre              varchar(254)         null,
   bEsNull              boolean              null,
   cEtiqueta            varchar(254)         null,
   cNombreCampoDb       varchar(254)         null,
   bEsAutoFoco          BOOLEAN              null,
   constraint PK_CAMPOFORMULARIO primary key (iCampoFormularioId)
);

/*==============================================================*/
/* Table: CampoFormularioDetalle                                */
/*==============================================================*/
create table CampoFormularioDetalle (
   iFormularioDetalleId integer              not null,
   iCampoFormularioId   integer              not null,
   constraint PK_CAMPOFORMULARIODETALLE primary key (iFormularioDetalleId, iCampoFormularioId)
);

/*==============================================================*/
/* Table: CampoFormularioMaestro                                */
/*==============================================================*/
create table CampoFormularioMaestro (
   iCampoFormularioId   integer              not null,
   iFormularioMaestroId integer              not null,
   constraint PK_CAMPOFORMULARIOMAESTRO primary key (iCampoFormularioId, iFormularioMaestroId)
);

/*==============================================================*/
/* Table: CampoListado                                          */
/*==============================================================*/
create table CampoListado (
   iCampoListadoId      integer              not null,
   iTipoCampoId         integer              null,
   iListadoId           integer              null,
   cNombre              varchar(254)         null,
   cEtiqueta            varchar(254)         null,
   bEsFlex              BOOLEAN              null,
   bEsSubCampo          BOOLEAN              null,
   cNombreSubCampo      varchar(254)         null,
   cAnchoColumna        varchar(254)         null,
   constraint PK_CAMPOLISTADO primary key (iCampoListadoId)
);

/*==============================================================*/
/* Table: DetalleCombo                                          */
/*==============================================================*/
create table DetalleCombo (
   iDetalleComboId      integer              not null,
   cStore               varchar(254)         null,
   cIdField             varchar(254)         null,
   cDescField           varchar(254)         null,
   constraint PK_DETALLECOMBO primary key (iDetalleComboId)
);

/*==============================================================*/
/* Table: DetalleFormulario                                     */
/*==============================================================*/
create table DetalleFormulario (
   iDetalleFormularioId integer              not null,
   iFormularioMaestroId integer              null,
   iListadoId           integer              null,
   iTipoDetalleFormularioId integer              null,
   iFormularioDetalleId integer              null,
   cPrefijoXtype        varchar(254)         null,
   cNombreEntidad       varchar(254)         null,
   cRutaEntidad         varchar(254)         null,
   cClaseEntidad        varchar(254)         null,
   cDescripcion         varchar(254)         null,
   cNombreCampoFormulario varchar(254)         null,
   cEtiqueta            varchar(254)         null,
   constraint PK_DETALLEFORMULARIO primary key (iDetalleFormularioId)
);

/*==============================================================*/
/* Table: FormularioDetalle                                     */
/*==============================================================*/
create table FormularioDetalle (
   iFormularioDetalleId integer              not null,
   constraint PK_FORMULARIODETALLE primary key (iFormularioDetalleId)
);

/*==============================================================*/
/* Table: FormularioMaestro                                     */
/*==============================================================*/
create table FormularioMaestro (
   iFormularioMaestroId integer              not null,
   iModuloId            integer              null,
   iTipoFormularioId    integer              null,
   iListadoId           integer              null,
   cDescripcion         varchar(254)         null,
   cNombreEntidad       varchar(254)         not null,
   cPrefijoXtype        varchar(254)         not null,
   cNombreSecuencia     varchar(254)         not null,
   cNombreEntidadPermisos varchar(254)         null,
   constraint PK_FORMULARIOMAESTRO primary key (iFormularioMaestroId)
);

/*==============================================================*/
/* Table: Listado                                               */
/*==============================================================*/
create table Listado (
   iListadoId           integer              not null,
   iTipoListadoId       integer              null,
   constraint PK_LISTADO primary key (iListadoId)
);

/*==============================================================*/
/* Table: Modulo                                                */
/*==============================================================*/
create table Modulo (
   iModuloId            integer              not null,
   cRutaArchivos        varchar(254)         null,
   cNombre              varchar(254)         null,
   cRuta                varchar(254)         null,
   constraint PK_MODULO primary key (iModuloId)
);

/*==============================================================*/
/* Table: TipoCampo                                             */
/*==============================================================*/
create table TipoCampo (
   iTipoCampoId         integer              not null,
   cDescripcion         varchar(254)         not null,
   constraint PK_TIPOCAMPO primary key (iTipoCampoId)
);

/*==============================================================*/
/* Table: TipoDetalleFormulario                                 */
/*==============================================================*/
create table TipoDetalleFormulario (
   iTipoDetalleFormularioId integer              not null,
   cDescripcion         varchar(254)         null,
   constraint PK_TIPODETALLEFORMULARIO primary key (iTipoDetalleFormularioId)
);

/*==============================================================*/
/* Table: TipoFormulario                                        */
/*==============================================================*/
create table TipoFormulario (
   iTipoFormularioId    integer              not null,
   cDescripcion         varchar(254)         not null,
   constraint PK_TIPOFORMULARIO primary key (iTipoFormularioId)
);

/*==============================================================*/
/* Table: TipoListado                                           */
/*==============================================================*/
create table TipoListado (
   iTipoListadoId       integer              not null,
   cDescripcion         varchar(254)         null,
   constraint PK_TIPOLISTADO primary key (iTipoListadoId)
);

