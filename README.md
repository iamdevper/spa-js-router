# SPA Javascript Router
Javascript SPA router. See how to dynamically import, export components with pure javascript in browser (class, function, template). 

### Router
main.js
```js
import Router from '/router/router.js'

// Start router
let r = new Router("/components/home.js");

// Add routes
r.addRoute("/", "/components/home.js");
r.addRoute("/page1", "/components/page1.js");
r.addRoute("/page2", "/components/page2.js");
r.addRoute("/page/{id}", "/components/page3.js");
r.addRoute("/post/{id}/image/{name}", "/components/page3.js");

// Load external links redirects
Router.Init()
```

### Add router script
index.html
```html
<script src="/main.js" type="module"></script>
```