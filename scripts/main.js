let ComputersSide;
let userpoints;
let drawamounts;
let computerpoints;

let movedpisceforcolor;

let upoint;
let cpoint;
let drawpoint;

window.addEventListener("load",function(){
    ComputersSide=window.localStorage.getItem("side")
    if(!ComputersSide){
        ComputersSide="b"
    }
    console.log(ComputersSide)
    //set up computer side
    if(ComputersSide=="w"){
        document.querySelector(".main-board").style.direction="rtl"
        document.querySelectorAll(".order-1").forEach(elem=>{
            elem.style.order= 1;
        })
        document.querySelectorAll(".order-2").forEach(elem=>{
            elem.style.order= 2;
        })
        document.querySelectorAll(".order-3").forEach(elem=>{
            elem.style.order= 3;
        })
        document.querySelectorAll(".order-4").forEach(elem=>{
            elem.style.order= 4;
        })
        document.querySelectorAll(".order-5").forEach(elem=>{
            elem.style.order= 5;
        })
        document.querySelectorAll(".order-6").forEach(elem=>{
            elem.style.order= 6;
        })
        document.querySelectorAll(".order-7").forEach(elem=>{
            elem.style.order= 7;
        })
        document.querySelectorAll(".order-8").forEach(elem=>{
            elem.style.order= 8;
        })
        //play first move
        validMoves("wp",35)
        pisceToMoveIndx=indexOnRealBoard(35)
        currentPisceindxs=indexOnRealBoard(55)
        currentPisce=100
        guiChess()
    }

    if(ComputersSide=="b"){
        document.querySelector(".main-board").direction="ltr"
        document.querySelectorAll(".order-1").forEach(elem=>{
            elem.style.order= 8;
        })
        document.querySelectorAll(".order-2").forEach(elem=>{
            elem.style.order= 7;
        })
        document.querySelectorAll(".order-3").forEach(elem=>{
            elem.style.order= 6;
        })
        document.querySelectorAll(".order-4").forEach(elem=>{
            elem.style.order= 5;
        })
        document.querySelectorAll(".order-5").forEach(elem=>{
            elem.style.order= 4;
        })
        document.querySelectorAll(".order-6").forEach(elem=>{
            elem.style.order= 3;
        })
        document.querySelectorAll(".order-7").forEach(elem=>{
            elem.style.order= 2;
        })
        document.querySelectorAll(".order-8").forEach(elem=>{
            elem.style.order= 1;
        })
    }

    userpoints=window.localStorage.getItem("userpoints")
    if(!userpoints){
        userpoints=0
    }else{
        userpoints=Number(userpoints)
    }
    drawamounts=window.localStorage.getItem("drawamounts")
    if(!drawamounts){
        drawamounts=0
    }else{
        drawamounts=Number(drawamounts)
    }
    computerpoints=window.localStorage.getItem("computerpoints")
    if(!computerpoints){
        computerpoints=0
    }else{
        computerpoints=Number(computerpoints)
    }

    upoint=userpoints;
    cpoint=computerpoints;
    drawpoint=drawamounts;
    let points=[cpoint,upoint,drawamounts]
    document.querySelectorAll(".point").forEach((elem,index)=>{
        elem.textContent=points[index]
    })
    //get elements
    checkTurn=new RegExp("^"+turn,"i")
    addAttackedSqueres("w")
    randomNumsToEachSquere()
})

let movecount=0


const board_files=document.querySelectorAll(".files")
const board_ranks=document.querySelectorAll(".ranks");
const switchTurns={"w":"b","b":"w"}
let turn="w";
let checkTurn;
let currentPisceindxs;
let currentPisce;
let pisceToMoveIndx=NaN;
let pisceToMove;
let focusElement;
let rightArr;
let data=0

//movehistory
let movenumbers=document.querySelector(".move-list")
let whiteMoves=document.querySelector(".white-moves")
let blackMoves=document.querySelector(".black-moves")
const fileNames={
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h"
}

let moveHistoryCastle=false


board_files.forEach((elem,fileIndex)=>{
    var element = Array.prototype.slice.call(elem.children);
    element.forEach((squere,rankIndex)=>{
        squere.addEventListener("click",function(){
            checkTurn=new RegExp("^"+turn,"i")
            currentPisceindxs=[fileIndex,rankIndex]
            currentPisce=board[indexOnJsBoard(currentPisceindxs)]
            guiChess()
        })
    })
})

function guiChess(){
    if(currentPisce !== 100&&checkTurn.test(currentPisce)){
        /*this is the case when user pickes pisce which he/she want to move
        it should highlete and add valid moves*/
        //fills pot moves and pot captures with potential moves
        validMoves(currentPisce,indexOnJsBoard(currentPisceindxs))

        resetHighlatedSqueres()
        pisceToMoveIndx=currentPisceindxs
        if(iskingincheck||rightAttackedPieces[switchTurns[turn]].some(elem=>board[elem]==currentPisce)){
            //if king is in check or pisce blocks check we want to filter valid moves
                uncheck(currentPisce,indexOnJsBoard(currentPisceindxs))
        }
        highlighteMovebleSquares()
    }else if(currentPisce === 100 && pisceToMoveIndx&&potMoves.some(elem=>elem==indexOnJsBoard(currentPisceindxs))){
        /*this is the case when player alredy choose pisce now he/she want to
        move it to empty squere */
        resetHighlatedSqueres()
        moveHistoryCastle=false
        //addpiscemovment
        pisceToMove=board[indexOnJsBoard(pisceToMoveIndx)]
        let copypisce=pisceToMove
        focusElement=pickElement(pisceToMoveIndx)
        focusElement.classList.remove(pisceToMove)
        //checkifpownPromots
        if(potPromotion.length>0&&pisceToMove[1]=="p"){
            pisceToMove=turn+"q"   
            //evaluation
            shortcutseval[turn]+=800
        }
        if(pisceToMove[1]=="p"){
            prevposition=[]
        }
        //check if movedpown can be unpasanted
        potUnpassanted(pisceToMove)
        //check if move is unpassant
        validUnpassante(pisceToMove)
        //check if move is castle
    

        if(pisceToMove[1]=="k"){
            let isItCastle=indexOnJsBoard(currentPisceindxs)-indexOnJsBoard(pisceToMoveIndx)
            if(isItCastle==2){
                playCastle(files.file_8,files.file_6)
                moveHistoryCastle="r"
            }else if(isItCastle==-2){
                playCastle(files.file_1,files.file_4)
                moveHistoryCastle="l"
            }
        }

        pickElement(currentPisceindxs).classList.add(pisceToMove)
        //change js board
        board[indexOnJsBoard(pisceToMoveIndx)]=emptySquere
        board[indexOnJsBoard(currentPisceindxs)]=pisceToMove
        //change piscetrack
        rightArr=piscesTracker[turn]
        rightArr.splice(rightArr.indexOf(indexOnJsBoard(pisceToMoveIndx)),1)
        rightArr.push(indexOnJsBoard(currentPisceindxs))
        //if king playes change kingsindex to keep track of king
        kingchangedIndx(pisceToMove,currentPisceindxs)
        //change evaluation
        changeEvall(turn,pisceToMove,indexOnJsBoard(pisceToMoveIndx),indexOnJsBoard(currentPisceindxs),NaN,copypisce)
        //add played move to move history
        addMoveToMovehistory(pisceToMove,currentPisceindxs,NaN,moveHistoryCastle)
        //change turn
        turn=switchTurns[turn]
        //reset val
        pisceToMoveIndx=NaN
        //add attackedsqueres on changed board
        addAttackedSqueres(switchTurns[turn])
        //checks if king is in check
        checkIfKingIsInCheck()
        //add right checkturn
        checkTurn=new RegExp("^"+turn,"i")
        //check if king is checkmated
        movedpisceforcolor=[...currentPisceindxs]
        gameOver()
        //check 3 repetition
        addPosition(prevposition)
        checkRepetition()
        //check if 50moves has been played without capture or pawn move
        addPlayedmove() 
        //movecount
        movecount++
        //is it middlegame
        if(isItMiddleGame&&movecount>20){
            let piscess=[]
            piscesTracker["w"].forEach(elem=>{
                piscess.push(board[elem])
            })  
            piscesTracker["b"].forEach(elem=>{
                piscess.push(board[elem])
            })

            if(!piscess.some(elem=>elem=="wq")&&!piscess.some(elem=>elem=="bq"&&piscess.length<20) ){
                updateEvaluation()
            }else if(piscess.length<8){
                updateEvaluation()
            }

        }
        //AI
        document.querySelector(".Ai-icon").style.color="#629924"
        if(turn=="w"&&ComputersSide=="w"){
            setTimeout(function(){
                chessAi(false)
            },50)
        }

        if(turn=="b"&&ComputersSide=="b"){
            setTimeout(function(){
                chessAi(true)
            },50)
        }
        setTimeout(function(){
            document.querySelector(".Ai-icon").style.color="red"
        },100)
    }else if(currentPisce !==100&&!checkTurn.test(currentPisce)&&pisceToMoveIndx&&potCaptures.some(elem=>elem==indexOnJsBoard(currentPisceindxs))){
        /*this is the case when player alredy choose pisce now he/she want to
        capture other picse with it */
        resetHighlatedSqueres()
        moveHistoryCastle=false
        //add capture
        pisceToMove=board[indexOnJsBoard(pisceToMoveIndx)]
        let copypisce=pisceToMove
        focusElement=pickElement(pisceToMoveIndx)
        let currSquere=pickElement(currentPisceindxs)
        let killedpisce=board[indexOnJsBoard(currentPisceindxs)]
        focusElement.classList.remove(pisceToMove)
        //checkifpownPromots
        if(potPromotion.length>0&&pisceToMove[1]=="p"){
            pisceToMove=turn+"q"   
            //change evaluation
            shortcutseval[turn]+=800
        }
        currSquere.classList.remove(currentPisce)
        currSquere.classList.add(pisceToMove)
        //change js board
        board[indexOnJsBoard(pisceToMoveIndx)]=emptySquere
        board[indexOnJsBoard(currentPisceindxs)]=pisceToMove
        //change piscetrack
        rightArr=piscesTracker[turn]
        rightArr.splice(rightArr.indexOf(indexOnJsBoard(pisceToMoveIndx)),1)
        rightArr.push(indexOnJsBoard(currentPisceindxs))
        piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(indexOnJsBoard(currentPisceindxs)),1)
        //if king playes change kingsindex to keep track of king
        kingchangedIndx(pisceToMove,currentPisceindxs)
        //change evaluation
        changeEvall(turn,pisceToMove,indexOnJsBoard(pisceToMoveIndx),indexOnJsBoard(currentPisceindxs),killedpisce,copypisce)
        //add to move history
        addMoveToMovehistory(pisceToMove,currentPisceindxs,true)
        //change turn
        turn=switchTurns[turn]
        //reset val
        pisceToMoveIndx=NaN
        //add attackedsqueres on changed board 
        addAttackedSqueres(switchTurns[turn])
        //checks if king is in check
        checkIfKingIsInCheck()
        //add right checkturn
        checkTurn=new RegExp("^"+turn,"i")
        //check if king is checkmated
        movedpisceforcolor=[...currentPisceindxs]
        gameOver()
        //if pisce is captured previus positions cant repeat
        prevposition=[]
        //check if there is enough pisces left
        enoughpisces()
        //reset 50move
        fiftymove=0
        //movecount
        movecount++
        //engame?
        if(isItMiddleGame&&movecount>20){
            let piscess=[]
            piscesTracker["w"].forEach(elem=>{
                piscess.push(board[elem])
            })  
            piscesTracker["b"].forEach(elem=>{
                piscess.push(board[elem])
            })

            if(!piscess.some(elem=>elem=="wq")&&!piscess.some(elem=>elem=="bq"&&piscess.length<20) ){
                updateEvaluation()
            }else if(piscess.length<8){
                updateEvaluation()
            }

        }
        //ai
        document.querySelector(".Ai-icon").style.color="#629924"
        if(turn=="w"&&ComputersSide=="w"){
            setTimeout(function(){
                chessAi(false)
            },50)
        }
        if(turn=="b"&&ComputersSide=="b"){
            setTimeout(function(){
                chessAi(true)
            },50)
        }
        setTimeout(function(){
            document.querySelector(".Ai-icon").style.color="red"
        },100)
        
    }
}



function resetHighlatedSqueres(){
    board_ranks.forEach(elem=>{
        elem.innerHTML=""
    })

    if(pisceToMoveIndx){
        let elementsBackground=pickElement(pisceToMoveIndx)
        elementsBackground.classList.contains("white-box")? elementsBackground.style.backgroundColor="#F0D9B5":elementsBackground.style.backgroundColor="#B58863"
    }
}

function highlighteMovebleSquares(){
    pickElement(pisceToMoveIndx).style.backgroundColor="yellow"
    let highlete=[...potMoves,...potCaptures]
    if(highlete.length){
        highlete.forEach(elem=>{pickElement(indexOnRealBoard(elem)).innerHTML=`<div class="moveble"></div>`})
    }
}


//pown rules
function potUnpassanted(pisceToMove){
    potUnPassant=NaN
        if(pisceToMove[1]=="p"){
            if(turn=="b"&&indexOnJsBoard(pisceToMoveIndx)-indexOnJsBoard(currentPisceindxs)==20){
                potUnPassant=indexOnJsBoard(currentPisceindxs)
            }else if(turn=="w"&&indexOnJsBoard(pisceToMoveIndx)-indexOnJsBoard(currentPisceindxs)==-20){
                potUnPassant=indexOnJsBoard(currentPisceindxs)
            }
            //if played pawn previus positions cant repeat
            prevposition=[]
            //pawn moved reset to minus 1 so when move is added it becomes 0 
            fiftymove=-1
        }
}

function validUnpassante(){
    if(indexOnJsBoard(currentPisceindxs)===unpassantt){
        let unpassantedPawnindx=unpassantt+wichWay[switchTurns[turn]]
        board[unpassantedPawnindx]=emptySquere
        pickElement(indexOnRealBoard(unpassantedPawnindx)).classList.remove(switchTurns[turn]+"p")
        //change element on piece tracker
        rightArr=piscesTracker[switchTurns[turn]]
        rightArr.splice(rightArr.indexOf(unpassantedPawnindx),1)
        //change evaluation
        shortcutseval[switchTurns[turn]]-=100
        shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][switchTurns[turn]+"p"][unpassantedPawnindx]
    }
}

//castle valid
function playCastle(rankToRemoveRook,rankToMoveRook){
    let rook=turn+"r"
    let rooksquere=[rankToRemoveRook,boardRankByTurn[turn]]
    let rooksquereToMove=[rankToMoveRook,boardRankByTurn[turn]]
    //change elements placement
    pickElement(rooksquere).classList.remove(rook)
    pickElement(rooksquereToMove).classList.add(rook)
    //change board
    board[indexOnJsBoard(rooksquere)]=emptySquere
    board[indexOnJsBoard(rooksquereToMove)]=rook
    //change element on piece tracker
    rightArr=piscesTracker[turn]
    rightArr.splice(rightArr.indexOf(indexOnJsBoard(rooksquere)),1)
    rightArr.push(indexOnJsBoard(rooksquereToMove))
    //change eval
    shortcutseval[turn]-=shortcuts[turn][rook][indexOnJsBoard(rooksquere)]
    shortcutseval[turn]+=shortcuts[turn][rook][indexOnJsBoard(rooksquereToMove)]
    //if played castle previus positions cant repeat
    prevposition=[]
}

//if king moves change kings index to keep track
function kingchangedIndx(pisce,indx){
    if(pisce==turn+"k"){
        kingsIndx[pisce]=indexOnJsBoard(indx)
    }
}

//check if king is in check if yes then check if it is a checkmate
function gameOver(){
    isitCheckmate(turn)
    if(checkMate){
        if(switchTurns[turn]!==ComputersSide){
            document.querySelector('.result').textContent="User won"
            document.querySelector('.result').style.color="green"
            upoint++
            pickElement(indexOnRealBoard(kingsIndx[ComputersSide+"k"])).style.backgroundColor="red"
            document.querySelector(".user-points").textContent=upoint
        }else if(switchTurns[turn]==ComputersSide){
            document.querySelector('.result').textContent="Computer Won"
            document.querySelector(".result").style.color="red"
            cpoint++
            pickElement(indexOnRealBoard(kingsIndx[switchTurns[ComputersSide]+"k"])).style.backgroundColor="red"
            document.querySelector(".computer-points").textContent=cpoint
        }
        document.querySelector('.win').classList.add("show")
        setTimeout(function(){
            document.querySelector('.win').classList.remove("show")
        },700)
    }else if(stalmate||repetition){
        document.querySelector('.result').textContent="draw"
        document.querySelector('.result').style.color="brawn"
        document.querySelector(".win").classList.add("show")
        setTimeout(function(){
            document.querySelector('.win').classList.remove("show")
        },700)
        drawpoint++
        document.querySelector(".draws").textContent=drawpoint
    }
}

//change evaluation 
function changeEvall(turn,pisce,lastsquereindx,movesquereindx,killedpisce,unchangedpisce){
    //if pawn promoted p is changed to q 
    shortcutseval[turn]-=shortcuts[turn][unchangedpisce][lastsquereindx]
    shortcutseval[turn]+=shortcuts[turn][pisce][movesquereindx]

    if(killedpisce){
        let opponent=switchTurns[turn]
        shortcutseval[opponent]-=materialValues[killedpisce[1]]
        shortcutseval[opponent]-=shortcuts[opponent][killedpisce][movesquereindx]
    }

}

function updateEvaluation(){
    wPiecesEval={
        "wn": wnight,
        "wb": wbishop,
        "wr": wrook,
        "wq": wqueen,
        "wp": wpawnEndgame,
        "wk": wkingEndgame
    }

    bPiecesEval={
        "bn": bnight,
        "bb": bbishop,
        "br": brook,
        "bq": bqueen,
        "bk": bkingEndgame,
        "bp": bpawnEndgame
    }

    shortcuts={
        "w": wPiecesEval,
        "b": bPiecesEval,
    }
}

function addMoveToMovehistory(pisce,movedsquere,isitcapture,isItCastle){
    if(isItCastle){
        let movename;
        let movenumber=Math.ceil(movecount/2)+1
        if(isItCastle=="l"){
            movename="O-O-O"
        }else{
            movename="O-O"
        }
        bestmovename=movename

        if(turn=="w"){
            movenumbers.innerHTML+=`<li class="amount-of-moves">${movenumber}</li>`
            whiteMoves.innerHTML+=`<li class="white-move">${movename}</li>`
            var elem = document.getElementById('move-history');
            elem.scrollTop = elem.scrollHeight;
        }else{
            blackMoves.innerHTML+=`<li class="black-move">${movename}</li>`
        }

    }else if(!isitcapture){
        let squere=fileNames[movedsquere[0]]+(movedsquere[1]+1)
        let pisceName=pisce[1].toUpperCase()
        let movename=pisceName+squere
        let movenumber=Math.ceil(movecount/2)+1
        bestmovename=movename
        if(turn=="w"){
            movenumbers.innerHTML+=`<li class="amount-of-moves">${movenumber}</li>`
            whiteMoves.innerHTML+=`<li class="white-move">${movename}</li>`
            var elem = document.getElementById('move-history');
            elem.scrollTop = elem.scrollHeight;
        }else{
            blackMoves.innerHTML+=`<li class="black-move">${movename}</li>`
        }
    }else{
        let squere=fileNames[movedsquere[0]]+movedsquere[1]
        let pisceName=pisce[1].toUpperCase()
        let movename=pisceName+"x"+squere
        let movenumber=Math.ceil(movecount/2)+1
        bestmovename=movename
        if(turn=="w"){
            movenumbers.innerHTML+=`<li class="amount-of-moves">${movenumber}</li>`
            whiteMoves.innerHTML+=`<li class="white-move">${movename}</li>`
            var elem = document.getElementById('move-history');
            elem.scrollTop = elem.scrollHeight;
        }else{
            blackMoves.innerHTML+=`<li class="black-move">${movename}</li>`
        }
    }
}

//play again
document.querySelector(".play-again").addEventListener("click",function(){
    let pointsAtStart=userpoints+computerpoints+drawamounts
    let pointsAtEnd=cpoint+upoint+drawpoint
    if(pointsAtStart<pointsAtEnd){
        window.localStorage.setItem("side",`${switchTurns[ComputersSide]}`)
        window.localStorage.setItem("userpoints",`${upoint}`)
        window.localStorage.setItem("drawamounts",`${drawpoint}`)
        window.localStorage.setItem('computerpoints',`${cpoint}`)
        location.reload()
    }else{
        window.alert("you have to finish game in order to start a new one")
    }
})