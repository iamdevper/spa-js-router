export default class Router
{
    Routes = []

    constructor(main = "./module.js", div = "#app") 
    {
        this.app = div
        this.addOnLoad();
        this.addOnState();
        // Import main
        this.importMain(div, main, [])
    }

    addRoute(route, file)
    {
        this.Routes.push({ route, file });
        window.Routes = this.Routes
    }

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

    addOnState()
    {
        window.onpopstate = function(event) {
            // console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
            console.log("OnPopState Load Component: ", document.location.pathname)
            Router.importComponent("#app", './module.js', history.state, document.location.pathname)
        }

        window.onhashchange = function(event) {
            console.log("OnHashChange Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
            console.log("OnHashChange Load Component: ", document.location.pathname)
            Router.importComponent("#app", './module.js', history.state, document.location.pathname)
        }
    }

    static async importComponent(div, file, params = [], route)
    {
        let routes = window.Routes;
        routes.forEach(function(item, index){
            
            console.log("Routes: ", item.route, item.file)
            
            if(item.route == route){
                file = item.file;

                import(file).then(module => {
                    let obj = module.LoadComponent(div, params);
                    console.log("Component say: ", obj, window.Routes);
                })
                .catch(err => { 
                    // console.log(err.message);
                }); // Promise import
            }
            
        })        
    }

    async importMain(div,file, params)
    {
        import(file).then(module => {
            let obj = module.LoadComponent(div, params);
            console.log("Main say: ", obj, window.Routes);
        })
        .catch(err => { 
            // console.log(err.message);
        });
    }

    findRoute(route)
    {
        // this.Routes
    }
}