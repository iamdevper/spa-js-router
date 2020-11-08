export default class Event
{
    static add(id, cb, type = "click", prevent = false, stop = false){
        return { 'id': id, 'cb': cb, 'type': type, 'prevent': prevent, 'stop': stop };
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
			})
		})
    }
}