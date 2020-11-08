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

class Page extends Component
{
	Setup(div)
	{
		// GET request params
		let id = this.queryParam('id');
		let name = this.queryParam('name');

		// Page title
		document.title = 'Homepage title text';

		// Html
		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and Click here! </a>'

		// Add event to html
		let e1 = Event.add("#boo-click", (item,index) => { console.log("Clicked! ", item, index); }, "click");
		let e2 = Event.add("#boo-click", (item,index) => { console.log("Clicked right mouse! ", item, index); }, "auxclick");

		// Return html, events
		return { 'html': html, 'events': [e1,e2] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
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