export default class Component
{
	addScript(url)
	{
		var h = document.createElement('script')
		h.setAttribute("type","text/javascript")
		h.setAttribute("src", url)
		if (typeof h != "undefined"){
			document.getElementsByTagName("head")[0].appendChild(h)
		}
	}

	fetchGet(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.onload = () => resolve(xhr.responseText);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		})
	}

	queryParam(id){
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(id);
	}

	urlParams(){
		return window.location.pathname.split('/').filter(function (el) {
			return el != null;
		});
	}

	Setup(){
		return 'Override this';
	}
}