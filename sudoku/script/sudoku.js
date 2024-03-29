var canvas = document.getElementById("sudokucanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

var gridSize = 9;
var squareSize = 0;
var grid = [{}];
var cages = [];
var selectedSquares = [];
var selectedNumber = 0;
var selectedNote = 0;
var selectedCellColor = "#b3d9ff";
var hintCellColor = "#b3d9ff";
var currentRow, currentCol;
var missingNumbers = [];
var notesMode = false;
var solution = '';
var gameOver = false;
var color1 = "#ffc9f7";
var color2 = "#cfffc9";
var color3 = "#fbff9e";

if (canvas.width <= canvas.height) {
    squareSize = canvas.width / gridSize;
} else {
    squareSize = canvas.height / gridSize;
}

class SudokuSquare {
    constructor(value, row, col) {
        this.value = value;
        this.possibleValues = [];
        this.selected = false;
        this.row = row;
        this.col = col;
        this.animationStartFrame = getRandomInt(0, 100);
        this.currentFrame = 0;
        this.color = 0;

        if (this.value != 0) {
            this.fixed = true;
        } else {
            this.fixed = false;
        }
    }
}

class Cage {
    constructor(squares) {
        this.id = squares[0];
        this.total = 0;
        this.squares = squares;
        this.possibleValues = [];

        for (var i = 0; i < squares.length; i++) {
            this.total += parseInt(solution[squares[i]]);
        }
        // var combos = killerCombos.filter(c => c[0].toString().startsWith(this.total) && c[1].toString().length == squares.length);
        // for (var i = 0; i < combos.length; i++) {
        //     this.possibleValues.push(combos[i][1]);
        // }
    }
}

var isDragging = false;
let snapshots = [];

function takeSnapshot() {
    let snapshot = JSON.parse(JSON.stringify(grid));

    snapshots.unshift(snapshot);

    if (snapshots.length > 40) {
        snapshots.pop();
    }
}

function undo() {
    if (snapshots.length === 0) {
        return;
    }

    let snapshot = snapshots.shift();

    grid = snapshot;

    DeselectCells();
    DrawStuff();
}

function ClearAllNotes() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].possibleValues = [];
        }
    }
    DrawStuff();
}

function ClearSquares() {
    takeSnapshot();
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected && !grid[row][col].fixed) {
                grid[row][col].value = 0;
                grid[row][col].possibleValues = [];
            }
        }
    }
}

function NewGame(difficulty) {
    if (!confirm("Are you sure you want to start a new game?")) return;

    localStorage.removeItem("numbers");
    localStorage.removeItem("grid");
    DrawStuff(false);
    LoadBoard(difficulty);
}
function AddListeners() {

    clearNotesButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all notes?")) {
            ClearAllNotes();
        }
    });

    randomButton.addEventListener("click", function () {
        if (confirm("Are you sure you want randomise the board?")) {
            RandomiseBoard();
        }
    });

    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x =
            (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
        var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
        MouseTouchDown(x, y);
    });

    canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * window.devicePixelRatio;
        var y = (event.clientY - rect.top) * window.devicePixelRatio;
        MouseTouchDown(x, y);
    });



    canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        if (isDragging) {
            var rect = canvas.getBoundingClientRect();
            var x =
                (event.touches[0].clientX - rect.left) *
                window.devicePixelRatio;
            var y =
                (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
            SelectSquare(x, y);
        }
    });

    canvas.addEventListener("mousemove", function (event) {
        event.preventDefault();
        if (isDragging) {
            var rect = canvas.getBoundingClientRect();
            var x = (event.clientX - rect.left) * window.devicePixelRatio;
            var y = (event.clientY - rect.top) * window.devicePixelRatio;
            SelectSquare(x, y);
        }
    });

    canvas.addEventListener("touchend", function (event) {
        MouseUpTouchEnd(event);
    });

    canvas.addEventListener("mouseup", function (event) {
        MouseUpTouchEnd(event);
    });
}

function MouseTouchDown(x, y) {
    if (GetSudokuSquareFromPixelCoordinates(x, y) != undefined) {
        DeselectCells();
    }
    SelectSquare(x, y);
    isDragging = true;
}

function GetSudokuSquareFromPixelCoordinates(x, y) {

    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);

    return grid[row][col];
}

function MouseUpTouchEnd(event) {
    event.preventDefault();
    isDragging = false;
    currentRow = -1;
    currentCol = -1;
    if (GridFlat().filter(square => square.selected == true && square.fixed).length == 1) {
        //DeselectCells();
        DrawStuff();
    }
}

function RandomiseBoard() {
    if (cages.length != 0) return;

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var randomNumbers = [];
    while (numbers.length > 0) {
        var index = Math.floor(Math.random() * numbers.length);
        randomNumbers.push(numbers[index]);
        numbers.splice(index, 1);
    }

    var n = GridFlat().map(square => square.value).join('');

    var n2 = '';
    for (var i = 0; i < n.length; i++) {
        var value = parseInt(n[i]);
        if (value != 0) {
            n2 += randomNumbers[value - 1];
        } else {
            n2 += '0';
        }
    }

    var n3 = '';
    for (var i = 0; i < 81; i++) {
        n3 += n2[gridRotate[i]];
    }


    window.location.href = "index.html?n=" + n3;
}

function HighlightSquares() {
    if (grid.length != 9) return;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var x, y;

            ctx.fillStyle = "#FFF";;
            if (grid[row][col].fixed) {
                ctx.fillStyle = "#DDD";
            }
            if (selectedNumber != 0 && grid[row][col].value == selectedNumber) {
                ctx.fillStyle = hintCellColor;
            }
            if (grid[row][col].selected == true) {
                ctx.fillStyle = "#BFB";
                anySelected = true;
            }
            ctx.fillRect(
                col * squareSize,
                row * squareSize,
                squareSize,
                squareSize
            );
            var index =
                grid[row][col].possibleValues.indexOf(selectedNumber);
            if (index >= 0 && grid[row][col].value == 0) {
                ctx.fillStyle = hintCellColor;
                switch (grid[row][col].possibleValues[index]) {
                    case 1:
                        x = (col + 0.2) * squareSize;
                        y = (row + 0.2) * squareSize;
                        break;
                    case 2:
                        x = (col + 0.4) * squareSize;
                        y = (row + 0.2) * squareSize;
                        break;
                    case 3:
                        x = (col + 0.6) * squareSize;
                        y = (row + 0.2) * squareSize;
                        break;
                    case 4:
                        x = (col + 0.2) * squareSize;
                        y = (row + 0.4) * squareSize;
                        break;
                    case 5:
                        x = (col + 0.4) * squareSize;
                        y = (row + 0.4) * squareSize;
                        break;
                    case 6:
                        x = (col + 0.6) * squareSize;
                        y = (row + 0.4) * squareSize;
                        break;
                    case 7:
                        x = (col + 0.2) * squareSize;
                        y = (row + 0.6) * squareSize;
                        break;
                    case 8:
                        x = (col + 0.4) * squareSize;
                        y = (row + 0.6) * squareSize;
                        break;
                    case 9:
                        x = (col + 0.6) * squareSize;
                        y = (row + 0.6) * squareSize;
                        break;
                    default:
                        break;
                }
                ctx.beginPath();
                ctx.roundRect(x, y, squareSize / 5, squareSize / 5, [5]);
                ctx.fill();
            }

        }
    }
}

function ShowHintSmall() {

    selectedNote = 0;
    selectedNumber = 0;
    var foundOne = false;
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    DeselectCells(true);

    for (var row = 0; row < 9; row++) {
        if (foundOne) break;
        for (var col = 0; col < 9; col++) {
            if (foundOne) break;

            if (grid[array[row]][array[col]].value != 0) continue;

            var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (var x = 0; x < 9; x++) {
                if (possibilities.length > 0) {
                    possibilities = possibilities.filter(item => item !== grid[array[row]][array[x]].value);
                }
            }
            for (var y = 0; y < 9; y++) {
                if (possibilities.length > 0) {
                    possibilities = possibilities.filter(item => item !== grid[array[y]][array[col]].value);
                }
            }

            var newRow = Math.floor(array[row] / 3) * 3;
            var newCol = Math.floor(array[col] / 3) * 3;

            for (var i = newRow; i < newRow + 3; i++) {
                for (var j = newCol; j < newCol + 3; j++) {
                    if (possibilities.length > 0) {
                        possibilities = possibilities.filter(item => item !== grid[i][j].value);
                    }
                }
            }
            if (possibilities.length == 1) {
                grid[array[row]][array[col]].selected = true;
                DrawStuff();
                return;
            }
            //alert(possibilities.join(','));
        }
    }

    DrawStuff();
}

function ShowHintBig() {

    selectedNote = 0;
    selectedNumber = 0;

    DeselectCells();
    takeSnapshot();
    var hintFound = false;
    while (!hintFound) {

        var row = getRandomInt(0, 8);
        var col = getRandomInt(0, 8);

        if (grid[row][col].value == 0) {
            grid[row][col].value = parseInt(solution[row * 9 + col]);
            grid[row][col].selected = true;
            selectedNumber = parseInt(solution[row * 9 + col]);
            hintFound = true;
        }
    }
    DrawStuff();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SelectSquare(x, y) {

    var row = y / squareSize;
    var col = x / squareSize;

    if (x <= 9 * squareSize) {
        if (row % 1 < 0.15 || row % 1 > 0.85 || col % 1 < 0.15 || col % 1 > 0.85) {
            return;
        }
    }

    if (isDragging && x > 9 * squareSize) {
        return;
    }

    row = Math.floor(y / squareSize);
    col = Math.floor(x / squareSize);

    if (currentRow == row && currentCol == col) return;

    // console.log(
    //     `currentRow: ${currentRow}, currentCol: ${currentCol}, col: ${col}, row: ${row}`
    // );
    currentRow = row;
    currentCol = col;

    if (row < 9 && col < 9) {
        grid[row][col].selected = true;
        selectedNote = 0;
        selectedNumber = 0;
        if (GridFlat().filter(square => square.selected == true).length == 1) {
            selectedNumber = GridFlat().filter(square => square.selected == true)[0].value;
        }
    } else if (row > 0 && row <= 3 && col > 9 && col < 13) {
        // Number in toolboxnumbers clicked
        selectedNumber = (row - 1) * 3 + (col - 9);
        selectedNote = selectedNumber;
        notesMode ? ToggleNote() : ToggleNumber();
    } else if (row == 4 && col == 10) {
        // clear clicked
        ClearSquares();
    } else if (row == 6 && col == 10) {
        // undo clicked
        ShowHintSmall();
    } else if (row == 5 && col == 10) {
        // undo clicked
        undo();
    } else if (row == 0 && col == 10) {
        // toggle clicked
        ToggleNotesMode();
    } else if (row == 7 && col == 10) {
        // hintB clicked
        ShowHintBig();
    } else if (row >= 4 && col >= 11 && col <= 12) {
        TogglePossibleCombo(x, y);
    } else {
        DeselectCells();
        selectedNumber = 0;
        selectedNote = 0;
    }

    DrawStuff();
}

function TogglePossibleCombo(x, y) {
    var index = Math.floor((y - (3.75 * squareSize)) / squareSize / 0.45) - 1;
    var highlightedSquares = GridFlat().filter(square => square.selected);
    for (var i = 0; i < highlightedSquares.length; i++) {
        row = highlightedSquares[i].row;
        col = highlightedSquares[i].col;
        var item;

        for (var j = 0; j < cages.length; j++) {
            if (cages[j].squares.includes(row * 9 + col)) {
                var possibleValues = cages[j].possibleValues.split(' ');
                if (possibleValues[index].startsWith('*')) {
                    possibleValues[index] = possibleValues[index].substring(1);
                    item = possibleValues.splice(index, 1)[0];
                    possibleValues.unshift(item);
                } else {
                    possibleValues[index] = '*' + possibleValues[index];
                    item = possibleValues.splice(index, 1)[0];
                    possibleValues.push(item);
                }
                cages[j].possibleValues = possibleValues.join(' ');
                localStorage.setItem('cages', JSON.stringify(cages));
                return;
            }
        }
    }
}

function DeselectCells() {
    selectedNumber = 0;
    selectedNote = 0;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].selected = false;
        }
    }
}
function ToggleNotesMode() {
    notesMode = !notesMode;
    DrawStuff();
}

function ToggleNote() {
    if (selectedNote == 0) return;

    takeSnapshot();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true) {
                if (!grid[row][col].possibleValues.includes(selectedNote)) {
                    grid[row][col].possibleValues.push(selectedNote);
                } else {
                    let index =
                        grid[row][col].possibleValues.indexOf(selectedNote);

                    if (index >= 0) {
                        grid[row][col].possibleValues.splice(index, 1);
                    }
                }
            }
        }
    }
    //DeselectCells();
}

function ToggleNumber() {
    if (selectedNumber == 0) return;

    var fillingOnlyOne = missingNumbers.length == 1;

    if (GridFlat().filter(square => square.selected == true).length > 1 &&
        !fillingOnlyOne) {
        ToggleNote();
        return;
    }
    takeSnapshot();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (fillingOnlyOne && grid[row][col].value != 0) {
                grid[row][col].selected = false;
            }
            if (grid[row][col].selected == true && !grid[row][col].fixed) {
                if (
                    grid[row][col].value == 0 ||
                    grid[row][col].value != selectedNumber
                ) {
                    grid[row][col].value = selectedNumber;
                } else {
                    grid[row][col].value = 0;
                }
            }
        }
    }
    //DeselectCells();
}

function DrawStuff(drawnumbers = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawProgress();
    HighlightSquares();
    CalculateHoles();
    DrawToolboxExtras();
    if (notesMode) {
        DrawToolboxNotes();
    } else {
        DrawToolboxNumbers();
    }
    DrawTotalHighlighted();
    DrawKillerCombinations();
    DrawLines();

    if (drawnumbers) {
        DrawNumbers();
    } else {
        DrawLoading();
    }
    if (cages.length > 0) {
        DrawKiller();
    }
    DrawDifficulty();

    if (GridFlat().map(square => square.value).join('').includes(0)) {
        gameOver = false;
    }
    if (!gameOver && solution != "" && GridFlat().map(square => square.value).join('') == solution) {
        isDragging = false;
        gameOver = true;
        PlayAnimation();

        DrawStuff();
    }
}

function DrawDifficulty() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    var difficulty = "";
    if (localStorage.getItem("difficulty") != "null") {
        difficulty = localStorage.getItem("difficulty");
        ctx.textAlign = "left";

        ctx.fillText("Difficulty: " + difficulty, squareSize * 9 + 20, squareSize * 9 - 20);
    }
}

function PlayAnimation() {
    DeselectCells();
    selectedNumber = 1;

    function run() {
        selectedNumber++;
        console.log("Function is running. Counter: " + selectedNumber);

        if (selectedNumber >= 10) {
            DeselectCells();
            DrawStuff();
            clearInterval(intervalId);
            if (confirm("Done! Do you want to clear the board and start again?")) {
                ClearAllNotes();
                DeselectCells();
                selectedNumber = 0;
                selectedNote = 0;

                for (var row = 0; row < 9; row++) {
                    for (var col = 0; col < 9; col++) {
                        grid[row][col].selected = false;
                        grid[row][col].possibilities = false;
                        if (!grid[row][col].fixed) {
                            grid[row][col].value = 0;
                        }
                    }
                }
            }
        }
        DrawStuff();
    }

    // Start the interval
    const intervalId = setInterval(run, 400);
}


function GridFlat() {
    var array1D = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            array1D.push(grid[i][j]);
        }
    }

    return array1D;
}

function CalculateHoles() {
    missingNumbers = [];

    if (grid.length != 9) return;


    if (GridFlat().filter(square => square.selected == true).length != 9) return;

    var selectedNumbers = GridFlat().filter(square => square.selected && square.value != 0).map(square => square.value);
    missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !selectedNumbers.includes(n));

}

function DrawLoading() {
    const width = 300;
    const height = 100;
    const x = squareSize * 4.5 - width / 2;
    const y = squareSize * 4.5 - height / 2;

    ctx.fillStyle = "#BBDDff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    const message = "Generating, please wait...";
    ctx.fillStyle = "#000000";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(message, x + width / 2, y + height / 2 + 1);
}

async function fetchSudokuBoard(difficulty) {
    const response = await fetch(
        "https://sugoku.onrender.com/board?difficulty=" + difficulty
    );
    const data = await response.json();
    return data.board;
}

document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('n')) {
        var paramNumbers = '';
        var paramSolution = '';
        var paramCages = '';
        var paramDifficulty = '';

        paramNumbers = urlParams.get('n');
        if (urlParams.has('s')) {
            paramSolution = urlParams.get('s');
        } else {
            localStorage.removeItem("solution");
        }
        if (urlParams.has('c')) {
            paramCages = urlParams.get('c');
        } else {
            localStorage.removeItem("cages");
        }

        if (urlParams.has('d')) {
            paramDifficulty = urlParams.get('d');
        } else {
            localStorage.removeItem("difficulty");
        }

        window.location.replace(window.location.pathname);

        numbers = numbersTo2DArray(paramNumbers);
        localStorage.setItem("numbers", JSON.stringify(numbers));

        localStorage.setItem("solution", JSON.stringify(paramSolution));

        localStorage.setItem("difficulty", paramDifficulty);

        localStorage.removeItem("grid");
        PopulateGrid();
        CreateCages(paramCages);
        RotatePuzzle();
        DrawStuff();
    }
    AddListeners();
    DrawStuff(false);

    LoadBoard("easy");
});


function RotatePuzzle() {
    //need to rotate numbers, cages and solution
    // using gridRotate array to map the rotation

}


function numbersTo2DArray(str) {
    let array = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
        let row = [];

        for (let j = 0; j < 9; j++) {
            row.push(parseInt(str.charAt(index)));
            index++;
        }

        array.push(row);
    }

    return array;
}

function LoadBoard(difficulty) {
    // get localstorage object called numbers, assign it to the numbers variable. If it doesn't exist, create it and call the fetch function
    if (localStorage.getItem("numbers") == null) {
        var numbers = [];

        fetchSudokuBoard(difficulty)
            .then((board) => {
                numbers = board;
                // console.log(board);
                localStorage.setItem("numbers", JSON.stringify(numbers));
                PopulateGrid();
                DrawStuff();
            })
            .catch((error) => {
                console.error("Error fetching Sudoku board:", error);
            });
    } else {
        PopulateGrid();
        DrawStuff();
    }
}
function PopulateGrid() {
    var numbers = JSON.parse(localStorage.getItem("numbers"));

    if (localStorage.getItem("grid") != null) {
        grid = JSON.parse(localStorage.getItem("grid"));
    } else {
        grid = Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => new SudokuSquare(0, 0, 0))
        );
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                var value = numbers[row][col];
                grid[row][col] = new SudokuSquare(value, row, col);
            }
        }
    }
    if (localStorage.getItem("cages") != null) {
        cages = JSON.parse(localStorage.getItem("cages"));
    }


    if (localStorage.getItem("solution") != null && localStorage.getItem("solution") != '""') {
        solution = JSON.parse(localStorage.getItem("solution"));
        solution = solution.replaceAll(',', '');
        //solution = solution.split(',');
    } else {
        solution = solveSudoku(GridFlat().map(obj => obj.value).join(''));
        localStorage.setItem("solution", JSON.stringify(solution));
    }
    if (solution.includes('0')) {
        alert('Doesn\'t look like this puzzle is solvable using logic...is the puzzle broken?');
    }
}

function CreateCages(cagesString) {
    if (cagesString == '') {
        return;
    }
    c = JSON.parse(cagesString);
    c = eval(c);
    cages = [];
    for (let i = 0; i < c.length; i++) {
        var newCage = new Cage(c[i]);
        newCage.possibleValues = killerCombos[newCage.total][newCage.squares.length];
        cages.push(newCage);
    }
    localStorage.setItem("cages", JSON.stringify(cages));
}

function DrawNumbers() {
    localStorage.setItem("grid", JSON.stringify(grid));

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            var value = grid[row][col].value;
            if (value != 0) {
                var x = (col + 0.5) * squareSize;
                var y = (row + 0.5) * squareSize;
                ctx.font = squareSize * 0.6 + "px Arial";
                if (grid[row][col].fixed) {
                    ctx.fillStyle = "#000";
                } else if (ClashExists(row, col)) {
                    ctx.fillStyle = "#F00";
                } else {
                    ctx.fillStyle = "#009";
                }

                ctx.fillText(value, x, y);
            } else {
                ctx.font = squareSize * 0.2 + "px Arial";
                ctx.fillStyle = "#006";
                for (i = 0; i < grid[row][col].possibleValues.length; i++) {
                    switch (grid[row][col].possibleValues[i]) {
                        case 1:
                            x = (col + 0.32) * squareSize;
                            y = (row + 0.32) * squareSize;
                            break;
                        case 2:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.32) * squareSize;
                            break;
                        case 3:
                            x = (col + 0.68) * squareSize;
                            y = (row + 0.32) * squareSize;
                            break;
                        case 4:
                            x = (col + 0.32) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 5:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 6:
                            x = (col + 0.68) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 7:
                            x = (col + 0.32) * squareSize;
                            y = (row + 0.68) * squareSize;
                            break;
                        case 8:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.68) * squareSize;
                            break;
                        case 9:
                            x = (col + 0.68) * squareSize;
                            y = (row + 0.68) * squareSize;
                            break;
                        default:
                            break;
                    }
                    ctx.fillText(grid[row][col].possibleValues[i], x, y);
                }
            }
        }
    }
}

function ClashExists(row, col) {
    for (var i = 0; i < 9; i++) {
        if (i != col && grid[row][col].value == grid[row][i].value) {
            return true;
        }
    }
    for (var i = 0; i < 9; i++) {
        if (i != row && grid[row][col].value == grid[i][col].value) {
            return true;
        }
    }

    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;

    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if ((i != row || j != col) && grid[row][col].value == grid[i][j].value) {
                return true;
            }
        }
    }
    if (solution[row * 9 + col] != grid[row][col].value) {
        return true;
    }
    return false;
}

function DrawLines() {
    ctx.strokeStyle = "#100";
    ctx.lineCap = "round";
    for (var i = 0; i <= gridSize; i++) {
        if (i % 3 == 0) {
            ctx.lineWidth = 5;
        } else {
            ctx.lineWidth = 1;
        }
        ctx.beginPath();
        ctx.moveTo(i * squareSize, 0);
        ctx.lineTo(i * squareSize, squareSize * 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * squareSize);
        ctx.lineTo(squareSize * 9, i * squareSize);
        ctx.stroke();
    }
}

function DrawKiller() {


    //DrawSquareIndexes();

    for (var i = 0; i < cages.length; i++) {
        var currentCage = cages[i];
        for (var j = 0; j < currentCage.squares.length; j++) {
            if (j == 0) {
                DrawKillerCageTotal(currentCage);
            }
            var hasRight = currentCage.squares.includes(currentCage.squares[j] + 1);
            var hasLeft = currentCage.squares.includes(currentCage.squares[j] - 1);
            var hasTop = currentCage.squares.includes(currentCage.squares[j] - 9);
            var hasBottom = currentCage.squares.includes(currentCage.squares[j] + 9);

            if (!hasRight) {
                DrawKillerBorder(currentCage.squares[j], "right");
            }
            if (!hasLeft) {
                DrawKillerBorder(currentCage.squares[j], "left");
            }
            if (!hasTop) {
                DrawKillerBorder(currentCage.squares[j], "top");
            }
            if (!hasBottom) {
                DrawKillerBorder(currentCage.squares[j], "bottom");
            }
        }
    }
}

function DrawKillerBorder(squareIndex, side) {
    ctx.strokeStyle = "#100";
    //ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);

    var buffer = squareSize * 0.05;
    var row = squareIndex % 9;
    var col = Math.floor(squareIndex / 9);
    var x = row * squareSize + buffer;
    var y = col * squareSize + buffer;
    var x2 = (row + 1) * squareSize - buffer;
    var y2 = (col + 1) * squareSize - buffer;

    if (side == "top") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
    }
    if (side == "left") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y2);
        ctx.stroke();
    }
    if (side == "bottom") {
        ctx.beginPath();
        ctx.moveTo(x, y2);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    if (side == "right") {

        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

function DrawSquareIndexes() {
    var counter = 0;
    for (var col = 0; col < 9; col++) {
        for (var row = 0; row < 9; row++) {
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            // ctx.textAlign = "right";
            ctx.fillText(counter, row * squareSize + (squareSize * 0.8), col * squareSize + (squareSize * 0.8));
            counter++;
        }
    }
}

function DrawKillerCageTotal(cage) {
    var row = cage.squares[0] % 9;
    var col = Math.floor(cage.squares[0] / 9);

    ctx.font = squareSize * 0.2 + "px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(cage.total, row * squareSize + (squareSize * 0.2), col * squareSize + (squareSize * 0.2));
}

function DrawTotalHighlighted() {
    var total = 0;
    var row, col;

    var highlightedSquares = GridFlat().filter(square => square.selected);
    var cageIDsSelected = [];
    for (var i = 0; i < highlightedSquares.length; i++) {
        row = highlightedSquares[i].row;
        col = highlightedSquares[i].col;
        for (var j = 0; j < cages.length; j++) {
            if (cages[j].squares.includes(row * 9 + col)) {
                if (allCagesSelected(cages[j])) {
                    if (!cageIDsSelected.includes(cages[j].id)) {
                        cageIDsSelected.push(cages[j].id);
                    }
                } else {
                    return;
                }
            }
        }
    }
    for (var i = 0; i < cageIDsSelected.length; i++) {
        total += cages.find(cage => cage.id == cageIDsSelected[i]).total;
    }
    if (total > 0) {
        ctx.font = squareSize * 0.4 + "px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(total, 12 * squareSize, (squareSize / 2));
    }
}

function DrawKillerCombinations() {
    var row, col;
    var highlightedSquares = GridFlat().filter(square => square.selected);
    for (var i = 0; i < highlightedSquares.length; i++) {
        row = highlightedSquares[i].row;
        col = highlightedSquares[i].col;

        for (var j = 0; j < cages.length; j++) {
            if (cages[j].squares.includes(row * 9 + col)) {
                ctx.font = squareSize * 0.3 + "px Arial";
                ctx.fillStyle = "black";
                for (var k = 0; k < cages[j].possibleValues.split(' ').length; k++) {
                    var value = cages[j].possibleValues.split(' ')[k];
                    var y = 4 * squareSize + (squareSize / 2) + (k * squareSize * 0.45);
                    if (value.startsWith("*")) {
                        ctx.fillStyle = "gainsboro";
                        value = value.replace("*", "");
                    } else {
                        ctx.fillStyle = "black";
                    }
                    ctx.fillText(value, 12 * squareSize, y);

                }
                return;
            }
        }
    }
}

function GetKillerCombos(total, cageSize) {
    var result = [];
    total = Math.round(total);
    var combos = killerCombos.filter(c => c[0].toString().startsWith(total) && c[1].toString().length == cageSize);
    for (var i = 0; i < combos.length; i++) {
        result.push(combos[i][1]);
    }
    return result;
}

function allCagesSelected(cage) {
    var allCagesSelected = true;
    for (var k = 0; k < cage.squares.length; k++) {
        var squareIndex = cage.squares[k];
        var row = Math.floor(squareIndex / 9);
        var col = squareIndex % 9;
        if (!grid[row][col].selected) {
            allCagesSelected = false;
        }
    }
    return allCagesSelected;
}

// function GetCageTotal(cage) {
//     var total = 0;
//     for (var k = 0; k < cage.length; k++) {
//         var squareIndex = cage[k];
//         var row = Math.floor(squareIndex / 9);
//         var col = squareIndex % 9;
//         solutionIndex = row * 9 + col;
//         total += eval(solution[solutionIndex] / cage.length);
//     }
//     return total;
// }
function DrawToolboxNumbers() {
    ctx.strokeStyle = "#100";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = buffer;

    ctx.fillStyle = "#000";
    ctx.font = "bold " + squareSize * 0.6 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var value = 1;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            var x = startX + (col + 0.5) * squareSize;
            var y = startY + (row + 0.5) * squareSize;

            if (missingNumbers.length > 0 && !missingNumbers.includes(value)) {
                ctx.fillStyle = "#888";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            }

            if (GridFlat().filter(n => n.value == value).length >= 9) {
                ctx.fillStyle = "#777";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            } else {
                HighlightToolboxSquare(value, x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize);
                ctx.fillStyle = "#000";
            }

            ctx.fillStyle = "#000";
            ctx.fillText(value, x, y);


            value += 1;
        }
    }

    for (var i = 0; i <= 3; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * squareSize);
        ctx.lineTo(startX + squareSize * 3, startY + i * squareSize);
        ctx.stroke();
    }
}

function HighlightToolboxSquare(value, x, y, width, height) {
    return;
    var count = GridFlat().filter(n => n.value == value).length;
    const angle = (count / 9) * Math.PI * 2;

    // Draw the highlighted sector (pie graph style)
    ctx.fillStyle = '#EEE';
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + height / 2);
    ctx.arc(
        x + width / 2,
        y + height / 2,
        Math.min(width, height) / 2, // Use the minimum dimension as radius
        -Math.PI / 2,
        -Math.PI / 2 + angle
    );
    ctx.lineTo(x + width / 2, y + height / 2);
    ctx.closePath();
    ctx.fill();
    
}
function CountOfNumber(number) {
    if (grid.length != 9) return 0;
    if (number == 0) return 0;

    var total = 0;
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (grid[row][col].value == number) {
                total++;
            }
        }
    }
    return total;
}

function DrawToolboxNotes() {
    ctx.strokeStyle = "#100";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = buffer;

    ctx.font = squareSize * 0.3 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var value = 1;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            var x = startX + (col + 0.5) * squareSize;
            var y = startY + (row + 0.5) * squareSize;

            // if (GridFlat().filter(n => n.value == value).length >= 9) {
            //     ctx.fillStyle = "#FFF";
            // } else {
            //     ctx.fillStyle = "#000";
            // }
            if (GridFlat().filter(n => n.value == value).length >= 9) {
                ctx.fillStyle = "#777";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            } else {
                ctx.fillStyle = "#000";
            }
            ctx.fillStyle = "#000";
            ctx.fillText(value++, x, y);
        }
    }
    for (var i = 0; i <= 3; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * squareSize);
        ctx.lineTo(startX + squareSize * 3, startY + i * squareSize);
        ctx.stroke();
    }
}

function DrawToolboxExtras() {
    ctx.strokeStyle = "#BBB";
    ctx.fillStyle = "#000";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = 4 * squareSize + buffer;

    ctx.font = squareSize * 0.3 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var x = startX + 0.5 * squareSize;
    var y = startY - 0.5 * squareSize;
    ctx.fillText('Clear', x, y);

    x = startX + 0.5 * squareSize;
    y = startY + 1.5 * squareSize;
    ctx.fillText('HintS', x, y);

    x = startX + 0.5 * squareSize;
    y = startY + 0.5 * squareSize;
    ctx.fillText('Undo', x, y);

    if (notesMode) {
        ctx.fillStyle = "#888";
        ctx.fillRect(
            startX,
            startY - squareSize * 5,
            squareSize,
            squareSize
        );
        ctx.fillStyle = "#000";
    }

    x = startX + 0.5 * squareSize;
    y = startY - 4.5 * squareSize;
    ctx.fillText('Notes', x, y);

    x = startX + 0.5 * squareSize;
    y = startY + 2.5 * squareSize;
    ctx.fillText('HintB', x, y);

    ctx.fillStyle = "#000";

    for (var i = 0; i < 2; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY - squareSize * 5);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 3);
        ctx.stroke();
    }
    for (var i = 0; i <= 9; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX, startY - (squareSize * 6) + squareSize * i);
        ctx.lineTo(startX + squareSize, startY - (squareSize * 6) + squareSize * i);
        ctx.stroke();
    }
}

function DrawProgress() {
    var percentComplete = GridFlat().filter(square => square.value != 0 && !square.fixed).length / GridFlat().filter(square => !square.fixed).length * 100;
    ctx.strokeStyle = "#9bff84";

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(mapRange(percentComplete, 0, 100, 0, canvas.width), canvas.height);
    ctx.stroke();

    var gradient = ctx.createLinearGradient(0, canvas.height, canvas.width,canvas.height );

    // Define gradient colors at different positions
    gradient.addColorStop(0, 'white');    // Starting color at 0%
    gradient.addColorStop(1, '#b7bdff');   // Ending color at 100%

    // Set the fill style to the gradient
    ctx.fillStyle = gradient;

    // Draw a rectangle filled with the gradient
    ctx.fillRect(0, 0, mapRange(percentComplete, 0, 100, 0, canvas.width), canvas.height);
}

function mapRange(value, sourceMin, sourceMax, targetMin, targetMax) {
    // Calculate the ratio between the source range and the target range
    const sourceRange = sourceMax - sourceMin;
    const targetRange = targetMax - targetMin;
    const ratio = targetRange / sourceRange;

    // Map the value to the target range
    const mappedValue = (value - sourceMin) * ratio + targetMin;

    return mappedValue;
}

var squareAnimationLength = 50;
var positionY = 0;

function AnimateCurrentSquare() {
    var col = currentSquareAnimating % 9;
    var row = Math.floor(currentSquareAnimating / 9);
    var totalDropHeight = (9 - row) * squareSize;
    var dropStep = totalDropHeight / squareAnimationLength;

    ctx.fillStyle = "#000";
    ctx.fillRect(
        col * squareSize,
        row * squareSize,
        squareSize,
        squareSize
    );

    ctx.fillStyle = "#FFF";
    ctx.fillRect(
        col * squareSize,
        row * squareSize + positionY,
        squareSize,
        squareSize
    );

    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(col * squareSize, row * squareSize + positionY);
    ctx.lineTo(col * squareSize + squareSize, row * squareSize + positionY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(col * squareSize, row * squareSize + positionY + squareSize);
    ctx.lineTo(col * squareSize + squareSize, row * squareSize + positionY + squareSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(col * squareSize, row * squareSize + positionY);
    ctx.lineTo(col * squareSize, row * squareSize + positionY + squareSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(col * squareSize + squareSize, row * squareSize + positionY);
    ctx.lineTo(col * squareSize + squareSize, row * squareSize + positionY + squareSize);
    ctx.stroke();
    positionY += dropStep;

    if (grid[row][col].value != 0) {
        var x = (col + 0.5) * squareSize;
        var y = (row + 0.5) * squareSize + positionY;
        ctx.font = squareSize * 0.6 + "px Arial";
        if (grid[row][col].fixed) {
            ctx.fillStyle = "#000";
        } else if (ClashExists(row, col)) {
            ctx.fillStyle = "#F00";
        } else {
            ctx.fillStyle = "#009";
        }
        ctx.fillText(grid[row][col].value, x, y);
    }
}
