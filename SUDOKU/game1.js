    
	function shuffle () {
		let mat = Array.from (new Array (9), () => new Array(9));
		// create the root sudoku solution. this produces the following
		// sudoku:
		//
		// 1 2 3 | 4 5 6 | 7 8 9
		// 4 5 6 | 7 8 9 | 1 2 3
		// 7 8 9 | 1 2 3 | 4 5 6
		// ---------------------
		// 2 3 4 | 5 6 7 | 8 9 1
		// 5 6 7 | 8 9 1 | 2 3 4
		// 8 9 1 | 2 3 4 | 5 6 7
		// ---------------------
		// 3 4 5 | 6 7 8 | 9 1 2
		// 6 7 8 | 9 1 2 | 3 4 5
		// 9 1 2 | 3 4 5 | 6 7 8
		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++)
				mat[i][j] = (i*3 + Math.floor(i/3) + j) % 9 + 1;

		// randomly shuffle the numbers in the root sudoku. pick two
		// numbers n1 and n2 at random. scan the board and for each
		// occurence of n1, replace it with n2 and vice-versa. repeat
		// several times. we pick 42 to make Douglas Adams happy.
		for(let i = 0; i < 42; i++) {
			let n1 = Math.ceil(Math.random() * 9);
			let n2;
			do {
				n2 = Math.ceil(Math.random() * 9);
			}
			while(n1 == n2);

			for(let row = 0; row < 9; row++) {
				for(let col = 0; col < col; col++) {
					if(mat[row][col] == n1)
						mat[row][col] = n2;
					else if(mat[row][col] == n2)
						mat[row][col] = n1;
				}
			}
		}

		// randomly swap corresponding columns from each column of
		// subsquares
		//
		//   |       |       |
		//   |       |       |
		//   V       V       V
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//----------------------
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//----------------------
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//
		// note that we cannot swap corresponding rows from each row of
		// subsquares.
		for (let c = 0; c < 42; c++) {
			let s1 = Math.floor(Math.random() * 3);
			let s2 = Math.floor(Math.random() * 3);

			for(let row = 0; row < 9; row++) {
				let tmp = mat[row][(s1 * 3 + c % 3)];
				mat[row][(s1 * 3 + c % 3)] = mat[row][(s2 * 3 + c % 3)];
				mat[row][(s2 * 3 + c % 3)] = tmp;
			}
		}

		// randomly swap columns within each column of subsquares
		//
		//         | | |
		//         | | |
		//         V V V
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//----------------------
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//----------------------
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		for (let s = 0; s < 42; s++) {
			let c1 = Math.floor(Math.random() * 3);
			let c2 = Math.floor(Math.random() * 3);

			for(let row = 0; row < 9; row++) {
				let tmp = mat[row][(s % 3 * 3 + c1)];
				mat[row][(s % 3 * 3 + c1)] = mat[row][ (s % 3 * 3 + c2)];
				mat[row][ (s % 3 * 3 + c2)] = tmp;
			}
		}

		// randomly swap rows within each row of subsquares
		//
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		//----------------------
		// . . . | . . . | . . . <---
		// . . . | . . . | . . . <---
		// . . . | . . . | . . . <---
		//----------------------
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		// . . . | . . . | . . .
		for (let s = 0; s < 42; s++) {
			let r1 = Math.floor(Math.random() * 3);
			let r2 = Math.floor(Math.random() * 3);

			for(let col = 0; col < 9; col++)
			{
				let tmp = mat[(s % 3 * 3 + r1)][col];
				mat[(s % 3 * 3 + r1)][col] = mat[(s % 3 * 3 + r2) ][col];
				mat[(s % 3 * 3 + r2)][col] = tmp;
			}
		}

		// we could also randomly swap rows and columns of subsquares
		//
		//   |       |       |
		//   |       |       |
		// /---\   /---\   /---\
		// . . . | . . . | . . .  \
		// . . . | . . . | . . .  | <---
		// . . . | . . . | . . .  /
		//----------------------
		// . . . | . . . | . . .  \
		// . . . | . . . | . . .  | <---
		// . . . | . . . | . . .  /
		//----------------------
		// . . . | . . . | . . .  \
		// . . . | . . . | . . .  | <---
		// . . . | . . . | . . .  /
		//
		// we could also rotate the board 90, 180 or 270 degrees and
		// mirror left to right and/or top to bottom.
		return mat;
	}



