import Component from '/router/component.js'
import Event from '/router/event.js'

class Page extends Component
{
	Setup(div)
	{
		// GET request params
		let id = this.queryParam('id');
		let name = this.queryParam('name');

		// Page title
		document.title = 'Homepage title text';

		// Html
		let html = '<h1 id="boo-click"> Open console: <small>CTRL + SHIFT + K</small> and click here! </a>'

		// Add event to html
		let e1 = Event.add("#boo-click", (item,index) => { console.log("Clicked! ", item, index); }, "click");
		let e2 = Event.add("#boo-click", (item,index) => { console.log("Clicked right mouse! ", item, index); }, "auxclick");

		// Return html, events
		return { 'html': html, 'events': [e1,e2] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
