import Router from '/router/router.js'

// Router object
var r = new Router()

r.AppDiv = "#app"
r.AppMainPage = "/components/home.js"
r.AppErrorPage = "/components/error/error.js"
r.ShowLog = true

// Add routes
r.addRoute("/", "/components/home.js")
r.addRoute("/page1", "/components/page1.js")
r.addRoute("/page2", "/components/page2.js")
r.addRoute("/page/{id}", "/components/page3.js")
r.addRoute("/post/{id}/image/{name}", "/components/page3.js")

// Load redirected links
r.init()