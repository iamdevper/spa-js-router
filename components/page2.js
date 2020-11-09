import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Fetch data on click! </h1> <p>' + location.pathname + '</p> <div id="json"></div>'

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.add("#boo-click", (item,index,event) => {
			Store.FetchId(11);
		}, "click");

		// Window events: hashchange, popstate, load
		let e2 = Event.addOnLoad((event) => {
			Store.FetchAll(0,30);
		}, 'popstate'); // popstate - after local link click

		return { 'html': html, 'events': [e1], 'onload': [e2] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}