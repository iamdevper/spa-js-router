import Event from '/router/event.js'
import Singleton from '/router/singleton.js'


export default class Router extends Singleton
{
	Routes = [];
	AppDiv = '#app';
	AppMainPage = "";
	AppErrorPage = "";
	ShowError = true;
	ShowLog = true;

	constructor(cnf = null)
	{
		super(cnf);
		this.addOnState();
	}

	addRoute(route, file)
	{
		if(route === "") { route = "/"; }
		this.Routes.push({ route, file });
	}

	init()
	{
		console.log("Init ...");
		this.importComponent(this.AppDiv, this.AppMainPage, this.Routes)
	}

	addOnState()
	{
		let it = this;
		window.onpopstate = function(event) {
			if(it.ShowLog) {
				console.log("OnPopState Hash: " + document.location.hash, " Component: " + document.location.pathname, "State: " + JSON.stringify(event.state))
			}
			it.importComponent(it.AppDiv, it.AppMainPage, it.Routes)
		}
	}

	addOnLoad()
	{
		// window.onload = function(){ /* ... */ }
		// window.removeEventListener('DOMContentLoaded', () => {}, false);
		window.addEventListener('DOMContentLoaded', this.addLinks(), false);
	}

	async importComponent(div, file, routes = [])
	{
		for(let item of routes)
		{
			if(this.testSlug(item.route, location.pathname))
			{
				console.log("Route: ", item.route, item.file, location.pathname, this.ShowError)
				file = item.file;
				await this.loadPage(div, file);
			}
		}

		if(this.ShowError)
		{
			console.log("Show error:", this.ShowError);
			await this.loadPage(this.AppDiv, this.AppErrorPage);
		}

		this.addOnLoad();
	}

	testSlug(route, uri)
	{
		if(uri === route) {
			if(this.ShowLog) {
				console.log("URL SLUG ", uri);
			}
			return true;
		} else {
			let re = /{[a-z]+}/g;
			let arr = route.match(re);
			if(arr != null) {
				for(let i of arr) {
					// console.log("Param: ", i)
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

	/**
	 * Prevent a tag default event, add popstate to links
	 * Add this to dynamic content links
	 * Sample: Router.addLinks(".link")
	 *
	 * @param id Link class, id or tag name
	 */
	addLinks(id = "a")
	{
		var List = document.querySelectorAll(id)
		let it = this;
		List.forEach(function(item) {
			var h = item.href.replace(location.protocol+'//'+location.host, ""); // delete protocol//host
			if(h.indexOf("http://") == 0 || h.indexOf("https://") == 0 || h.indexOf("//") == 0) {
				if(it.ShowLog) {
					console.log("External link ", item.href);
				}
				item.setAttribute('target', '_blank');
			} else {
				it.addClickEvent(item);
			}
		})
	}

	/**
	 * Add onclick popstate event to links
	 *
	 * @param item A tag element
	 */
	addClickEvent(item)
	{
		item.addEventListener('click', function(e) {
			e.preventDefault()
			window.history.pushState({page: item.href}, "Title "+item.href, item.href)
			var popStateEvent = new PopStateEvent('popstate', { state: history.state })
			dispatchEvent(popStateEvent)
			if(this.ShowLog) {
				console.log('Link history state:', history.state)
			}
		}, true)
	}

	async loadPage(div, file)
	{
		let it = this;

		await import(file).then(module => {
			let obj = new module.Page().Setup(div);
			if(it.ShowLog) {
				console.log("Page loaded!", obj);
			}
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
			it.ShowError = false
		})
		.catch(err => {
			console.log("Page import error: ", err);
		});
	}
}