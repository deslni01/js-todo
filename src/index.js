// import { format } from 'date-fns';
import './style.css';

// factory to create tasks
function task(title, description, priority, dueDate, taskStatus, project) {
	this.title = title;
	this.description = description;
	this.priority = priority;
	this.dueDate = dueDate;
	this.taskStatus = taskStatus;
	this.project = project;
}

// test tasks
let mop = new task(
	'Mop',
	'Mop the floors',
	'High',
	'2022-03-14',
	'Not Done',
	'Cleaning'
);
let dust = new task(
	'Dust',
	'Living room',
	'Medium',
	'2022-02-15',
	'Not Done',
	'Cleaning'
);
let weights = new task(
	'Weights',
	'Day 1 of set',
	'High',
	'2022-02-12',
	'Not Done',
	'Gym'
);

// todoStorage().storeTask(mop);
// todoStorage().storeTask(dust);
// todoStorage().storeTask(weights);

function todoStorage() {
	// get tasklist from local storage
	function getTasks() {
		let myTasks;

		if (localStorage.getItem('myTasks') === null) {
			myTasks = [];
		} else {
			myTasks = JSON.parse(localStorage.getItem('myTasks'));
		}
		return myTasks;
	}

	// add to tasklist in local storage
	function storeTask(task) {
		const myTasks = getTasks();

		myTasks.push(task);

		localStorage.setItem('myTasks', JSON.stringify(myTasks));
	}

	// delete objects
	function removeTask(dueDate) {
		const myTasks = getTasks();

		myTasks.forEach((task, index) => {
			if (task.dueDate === dueDate) {
				myTasks.splice(index, 1);
			}
		});

		localStorage.setItem('myTasks', JSON.stringify(myTasks));
	}

	// change completion status
	function changeStatus(dueDate) {
		const myTasks = getTasks();

		myTasks.forEach((task) => {
			if (task.dueDate === dueDate) {
				task.taskStatus === 'Not Done'
					? (task.taskStatus = 'Done')
					: (task.taskStatus = 'Not Done');
			}

			// in library, had here:
			// localStorage.setItem('myTasks', JSON.stringify(myTasks));
		});
		localStorage.setItem('myTasks', JSON.stringify(myTasks));
	}

	// change date?
	function changeDate() {}

	// filter by projects
	// add functionality - make it return an array of the tasks matching criteria
	function getProjects(project) {
		const myTasks = getTasks();

		myTasks.forEach((task) => {
			if (task.project === project) {
				console.log(
					`Project: ${project}, Task: ${task.title}, Status: ${task.taskStatus}`
				);
			} else {
				return;
			}
		});
	}

	// get list of all projects - spit out all assigned project names
	// use on this one: let getAllProj = todoStorage().getAllProjects(todoStorage().getTasks(), 'project')
	// or: let getAllStatus = todoStorage().getAllProjects(todoStorage().getTasks(), 'status')
	// will separate into objects showing 'Done', and objects that are 'Not Done', or by project 'cleaning' or 'gym' or whatever else
	const getAllProjects = (objectArray, property) => {
		return objectArray.reduce(function (total, obj) {
			let key = obj[property];
			if (!total[key]) {
				total[key] = [];
			}
			total[key].push(obj);
			return total;
		}, {});
	};

	return {
		changeStatus,
		removeTask,
		storeTask,
		getTasks,
		getProjects,
		getAllProjects,
		changeDate,
	};
}

// DOM stuff
function displayTasks(task) {
	const taskList = todoStorage().getTasks();

	taskList.forEach((task) => addToList(task));
}

// Add books
function addToList(task) {
	const taskList = document.querySelector('#task-list');
	const row = document.createElement('tr');

	row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
		<td>${task.project}</td>
		<td>${task.dueDate}</td>
        <td>${task.taskStatus} (<a href="#" class="task-status">Complete</a>)</td>
        <td><a href="#" class="deleteBtn">Delete</a></td>
        `;

	taskList.appendChild(row);
}

// Add filter menu
function updateFilter() {
	const filterList = document.querySelector('#filter-list');
	filterList.innerHTML = `
		<li><a href="#" class="project-filter">All Tasks</a></li>
		<li><a href="#" class="list-status">Done</a></li>
		<li><a href="#" class="list-status">Not Done</a></li>
		`;

	let projectList = todoStorage().getAllProjects(
		todoStorage().getTasks(),
		'project'
	);

	for (const property in projectList) {
		let listItem = document.createElement('li');
		listItem.innerHTML = `<a href="#" class="project-filter">${property}</a>`;
		filterList.appendChild(listItem);
	}
}

// Navigate from filter menu
function filterNav(project) {
	const myTasks = todoStorage().getTasks();
	let taskList = document.querySelector('#task-list');
	taskList.innerHTML = '';
	myTasks.forEach((task) => {
		if (project === 'All Tasks') {
			taskList.innerHTML = '';
			displayTasks();
		} else if (task.project === project) {
			addToList(task);
		}
	});
}

function filterStatus(taskStatus) {
	const myTasks = todoStorage().getTasks();
	let taskList = document.querySelector('#task-list');
	taskList.innerHTML = '';
	myTasks.forEach((task) => {
		if (task.taskStatus === taskStatus) {
			addToList(task);
		}
	});
}

// Remove tasks
function removeTaskList(el) {
	if (el.classList.contains('deleteBtn')) {
		el.parentElement.parentElement.remove();
	}
}

// // Update task status
function updateStatus(el, dueDate) {
	const myTasks = todoStorage().getTasks();

	myTasks.forEach((task) => {
		if (task.dueDate === dueDate) {
			// console.log(el.innerHTML);
			el.innerHTML = `
                ${task.taskStatus} (<a href="#" class="task-status">Complete</a>)
                `;
		}
	});
}

// Clear form
function clearForms() {
	document.querySelector('#title').value = '';
	document.querySelector('#description').value = '';
	document.querySelector('#priority').value = '';
	document.querySelector('#category').value = '';
	document.querySelector('#status').value = 'Not Done';
	document.querySelector('#date').value = '';
}

// Events
document.addEventListener('DOMContentLoaded', displayTasks, updateFilter());

// Add to tasklist
document.querySelector('#taskform').addEventListener('submit', (e) => {
	e.preventDefault();

	const title = document.querySelector('#title').value;
	const description = document.querySelector('#description').value;
	const priority = document.querySelector('#priority').value;
	const project = document.querySelector('#category').value;
	const taskStatus = document.querySelector('#status').value;
	const dueDate = document.querySelector('#date').value;

	const taskItem = new task(
		title[0].toUpperCase() + title.slice(1),
		description[0].toUpperCase() + description.slice(1),
		priority[0].toUpperCase() + priority.slice(1),
		dueDate[0].toUpperCase() + dueDate.slice(1),
		taskStatus[0].toUpperCase() + taskStatus.slice(1),
		project[0].toUpperCase() + project.slice(1)
	);

	addToList(taskItem);

	todoStorage().storeTask(taskItem);
	updateFilter();
	clearForms();
});

document.querySelector('#tasks').addEventListener('click', (e) => {
	// change status
	if (e.target.classList.contains('task-status')) {
		// change status on storage
		todoStorage().changeStatus(
			e.target.parentElement.previousElementSibling.textContent
		);

		// change status on page
		updateStatus(
			e.target.parentElement,
			e.target.parentElement.previousElementSibling.textContent
		);
	}

	// remove tasks
	if (e.target.textContent === 'Delete') {
		// remove from page
		removeTaskList(e.target);

		// remove from storage
		// removeTask(dueDate)
		todoStorage().removeTask(
			e.target.parentElement.previousElementSibling.previousElementSibling
				.textContent
		);
	}

	updateFilter();
});

document.querySelector('#filter-menu').addEventListener('click', (e) => {
	if (e.target.classList.contains('project-filter')) {
		filterNav(e.target.innerText);
	}
});

document.querySelector('#filter-menu').addEventListener('click', (e) => {
	if (e.target.classList.contains('list-status')) {
		console.log(e.target.innerText);
		filterStatus(e.target.innerText);
	}
});
