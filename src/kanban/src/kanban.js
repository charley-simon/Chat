/* Drag and drop part: begin */
"use strict";
let dragged;
let arr = Array.prototype.slice.apply(document.querySelectorAll(".task-item"));
arr.forEach(function (el) {
	el.draggable = true;
	el.ondragstart = function (e) {
		dragged = this;
		if (e.dataTransfer.items) {
			e.dataTransfer.setData("text/plain", this.innerHTML);
		} //req for Firefox
	};
	el.ondragover = function (e) {
		e.preventDefault();
		//On supporting browsers, if offsetX and is on left side, draw insertion line on left, otherwise put line on right
		if (e.offsetX && e.dataTransfer.items) {
			if (e.offsetX < this.offsetWidth / 2) {
				this.classList.add("insert-before");
				this.classList.remove("insert-after");
			} else {
				this.classList.add("insert-after");
				this.classList.remove("insert-before");
			}
		} else {
			this.classList.add("insert-before");
		}
	};
	el.ondragenter = function (e) {
		e.preventDefault(); //req for IE
	};
	el.ondragleave = function (e) {
		this.classList.remove("insert-before", "insert-after");
	};
	el.ondrop = function (e) {
		console.log(this.offsetWidth);
		this.classList.remove("insert-before", "insert-after");
		if (e.offsetX && e.dataTransfer.items) {
			if (e.offsetX < this.offsetWidth / 2) {
				this.parentNode.insertBefore(dragged, this);
			} else {
				this.parentNode.insertBefore(dragged, this.nextElementSibling);
			}
		} else {
			this.parentNode.insertBefore(dragged, this);
		}
		return false;
	};
});
/* Drag and drop part: end */

/* Categories: begin */
const categories = [];
categories["Design"] = "lightgrey";
categories["Code"] = "lightblue";
categories["Test"] = "bisque";
categories["Bug"] = "lightsalmon";
categories["Refactor"] = "lightpink";
categories["Learn"] = "lightgreen";
/* Categories: end */

/* Emulation du stockage des taches
 *
 * <h2>Backlog</h2>
 * <div class="task" categorie="Design">
 * 	<div class="task-header">
 *  	<div class="task-header-expand"></div>
 * 		<div class="task-title">SVG Icons</div>
 * 		<div class="task-categorie" style="background-color: lightgreen;">Design</div>
 * 		<div class="task-header-menu"></div>
 * 	</div>
 * 	<div class="task-content">
 * 		<p>Create and generate the custom SVG icons.</p>
 * 	</div>
 * </div>
*/

const project = [];
project["Backlog"] =
{
	title: "SVG Icons",
	categorie: "Design",
	content: "<p>Create and generate the custom SVG icons.</p>",
},
{
	title: "Hero Images",
	categorie: "Design",
	content: "<p>Create and generate the hero's images.</p>",
},
{
	title: "Javascript",
	categorie: "Learn",
	content: "<p>Learn a lot of javascipt.</p>",
},
{
	title: "CSS",
	categorie: "Learn",
	content: "<p>Learn a litle more of CSS.</p>",
};

project["Todo"] =
{
	title: "Menu bar",
	categorie: "Code",
	content: "Learn a lot of javascript.",
};

project["Doing"] =
{
	title: "Task",
	categorie: "Code",
	content: "Make the task card beautiful.",
},
{
	title: "Columns",
	categorie: "Test",
	content: "Learn a lot of javascript.",
};

project["Done"] =
{
	title: "Menu bar",
	categorie: "Bug",
	content: "Drag and drop failure.",
};

/*
<div class="task-item" title="SVG Icons" categorie="Design">
		Create and generate the custom SVG icons.
</div>

<div class="task-item">
 	<div class="task-header">
 		<div class="task-header-expand"></div>
		<div class="task-title">SVG Icons</div>
		<div class="task-categorie" style="background-color: lightgreen;">Design</div>
		<div class="task-header-menu"></div>
	</div>
	<div class="task-content">
		<p>Create and generate the custom SVG icons.</p>
	</div>
</div>
*/
function analyseTasks() {
	document.querySelectorAll(".task-item[title='Selectors']").forEach(($task) => {
	// document.querySelectorAll(".task-item").forEach(($task) => {
		createTaskCard( $task );
	}
)};

function createTaskCard( task ) {
	var text;
	console.log( task );
	const title = task.getAttribute("title");
	const categorie = task.getAttribute("categorie");
/*
	const eltTaskContent = document.createElement("div");
	const contentNodes = task.querySelectorAll(".task-content").forEach(($node) => {
		eltTaskContent.appendChild($node.cloneNode(true));
	});
	task.textContent = "";
*/

	console.log( `Task - Title: ${title}, Catégorie: ${categorie}` );

	// <div class="task-header"></div>
	const eltTaskHeader = document.createElement("div");
	eltTaskHeader.className = "task-header";
	const elem = task.prepend( eltTaskHeader);
	// console.log( eltTaskHeader );

	// <div class="task-header-expand"></div>
	const eltTaskHeaderExpand = document.createElement("div");
	eltTaskHeaderExpand.className = "task-header-expand";
	eltTaskHeader.append( eltTaskHeaderExpand);
	// console.log( eltTaskHeaderExpand );

	// <div class="task-title">SVG Icons</div>
	const eltTaskTitle = document.createElement("div");
	eltTaskTitle.className = "task-title";
	text = document.createTextNode(title);
	eltTaskTitle.appendChild(text);
	eltTaskHeader.append(eltTaskTitle);
	// console.log( eltTaskTitle );

	// <div class="task-categorie" style="background-color: lightgreen;">Design</div>
	const eltTaskCategorie = document.createElement("div");
	eltTaskCategorie.className = "task-categorie";
	eltTaskCategorie.style.backgroundColor = categories[categorie];
	text = document.createTextNode(categorie);
	eltTaskCategorie.appendChild(text);
	eltTaskHeader.append(eltTaskCategorie);
	// console.log( eltTaskCategorie );


	// <div class="task-header-menu"></div>
	
	const eltTaskHeaderMenu = document.createElement("div");
	eltTaskHeaderMenu.className = "task-header-menu";
	eltTaskHeader.append( eltTaskHeaderMenu);
	const template = document.getElementById("task-menu").content;
	eltTaskHeaderMenu.appendChild( template);
	
	// console.log( eltTaskHeaderMenu );

	// <div class="task-content">
	// eltTaskContent.className = "task-content";
	// text = document.createTextNode(content);
	// eltTaskContent.appendChild(eltContent);
	// task.append(eltTaskContent);
	// console.log( eltTaskContent );

	// <div class="task-progress" percent="80" estimated="5d" duration="6d" start="12/04/2023" finish="20/04/2023"></div>
	// TODO
}

analyseTasks();

/* Expand task: begin */
/*
let tasks = document.querySelectorAll(`.task-header-expand .task-header-collapse`).onclick = () => {
	let contentTarget = this.detail.getAttribute("data-du-animate-target");

}
modeSwitch.addEventListener('click', function () {
	document.documentElement.classList.toggle('dark');
	modeSwitch.classList.toggle('active');
});
*/

const _icon_collapse = "../public/img/chevron-up.svg";
const _icon_expand = "../public/img/chevron-down.svg";
document.querySelectorAll(".task-header-expand").forEach(($task_icon) => {
	$task_icon.addEventListener("click", (e) => {
		const icon = e.target;
		const task = icon.parentNode.parentNode;
		const contents = task.getElementsByClassName("task-content");
		const content = contents[0];
		const display = content.style.display;
		if ( display !== null && display === "none" ) {
			content.style.display = "inherit";
			icon.style.content = `url(${_icon_expand})`;
		} else {
			content.style.display = "none";
			icon.style.content = `url(${_icon_collapse})`;
		}
  });
});
/* Expand task: end */
