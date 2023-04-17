CREATE DATABASE PrimeraEntrega; 

CREATE TABLE employees(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    startDate DATE NOT NULL,
    salary NUMERIC(3, 2) NOT NULL
);

CREATE TABLE Tasks(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    taskCreationDate DATE NOT NULL,
    taskStartDate DATE NOT NULL,
    taskCompletionDate DATE NOT NULL,
    idEmployee SERIAL NOT NULL,
    idState SERIAL NOT NULL,
    FOREIGN KEY(idEmployee) REFERENCES Employees(id),
    FOREIGN KEY(idState) REFERENCES States(id)   
);

CREATE TABLE States(
    id SERIAL PRIMARY KEY NOT NULL,
    state TEXT NOT NULL,
    idCategory SERIAL NOT NULL,
    roads TEXT, 
    FOREIGN KEY(idCategory) REFERENCES Categorys(id)
);

CREATE TABLE Categorys(
    id SERIAL PRIMARY KEY NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO Employees (name, startdate, salary) VALUES
    ('Pepito perez', '2020-06-23', 4.000),
    ('Alberto Carraquilla', '2015-03-28', 3.500),
    ('Juan Gomez', '2021-02-15', 3.000),
    ('Valentina Laverde ', '2018-11-17', 3.800),
    ('Adolfo Londoño', '2019-10-05', 2.800),
    ('Sara Sánchez ', '2017-09-10', 3.300),
    ('Julieta Londoño', '2016-07-11', 1.500),
    ('Fernando Ponce', '2022-05-18', 3.500),
    ('Maria Quintero', '2023-01-21', 4.100),
    ('Natalia fernandez', '2019-08-20', 3.100),
    ('Laura Garcia', '2016-02-22', 2.600),
    ('Angie Mayorca', '2021-04-19', 3.000),
    ('Aleberto Rodriguez', '2022-09-30', 2.755);

    INSERT INTO Tasks (name, taskcreationdate, taskstartdate, taskcompletiondate, idEmployee, idState) VALUES
        ('Implementar seguridad', '2020-06-23', '2020-06-24', '2020-07-02', 1, 1),
        ('crear base de datos', '2015-03-28', '2015-03-29', '2015-04-05', 2, 2),
        ('Actualizar datos', '2021-02-15', '2021-02-16', '2021-03-01', 3, 3),
        ('insertar nuevos datos', '2018-11-17', '2018-11-18', '2018-11-30', 4, 4),
        ('Actualizar código', '2019-10-05', '2019-10-06', '2019-10-25', 5, 5),
        ('Capacitación usuarios', '2017-09-10', '2017-09-11', '2017-09-30', 6, 6),
        ('Generar código de actulización', '2016-07-11', '2016-07-12', '2016-07-31', 7, 7),
        ('Crear nueva tabla de datos', '2022-05-18', '2022-05-19', '2022-06-01', 8, 8),
        ('Realizar historias de usuario', '2023-01-21', '2023-01-22', '2023-02-05', 9, 9),
        ('Realizar documentación', '2019-08-20', '2019-08-21', '2019-09-01', 10, 10),
        ('Solucionar error en código', '2016-02-22', '2016-02-23', '2016-03-08', 11, 11),
        ('Solucionar error en la base de datos', '2021-04-19', '2021-04-20', '2021-05-03', 12, 12),
        ('Actualización de Front', '2021-05-03', '2021-05-17', '2021-06-01', 13, 13)
    ;
 
INSERT INTO States (state, idCategory, roads) VALUES
    ('Iniciada', 3,'1, 3, 12'),
    ('En proceso', 3,'2, 3, 12'),
    ('Aceptada', 3,'3, 2, 12'),
    ('QA', 2,'4, 5, 9'),
    ('Pruebas Usuario', 2,'5, 6, 10, 12'),
    ('Pruebas Aceptadas', 2,'6, 7, 12'),
    ('Pendiente Valoracion', 2,'7, 8, 11, 12'),
    ('Validada', 5,''),
    ('QA Erroneo', 4,'2'),
    ('Pruebas Erroneas', 4,'2'),
    ('Validacion Erronea', 4,''),
    ('Resolucion de Dudas',3 ,'2'),
    ('Teminado', 5,'5')
;

INSERT INTO Categorys (category) VALUES
    ('Emitida'),
    ('Implementada'),
    ('Desarrollo'),
    ('Errores'),
    ('Finalizada')
;

