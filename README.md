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
	Setup(div, data)
	{
		document.title = 'Homepage title text';

		console.log("Component params ", data);

		let m = document.querySelector(div)

		let txt = 'Hello from component!'
		// m.textContent = txt

		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and Click here! </a>'
		m.innerHTML = html

		// Add event to html
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