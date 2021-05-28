var cells = new Array (9); // matrix of cells of the board on the screen
var temporaryMatrix, boardMatrix;

var seconds=0, startTimer = false, timer = null;
const checkNum = 362880
//invalid board matrix; only for check 
const invalidMat = [[2, 4, 7, 5, 9, 6, 8, 3, 1], 
			[9, 3, 1, 4, 2, 5, 7, 6, 8],
			[2, 7, 3, 4, 9, 8, 5, 1, 6],
			[9, 8, 6, 7, 2, 5, 1, 4, 3],
			[6, 2, 7, 8, 9, 3, 1, 5, 4],
			[4, 1, 9, 7, 3, 2, 8, 6, 5],
			[5, 4, 7, 6, 3, 1, 2, 8, 9],
			[2, 6, 3, 1, 5, 4, 7, 8, 9],
			[8, 7, 5, 2, 1, 4, 6, 3, 9]];

			   
//valid board matrixes;
const mat1 = [[8, 3, 5, 4, 1, 6, 9, 2, 7],
			[2, 9, 6, 8, 5, 7, 4, 3, 1],
			[4, 1, 7, 2, 9, 3, 6, 5, 8],
			[5, 6, 9, 1, 3, 4, 7, 8, 2],
			[1, 2, 3, 6, 7, 8, 5, 4, 9],
			[7, 4, 8, 5, 2, 9, 1, 6, 3],
			[6, 5, 2, 7, 8, 1, 3, 9, 4],
			[9, 8, 1, 3, 4, 5, 2, 7, 6],
			[3, 7, 4, 9, 6, 2, 8, 1, 5]]			   

const mat2 = [[5, 3, 4, 6, 7, 8, 9, 1, 2],
			[6, 7, 2, 1, 9, 5, 3, 4, 8],
			[1, 9, 8, 3, 4, 2, 5, 6, 7],
			[8, 5, 9, 7, 6, 1, 4, 2, 3],
			[4, 2, 6, 8, 5, 3, 7, 9, 1],
			[7, 1, 3, 9, 2, 4, 8, 5, 6],
			[9, 6, 1, 5, 3, 7, 2, 8, 4],
			[2, 8, 7, 4, 1, 9, 6, 3, 5],
			[3, 4, 5, 2, 8, 6, 1, 7, 9]]
				
const mat3 = [[7, 8, 4, 1, 5, 9, 3, 2, 6], 
			[5, 3, 9, 6, 7, 2, 8, 4, 1], 
			[6, 1, 2, 4, 3, 8, 7, 5, 9], 
			[9, 2, 8, 7, 1, 5, 4, 6, 3], 
			[3, 5, 7, 8, 4, 6, 1, 9, 2], 
			[4, 6, 1, 9, 2, 3, 5, 8, 7], 
			[8, 7, 6, 3, 9, 4, 2, 1, 5], 
			[2, 4, 3, 5, 6, 1, 9, 7, 8], 
			[1, 9, 5, 2, 8, 7, 6, 3, 4]]

const mat4 = [[8, 9, 5, 7, 4, 2, 1, 3, 6], 
			[2, 7, 1, 9, 6, 3, 4, 8, 5], 
			[4, 6, 3, 5, 8, 1, 7, 9, 2], 
			[9, 3, 4, 6, 1, 7, 2, 5, 8], 
			[5, 1, 7, 2, 3, 8, 9, 6, 4], 
			[6, 8, 2, 4, 5, 9, 3, 7, 1], 
			[1, 5, 9, 8, 7, 4, 6, 2, 3], 
			[7, 4, 6, 3, 2, 5, 8, 1, 9], 
			[3, 2, 8, 1, 9, 6, 5, 4, 7]]	


		
const sudokuBoards = [mat1, mat2, mat3, mat4];	

	start ();		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	function start () {
		let level = getLevelVal ();
		if (level != -1) {
			makeBoardOnScreen();
			setBoardValues();		
			document.getElementsByTagName('h1')[0].innerHTML = "Lets Do It. Level " + level;
			
			seconds = 0;
			startTimer = false;
			document.getElementById ("minutes").innerText = "00";
			document.getElementById ("seconds").innerText = "00";
			document.getElementById ("timerButton").innerText = "Start game";
			clearInterval (timer);
		}
	}

	function getLevelVal () { // gets the level value passed in the url from level's page
		/*var urlParams = new URLSearchParams(window.location.search)
		var level = urlParams.get("level");
		if (level == null) {
			alert ("Didn't get the level");
			return -1;
		}
		
		level = parseInt(level);
		if ((level < 1) || (level > 3)) {
			alert ("invalid level");
			return -1;
		}
		
		return level;*/
		return 1;
	}

	
	function makeBoardOnScreen () { // creates the cells of the board on the screen dynamicaly & puts them into matrix  
		var td, tr, input, row;
		var boardElement = document.getElementById ("sudokuBoard");
		boardElement.innerHTML = "";
		for (let i = 0; i < 9; i++) {
			tr = document.createElement ("tr");
			row = new Array (9);
				for (let j = 0; j < 9; j++) {
					input = document.createElement ("input");
					input.setAttribute ("type", "number");
					input.setAttribute ("max", "9");
					input.setAttribute ("min", "1");
					input.setAttribute ("disabled", "true");
					input.setAttribute ("class", "notDisabled");
					input.setAttribute ("oninput", "javascript: if (this.value.length > 1) this.value = this.value.slice(0, 1);");
					row[j] = input;

					td = document.createElement ("td");
					td.setAttribute ("class", "sudokuBoardCell");
					td.append (input);
					tr.append (td);
				}
				cells[i] = row;
				boardElement.append (tr);
		}
		
		
	}

	function setBoardValues () { // level adjusment of the game
		
		boardMatrix = sudokuBoards[rndNum(3)].map(row => row.slice()); //chooses random boardMatrix and makes copy of it (real assignment copies the pointer);
		temporaryMatrix = setLevelDifficulty (getLevelVal(), boardMatrix); // randomaly adjust the level on the matrix of values
		
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (temporaryMatrix[i][j] != 0) {
					cells[i][j].value = temporaryMatrix[i][j];
					cells[i][j].setAttribute ("class", "disabled");
				}
			}
		}	
	}

	function setLevelDifficulty (level, mat) { //randomaly adjust the level of the game on the matrix of values of the game
		var x, y;
		var newBoard = mat.map(row => row.slice()); // copy of the original matrix
		for (let i = 1; i <= 20 * level; i++) {
			do {
				x = rndNum(9);
				y = rndNum(9);	
			} while (newBoard[y][x] == 0)		
						
			newBoard[y][x] = 0; //
		}
		return newBoard;
	}



	function rndNum (n) { // random numbers
		var num;
		for (let i = 0; i < 10; i++)
			num = Math.floor(Math.random() * n); 
			
		return num; 
	}


	function checkTheBoard () { // gets the matrix of the vales on screen and checks the matrix if it's valid sudoku matrix
		for (let i = 0; i < 9; i++) { // gets the matrix from the cells on the board.
			for (let j = 0; j < 9; j++) {
				temporaryMatrix[i][j] = cells[i][j].value;
			}
		}
		
		let res = checkSudokuValues(temporaryMatrix);
		if (res) alert ("Congratulations! You win the game");
		else alert ("Oh no, you didn't enter the right numbers");  
		
		window.history.back();
	}

	
	function checkSudokuValues (mat) { // checks if matrix is valid sudoku matrix
		let checkMatrix1 = new Array (9), checkMatrix2 = new Array (9); 
		if (mat.length != 9) return false;
		
		
		//check vlidity of each qube in matrix
		for (let i = 0; i < 9; i+=3) {
			for (let j = 0; j < 9; j+=3) {

				for  (let k = 0; k < 9; k++) {
					checkMatrix1[k] = false;
				}

				for (let i1 = i; i1 < i+3; i1++) {
					for (let j1 = j; j1 < j+3; j1++) {

					   if (checkMatrix1[mat[i1][j1] - 1]) return false;		   				   
					   checkMatrix1[mat[i1][j1] - 1] = true; 
					}
				}
				
			}
		}

		//vertical & horizontal vlidity check of the matrix
		for (let i = 0; i < 9; i++) {
			 
			for  (let k = 0; k < 9; k++) {
				checkMatrix1[k] = false;
				checkMatrix2[k] = false;
			}
			
			for (let j = 0; j < 9; j++) {			
			   if (checkMatrix1[mat[i][j] - 1]) return false;		   
			   checkMatrix1[mat[i][j] - 1] = true;
			   
			   if (checkMatrix2[mat[j][i] - 1]) return false;		   
			   checkMatrix2[mat[j][i] - 1] = true;
			}
		
		}

		return true;
	
	}
	
	function checkSudokuValues1 (mat) { // checks if matrix is valid sudoku matrix
		let checkMatrix1 = 0, checkMatrix2 = 0; 
		if (mat.length != 9) return false;
		
		
		//check vlidity of each qube in matrix
		for (let i = 0; i < 9; i+=3) {
			for (let j = 0; j < 9; j+=3) {

				checkMatrix1 = 1;

				for (let i1 = i; i1 < i+3; i1++) {
					for (let j1 = j; j1 < j+3; j1++) {
					   checkMatrix1 *= mat[i1][j1];
					}
				}
				
				if (checkMatrix1 != checkNum) return false;
			}
		}

		//vertical & horizontal vlidity check of the matrix
		for (let i = 0; i < 9; i++) {
			checkMatrix1 = 1;
			checkMatrix2 = 1;
			for (let j = 0; j < 9; j++) {			
				checkMatrix1 *= mat[i][j];
				checkMatrix2 *= mat[j][i];
			}

			if (checkMatrix1 != checkNum) return false;
			if (checkMatrix2 != checkNum) return false;
		
		}

		return true;
	
	}


	function showValues() { // Show the answers
		if (!startTimer) {
			alert ("Can't fill the board without the timer is not running");
			return;
		}
		
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				cells[i][j].value = boardMatrix[i][j];
			}
		}

	}


	function startStopTimer () { // Start / Stop timer
		var pad  = n => (n < 10) ? "0" + n : n;  
		
		startTimer = !startTimer;
		
		if (startTimer) {

			timer = setInterval (function () {
				document.getElementById ("minutes").innerText = pad(parseInt(++seconds / 60,10))
				document.getElementById ("seconds").innerText = pad(parseInt(seconds % 60));
			}, 1000);				
				
			for (let item of document.getElementsByClassName ("notDisabled")) { 
				item.removeAttribute ("disabled");
			}
						
			//document.getElementById ("timerButton").style.backgroundImage = "url('./Imgs/Pause-icon.png')";
			document.getElementById ("timerButton").innerText = "Stop game";
		}
		
		else {
			clearInterval (timer);
			for (let item of document.getElementsByClassName ("notDisabled")) {
				item.setAttribute ("disabled", true);
			}		
			//document.getElementById ("timerButton").style.backgroundImage = "url('./Imgs/Start-icon.png')";
			document.getElementById ("timerButton").innerText = "Start game";			
		}
	}
