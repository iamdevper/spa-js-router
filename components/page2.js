import Component from '/router/component.js'
import Event from '/router/event.js'

class Page extends Component
{
	Setup(div)
	{
		window.addEventListener('DOMContentLoaded', (event) => {
			this.Fetch()
		});

		document.title = 'Page 2';

		let html = '<h1 id="boo-click"> Fetch data on click!!! </h1> <p>' + location.pathname + '</p> <div id="json"></div>'

		// Document events
		let e1 = Event.add("#boo-click", (item,index) => {
			fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then((json) => {
				console.log("Fetching ...", json);
				let d = document.getElementById('json');
				let txt = '';
				json.forEach((i) => {
					txt += '<li><div>'+i.id+'</div><div>'+i.title+'</div><div>'+i.compleded+'</div></li>';
				});
				d.innerHTML = txt;
			})
		}, "click");

		// Change page event
		let e2 = Event.addOnLoad((event) => {
			fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then((json) => {
				console.log("Fetching ...", json);
				let d = document.getElementById('json');
				let txt = '';
				json.forEach((i) => {
					txt += '<li><div>'+i.id+'</div><div>'+i.title+'</div><div>'+i.compleded+'</div></li>';
				});
				d.innerHTML = txt;
			})
		}, 'popstate');

		return { 'html': html, 'events': [e1], 'onload': [e2] }
	}
}

// Export function
export function LoadComponent(div) {
	let p = new Page();
	return p.Setup(div);
}
