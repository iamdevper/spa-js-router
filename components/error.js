import Component from '/router/component.js'

class Page extends Component
{
	Setup(div, data)
	{
		document.title = 'Error 404';

		console.log("Component params ", data);

		let m = document.querySelector(div)

		let txt = 'Hello from component!'
		// m.textContent = txt

		let html = '<h1 id="boo-click"> Error 404! Page does not exists! </a>'
		m.innerHTML = html

		// Add event to html
		this.addEvent("#boo-click", (item,index) => { location.href = '/'; });

		return { html, txt }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();
	return p.Setup(div, data);
}
