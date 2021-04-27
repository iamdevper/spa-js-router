import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/components/store.js'
import View from '/components/view/view.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Show Todo';

		let html = View.HtmlLinks() + View.Html(location.pathname)

		// Pretty url /todo/{id}
		let id = this.urlParams()[1]

		Store.FetchId(id);
		console.log("Todo id: ", id)

		return { 'html': html }
	}
}