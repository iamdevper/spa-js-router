import Menu from '/app/view/menu.js'

export default class HomeView
{
	static Home(div)
	{
		return `<div id="content"> Homepage content goes here (` + div + `).
			<form id="form">
				<h4> Upload file onchange </h4>
				<input type="file" name="file" id="file">
			</form>
		</div>`;
	}

	static Html(div)
	{
		return Menu.Html() + this.Home(div);
	}
}