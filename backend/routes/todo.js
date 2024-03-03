const express = require("express");
const {
  requireSignIn,
  CreateTodo,
  GetTodos,
  GetUserTodos,
  DeleteUserTodos,
  UpdateUserTodos,
} = require("../controllers/todo");

const router = express.Router();

// Create TODO || POST
router.post("/create-todo", requireSignIn, CreateTodo);
// GET ALL TODOS || GET
router.get("/get-all-todo", GetTodos);
// GET USER TODOS || GET
router.get("/get-user-todo", requireSignIn, GetUserTodos);
//DELETE USER TODO || DELETE
router.delete("/delete-user-todo/:id", requireSignIn, DeleteUserTodos);
//UPDATE USER TODO || PUT
router.put("/update-user-todo/:id", requireSignIn, UpdateUserTodos);
module.exports = router;
