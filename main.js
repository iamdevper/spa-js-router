import Router from '/router/router.js'

var r = new Router()
// r.ShowLog = true

r.addRoute("/", "/app/home.js")
r.addRoute("/todos/list", "/app/todo-list.js")
r.addRoute("/todo/{id}", "/app/todo.js")
r.addRoute("/profil/{id}", "/app/user.js")

r.init()