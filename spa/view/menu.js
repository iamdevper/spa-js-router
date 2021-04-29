export default class MenuView
{
    static Html()
    {
        return `<div id="links">
            <a href="/">Home page</a>
            <a href="/todos/list">Todos list</a>
			<a href="/profil/10">User profil</a>
			<a href="/upload">Upload file</a>
            <a href="https://www.pagani.com">External page</a>
        </div>`;
    }
}