import Component from '/router/component.js'

export class Page extends Component
{
	Setup(div, data)
	{
		document.title = 'Error 404';

		let html = '<h1 id="boo-click"> Error 404! Page does not exists! </h1>'

		return { html }
	}
}