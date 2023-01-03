CREATE DATABASE IF NOT EXISTS preguntas_admision;

USE preguntas_admision;

CREATE TABLE preguntas (
  id VARCHAR(75) NOT NULL,
  universidad varchar(55) NOT NULL,
  año VARCHAR(4) NOT NULL ,
  periodo VARCHAR(1) NOT NULL ,
  curso VARCHAR(75) NOT NULL, 
  pregunta TEXT NOT NULL ,
  alternativa_A VARCHAR(200) NOT NULL ,
  alternativa_B VARCHAR(200) NOT NULL ,
  alternativa_C VARCHAR(200) NOT NULL ,
  alternativa_D VARCHAR(200) NOT NULL ,
  alternativa_E VARCHAR(200) NOT NULL ,
  respuesta VARCHAR(1) NOT NULL ,
  solucion VARCHAR(75) NOT NULL,
  bloque JSON NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE preguntas_admision.usuarios (
id varchar(55) NOT NULL,
email varchar(80) NOT NULL,
password varchar(80) NOT NULL,
roles JSON NOT NULL,
PRIMARY KEY(id)
);

DESCRIBE preguntas;

