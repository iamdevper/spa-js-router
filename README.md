# JsComponent
How to import, export components in pure javascript (class, function, template)

### TODO with history.js
 - Create router with routes (or components)
 ```js
 new Router({
	["/", "./page-index.js"],
	["/about", "./page-about.js"]
});
```

 - OnPopStateChange, OnHashCHange load components from router
```js
window.onpopstate = function(event) {
    console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
}

window.onhashchange = function(event) {
    console.log("OnHashCHange Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
}
```
