export default class View
{
    static Html(path)
    {
        return '<h1 id="boo-click"> Fetch data on click! </h1> <p class="btn" data-id="123">' + path + '</p> <div id="json"></div>'
    }
}