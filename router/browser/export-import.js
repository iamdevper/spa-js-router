/*

// With class in module
// main.js type="module"
import Component from './module.js'
var p = new Component();
let obj = p.LoadComponent(main);
// module.js
export default ClassName {}

// With function in module
// main.js type="module"
// var promise = import("./module.js");
// module.js
export function LoadComponent(main) {
	main.textContent = "Loaded page content";
}

// Export template
export var literal= `
<h1>Content title</h1>
<div>Content</div>
`
*/