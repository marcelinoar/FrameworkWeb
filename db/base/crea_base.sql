drop table CampoFormulario cascade constraints;

drop table CampoFormularioDetalle cascade constraints;

drop table CampoFormularioMaestro cascade constraints;

drop table CampoListado cascade constraints;

drop table DetalleCombo cascade constraints;

drop table DetalleFormulario cascade constraints;

drop table FormularioDetalle cascade constraints;

drop table FormularioMaestro cascade constraints;

drop table Listado cascade constraints;

drop table Modulo cascade constraints;

drop table TipoCampo cascade constraints;

drop table TipoDetalleFormulario cascade constraints;

drop table TipoFormulario cascade constraints;

drop table TipoListado cascade constraints;

drop sequence seq_campo_formulario;

drop sequence seq_campo_listado;

drop sequence seq_detalle_combo;

drop sequence seq_detalle_formulario;

drop sequence seq_formulario_detalle;

drop sequence seq_formulario_maestro;

drop sequence seq_listado;

drop seq_detalle_combo_id;

drop sequence seq_modulo;

create sequence seq_campo_formulario;

create sequence seq_campo_listado;

create sequence seq_detalle_combo;

create sequence seq_detalle_formulario;

create sequence seq_formulario_detalle;

create sequence seq_formulario_maestro;

create sequence seq_listado;

create sequence seq_modulo;

create sequence seq_campo_formulario_id;

create sequence seq_detalle_combo_id;

/*==============================================================*/
/* Table: CampoFormulario                                     */
/*==============================================================*/
create table CampoFormulario 
(
   iCampoFormularioId integer              not null,
   iDetalleComboId    integer,
   iTipoCampoId       integer,
   cNombre            varchar(254),
   bEsNull            numeric(1),
   cEtiqueta          varchar(254),
   cNombreCampoDb     varchar(254),
   bEsAutoFoco        numeric(1),
   constraint PK_CAMPOFORMULARIO primary key (iCampoFormularioId)
);

/*==============================================================*/
/* Table: CampoFormularioDetalle                              */
/*==============================================================*/
create table CampoFormularioDetalle 
(
   iFormularioDetalleId integer              not null,
   iCampoFormularioId integer              not null,
   constraint PK_CAMPOFORMULARIODETALLE primary key (iFormularioDetalleId, iCampoFormularioId)
);

/*==============================================================*/
/* Table: CampoFormularioMaestro                              */
/*==============================================================*/
create table CampoFormularioMaestro 
(
   iCampoFormularioId integer              not null,
   iFormularioMaestroId integer              not null,
   constraint PK_CAMPOFORMULARIOMAESTRO primary key (iCampoFormularioId, iFormularioMaestroId)
);

/*==============================================================*/
/* Table: CampoListado                                        */
/*==============================================================*/
create table CampoListado 
(
   iCampoListadoId    integer              not null,
   iTipoCampoId       integer,
   iListadoId         integer,
   cNombre            varchar(254),
   cEtiqueta          varchar(254),
   bEsFlex            numeric(1),
   bEsSubCampo        numeric(1),
   cNombreSubCampo    varchar(254),
   cAnchoColumna      varchar(254),
   constraint PK_CAMPOLISTADO primary key (iCampoListadoId)
);

/*==============================================================*/
/* Table: DetalleCombo                                        */
/*==============================================================*/
create table DetalleCombo 
(
   iDetalleComboId    integer              not null,
   cStore             varchar(254),
   cIdField           varchar(254),
   cDescField         varchar(254),
   constraint PK_DETALLECOMBO primary key (iDetalleComboId)
);

/*==============================================================*/
/* Table: DetalleFormulario                                   */
/*==============================================================*/
create table DetalleFormulario 
(
   iDetalleFormularioId integer              not null,
   iFormularioMaestroId integer,
   iListadoId         integer,
   iTipoDetalleFormularioId integer,
   iFormularioDetalleId integer,
   cPrefijoXtype      varchar(254),
   cNombreEntidad     varchar(254),
   cRutaEntidad       varchar(254),
   cClaseEntidad      varchar(254),
   cDescripcion       varchar(254),
   cNombreCampoFormulario varchar(254),
   constraint PK_DETALLEFORMULARIO primary key (iDetalleFormularioId)
);

/*==============================================================*/
/* Table: FormularioDetalle                                   */
/*==============================================================*/
create table FormularioDetalle 
(
   iFormularioDetalleId integer              not null,
   constraint PK_FORMULARIODETALLE primary key (iFormularioDetalleId)
);

/*==============================================================*/
/* Table: FormularioMaestro                                   */
/*==============================================================*/
create table FormularioMaestro 
(
   iFormularioMaestroId integer              not null,
   iModuloId          integer,
   iTipoFormularioId  integer,
   iListadoId         integer,
   cDescripcion       varchar(254),
   cNombreEntidad     varchar(254)         not null,
   cPrefijoXtype      varchar(254)         not null,
   cNombreSecuencia   varchar(254)         not null,
   constraint PK_FORMULARIOMAESTRO primary key (iFormularioMaestroId)
);

/*==============================================================*/
/* Table: Listado                                             */
/*==============================================================*/
create table Listado 
(
   iListadoId         integer              not null,
   iTipoListadoId     integer,
   constraint PK_LISTADO primary key (iListadoId)
);

/*==============================================================*/
/* Table: Modulo                                              */
/*==============================================================*/
create table Modulo 
(
   iModuloId          integer              not null,
   cRutaArchivos      varchar(254),
   cNombre            varchar(254),
   cRuta              varchar(254),
   constraint PK_MODULO primary key (iModuloId)
);

/*==============================================================*/
/* Table: TipoCampo                                           */
/*==============================================================*/
create table TipoCampo 
(
   iTipoCampoId       integer              not null,
   cDescripcion       varchar(254)         not null,
   constraint PK_TIPOCAMPO primary key (iTipoCampoId)
);

/*==============================================================*/
/* Table: TipoDetalleFormulario                               */
/*==============================================================*/
create table TipoDetalleFormulario 
(
   iTipoDetalleFormularioId integer              not null,
   cDescripcion       varchar(254),
   constraint PK_TIPODETALLEFORMULARIO primary key (iTipoDetalleFormularioId)
);

/*==============================================================*/
/* Table: TipoFormulario                                      */
/*==============================================================*/
create table TipoFormulario 
(
   iTipoFormularioId  integer              not null,
   cDescripcion       varchar(254)         not null,
   constraint PK_TIPOFORMULARIO primary key (iTipoFormularioId)
);

/*==============================================================*/
/* Table: TipoListado                                         */
/*==============================================================*/
create table TipoListado 
(
   iTipoListadoId     integer              not null,
   cDescripcion       varchar(254),
   constraint PK_TIPOLISTADO primary key (iTipoListadoId)
);


INSERT INTO TipoFormulario (iTipoFormularioId, cNombre) VALUES (1, 'Formulario Tabla');
INSERT INTO TipoFormulario (iTipoFormularioId, cNombre) VALUES (2, 'ABM Maestro/Detalle');
INSERT INTO TipoFormulario (iTipoFormularioId, cNombre) VALUES (3, 'Formulario Memoria');

INSERT INTO TipoListado (iTipoListadoId, cDescripcion) VALUES (1, 'Listado Maestro');
INSERT INTO TipoListado (iTipoListadoId, cDescripcion) VALUES (2, 'Listado Detalle');

INSERT INTO TipoDetalleFormulario (iTipoDetalleFormularioId, cDescripcion) VALUES (1, 'Muchos a Muchos');
INSERT INTO TipoDetalleFormulario (iTipoDetalleFormularioId, cDescripcion) VALUES (2, 'Entidad Debil');

INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (1, 'Combo');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (2, 'Texto');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (3, 'Descripcion');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (4, 'Ventana Busqueda');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (5, 'Numerico Entero');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (6, 'Numerico Punto Flotante');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (7, 'Codigo Numerico');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (8, 'Checkbox');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (9, 'Campo Id');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (9, 'Relacion');
INSERT INTO TipoCampo (iTipoCampoId, cDescripcion) VALUES (10, 'Monto');
