import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'
import View from '/components/view/view.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2 - Load data';

		let html = View.Html(location.pathname)

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.add("#boo-click", (item,index,event) => {
			Store.FetchId(11);
		}, "click");

		let e2 = Event.add(".btn", (item,index,event) => {
			alert("Path clicked: " + event.target.dataset.id);
		}, "click");

		// Window events: hashchange, popstate, load
		let e3 = Event.addOnLoad((event) => {
			Store.FetchAll(0,30);
		}, 'popstate'); // popstate - after local link click

		return { 'html': html, 'events': [e1,e2], 'onload': [e3] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}