const { Pool } = require("pg");
const { db } = require("../config");
const { __esModule } = require("tailwindcss/lib/public/create-plugin");

const pool = new Pool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
});

const getEmployees = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT id, name,TO_CHAR(startdate, 'YYYY-MM-DD') AS startdate, salary FROM employees;"
    );
    res.json(response.rows);
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT id, name, TO_CHAR(taskcreationdate, 'YYYY-MM-DD') AS taskcreationdate, TO_CHAR(taskstartdate, 'YYYY-MM-DD') AS taskstartdate, TO_CHAR(taskcompletiondate, 'YYYY-MM-DD') AS taskcompletiondate, idemployee, idstate  FROM tasks;"
    );
    res.json(response.rows);
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const getStates = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM states");
    res.json(response.rows);
    const statesvalidate = response.rows;
    return statesvalidate;
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM categorys");
    res.json(response.rows);
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    res.json(response.rows);
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    res.json(response.rows);
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const postEmployees = async (req, res) => {
  try {
    const { name, startdate, salary } = req.body;
    await pool.query(
      "INSERT INTO employees (name, startdate, salary) VALUES ($1, $2, $3)",
      [name, startdate, salary]
    );
    res.json({
      message: "Empleado agregado satisfactoriamente",
      body: {
        employee: { name, startdate, salary },
      },
    });
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const postTasks = async (req, res) => {
  try {
    const {
      name,
      taskcreationdate,
      taskstartdate,
      taskcompletiondate,
      idemployee,
      idstate,
    } = req.body;
    await pool.query(
      "INSERT INTO tasks (name, taskcreationdate, taskstartdate, taskcompletiondate, idemployee, idstate ) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        name,
        taskcreationdate,
        taskstartdate,
        taskcompletiondate,
        idemployee,
        idstate,
      ]
    );
    res.json({
      message: "Tarea agregada satisfactoriamente",
      body: {
        employee: {
          name,
          taskcreationdate,
          taskstartdate,
          taskcompletiondate,
          idemployee,
          idcategory,
          idstate,
        },
      },
    });
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const putEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, startdate, salary } = req.body;
    await pool.query(
      "UPDATE employees SET name = $1, startdate = $2, salary = $3  WHERE id = $4",
      [name, startdate, salary, id]
    );
    res.json({
      message: "Empleado actualizado satisfactoriamente",
      body: {
        employee: { name, startdate, salary },
      },
    });
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const putTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);

    const {
      name,
      taskcreationdate,
      taskstartdate,
      taskcompletiondate,
      idemployee,
      idstate,
    } = req.body;
    const tasks = await pool.query(
      "UPDATE tasks SET name = $1, taskcreationdate = $2, taskstartdate = $3, taskcompletiondate = $4, idemployee = $5, idstate = $6 WHERE id = $7",
      [
        name,
        taskcreationdate,
        taskstartdate,
        taskcompletiondate,
        idemployee,
        idstate,
        id,
      ]
    );
    if (!tasks) {
      res.status(404).json({ message: "Tarea no existe." });
    } else {
      response.rows.map((data) => {
        validateState(data.idstate, idstate);
        console.log(data.idstate + " &&&&&&&&&& " + idstate);
      });
      res.json({
        message: "Tarea actualizada satisfactoriamente",
        body: {
          name,
          taskcreationdate,
          taskstartdate,
          taskcompletiondate,
          idemployee,
          idstate,
        },
      });
    }
  } catch (error) {
    res.json({
      message:
        "Sucedio un " +
        error +
        ". Por favor verifique los datos. codigo de error: " +
        error.code,
    });
  }
};

const deleteEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM employees WHERE id = $1", [id]);
    res.json(`Empleado ${id} eliminado satisfactoriamente`);
  } catch (error) {
    res.json({
      message:
        "Error en la tabla: " +
        error.table +
        ". Su error es: " +
        error.detail +
        " código de error: " +
        error.code,
    });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json(`Tarea ${id} eliminada satisfactoriamente`);
  } catch (error) {
    res.json({
      message:
        "Error en la tabla: " +
        error.table +
        ". Su error es: " +
        error.detail +
        " código de error: " +
        error.code,
    });
  }
};

const validateState = async (currentState, newState) => {
  const response = await pool.query("SELECT * FROM states");
  if (
    currentState === response.rows[0].id &&
    response.rows[0].idcategory === 3
  ) {
    console.log("Iniciada");
    newState = response.rows[0].roads;
    return newState;
  }
  if (
    currentState === response.rows[1].id &&
    response.rows[1].idcategory === 3
  ) {
    console.log("En proceso");
    newState = response.rows[1].roads;
    return newState;
  }
  if (
    currentState === response.rows[2].id &&
    response.rows[2].idcategory === 3
  ) {
    console.log("Aceptada");
    newState = response.rows[2].roads;
    return newState;
  }
  if (
    currentState === response.rows[3].id &&
    response.rows[3].idcategory === 2
  ) {
    console.log("QA");
    newState = response.rows[3].roads;
    return newState;
  }
  if (
    currentState === response.rows[4].id &&
    response.rows[4].idcategory === 2
  ) {
    console.log("Pruebas Usuario");
    newState = response.rows[4].roads;
    return newState;
  }
  if (
    currentState === response.rows[5].id &&
    response.rows[5].idcategory === 2
  ) {
    console.log("Pruebas Aceptadas");
    newState = response.rows[5].roads;
    return newState;
  }
  if (
    currentState === response.rows[6].id &&
    response.rows[6].idcategory === 5
  ) {
    console.log("Pendiente Valoracion");
    newState = response.rows[6].roads;
    return newState;
  }
  if (
    currentState === response.rows[7].id &&
    response.rows[7].idcategory === 5
  ) {
    console.log("Validada");
    newState = response.rows[7].roads;
    return newState;
  }
  if (
    currentState === response.rows[8].id &&
    response.rows[8].idcategory === 4
  ) {
    console.log("QA Erroneo");
    newState = response.rows[8].roads;
    return newState;
  }
  if (
    currentState === response.rows[9].id &&
    response.rows[9].idcategory === 4
  ) {
    console.log("Pruebas Erroneas");
    newState = response.rows[9].roads;
    return newState;
  }
  if (
    currentState === response.rows[10].id &&
    response.rows[10].idcategory === 4
  ) {
    console.log("Validacion Erronea");
    return (newState = response.rows[10].roads);
  }
  if (
    currentState === response.rows[11].id &&
    response.rows[11].idcategory === 3
  ) {
    console.log("Resolucion de Dudas");
    newState = response.rows[11].roads;
    return newState;
  }
  if (
    currentState === response.rows[12].id &&
    response.rows[12].idcategory === 5
  ) {
    console.log("Teminado");
    newState = response.rows[12].roads;
    return newState;
  }
};

module.exports = {
  getEmployees,
  deleteEmployees,
  getTasks,
  deleteTasks,
  postTasks,
  postEmployees,
  putTasks,
  putEmployees,
  getEmployeesById,
  getTasksById,
  getStates,
  getCategory,
};
