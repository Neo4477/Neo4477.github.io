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
    let tempPotMoves=filterCheckBlocks(true,curpiesce,jsbooardIndx)
    potCaptures=tempPotCapture
    potCaptures=filterCheckBlocks(false,curpiesce,jsbooardIndx)
    potMoves=tempPotMoves
    rightAttackedSqueres[switchTurns[turn]]=temporaryAttackedSqueres
    rightAttackedPieces[switchTurns[turn]]=tempotraryAttackedPisce
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
}


//stalmate
let prevposition=[]
let valueToAdd;
let isIt3Repetition=0;

let piscevaluesForPostion={
    100: 100,
    "wr": 3900,
    "wn": 17143,
    "wb": 43789,
    "wq": 87324,
    "wk": 129212,
    "wp": 153892,
    "br": 182345,
    "bn": 233213,
    "bb": 272131,
    "bq": 323123,
    "bk": 363543,
    "bp": 392131,
}

//just to generate random values so we can check prevposition
function addPosition(){
    isIt3Repetition=0;
    valueToAdd=0;
    repetition=false;

    for(let i=files.file_1;i<files.file_8+1;i++){
        for(let j=ranks.rank_1;j<ranks.rank_8+1;j++){
            let indexOnboard=indexOnJsBoard([i,j])
            valueToAdd=valueToAdd+(piscevaluesForPostion[board[indexOnboard]]*(i*7)*(j*16))
        }
    }

    prevposition.forEach(elem=>{
        if(elem==valueToAdd){
            isIt3Repetition++
        }
    })

    if(isIt3Repetition == 2){
        repetition=true
    }
    prevposition.push(valueToAdd)

    if(prevposition.length==16){
        prevposition=[]
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
            document.querySelector(".draw").classList.add("show")
        }                    
    }
}


function addPlayedmove(){
    fiftymove++
    if(fiftymove==100){
        document.querySelector(".draw").classList.add("show")
    }
}










