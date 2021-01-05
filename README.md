# SimpleSPA Javascript Router
JavaScript SPA Router class.

### Router
main.js
```js
import Router from '/router/router.js'

// Show logs
let log = true;

// Start router
let r = new Router("#app", log);

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
	<div id="app">
		<h2> Loading ... </h2>
		<h4> <img src="/loader.gif"> </h4>
	</div>
</body>
```

### Page component class
nano /components/home.js
```js
import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'
import View from '/components/view/view.js'

export class Page extends Component
{
	Setup(div)
	{
		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.addDocument("#boo-click", (item,index,event) => {
			Store.FetchId(11);
		}, "click");

		let e2 = Event.addDocument(".btn", (item,index,event) => {
			alert("Path clicked: " + event.target.dataset.id);
		}, "click");

		// Window events: hashchange, popstate, load
		let e3 = Event.addWindow((event) => {
			Store.FetchAll(0,30);
		}, 'popstate'); // popstate - after local link click

		// Page title
		document.title = 'Page 2 - Load data';

		// Html content from class
		let html = View.HtmlLinks() + View.Html(location.pathname)

		return { 'html': html, 'document_events': [e1,e2], 'window_events': [e3] }
	}
}
```

### Install js spa
```sh
# Get with git
git clone https://github.com/moovspace/spa-js-router.git /var/www/html/spa.xx
# Permissions
chown -R your-user-name:www-data /var/www/html/spa.xx
chmod -R 2775 /var/www/html/spa.xx
```

### Domain local host
nano /etc/hosts
```sh
# Add to /etc/hosts file
127.0.0.1	spa.xx www.spa.xx
```

### Nginx
```bash
# Add to file
# /etc/nginx/sites-available/default
# Restart nginx
# sudo service nginx restart

server {
	listen 80;
	listen [::]:80;
	server_name spa.xx;
	root /var/www/html/spa.xx;
	index index.html

	location / {
		# Get file or folder or redirect uri to index.html
		try_files $uri $uri/ /index.html;

		# Get file or folder or redirect uri to url param in index.php
		# try_files $uri $uri/ /index.php?url=$uri&$args;
		# Get file or folder or error
		# try_files $uri $uri/ =404;
	}

	# Allow symlinks
	# disable_symlinks off;

	# File upload size
	# client_max_body_size 100M;

	# Tls redirect
	# return 301 https://$host$request_uri;
	# return 301 https://spa.xx$request_uri;
}
```

### Run from browser
```sh
http://spa.xx
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
DirectoryIndex index.html
```