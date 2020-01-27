import Component from '/router/component.js'

class Page extends Component
{	
	Setup(div, data) 
	{		
		console.log("Component params ", data);

		let m = document.querySelector(div)

		let txt = 'Hello from component 1!'
		// m.textContent = txt

		let html = '<h1 id="boo-click"> Welcome on page 1! Click here! </h1> <p>' + location.pathname + '</p>'
		m.innerHTML = html

		// Add event to html
		this.addEvent("#boo-click", (item,index) => { console.log("Clicked! ", item); });

		return { html, txt }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();	
	return p.Setup(div, data);	
}