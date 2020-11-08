import Component from '/router/component.js'
import Event from '/router/event.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 1';

		let html = '<h1 id="boo-click"> Welcome on page 1! Click here! </h1> <p>' + location.pathname + '</p>'

		let e1 = Event.add("#boo-click", (item,index) => { console.log("Clicked! ", item); });

		return { 'html': html, 'events': [e1] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
