Insert into MENUITEM (IMENUITEMID,CNOMBRE,CXTYPE,BRAIZ,BHOJA,CDESCRIPCION) values ('4','Desarrollo','','1','0',null);

-- Desarrollo
Insert into MENUITEM (IMENUITEMID,CNOMBRE,CXTYPE,BRAIZ,BHOJA,CDESCRIPCION) values ('43','Detalle Formulario','des-fdet-Listado','0','1',null);
Insert into MENUITEM (IMENUITEMID,CNOMBRE,CXTYPE,BRAIZ,BHOJA,CDESCRIPCION) values ('44','Formulario Maestro','des-fmae-Listado','0','1',null);
Insert into MENUITEM (IMENUITEMID,CNOMBRE,CXTYPE,BRAIZ,BHOJA,CDESCRIPCION) values ('45','Modulo','des-mod-Listado','0','1',null);

Insert into ARBOLMENU (IMENUITEMPADRE,IMENUITEMHIJO,INUMDEORDEN) values ('4','43','1');
Insert into ARBOLMENU (IMENUITEMPADRE,IMENUITEMHIJO,INUMDEORDEN) values ('4','44','1');
Insert into ARBOLMENU (IMENUITEMPADRE,IMENUITEMHIJO,INUMDEORDEN) values ('4','45','1');
