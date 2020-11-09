# SimpleSPA Javascript Router
JavaScript SPA Router class.

### Router
main.js
```js
import Router from '/router/router.js'

// Start router
let r = new Router("#app");

// Add routes
r.addRoute("/", "/components/home.js");
r.addRoute("/page1", "/components/page1.js");
r.addRoute("/page2", "/components/page2.js");
r.addRoute("/page/{id}", "/components/page3.js");
r.addRoute("/post/{id}/image/{name}", "/components/page3.js");

// Load external links redirects
r.init();
```

### Add router
index.html
```html
<head>
	<script src="/main.js" type="module"></script>
</head>
<body id="body">
	<div id="links">
		<a href="/">home</a>
		<a href="/page1">age</a>
		<a href="/page2">fetch data</a>
		<a href="/page/123">page/{id}</a>
		<a href="/post/123/image/Name123">post/{id}/image/{name}</a>
		<a href="https://www.pagani.com">External page link</a>
	</div>

	<div id="app">
		<h2> Loading ... </h2>
		<h4> <img src="/loader.gif"> </h4>
	</div>
</body>
```

### Page component with store class
nano /components/home.js
```js
import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Fetch data on click! </h1> <p>' + location.pathname + '</p> <div id="json"></div>'

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.add("#boo-click", (item,index) => {
			Store.FetchId(11);
		}, "click");

		// Window events: hashchange, popstate, load
		let e2 = Event.addOnLoad((event) => {
			Store.FetchAll(0,30);
		}, 'popstate'); // popstate - after local link click

		return { 'html': html, 'events': [e1], 'onload': [e2] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
```

### Nginx
```bash
server {
	...

	index index.html
	location / {
		# Get file or folder or redirect uri to index.html
		try_files $uri $uri/ /index.html;

		# Get file or folder or redirect uri to url param in index.php
		# try_files $uri $uri/ /index.php?url=$uri&$args;

		# Get file or folder or error
		# try_files $uri $uri/ =404;
	}

	...
}
```

### Apache2 .htaccess
```bash
RewriteEngine on
# RewriteBase /

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Rewrite to index.html
RewriteRule ^(.*)$ /index.html [NC,L,QSA]
# Rewrite to index.php
# RewriteRule ^(.*)$ /index.php?uri=$1 [NC,L,QSA]

DirectoryIndex index.html index.php
```