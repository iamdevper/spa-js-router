import Router from '/router/router.js'

export default class Store
{
	static FetchId(id = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos/' + id)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json)
			let d = document.getElementById('json') // div id
			if(d) {
				let i = json
				let task = 'Completed'
				if(i.completed) { task = 'Open' }
				// d.innerHTML = '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right">'+task+'</div></li>'
				d.innerHTML = '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right"> <a href="/todo/'+i.id+'" data-id="'+i.id+'" class="alink"> '+task+' </a> </div></li>'
				Router.addLinks(".alink")
			}
		})
	}

	static FetchAll(offset = 0, limit = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos?_start='+offset+'&_limit='+limit)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json)
			let d = document.getElementById('json') // div id
			if(d) {
				let txt = ''
				json.forEach((i) => {
					let task = 'Completed'
					if(i.completed) { task = 'Open' }
					txt += '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right"> <a href="/todo/'+i.id+'" data-id="'+i.id+'" class="alink"> '+task+' </a> </div></li>'
				});
				d.innerHTML = txt
				Router.addLinks(".alink")
			}
		})
	}
}