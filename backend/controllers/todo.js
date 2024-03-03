require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const Todo = require("../models/todo");
// middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Provide all the fields",
      });
    }
    const todo = await Todo({
      title,
      description,
      postedBy: req.auth._id, //We will get the id of user in auth object by its token as we pass requireSignIn so due to it
    }).save();

    res.status(200).send({
      success: true,
      message: "Todo created successfully",
      todo,
    });
    console.log(req.auth, "req.auth");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating a todo",
      error,
    });
    console.log(error);
  }
};
const GetTodos = async (req, res) => {
  try {
    // const todos = await Todo.find().populate("postedBy","_id name").sort({createAt:-1});
    const todos = await Todo.find()
      .populate("postedBy", "_id name email role")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Get all the todos successfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all the todos",
    });
  }
};
const GetUserTodos = async (req, res) => {
  try {
    const userTodos = await Todo.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "User todos get successfully",
      userTodos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something wents wrong while getting user todos",
      error,
    });
  }
};
const DeleteUserTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Todo.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "User Todo deleted successfulyy",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while deleting the todo",
      error,
    });
  }
};
const UpdateUserTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findById({ _id: req.params.id });
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Provide atleast one field",
      });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || todo?.title,
        description: description || todo?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating the todo",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  CreateTodo,
  GetTodos,
  GetUserTodos,
  DeleteUserTodos,
  UpdateUserTodos,
};
