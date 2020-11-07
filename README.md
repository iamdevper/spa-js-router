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

### Add router
index.html
```html
<script src="/main.js" type="module"></script>
<body>
	<div id="app">
		<h2> Loading ... </h2>
		<h4> <img src="/loader.gif"> </h4>
	</div>

	<div id="links">
		<a href="/">Home</a>
		<a href="/page1">page 1</a>
		<a href="/page2">page 2</a>
		<a href="/page/123">page/{id}</a>
		<a href="/post/123/image/Name123">post/{id}/image/{name}</a>
		<a href="https://redirect.page">External page link</a>
	</div>
</body>
```

### Page sample
```js
import Component from '/router/component.js'

class Page extends Component
{	
	Setup(div, data) 
	{		
		document.title = 'Homepage title text';
		
		console.log("Component params ", data);

		// Get app div 
		let m = document.querySelector(div)
		
		// Add text to app div
		let txt = 'Hello from component!'
		// m.textContent = txt

		// Add html to ap div
		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and Click here! </a>'
		m.innerHTML = html

		// Add event to tag
		this.addEvent("#boo-click", (item,index) => { console.log("Clicked! ", item); });

		return { html, txt }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();	
	return p.Setup(div, data);	
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

### Nginx
```bash
server {
	...
	index index.html;
	
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
