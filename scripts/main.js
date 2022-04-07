window.addEventListener("load",function(){
    startgingPositionEvaluate()
    checkTurn=new RegExp("^"+turn,"i")
    addAttackedSqueres("w")
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

board_files.forEach((elem,fileIndex)=>{
    var element = Array.prototype.slice.call(elem.children);
    element.forEach((squere,rankIndex)=>{
        squere.addEventListener("click",function(e){
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
        //addpiscemovment
        pisceToMove=board[indexOnJsBoard(pisceToMoveIndx)]
        let piscetomovecopy=pisceToMove
        focusElement=pickElement(pisceToMoveIndx)
        focusElement.classList.remove(pisceToMove)
        //checkifpownPromots
        if(potPromotion.length>0&&pisceToMove[1]=="p"){
            pisceToMove=turn+"q"   
            //evaluation
            shortcutseval[turn]+=800
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
            }else if(isItCastle==-2){
                playCastle(files.file_1,files.file_4)
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
        if(pisceToMove[1]=="k"){
            shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
        }else if(pisceToMove[1]=="p"){
            shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
        }else{
            if(piscetomovecopy[1]=="p"){
                shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            }else{
                shortcutseval[turn]-=shortcuts[turn][pisceToMove][indexOnJsBoard(pisceToMoveIndx)]
            }
            shortcutseval[turn]+=shortcuts[turn][pisceToMove][indexOnJsBoard(currentPisceindxs)]
        }
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
        gameOver()
        //check position has been repeted 3times&&add new position index
        addPosition()
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
                isItMiddleGame="false"
            }else if(piscess.length<8){
                isItMiddleGame="false"
            }

        }
        //evaluation
        if(turn=="b"){
            setTimeout(chessAi,50)
        }
    }else if(currentPisce !==100&&!checkTurn.test(currentPisce)&&pisceToMoveIndx&&potCaptures.some(elem=>elem==indexOnJsBoard(currentPisceindxs))){
        /*this is the case when player alredy choose pisce now he/she want to
        capture other picse with it */
        resetHighlatedSqueres()
        //add capture
        pisceToMove=board[indexOnJsBoard(pisceToMoveIndx)]
        let piscetomovecopy=pisceToMove
        focusElement=pickElement(pisceToMoveIndx)
        let currSquere=pickElement(currentPisceindxs)
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
        if(pisceToMove[1]=="k"){
            shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
            shortcutseval[switchTurns[turn]]-=materialValues[currentPisce[1]]
            if(currentPisce[1]=="p"){
                shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
            }else{
                shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][currentPisce][indexOnJsBoard(currentPisceindxs)]
            }
        }else if(pisceToMove[1]=="p"){
            shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
            shortcutseval[switchTurns[turn]]-=materialValues[currentPisce[1]]
            if(currentPisce[1]=="p"){
                shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
            }else{
                shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][currentPisce][indexOnJsBoard(currentPisceindxs)]
            }
        }else{
            if(piscetomovecopy[1]=="p"){
                shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][indexOnJsBoard(pisceToMoveIndx)]
            }else{
                shortcutseval[turn]-=shortcuts[turn][pisceToMove][indexOnJsBoard(pisceToMoveIndx)]
            }
            shortcutseval[turn]+=shortcuts[turn][pisceToMove][indexOnJsBoard(currentPisceindxs)]
            shortcutseval[switchTurns[turn]]-=materialValues[currentPisce[1]]
            if(currentPisce[1]=="p"){
                shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][indexOnJsBoard(currentPisceindxs)]
            }else{
                shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][currentPisce][indexOnJsBoard(currentPisceindxs)]
            }
        }
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
        gameOver()
        //if pisce is captured previus positions cant repeat
        prevposition=[]
        //check if there is enough pisces left
        enoughpisces()
        //reset 50move
        fiftymove=0
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
                isItMiddleGame="false"
            }else if(piscess.length<8){
                isItMiddleGame="false"
            }

        }
        //ai
        if(turn=="b"){
            setTimeout(chessAi,50)
        }   
    }
}



function resetHighlatedSqueres(){
    board_ranks.forEach(elem=>{
        elem.innerHTML=""
    })

    if(pisceToMoveIndx){
        let elementsBackground=pickElement(pisceToMoveIndx)
        elementsBackground.classList.contains("white-box")? elementsBackground.style.backgroundColor="white":elementsBackground.style.backgroundColor="#4b4b4b"
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
        shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][unpassantedPawnindx]
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

//check if king is in check if yes then chek if it is a checkmate
function gameOver(){
    isitCheckmate(turn)
    if(checkMate){
        console.log(document.querySelector('.winner').textContent)
        if(switchTurns[turn]=="w"){
            document.querySelector('.winner').textContent="You won"
            document.querySelector('.win').style.color="green"
        }else if(switchTurns[turn]=="b"){
            document.querySelector('.winner').textContent="You lost"
            document.querySelector(".win").style.color="red"
        }
        document.querySelector('.win').classList.add("show")
    }else if(stalmate||repetition){
        document.querySelector(".draw").classList.add("show")
    }
}

//refresh
document.querySelector(".refresh").addEventListener("click",function(){
    location.reload()
})