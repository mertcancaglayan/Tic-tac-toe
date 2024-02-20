const startBtn = document.getElementById("start-btn");
const grid = document.getElementById("grid");
const cells = document.querySelectorAll("[data-cell]");
const restartBtn = document.getElementById("restart-btn");
const messageScreen = document.querySelector("#win-message");
const loadScreen = document.querySelector(".load");
const bodyElement = document.querySelector("body");
const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector(".theme-btn i");
const title = document.getElementById("title");
const scoreBoard = document.getElementById("scoreboard");


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

let playerXScore = 0;
let playerOScore = 0;
let win = false;
let currentClass;
let turn;

setTimeout(() => {
	startBtn.style.display = "flex"; // Show the start button after 3 seconds
}, 3000);

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
		if (!win && checkDraw()) {
			showMessage("draw");
		}
	}
}

function showMessage(result) {
	let message = document.querySelector("#message");

	if (result === "draw") {
		message.textContent = "It's a draw!";
	} else if (result === "win") {
		message.textContent = currentClass.toUpperCase() + " Wins";
	}

	messageScreen.style.display = "flex";
	messageScreen.classList.add("show");
	grid.style.display = "none";
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
	startBtn.style.display = "none";
	grid.style.display = "grid";
	title.style.display = "flex";
	scoreBoard.style.display = "flex";

	turn = true;
	win = false;

	cells.forEach((cell) => {
		cell.classList.remove(X_CLASS, O_CLASS);
		cell.removeEventListener("click", clickHandler);
		cell.addEventListener("click", clickHandler, { once: true });
	});
	showHover();
	messageScreen.classList.remove("show");
	messageScreen.style.display = "none";
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
			updateScoreboard(currentClass);
			showMessage("win");
			break;
		}
	}
}

function checkDraw() {
	return [...cells].every((cell) => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
}

restartBtn.addEventListener("click", () => {
	startGame();
});

startBtn.addEventListener("click", () => {
	startGame();
});

let theme = "dark";

function changeTheme() {
	if (theme === "light") {
		bodyElement.style.backgroundColor = "#121212";
		themeIcon.style.color = "#fff";
		messageScreen.style.backgroundColor = "#121212";
		messageScreen.style.color = "#fff";
		title.style.color = "#fff";

		cells.forEach((cell) => {
			cell.style.boxShadow = "0 0 0 2px #121212";
		});

		theme = "dark";
	} else {
		bodyElement.style.backgroundColor = "#fff";
		themeIcon.style.color = "#000";
		messageScreen.style.backgroundColor = "#fff";
		messageScreen.style.color = "#000";
		title.style.color = "#000";

		cells.forEach((cell) => {
			cell.style.boxShadow = "0 0 0 2px #fff";
		});

		theme = "light";
	}
}

document.getElementById('playerX-score').textContent = `Player X: ${playerXScore}`;
document.getElementById('playerO-score').textContent = `Player O: ${playerOScore}`;

function updateScoreboard(winner) {
    if (winner === 'x') {
        playerXScore++;
    } else if (winner === 'o') {
        playerOScore++;
    }

    document.getElementById('playerX-score').textContent = `Player X: ${playerXScore}`;
    document.getElementById('playerO-score').textContent = `Player O: ${playerOScore}`;
}

themeBtn.addEventListener("click", changeTheme);
