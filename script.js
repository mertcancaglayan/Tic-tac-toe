const grid = document.getElementById("grid");
const cells = document.querySelectorAll("[data-cell]");

const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
	[0, 1, 2], // Horizontal top row
	[3, 4, 5], // Horizontal middle row
	[6, 7, 8], // Horizontal bottom row
	[0, 3, 6], // Vertical left column
	[1, 4, 7], // Vertical middle column
	[2, 5, 8], // Vertical right column
	[0, 4, 8], // Diagonal from top-left to bottom-right
	[2, 4, 6], // Diagonal from top-right to bottom-left
];
let win = false;

let currentClass;
let turn;

startGame();

function swapTurn() {
	turn = !turn;
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function clickHandler(event) {
	if (!win) {
		const cell = event.target;
		if (turn) {
			currentClass = X_CLASS;
		} else {
			currentClass = O_CLASS;
		}
		placeMark(cell, currentClass);
		swapTurn();
		showHover();
		checkWin();
	}
}

function showMessage() {
    let message = document.querySelector("#message")
    message.textContent = currentClass.toUpperCase()+ " " + "Wins"

	const messageScreen = document.querySelector("#win-message");
	messageScreen.style.display = "flex";
	messageScreen.classList.add("show");
}

function showHover() {
	grid.classList.remove(X_CLASS, O_CLASS);
	if (turn) {
		grid.classList.add(X_CLASS);
	} else {
		grid.classList.add(O_CLASS);
	}
}

function startGame() {
	turn = true;
	cells.forEach((cell) => {
		cell.addEventListener("click", clickHandler, { once: true });
	});
	showHover();
}

function checkWin() {
	for (const combination of WINNING_COMBINATIONS) {
		const [a, b, c] = combination;
		const cellA = cells[a];
		const cellB = cells[b];
		const cellC = cells[c];
		if (
			cellA.classList.contains(currentClass) &&
			cellB.classList.contains(currentClass) &&
			cellC.classList.contains(currentClass)
		) {
			win = true;
			showMessage();
			break;
		}
	}
}
