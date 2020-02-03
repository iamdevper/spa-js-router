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
