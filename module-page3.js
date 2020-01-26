import Component from './component.js'

class Page extends Component
{	
	Setup(div, data) 
	{		
		console.log("Component params ", data);

		let m = document.querySelector(div)
		let html = '<h1 id="boo-click"> Click now here page 3 ' + location.pathname + '</a>'
		m.innerHTML = html

		// Add event to html
		this.addEvent("#boo-click", (item,index) => { Alert("Clicked ", location.pathname); });

		return { html, txt }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();	
	return p.Setup(div, data);	
}