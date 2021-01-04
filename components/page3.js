import Component from '/router/component.js'
import Event from '/router/event.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 3';

		let html = '<h1 id="boo-click"> Page with id and name, click here! </h1> <p>' + location.pathname + '</p>'

		let e1 = Event.add("#boo-click", (item,index) => { alert("Clicked " + location.pathname); });

		return { 'html': html, 'events': [e1] }
	}
}