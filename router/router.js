import Event from '/router/event.js'

// Globals
var Routes = [];
var AppDiv = '#app';
var AppMainPage = '';
var AppErrorPage = '';
var ShowError = true;

export default class Router
{
	constructor(div = '#app', main = "/components/home.js", error = "/components/error/error.js")
	{
		AppDiv = div;
		AppMainPage = main;
		AppErrorPage = error;

		Router.addOnState();
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

	static async loadPage(div, file)
	{
		await import(file).then(module => {
			let obj = new module.Page().Setup(div);
			console.log("Load page: ", obj);
			let m = document.querySelector(div)
			if(m) {
				m.innerHTML = obj.html // Add html
			}
			if(obj.document_events) {
				obj.document_events.forEach((i) => {
					Event.run(i.id, i.cb, i.type, i.prevent, i.stop); // Run events
				});
			}
			if(obj.window_events) {
				obj.window_events.forEach((i) => {
					Event.runOnLoad(i.cb, i.type);
				});
			}
			ShowError = false
		})
		.catch(err => {
			console.log("Page import error: ", err);
		});
	}

	// History state
	static addOnState()
	{
		window.onpopstate = function(event) {
			// console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
			console.log("OnPopState Load Component: ", document.location.pathname)
			Router.importComponent(AppDiv, AppMainPage, Routes)
		}
	}

	// Pages links
	static addOnLoad()
	{
		// window.onload = function(){ /* ... */ }
		window.removeEventListener('DOMContentLoaded', () => {}, true);
		window.addEventListener('DOMContentLoaded', Router.addLinks(), true);
	}

	static addLinks(e = null)
	{
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
				}, true)
			}
		})
	}

	// Load page component
	static async importComponent(div, file, routes = [])
	{
		for(let item of routes)
		{
			if(this.testSlug(item.route, location.pathname))
			{
				console.log("Route: ", item.route, item.file, location.pathname, ShowError)
				file = item.file;
				await this.loadPage(div, file);
			}
		}

		if(ShowError)
		{
			// Error page
			console.log("Show error:", ShowError);
			await this.loadPage(AppDiv, AppErrorPage);
		}

		Router.addOnLoad();
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