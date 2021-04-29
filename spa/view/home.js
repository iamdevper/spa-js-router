import Menu from '/spa/view/menu.js'

export default class HomeView
{
	static Home(div)
	{
		return `<div id="content"> Homepage content goes here (` + div + `).</div>`;
	}

	static Html(div)
	{
		return Menu.Html() + this.Home(div);
	}
}