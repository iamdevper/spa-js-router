import Component from '/router/component.js'

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
		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and Click here! </a>'

		// Add event to html
		this.addEvent("#boo-click", (item,index) => { console.log("Clicked! ", item, index); }, "click");

		// Return html, events
		return { 'html': html, 'events': this.Events }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
