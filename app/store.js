import Router from '/router/router.js'

export default class Store
{
	static FetchId(id = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos/' + id)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json)
			let d = document.getElementById('content') // div id
			if(d) {
				let i = json
				let task = 'Completed'
				if(i.completed) { task = 'Open' }
				d.innerHTML = '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right"> <a href="/todo/'+i.id+'" data-id="'+i.id+'" class="alink"> '+task+' </a> </div></li>'
				// Init loaded links onclick
				Router.addLinks(".alink")
			}
		})
	}

	static FetchAll(offset = 0, limit = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos?_start='+offset+'&_limit='+limit)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json)
			let d = document.getElementById('content') // div id
			if(d) {
				let txt = ''
				json.forEach((i) => {
					let task = 'Completed'
					if(i.completed) { task = 'Open' }
					txt += '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right"> <a href="/todo/'+i.id+'" data-id="'+i.id+'" class="alink"> '+task+' </a> </div></li>'
				});
				d.innerHTML = txt
				// Init loaded links onclick
				Router.addLinks(".alink")
			}
		})
	}

	static UserId(id = 1) {
		fetch('https://jsonplaceholder.typicode.com/users/' + id)
		.then(response => response.json())
		.then((json) => {
			console.log("Users ...", json)
			let d = document.getElementById('content') // div id
			if(d) {
				let i = json
				if(i.id) {
					d.innerHTML = '<li><div class="float-left">'+i.id+'</div> <div>'+i.name+' (@'+i.username+') <br> '+i.address.city+' ul. '+i.address.street+' </div> <div class="float-right"> <a href="mailto:'+i.email+'" data-id="'+i.email+'" class="alink"> '+i.email+' </a> </div></li>'
					// Init loaded links onclick
					Router.addLinks(".alink")
				} else {
					d.innerHTML = '<li><div class="float-left">Error user</div></li>'
				}
			}
		})
	}
}