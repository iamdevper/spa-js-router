// TODO with history.js
// 3 - Add {slugs} param to routes
// 4 - Regex routes

import Router from './router.js'

let r = new Router("./module.js");
r.addRoute("/", "./module.js");
r.addRoute("/page1", "./module-page1.js");
r.addRoute("/page2", "./module-page2.js");
r.addRoute("/page/{id}", "./module-page2.js");
r.addRoute("/post/{id}/image/{name}", "./module-page1.js");

// let uri = r.findSlug();
// console.log("DDDDD ", uri);

// Links from external pages to this page
Router.externalLinks()

function findSlug(route, url){
    if(url == '/' || url == ''){
        return true
    }else{
        let re = /{[a-z]+}/g;
        let arr = route.match(re);
        if(arr != null){
            for(let i of arr){
                console.log("id ", i)
                route = route.replace(i, "[0-9a-zA-Z_.-]+")
            }
        }        
    }    
    let reg = "^" + route + "/?$"
    let re = new RegExp(reg,"g");
    if(re.test(url)){
        return true;
    }
    return false;
}

/*
let route = '/post/{id}';
let url = '/post/1234';

let xxx = findSlug(route, url);
alert(xxx);

let reg = "^" + xxx + "/?$"
alert(reg);

let re = new RegExp(reg,"g");
if(re.test(url)){
    console.log("Url ok ", url);
}else{
    console.log("Url error ", url, reg);
}


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