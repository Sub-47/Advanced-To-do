const express = require("express");
const app = express();
const cors = require("cors");

const port = 5001;
const pool = require("./db");

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
//----------ROUTES----------//
//create  atodo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );

    res.json('Todo was updated');
  } catch (error) {
    console.log(error.message);
  }
});
//delete a todo
app.delete('/todos/:id' ,async (req,res)=>{
    try {
        const {id}=req.params;
        const deleteTodo= await pool.query('DELETE FROM todo WHERE todo_id=$1',[id])
        res.json('todo was deleted')
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(port, () => {
  console.log(`server has started on ${port}`);
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});