const express = require("express");
const router = express.Router();
const db = require("../../models");
const Todo = db.Todo;
const User = db.User;


// 新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// create todos
router.post("/", (req, res) => {
  const userId = req.user._id;
  const name = req.body.name;
  return Todo.create({ name, userId }) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

//edit todos
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({where:{ _id, userId }})
    .then((todo) => res.render("edit", { todo }))
    .catch((err) => console.log(err));
});

//update todos
router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const { name, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`)) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

//show detail
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id)
    .then((todo) => res.render("detail", { todo: todo.toJSON() }))
    .catch((error) => console.log(error));
});


//delete todos
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      return todo.remove();
    })
    .then(() => res.redirect(`/`)) // 完成後導回首頁
    .catch((error) => console.log(error));
});

module.exports = router;
