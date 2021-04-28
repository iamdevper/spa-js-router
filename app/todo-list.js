import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/app/store.js'
import View from '/app/view/todo.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Js SPA - Show Todo';

		// Pretty url /todo/{id}
		let id = this.urlParams()[1]

		Store.FetchAll(0,20);

		console.log("Todo id: ", id)

		return { 'html': View.Html(div) }
	}
}