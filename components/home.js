import Component from '/router/component.js'
import Event from '/router/event.js'

export class Page extends Component
{
	Setup(div)
	{
		// GET request params
		let id = this.queryParam('id');
		let name = this.queryParam('name');

		// Page title
		document.title = 'Homepage title text';

		// Html
		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and click here! </h1>';

		// Add event to html
		let e1 = Event.addDocument("#boo-click", (item,index) => { console.log("Clicked! ", item, index); }, "click");
		let e2 = Event.addDocument("#boo-click", (item,index) => { console.log("Clicked right mouse! ", item, index); }, "auxclick");

		// Return html, events
		return { 'html': html, 'document_events': [e1,e2] }
	}
}