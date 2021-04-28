import Component from '/router/component.js'
import Event from '/router/event.js'
import Store from '/app/store.js'
import View from '/app/view/upload.js'

export class Page extends Component
{
	Setup(div)
	{
		document.title = 'Js SPA - Upload file';

		// Upload onchange file
		let upload = Event.addDocument("#file", (item,index) => {
			console.log("File changed! ", item, index)
			Store.Upload("form")
		}, "change");

		return { 'html': View.Html(div), 'document_events': [upload] }
	}
}