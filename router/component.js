export default class Component
{
	addEvent(id, cb, type = "click", prevent = false, stop = false){
		document.querySelectorAll(id).forEach((item,index) => {	
			item.addEventListener(type, e => {	
				if(prevent){
					e.preventDefault();
				}
				if(stop){
					e.stopPropagation();
				}
			    cb(item,index);
			})
		})
	}

	addScript(url)
	{
		var h = document.createElement('script')
	    h.setAttribute("type","text/javascript")
	    h.setAttribute("src", url)
	    if (typeof h != "undefined"){
	        document.getElementsByTagName("head")[0].appendChild(h)
	    }
	}

	fetchGet(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.onload = () => resolve(xhr.responseText);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		})
	}

	queryParam(id){
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(id);
	}

	urlParams(){		
		return window.location.pathname.split('/').filter(function (el) {
			return el != null;
		});
	}

	Setup(){
		return 'Override this';
	}
}

/*

// With class in module
// main.js type="module"
import Component from './module.js'
var p = new Component();
let obj = p.LoadComponent(main);
// module.js
export default ClassName {}

// With function in module
// main.js type="module"
// var promise = import("./module.js");
// module.js
export function LoadComponent(main) {
	main.textContent = "Loaded page content";
}

// Export template
export var literal= `
<h1>Content title</h1>
<div>Content</div>
`
*/