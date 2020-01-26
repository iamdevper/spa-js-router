# SPA Javascript Router
Javascript SPA router. See how to dynamically import, export components with pure javascript in browser (class, function, template). 

### Router
main.js
```js
import Router from './router.js'

// Start router
let r = new Router("./module.js");

// Add routes
r.addRoute("/", "./module.js");
r.addRoute("/page1", "./module-page1.js");
r.addRoute("/page2", "./module-page2.js");
r.addRoute("/page/{id}", "./module-page3.js");
r.addRoute("/post/{id}/image/{name}", "./module-page3.js");

// Links from external pages to this page
Router.externalLinks()
```

### Add router script
```html
<script src="/main.js" type="module"></script>
```