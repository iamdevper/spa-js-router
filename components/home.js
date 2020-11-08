import Component from '/router/component.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Homepage title text';

		let html = '<h1 id="boo-click"> Open console: CTRL + SHIFT + K and Click here! </a>'

		let m = document.querySelector(div)
		m.innerHTML = html

		// Add event to html
		this.addEvent("#boo-click", (item,index) => { console.log("Clicked! ", item); });

		return { html }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();
	return p.Setup(div, data);
}
