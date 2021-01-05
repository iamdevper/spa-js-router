export default class View
{
    static Html(path)
    {
        return '<h1 id="boo-click"> Fetch data on click! </h1> <p class="btn" data-id="123">' + path + '</p> <div id="json"></div>'
    }

    static HtmlLinks()
    {
        return `<div id="links">
            <a href="/">home</a>
            <a href="/page1">page</a>
            <a href="/page2">fetch data</a>
            <a href="/page/123">page/{id}</a>
            <a href="/post/123/image/Name123">post/{id}/image/{name}</a>
            <a href="https://www.pagani.com">external page link</a>
        </div>`;
    }
}