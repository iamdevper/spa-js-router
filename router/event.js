export default class Event
{
    static add(id, cb, type = "click", prevent = false, stop = false){
        return { 'id': id, 'cb': cb, 'type': type, 'prevent': prevent, 'stop': stop };
	}

	static addOnLoad(cb, type){
        return { 'cb': cb, 'type': type };
    }

    static run(id, cb, type = "click", prevent = false, stop = false){
		document.querySelectorAll(id).forEach((item,index) => {
			item.addEventListener(type, e => {
				if(prevent){
					e.preventDefault();
				}
				if(stop){
					e.stopPropagation();
				}
				cb(item,index);
			}, false)
		})
	}

	static runOnLoad(cb, type = "load"){
		window.addEventListener(type, cb(event), true)
		// window.addEventListener(type, (e) => {
		// 	cb(e);
		// }, true)
	}

	static clear(type = "popstate")
	{
		window.addEventListener(type, function (event) {
			event.stopPropagation();
		}, false);
	}
}