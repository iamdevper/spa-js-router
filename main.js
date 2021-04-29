import Router from '/spa/router/router.js'

var r = new Router()

// Console logs
// r.ShowLog = true

r.addRoute("/", "/spa/home.js")
r.addRoute("/todos/list", "/spa/todo-list.js")
r.addRoute("/todo/{id}", "/spa/todo.js")
r.addRoute("/profil/{id}", "/spa/user.js")
r.addRoute("/upload", "/spa/upload.js")

r.init()