class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // TODO: Create and return an 2D Array
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    const arr = [];
    for(let i = 0; i < this.height; i++){
      var tempArr = [];
      for(let j = 0; j < this.width ; j++){
        tempArr.push(0);
      }
      arr.push(tempArr);
    }
    return arr;
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */
  getCell(row, col){
    if(row >= this.height) return 0;
    if(col >= this.width || row < 0 || col < 0 || row === undefined || col === undefined){
      return 0;
    } else{
      return this.board[row][col]
    }
  }

  setCell(value, row, col){
  if(row >= this.height) return "Invalid Coordinates.";
  if(col >= this.width || row < 0 || col < 0 || row === undefined || col === undefined) return "Invalid Coordinates."
  
  return this.board[row][col] = value
  
  }
  
  toggleCell(row, col){
    if(row >= this.height) return "Invalid Coordinates.";
    if(col >= this.width || row < 0 || col < 0 || row === undefined || col === undefined) return "Invalid Coordinates."
    if(this.board[row][col] === 1){
      this.board[row][col] = 0
    } else if(this.board[row][col] === 0)
      this.board[row][col] = 1
    }
  
  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
    var num = 0;
    if(this.getCell(row-1, col-1) === 1) num++;
    if(this.getCell(row-1, col) === 1) num++;
    if(this.getCell(row-1, col+1) === 1) num++;
    if(this.getCell(row, col+1) === 1) num++;
    if(this.getCell(row+1, col+1) === 1) num++;
    if(this.getCell(row+1, col) === 1) num++;
    if(this.getCell(row+1, col-1) === 1) num++;
    if(this.getCell(row, col-1) === 1) num++;

    return num;
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    

    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width ; j++){
        var neighbors = this.livingNeighbors(i, j);
        
        if(neighbors < 2){
          newBoard[i][j] = 0;
        }else if(neighbors > 3){
          newBoard[i][j] = 0;
        }else if(neighbors === 3){
          newBoard[i][j] = 1;
        }else if(neighbors === 2 && this.board[i][j] === 1){
          newBoard[i][j] = 1;
        }
        
      }
    }
    this.board = newBoard;
  }
}
