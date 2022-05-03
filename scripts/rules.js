let iskingincheck=false;
let checkMate=false;
let stalmate=false;
let fiftymove=0;

let kingsIndx={
    "wk": 25,
    "bk": 95,
}


let keepTrackOfWhite=[21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38]
let keepTrackOfBlack=[81,82,83,84,85,86,87,88,91,92,93,94,95,96,97,98]

let piscesTracker={
    "w": keepTrackOfWhite,
    "b": keepTrackOfBlack,
}


let wAttackSqueres=[]
let bAttackSqueres=[]

let rightAttackedSqueres={
    "w": wAttackSqueres,
    "b": bAttackSqueres
}

let wAttackedpisces=[]
let bAttackedpisces=[]

let rightAttackedPieces={
    "w": wAttackedpisces,
    "b": bAttackedpisces
}


let repetition=false

function addAttackedSqueres(wichSide){
    rightAttackedSqueres[wichSide]=[]
    rightAttackedPieces[wichSide]=[]


    let temp=checkTurn 
    checkTurn=new RegExp("^"+wichSide,"i")

    piscesTracker[wichSide].forEach(elem=>{
        let piesce=board[elem]
        if(piesce==wichSide+"p"){
            if(wichSide=="w"){
                vlaidpawnCaptures=[9,11]
            }else{
                vlaidpawnCaptures=[-9,-11]
            }
        }

        attackingSqueres(piesce,elem)
        rightAttackedSqueres[wichSide]=[...rightAttackedSqueres[wichSide],...defendedSqueres,...potMoves]
        rightAttackedPieces[wichSide]=[...rightAttackedPieces[wichSide],...potCaptures]
    })
    checkTurn=temp
    vlaidpawnCaptures=[9,11]
    rightAttackedSqueres[wichSide]=removeDuplicate(rightAttackedSqueres[wichSide])
    rightAttackedPieces[wichSide]=removeDuplicate( rightAttackedPieces[wichSide])
}


function removeDuplicate(element){
    let filterd=element.filter((elem,index)=>{
        return element.indexOf(elem)===index
    })
    return filterd
}

function isKingMovesValid(){
    let checkingside=rightAttackedSqueres[switchTurns[turn]]
    let filteredpotMoves;
    let filteredCaptures;

    if(potMoves.length!==0){
        filteredpotMoves=potMoves.filter(elem=>{
        return checkingside.indexOf(elem)==-1
    })}else{
        filteredpotMoves=potMoves
    }

    if(potCaptures.length!==0){
        filteredCaptures=potCaptures.filter(elem=>{
        return checkingside.indexOf(elem)==-1
    })}else{
        filteredCaptures=potCaptures
    }

    return [filteredpotMoves,filteredCaptures]
}



function checkIfKingIsInCheck(){
    iskingincheck=false
    let checkingside=rightAttackedPieces[switchTurns[turn]]
    //check if king is attacked piesce
    if(checkingside.indexOf(kingsIndx[turn+"k"])!=-1){
        iskingincheck=true
    }
}



//check every pot move and see if any of them is valid to block check
function uncheck(curpiesce,jsbooardIndx){
    //to reuze potcaptures afther it is changed in filterCheckBlocks
    let temporaryAttackedSqueres=[...rightAttackedSqueres[switchTurns[turn]]]
    let tempotraryAttackedPisce=[...rightAttackedPieces[switchTurns[turn]]]
    let tempPotCapture=[...potCaptures]
    let copyboard1=[...board]
    let copyboard2=[...board]
    let tempunpasantt=unpassantt
    let tempPotMoves=filterCheckBlocks(true,curpiesce,jsbooardIndx)
    board=copyboard1
    potCaptures=tempPotCapture
    potCaptures=filterCheckBlocks(false,curpiesce,jsbooardIndx)
    board=copyboard2
    potMoves=tempPotMoves
    rightAttackedSqueres[switchTurns[turn]]=temporaryAttackedSqueres
    rightAttackedPieces[switchTurns[turn]]=tempotraryAttackedPisce
    unpassantt=tempunpasantt
}


function filterCheckBlocks(isPotMoves,curpiesce,jsbooardIndx){
    //checking potcaptures or potmoves
    let arr;
    if(isPotMoves&&potMoves.length!=0){
        arr=[...potMoves]
    }else if(!isPotMoves&&potCaptures.length!=0){
        arr=[...potCaptures]
    }else{
        return []
    }

    let curentpiscee=curpiesce

 let filtered=arr.filter(elem=>{
        let side;
        //create current boards copy so I can mess around with board and check every potmove
        let temp=[...board]
        let temporaryturnpiece=[...piscesTracker[turn]]
        let temporaryswichturn=[...piscesTracker[switchTurns[turn]]]
        
        if(curentpiscee[1]=="p"&&unpassantt == elem){
            //check if it is an unpeassant
            let unpassantedPawnindx=unpassantt+wichWay[switchTurns[turn]]
            board[unpassantedPawnindx]=emptySquere
        }

        if(curentpiscee[1]=="k"){
            //if pisces is king we want to update piece placement
            kingsIndx[turn+"k"]=elem
        }
        //play potmove on board if king isnot in check we can play that move
        board[elem]=curentpiscee
        board[jsbooardIndx]=emptySquere
        piscesTracker[turn].splice(piscesTracker[turn].indexOf(jsbooardIndx),1)
        piscesTracker[turn].push(elem)
        if(!isPotMoves){
            piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(elem),1)
        }

        addAttackedSqueres(switchTurns[turn])
        board=temp
        piscesTracker[turn]=temporaryturnpiece
        piscesTracker[switchTurns[turn]]=temporaryswichturn

        //addAttackedsqueres for player
        side=rightAttackedPieces[switchTurns[turn]]
        if(side.indexOf(kingsIndx[turn+"k"])==-1){
            if(curentpiscee[1]=="k"){
                kingsIndx[turn+"k"]=jsbooardIndx
            }
            return true
        }else{
            if(curentpiscee[1]=="k"){
                kingsIndx[turn+"k"]=jsbooardIndx
            }
           return false
        }
    })


    if(filtered.length!=0){
        return filtered
    }else{
        return []
    }

}





function isitCheckmate(wichSide){
    let tempunpasantt=unpassantt
    let piece;
    let elem;
    stalmate=true;
    if(iskingincheck){
        checkMate=true;
    }
    let pieceindx=[...piscesTracker[wichSide]]

    for(let i=0;i<pieceindx.length;i++){
        elem=pieceindx[i]
        piece=board[elem]
        validMoves(piece,elem)
        uncheck(piece,elem) 
        let moves=[...potMoves,...potCaptures]
        if(moves.length>0){
            stalmate=false;
            checkMate=false
            break;
        }
    }

    unpassantt=tempunpasantt
}


//stalmate
let prevposition=[]
let isIt3Repetition=0;

let piscevaluesForPostion={
    "wr": 10965530,
    "wn": 3896351,
    "wb": 1315602,
    "wq": 220151,
    "wk": 9688038,
    "wp": 2266642,
    "br": 3264620,
    "bn": 7801796,
    "bb": 5374032,
    "bq": 437326,
    "bk": 859005,
    "bp": 686067,
}

let squerenums={}

//zobrist hashing
function addPosition(listTOadd){
    let wnum=211341243;
    let bnum=2342343242;
    piscesTracker["w"].forEach(elem=>{
        wnum = squerenums[elem]^piscevaluesForPostion[board[elem]]
    })

    piscesTracker["b"].forEach(elem=>{
        bnum = squerenums[elem]^piscevaluesForPostion[board[elem]]
    })

    listTOadd.push(wnum^bnum)
}



function randomNumsToEachSquere(){
    for(let i=21;i<99;i++){
        squerenums[i]=Math.floor(i*(Math.random()*1000))
    }
}


function checkRepetition(){
    isIt3Repetition=0;
    let elementToCheck=prevposition[prevposition.length-1];

    prevposition.forEach(position=>{
        if(elementToCheck==position){
            isIt3Repetition++
        }
    })
    

    if(isIt3Repetition>=3){
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




function enoughpisces(){
    let allpisces=[...piscesTracker["w"],...piscesTracker["b"]]
    if(allpisces.length<5){
        let enoughpisce=allpisces.every(elem=>{
                            if(board[elem][1]=="b"||board[elem][1]=="n"||board[elem][1]=="k"){
                                return true
                            }else{
                                return false
                            }   
                            })
        if(enoughpisce&&piscesTracker["w"].length<3&&piscesTracker["b"].length<3){
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
}


function addPlayedmove(){
    fiftymove++
    if(fiftymove==100){
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










