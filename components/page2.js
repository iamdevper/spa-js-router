import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'
import View from '/components/view/view.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2 - Load data';

		let html = View.HtmlLinks() + View.Html(location.pathname)

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.addDocument("#boo-click", (item,index,event) => {
			Store.FetchId(11);
		}, "click");

		let e2 = Event.addDocument(".btn", (item,index,event) => {
			alert("Path clicked: " + event.target.dataset.id);
		}, "click");

		// Window events: hashchange, popstate, load
		let e3 = Event.addWindow((event) => {
			Store.FetchAll(0,30);
		}, 'popstate'); // popstate - after local link click

		return { 'html': html, 'document_events': [e1,e2], 'window_events': [e3] }
	}
}