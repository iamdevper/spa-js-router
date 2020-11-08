import Component from '/router/component.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Welcome on page 2! Click here! </h1> <p>' + location.pathname + '</p>'

		let m = document.querySelector(div)
		if(m) { m.innerHTML = html; }

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
