module.exports = function solveSudoku(matrix) {
  let changeVal;
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0){
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }
  matrix = delNumber(matrix);

  do {
    changeVal = false;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(typeof(matrix[i][j]) === 'object') {
          if (checkRowValue(matrix, i, j)) {
            matrix = delNumber(matrix);
            changeVal = true;
          } else if (checkColValue(matrix, i, j)) {           
            matrix = delNumber(matrix);
            changeVal = true;
          } else if (checkBlockValue(matrix, i, j)) {
            matrix = delNumber(matrix);
            changeVal = true;
          }        
        }
      }
    }
  } while(changeVal);

  return matrix;
};

function delNumber(matrix) {
  let checkValue;
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(typeof(matrix[i][j]) === 'object') {
        checkValue = matrix[i][j];
        
        checkValue = delRowNumber(matrix, checkValue, i, j);
        checkValue = delColNumber(matrix, checkValue, i, j);
        checkValue = delBlockNumber(matrix, checkValue, i, j);
        
        if(checkValue.length === 1){
          matrix[i][j] = checkValue[0];
          matrix = delNumber(matrix);
        } else {
          matrix[i][j] = checkValue;
        }
      }
    }
  }
  return matrix;
}

function delRowNumber(matrix, checkValue, i, j) {
  let index;

  for(let k = 0; k < 9; k++) {
    if (k === j) continue;
    index = checkValue.indexOf(matrix[i][k]);
    if(index > -1) {
      checkValue.splice(index, 1);
    }
  }
  return checkValue;
}
function delColNumber(matrix, checkValue, i, j) {
  let index;

  for(let k = 0; k < 9; k++) {
    if (k === i) continue;
    index = checkValue.indexOf(matrix[k][j]);
    if(index > -1) {
      checkValue.splice(index, 1);
    }
  }
  return checkValue;
}
function delBlockNumber(matrix, checkValue, i, j) {
  let index;
  
  let bi = Math.floor(i/3);
  let bj = Math.floor(j/3);

  for (let ti = bi * 3; ti < bi * 3 + 3; ti++) {
    for (let tj = bj * 3; tj < bj * 3 + 3; tj++) {
        if (ti === i && tj === j) continue;
        index = checkValue.indexOf(matrix[ti][tj]);
        if(index > -1) {
          checkValue.splice(index, 1);
        }
      }
  }
  
  return checkValue;
}

function checkRowValue(matrix, i, j) {  
  let masA;
  let masB = matrix[i][j];
  for(let k = 0; k < 9; k++) {
    if (typeof(matrix[i][k]) === 'object' && k !== j){
      masA = matrix[i][k];
      masB = masB.filter(function(itm){return masA.indexOf(itm) < 0;});
    }
  }
  if (masB.length === 1) {
    matrix[i][j] = masB[0];
    return true;
  }
  return false;
}

function checkColValue(matrix, i, j) {
  let masA;
  let masB = matrix[i][j];
 
  for(let k = 0; k < 9; k++) {
    if (typeof(matrix[k][j]) === 'object' && k != i){
      masA = matrix[k][j];
      masB = masB.filter(function(itm){return masA.indexOf(itm) < 0;});
    }
  }
  if (masB.length === 1) {
    matrix[i][j] = masB[0];
    return true;
  }
  return false;
};

function checkBlockValue(matrix, i, j) {
  let masA;
  let masB = matrix[i][j];
  
  let bi = Math.floor(i/3);
  let bj = Math.floor(j/3);

  for (let ti = bi * 3; ti < bi * 3 + 3; ti++){
    for (let tj = bj * 3; tj < bj * 3 + 3; tj++){
      if (typeof(matrix[ti][tj]) === 'object' && ti !== i && tj !== j){
        masA = matrix[ti][tj];
        masB = masB.filter(function(itm){return masA.indexOf(itm) < 0;});
      }    
    }
  }
  
  if (masB.length === 1) {
    matrix[i][j] = masB[0];
    return true;
  }
  return false;
};