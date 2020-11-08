import Component from '/router/component.js'
import Event from '/router/event.js'

class Page extends Component
{
	Setup(div)
	{
		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Welcome on page 2! Click here! </h1> <p>' + location.pathname + '</p>'

		let e1 = Event.add("#boo-click", (item,index) => { console.log("Clicked! ", item, index); });

		return { 'html': html, 'events': [e1] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
