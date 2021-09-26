var player1Name = prompt("You are Red, input your name please:")
var player2Name = prompt("You are Blue, input your name please:")
var player1List = []
var player2List = []
var player1win = false
var player2win = false
var gameend = false

statement_playerColor = player1Name+" is Red. "+player2Name+" is Blue"
$(".player-color").text(statement_playerColor)

var turnCount = 1
var indexCol = {col1: 1, col2: 1, col3: 1, col4: 1, col5: 1, col6: 1, col7: 1}

var playerTurn = player1Name

$(".player-turn").text("Go "+playerTurn+"!")


$(".cell").click(function () {
  // choose player turn
  if (turnCount % 2 == 1) {
    var playerTurn = player1Name
  } else {
    var playerTurn = player2Name
  }

  // choose player color and determine next turn
  if (playerTurn == player1Name) {
    var color = "red"
    var nextTurn = player2Name
  } else {
    var color = "blue"
    var nextTurn = player1Name
  }

  // get the col and row index of cell colored
  colIndex = this.classList[1]
  rowIndex = indexCol[colIndex]

  // check if the row index under 8, if over 7, do not do anything
  if (rowIndex <= 7) {
    indexCol[colIndex] += 1
    cellClass = colIndex+rowIndex
    console.log(cellClass)
    $("." + cellClass).addClass(color);

    if (color == "red") {
      player1List.push(Number(cellClass.slice(3,5)))
      player1win = checkWin(player1List)
    } else {
      player2List.push(Number(cellClass.slice(3,5)))
      player2win = checkWin(player2List)
    }
    
  }
  if (player1win == true) {
    var winner = player1Name
    gameend = true
  } else if (player2win == true){
    var winner = player2Name
    gameend = true
  }
  
  if (gameend == false) {
    turnCount += 1
    var arr = Object.values(indexCol)
    sumIndex = arr.reduce((a, b) => a + b, 0);
    if (sumIndex == 56) {
      $(".player-turn").text("You are Draw, refresh to play again")
      $(".player-turn").addClass("highlight")
    } else {
      $(".player-turn").text("Go "+nextTurn+"!")
    }
  }
  else {
    $(".player-turn").text(winner+" win!, refresh to play again")
    $(".player-turn").addClass("highlight")
  }
})

function checkHorizontal(list) {
  var rowList = {row1: [], row2: [], row3: [], row4: [], row5: [], row6: [], row7: []}
  for (cell of list) {
    rowCell = "row" + cell % 10
    rowList[rowCell].push(Number(Math.floor(cell/10)))
  }
  var win = false
  for (k in rowList) {
    array = rowList[k]
    if ((array.indexOf(1) != -1 ) && (array.indexOf(2) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1)||
    (array.indexOf(2) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1 ) && (array.indexOf(5) != -1) ||
    (array.indexOf(5) != -1 ) && (array.indexOf(6) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1) ||
    (array.indexOf(5) != -1 ) && (array.indexOf(6) != -1 ) && (array.indexOf(7) != -1 ) && (array.indexOf(4) != -1)) {
      win = true
      break
    }
  }
  return win
}

function checkVertical(list) {
  var colList = {col1: [], col2: [], col3: [], col4: [], col5: [], col6: [], col7: []}
  for (cell of list) {
    colCell = "col" + Math.floor(cell/10)
    colList[colCell].push(cell % 10)
  }
  var win = false
  for (k in colList) {
    array = colList[k]
    if ((array.indexOf(1) != -1 ) && (array.indexOf(2) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1)||
    (array.indexOf(2) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1 ) && (array.indexOf(5) != -1) ||
    (array.indexOf(5) != -1 ) && (array.indexOf(6) != -1 ) && (array.indexOf(3) != -1 ) && (array.indexOf(4) != -1) ||
    (array.indexOf(5) != -1 ) && (array.indexOf(6) != -1 ) && (array.indexOf(7) != -1 ) && (array.indexOf(4) != -1)) {
      win = true
      break
    }
  }
  return win
}

function checkDiagonal(list) {
  // chéo dạng /
  check1 = check1StyleDiag(11, list)[0]

  // chéo dạng \
  check2 = check1StyleDiag(9, list)[0]

  var result = false
  if (check1 || check2) {
    result = true
  }
  return result
}

function checkWin(list) {
  var playerwin = false
  var checkngang = checkHorizontal(list)
  var checkdoc = checkVertical(list)
  var checkcheo = checkDiagonal(list)
  if (checkngang == true || checkdoc == true || checkcheo == true) {
    playerwin = true
  }
  return playerwin
}

function remove(value, array) {
  var valueIndex = array.indexOf(value)
  if (valueIndex > -1) {
    array.splice(valueIndex, 1)
  } 
  return array
}

function check1StyleDiag(params, list) {
  var flag = false
  var target = 0
  for (cell of list) {
    var seriesDiag = []
    var pt1 = cell
    seriesDiag.push(pt1)

    var flag1 = false
    target = pt1 + params
    for (cell1 of list) {
      if (cell1 == target) {
        var pt2 = cell1
        seriesDiag.push(pt2)
        flag1 = true
      }
    if (flag1) {
      var flag2 = false
      target = pt2 + params
      for (cell2 of list) {
        if (cell2 == target) {
          var pt3 = cell2
          seriesDiag.push(pt3)
          flag2 = true
        }
      }
      if (flag2) {
        var flag3 = false
        for (cell3 of list) {
          if (pt3 + params == cell3) {
            var pt4 = cell3
            seriesDiag.push(pt4)
            console.log("v4: "+seriesDiag)
            flag3 = true
          }
        if (flag3) {
          flag = true
        }
        }
      }
    }
    }
  }
  if (flag) {
    return [true, [pt1, pt2, pt3, pt4]]
  } else{
    return [false, []]
  }
}