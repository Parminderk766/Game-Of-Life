const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);


/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);


/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //
  // To find all the <td>s in the table, you might query the DOM for them, or you
  // could choose to collect them when we create them in createTable.
  //
  // HINT:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
  

  const allTds = Array.from(document.getElementsByTagName("td"))
  var num = 0;
  for(let i = 0; i < height; i++){
    for(let j = 0; j < width; j++){
      if(gol.board[i][j] === 1){
        allTds[num].classList.add("alive")
      } else if(gol.board[i][j] === 0){
        allTds[num].classList.remove("alive")
      }
      num++;
    }
  }
  return num;
}


/**
 * Event Listeners
 */
var interval;
// PK: I moved the plat-btn on top so that i can stop the interval when I click on any button;
document.getElementById("play_btn").addEventListener("click", event => {
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
  // HINT:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
  clearInterval(interval)
  interval = setInterval(function() {
    gol.tick();
    paint();
    var num;
  }, 300);
  
});

document.getElementById("board").addEventListener("click", event => {
  // TODO: Toggle clicked cell (event.target) and paint
  clearInterval(interval)
  let x = event.target.getAttribute("data-row");
  let y = event.target.getAttribute("data-col");
  gol.toggleCell(x, y);
  paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  // TODO: Do one gol tick and paint
  clearInterval(interval)
  gol.tick();
  paint();
});



document.getElementById("random_btn").addEventListener("click", event => {
  // TODO: Randomize the board and paint
  clearInterval(interval)
  for(let i = 0; i < height; i++){
    for(let j = 0; j < width; j++){
      gol.board[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = Math.floor(Math.random() * 2)
    }
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  // TODO: Clear the board and paint
  clearInterval(interval)
  for(let i = 0; i < height; i++){
    for(let j = 0; j < width; j++){
      gol.board[i][j] = 0;
    }
  }
  paint();
});
