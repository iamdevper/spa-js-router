import Event from '/router/event.js'

// Globals
var Routes = [];
var AppDiv = '#app';
var AppMainPage = '';
var AppErrorPage = '';

export default class Router
{
	constructor(div = '#app', main = "/components/home.js", error = "/components/error/error.js")
	{
		AppDiv = div;
		AppMainPage = main;
		AppErrorPage = error;

		this.addOnState();
		this.addOnLoad();

		// Load homepage
		// this.loadPage(AppDiv, AppMainPage);
	}

	static getInstance()
	{
		if (!instance) { var instance = Router.prototype.constructor(); }
		return instance;
	}

	addRoute(route, file)
	{
		if(route === "") { route = "/"; }
		Routes.push({ route, file });
	}

	init()
	{
		console.log("Init ...");
		Router.importComponent(AppDiv, AppMainPage, Routes)
	}

	loadPage(div, file)
	{
		import(file).then(module => {
			let obj = module.LoadComponent(div);
			console.log("Load page: ", obj);
			let m = document.querySelector(div)
			if(m) {
				m.innerHTML = obj.html // Add html
			}
			if(obj.events) {
				obj.events.forEach((i) => {
					Event.run(i.id, i.cb, i.type, i.prevent, i.stop); // Run events
				});
			}
			if(obj.onload) {
				obj.onload.forEach((i) => {
					Event.runOnLoad(i.cb, i.type);
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	static loadPage404(div, file)
	{
		console.log("Loading Error 404" , file)
		import(file).then(module => {
			let obj = module.LoadComponent(div);
			console.log("Error page: ", obj);
			let m = document.querySelector(div)
			if(m) {
				m.innerHTML = obj.html // Add html
			}
			if(obj.events) {
				obj.events.forEach((i) => {
					Event.run(i.id, i.cb, i.type, i.prevent, i.stop); // Run events
				});
			}
			if(obj.onload) {
				obj.onload.forEach((i) => {
					Event.runOnLoad(i.cb, i.type);
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	// History state
	addOnState()
	{
		window.onpopstate = function(event) {
			// console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
			console.log("OnPopState Load Component: ", document.location.pathname)
			Router.importComponent(AppDiv, AppMainPage, Routes)
		}
	}

	// Pages links
	addOnLoad()
	{
		// window.onload = function(){ /* ... */ }
		window.addEventListener('DOMContentLoaded', () => {
			console.log('OnLoad history urls');
			// History popstate for a href urls
			var List = document.querySelectorAll("a")
			List.forEach(function(item) {
				var h = item.href.replace(location.protocol+'//'+location.host, ""); // delete protocol//host
				if(h.indexOf("http://") == 0 || h.indexOf("https://") == 0 || h.indexOf("//") == 0) {
					console.log("External link ", item.href);
					item.setAttribute('target', '_blank');
				} else {
					item.addEventListener('click', function(e) {
						e.preventDefault()
						window.history.pushState({page: item.href}, "Title "+item.href, item.href)
						var popStateEvent = new PopStateEvent('popstate', { state: history.state })
						dispatchEvent(popStateEvent)
						console.log('Item history ', history.state)
					}, false)
				}
			})
		}, false);
	}

	// Load page component
	static async importComponent(div, file, routes = [])
	{
		let ShowError = true;

		for(let item of routes)
		{
			if(this.testSlug(item.route, location.pathname))
			{
				console.log("Route: ", item.route, item.file, location.pathname, ShowError)

				file = item.file;
				await import(file).then(module => {
					let obj = module.LoadComponent(div);
					console.log("Page component: ", obj);
					let m = document.querySelector(div)
					if(m) {
						m.innerHTML = obj.html
					}
					if(obj.events) {
						obj.events.forEach((i) => {
							Event.run(i.id, i.cb, i.type, i.prevent, i.stop);
						});
					}
					if(obj.onload) {
						obj.onload.forEach((i) => {
							Event.runOnLoad(i.cb, i.type);
						});
					}
					ShowError = false
					console.log("Show error:", ShowError);
					return;
				}).catch((err) => {
					console.log("Page import error: ", err);
				}); // Promise import
			}
		}

		if(ShowError)
		{
			console.log("Show error:", ShowError);
			Router.loadPage404(AppDiv, AppErrorPage);
		}
	}

	// Check route, uri
	static testSlug(route, uri)
	{
		if(uri === route) {
			console.log("URL SLUG ", uri);
			return true;
		} else {
			let re = /{[a-z]+}/g;
			let arr = route.match(re);
			if(arr != null) {
				for(let i of arr) {
					console.log("id ", i)
					route = route.replace(i, "[0-9a-zA-Z_.-]+")
				}
			}

			let reg = "^" + route + "/?$"
			reg = new RegExp(reg,"g");
			if(reg.test(uri)) {
				return true;
			} else {
				return false;
			}
		}
	}
}