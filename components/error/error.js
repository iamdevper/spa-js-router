import Component from '/router/component.js'

class Page extends Component
{
	Setup(div, data)
	{
		document.title = 'Error 404';

		let html = '<h1 id="boo-click"> Error 404! Page does not exists! </a>'

		return { html }
	}
}

// Export function
export function LoadComponent(div, data) {
	let p = new Page();
	return p.Setup(div, data);
}
