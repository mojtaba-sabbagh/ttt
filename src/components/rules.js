
const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 3], [1, 4], [1, 5]],
    [[2, 6], [2, 7], [2, 8]],
    [[0, 0], [1, 3], [2, 6]],
    [[0, 1], [1, 4], [2, 7]],
    [[0, 2], [1, 5], [2, 8]],
    [[0, 0], [1, 4], [2, 8]],
    [[0, 2], [1, 4], [2, 6]],
];

const ifWinner = function (signs, blank) {
    // check if I can be a winner!
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (signs[a[0]][a[1]] == blank && signs[b[0]][b[1]] == 'O' 
        && signs[c[0]][c[1]] == 'O') {
            return [a[0], a[1]];
        }
        else if (signs[a[0]][a[1]] == 'O' && signs[b[0]][b[1]] == blank 
        && signs[c[0]][c[1]] == 'O') {
            return [b[0], b[1]];
        } 
        else if (signs[a[0]][a[1]] == 'O' && signs[b[0]][b[1]] == 'O' 
        && signs[c[0]][c[1]] == blank) {
            return [c[0], c[1]];
 
        }
    }
    return null;
}

const stopWinning = function (signs, blank) {
    // if I can stop winning competitor.
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (signs[a[0]][a[1]] == blank && signs[b[0]][b[1]] == 'X' 
        && signs[c[0]][c[1]] == 'X') {
            return [a[0], a[1]];
        }
        else if (signs[a[0]][a[1]] == 'X' && signs[b[0]][b[1]] == blank 
        && signs[c[0]][c[1]] == 'X') {
            return [b[0], b[1]];
        } 
        else if (signs[a[0]][a[1]] == 'X' && signs[b[0]][b[1]] == 'X' 
        && signs[c[0]][c[1]] == blank) {
            return [c[0], c[1]];
        }   
    }
    return null;
}

const middleSquare = function (signs, blank) {
    // check if the middle square is vacant
    if (signs[1][4] == blank){
        return [1, 4];
    }
}

const noncheckCorners = function (signs, blank) {
    // check for corners if empty
    let blanks = [];
    [[0, 1], [1, 3], [1, 5], [2, 7]].forEach(el => {
        if (signs[el[0]][el[1]] == blank){
                blanks.push(el);
            }
    });
    if (blanks.length > 0){
        const rndCell = blanks[Math.floor(Math.random() * blanks.length)];
        return [rndCell[0], rndCell[1]];
    }
}

const checkCorners = function (signs, blank) {
    // check for corners if empty
    let blanks = [];
    [[0, 0], [0, 2], [2, 6], [2, 8]].forEach(el => {
        if (signs[el[0]][el[1]] == blank){
                blanks.push(el);
            }
    });
    if (blanks.length > 0){
        const rndCell = blanks[Math.floor(Math.random() * blanks.length)];
        return [rndCell[0], rndCell[1]];
    }
}

const iCorners = function (signs, blank) {
    // check for corners if two diagnal corners are taken.
    [[[0, 0], [2, 8]], [[0, 2], [2, 6]]].forEach(el => {
        if ((signs[el[0][0]][el[0][1]] && signs[el[1][0]][el[1][1]])){
            return noncheckCorners(signs, blank);
        }
    });
        return checkCorners(signs, blank);
    }

const anyVacant = function (signs, blank){
    //look for every vacant cell.
    let blanks = [];
    for (let i = 0; i < 3; i++){
        for ( let key in signs[i]) {
            if (signs[i][key] == blank){
                blanks.push([i, key])
            }
        }
    }
    if (blanks.length > 0){
        const rndCell = blanks[Math.floor(Math.random() * blanks.length)];
        return [rndCell[0], rndCell[1]];
    }
}
const rules6 = function (signs, blank) {
    // check if I can be a winner!
    let result = ifWinner(signs, blank);
    if (result){
        return result;
    }
    // if I can stop winning competitor.
    result = stopWinning(signs, blank);
    if (result){
        return result;
    }
    // check if the middle square is vacant
    result = middleSquare(signs, blank);
    if (result){
        return result;
    }
    // check for corners if empty
    result = iCorners(signs, blank);
    if (result){
        return result;
    }
    //look for every vacant cell.
    result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

const rules5 = function (signs, blank) {
    // check if I can be a winner!
    let result = ifWinner(signs, blank);
    if (result){
        return result;
    }
    // if I can stop winning competitor.
    result = stopWinning(signs, blank);
    if (result){
        return result;
    }
    // check if the middle square is vacant
    result = middleSquare(signs, blank);
    if (result){
        return result;
    }
    // check for corners if empty
    result = noncheckCorners(signs, blank);
    if (result){
        return result;
    }
    //look for every vacant cell.
    result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

const rules4 = function (signs, blank) {
    // check if I can be a winner!
    let result = ifWinner(signs, blank);
    if (result){
        return result;
    }
    // if I can stop winning competitor.
    result = stopWinning(signs, blank);
    if (result){
        return result;
    }
    // check if the middle square is vacant
    result = middleSquare(signs, blank);
    if (result){
        return result;
    }
    //look for every vacant cell.
    result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

const rules3 = function (signs, blank) {
    // check if I can be a winner!
    let result = ifWinner(signs, blank);
    if (result){
        return result;
    }
    // if I can stop winning competitor.
    result = stopWinning(signs, blank);
    if (result){
        return result;
    }
    //look for every vacant cell.
    result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

const rules2 = function (signs, blank) {
    // check if I can be a winner!
    let result = ifWinner(signs, blank);
    if (result){
        return result;
    }
    //look for every vacant cell.
    result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

const rules1 = function (signs, blank) {
    //look for every vacant cell.
    let result = anyVacant(signs, blank);
    if (result){
        return result;
    }
    return [0, 0];
}

export  {rules6, rules5, rules4, rules3, rules2, rules1 };