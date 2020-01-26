// TODO with history.js
// 3 - Add {slugs} param to routes
// 4 - Regex routes

import Router from './router.js'

let r = new Router("./module.js");
r.addRoute("/", "./module.js");
r.addRoute("/page1", "./module-page1.js");
r.addRoute("/page2", "./module-page2.js");

// import('./module.js')
// .then(module => {
//     let obj = module.LoadComponent("#app", [1,2,3]);
//     console.log(obj);
// })
// .catch(err => { 
//     console.log(err.message);
// }); // Promise import


// Or import class
// class Import 
// {    
//     static async Component(file, div, params)
//     {
//         // let module = await import(file);
//         let res = '{}';
//         await import(file).then((module) => {
//             res = module.LoadComponent(div, params); // Do work in component
//         }).catch(err => {            
//             res = '{"err" : '+ err +'}';
//             console.log(err);
//         });
//         return res;
//     }    
// }

/*
// Import class component
Import.Component('./module.js', "#app", [1,2,3]).then((msg) => {
    console.log("Server say: ", msg);
    // console.log("Server say: ", JSON.parse(msg));
});
*/