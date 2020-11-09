export default class Store
{
	static FetchId(id = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos/' + id)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json);
			let d = document.getElementById('json'); // div id
			if(d) {
				let i = json;
				d.innerHTML = '<li><div>'+i.id+'</div><div>'+i.title+'</div><div>UserId-'+i.userId+'</div></li>';
			}
		})
	}

	static FetchAll(offset = 0, limit = 10) {
		fetch('https://jsonplaceholder.typicode.com/todos?_start='+offset+'&_limit='+limit)
		.then(response => response.json())
		.then((json) => {
			console.log("Fetching ...", json);
			let d = document.getElementById('json'); // div id
			if(d) {
				let txt = '';
				json.forEach((i) => {
					txt += '<li><div class="float-left">'+i.id+'</div><div>'+i.title+'</div><div class="float-right"> UserId-'+i.userId+'</div></li>';
				});
				d.innerHTML = txt;
			}
		})
	}
}