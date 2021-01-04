import Component from '/router/component.js'
import Event from '/router/event.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 1';

		let html = '<h1 id="boo-click"> Page one, click here! </h1> <p>' + location.pathname + '</p>'

		let e1 = Event.addDocument("#boo-click", (item,index) => { alert("Clicked! " + item.innerHTML); });

		return { 'html': html, 'document_events': [e1] }
	}
}