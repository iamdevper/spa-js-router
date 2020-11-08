import Component from '/router/component.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 3';

		let html = '<h1 id="boo-click"> Welcome on page 3! Click here! </h1> <p>' + location.pathname + '</p>'

		this.addEvent("#boo-click", (item,index) => { alert("Clicked " + location.pathname); });

		return { 'html': html, 'events': this.Events }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
