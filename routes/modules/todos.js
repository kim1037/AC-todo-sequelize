const express = require("express");
const router = express.Router();
const db = require("../../models");
const Todo = db.Todo;

// 新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// create todos
router.post("/", (req, res) => {
  const UserId = req.user.id;
  const name = req.body.name;
  const errors = [];
  if (!name) {
    errors.push({ message: "Name should not be empty." });
    return res.render("new", {
      errors,
      name,
    });
  }
  return Todo.create({ name, UserId }) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

//edit todos
router.get("/:id/edit", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      res.render("edit", { todo: todo.toJSON() });
    })
    .catch((err) => console.log(err));
});

//update todos
router.put("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  const { name, isDone } = req.body;
  // console.log(name.length);
  // if (name.length === 0) {
  //   console.log('測試是否有到此行')
  //   res.locals.warning_msg = "Todo should not be empty!";
  //   return res.redirect("/todos/edit");
  // } 
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      //同todo.update({name,isDone: isDone === "on"})
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`)) // 新增完成後導回首頁
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
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.destroy({ where: { id, UserId } })
    .then(() => res.redirect(`/`)) // 完成後導回首頁
    .catch((error) => console.log(error));
});

module.exports = router;
