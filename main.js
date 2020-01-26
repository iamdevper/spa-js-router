import Router from './router.js'

let r = new Router("./module.js");
r.addRoute("/", "./module.js");
r.addRoute("/page1", "./module-page1.js");
r.addRoute("/page2", "./module-page2.js");
r.addRoute("/page/{id}", "./module-page2.js");
r.addRoute("/post/{id}/image/{name}", "./module-page1.js");

// Links from external pages to this page
Router.externalLinks()