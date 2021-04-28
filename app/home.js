import Component from '/router/component.js'
import Event from '/router/event.js'
import View from '/app/view/home.js'

export class Page extends Component
{
	Setup(div)
	{
		// Page title
		document.title = 'Js SPA Homepage';

		// Document events: click, dblclick, change, keydown, contextmenu, auxclick, mouseover ...
		let e1 = Event.addDocument("#content", (item,index) => { console.log("Clicked! ", item, index); }, "click");
		let e2 = Event.addDocument("#content", (item,index) => { console.log("Clicked right mouse! ", item, index); }, "auxclick");

		// Window events: hashchange, load, popstate - after local link click
		let e3 = Event.addWindow(() => {
			console.log("Page onload event !!!")
		}, 'load');

		// Page
		return { 'html': View.Html(div), 'document_events': [e1,e2], 'window_events': [e3] }
	}
}