export default class Router
{
    Routes = []
    static ErrorPage = '/components/error.js';

    constructor(main = "/components/home.js", div = "#app")
    {
        window.App = div
        window.AppMain = main
        this.app = div
        this.addOnLoad();
        this.addOnState();
        // Import main page
        this.importMain(div, main, [])
    }

    // Add routes
    addRoute(route, file)
    {
        this.Routes.push({ route, file });
        window.Routes = this.Routes
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

    // History state
    addOnState()
    {
        window.onpopstate = function(event) {
            // console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
            console.log("OnPopState Load Component: ", document.location.pathname)
            Router.importComponent(window.App, window.AppMain, history.state)
        }
    }

    // Load page component
    static importComponent(div, file, params = [])
    {
        let routes = window.Routes;
        console.log("Routes App: ", routes);

        for(let item of routes)
        {
            console.log("Route: ", item.route, item.file, location.pathname)

            if(this.testSlug(item.route, location.pathname))
            {
                file = item.file;
                import(file).then(module => {
                    let obj = module.LoadComponent(div, params);
                    console.log("Component: ", obj, window.Routes);
                    return;
                }).catch((err) => {
                    console.log(err);
                    return;
                }); // Promise import
            }
        }

        // Error page goes here :).
        this.loadPage(div, this.ErrorPage);
    }

    static loadPage(div, file)
    {
        console.log("Error page: ", file);

        import(file).then(module => {
            let obj = module.LoadComponent(div, []);
            console.log("Error page: ", obj);
            return 1;
        }).catch((err) => {
            console.log(err);
            return 0;
        }); // Promise import
    }

    // Import home page
    importMain(div,file, params)
    {
        import(file).then(module => {
            let obj = module.LoadComponent(div, params);
            console.log("Main say: ", obj, window.Routes);
        })
        .catch(err => {
            console.log(err);
        });
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
        return false;
    }

    // Load external links redirects
    static Init(){
        Router.importComponent(window.App, window.AppMain, history.state)
    }
}
