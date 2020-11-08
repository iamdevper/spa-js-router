// Globals
var Routes = [];
var AppDiv = '#app';
var AppMainPage = '';
var AppErrorPage = '';

export default class Router
{
	constructor(div = '#app', main = "/components/home.js", error = "/components/error/error.js",) {
		// Globals
		AppDiv = div;
		AppMainPage = main;
		AppErrorPage = error;

		this.addOnState();
		this.addOnLoad();

		// Load error page
		this.loadPage(AppDiv, AppErrorPage);
	}

	addRoute(route, file) {
		if(route === "") { route = "/"; }
		Routes.push({ route, file });
	}

	init(){
		console.log("Init ...");
		Router.importComponent(AppDiv, AppMainPage, Routes)
	}

	loadPage(div, file)
	{
		import(file).then(module => {
			let obj = module.LoadComponent(div);
			console.log("Load page: ", obj);
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
		window.onload = function(){
			console.log("OnLoad history urls");
			// History popstate for a href urls
			var List = document.querySelectorAll("a")
			List.forEach(function(item){
				var h = item.href.replace(location.protocol+'//'+location.host, ""); // delete protocol//host
				if(h.indexOf("http://") == 0 || h.indexOf("https://") == 0 || h.indexOf("//") == 0){
					console.log("External link ", item.href);
					item.setAttribute('target', '_blank');
				}else{
					item.addEventListener('click', function(e){
						e.preventDefault()
						window.history.pushState({page: item.href}, "Title "+item.href, item.href)
						var popStateEvent = new PopStateEvent('popstate', { state: history.state })
						dispatchEvent(popStateEvent)
						console.log('Item history ', history.state)
					}, false)
				}
			})
		}
	}

	// Load page component
	static importComponent(div, file, routes = [])
	{
		for(let item of routes)
		{
			console.log("Route: ", item.route, item.file, location.pathname)

			if(this.testSlug(item.route, location.pathname))
			{
				file = item.file;
				import(file).then(module => {
					let obj = module.LoadComponent(div);
					console.log("Page component: ", obj);
					return;
				}).catch((err) => {
					console.log("Page import error: ", err);
				}); // Promise import
			}
		}
	}

	// Check route, uri
	static testSlug(route, uri){
		if(uri === route){
			console.log("URL SLUG ", uri);
			return true;
		}else{
			let re = /{[a-z]+}/g;
			let arr = route.match(re);
			if(arr != null){
				for(let i of arr){
					console.log("id ", i)
					route = route.replace(i, "[0-9a-zA-Z_.-]+")
				}
			}

			let reg = "^" + route + "/?$"
			reg = new RegExp(reg,"g");
			if(reg.test(uri)){
				return true;
			}else{
				return false;
			}
		}
	}
}