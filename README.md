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
<script src="/main.js" type="module"></script>
```

### Page sample
nano /components/home.js
```js
import Component from '/router/component.js'
import Event from '/router/event.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Fetch data on click!!! </h1> <p>' + location.pathname + '</p> <div id="json"></div>'

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.add("#boo-click", (item,index) => {
			fetch('https://jsonplaceholder.typicode.com/todos/10')
			.then(response => response.json())
			.then((json) => {
				console.log("Fetching ...", json);
				let d = document.getElementById('json'); // div id
				if(d) {
					let i = json;
					d.innerHTML = '<li><div>'+i.id+'</div><div>'+i.title+'</div><div>'+i.compleded+'</div></li>';
				}
			})
		}, "click");

		// Window events: hashchange, popstate, load
		let e2 = Event.addOnLoad((event) => {
			fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=20')
			.then(response => response.json())
			.then((json) => {
				console.log("Fetching ...", json);
				let d = document.getElementById('json'); // div id
				if(d) {
					let txt = '';
					json.forEach((i) => {
						txt += '<li><div>'+i.id+'</div><div>'+i.title+'</div><div>'+i.compleded+'</div></li>';
					});
					d.innerHTML = txt;
				}
			})
		}, 'popstate'); // hashchange, popstate, load (popstate - after local link click)

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