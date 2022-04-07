let potMoves=[]
let potCaptures=[] 

let defendedSqueres=[]
//pawn
let potPromotion=[]
let potUnPassant=NaN
let unpassantt=0;
let wichWay={"w":10,"b":-10}
//castle
let boardRankByTurn={"w": ranks.rank_1,"b":ranks.rank_8}
let castle={
    //if castling is allowed element value>0 
    wl: 1,
    wr: 1,
    bl: 1,
    br: 1,
}

//move list
const validRook=[10,-10,1,-1]
const validHorse=[19,21,-19,-21,8,12,-8,-12]
const validBishop=[9,11,-9,-11]
const validQueenKing=[...validRook,...validBishop]
let validPawnMoves=[10]
let vlaidpawnCaptures=[9,11]

function validMoves(pisce,jsBoardIndx){
    switch(pisce[1]){
        case "r":
            addPotMoves(jsBoardIndx,validRook)
            checkRookCastle()
            break;
        case "b":
            addPotMoves(jsBoardIndx,validBishop)
            break;
        case "q":
            addPotMoves(jsBoardIndx,validQueenKing)
            break;
        case "n":
            addPotMoves(jsBoardIndx,validHorse)
            break;
        case "k":
            addPotMoves(jsBoardIndx,validQueenKing)
            filtered=isKingMovesValid()
            potMoves=filtered[0]
            potCaptures=filtered[1]
            allowedCastle()
            castleClearWay(jsBoardIndx)
            break;
        case "p":
            pawnValidmoves(jsBoardIndx)
            pownPromotion()
            unpassant(jsBoardIndx)
            break;
    }
    
}


function addPotMoves(jsBoardIndx,availeblMoves){
    //reset pot moves
    potMoves=[]
    potCaptures=[]
    defendedSqueres=[]
    availeblMoves.forEach(elem=>{
        //next squere to checkonboard for piesce
        let pisceindex=jsBoardIndx+elem
        while(board[pisceindex]!==offBoard){
            let currentSquere=board[pisceindex]
            if(currentSquere===emptySquere){
                //if currentsquere is empty add potmove
                potMoves.push(pisceindex)
                pisceindex+=elem
                //check for king and night to add potmove in direction only one time
                if(board[jsBoardIndx][1]=="n"||board[jsBoardIndx][1]=="k"||board[jsBoardIndx][1]=="p"){
                    break;
                }
            }else if(checkTurn.test(currentSquere)){
                //if their is my piece in the way stop adding pot moves
                defendedSqueres.push(pisceindex)
                break;
            }else{
                //if there is another color pisce add to potcapture
                potCaptures.push(pisceindex)
                break;
            }
        }
    })
}


function pawnValidmoves(jsBoardIndx){
    potMoves=[]
    potCaptures=[]
    validPawnMoves=[10]
    //checks if it is a pawns starting position
    if(Math.floor(jsBoardIndx/10-2)===ranks.rank_7&&turn==="b"){
        validPawnMoves.push(20)
    }else if(Math.floor(jsBoardIndx/10-2)===ranks.rank_2&&turn==="w"){
        validPawnMoves.push(20)
    }else if(validPawnMoves.length>1){
        validPawnMoves=[10]
    }


    validPawnMoves.forEach(elem=>{
        let element=jsBoardIndx+elem
        if(board[jsBoardIndx][0]=="b"){
            element=jsBoardIndx-elem
        }

        if(board[element] == emptySquere){
            if(elem==20&&potMoves.length==0){
                return 
            }
            potMoves.push(element)
        }
    })




    vlaidpawnCaptures.forEach(elem=>{
        let element=jsBoardIndx+elem
       
        if(board[jsBoardIndx][0]=="b"){
            element=jsBoardIndx-elem
        }

        if(board[element]!==emptySquere&&board[element][0]!==turn&&board[element]!==offBoard){
            potCaptures.push(element)
        }

    })
}


function pownPromotion(){
    potPromotion=[]
    let promotionposibility=[...potMoves,...potCaptures]
    if(promotionposibility.length!==0){
        //if pown  is going to promote any pot move should be on the 0/7 rank
        if(Math.floor(promotionposibility[0]/10-2)==boardRankByTurn[switchTurns[turn]]){
            potPromotion=promotionposibility
        }
     }
}

function unpassant(jsBoardIndx){
    //check left and riht side squere of pawn for potential unpassant
    let left=jsBoardIndx-1
    let right=jsBoardIndx+1
    if(potUnPassant){
        if(left==potUnPassant||right==potUnPassant){
            potMoves.push(potUnPassant+wichWay[turn])
            unpassantt=potUnPassant+wichWay[turn]
        }
    }
}


function allowedCastle(){
    //check if castle is allowed for playing side
    if(castle[turn+'l']+castle[turn+"r"]>0){
        let kingOnPlayerSide=board[indexOnJsBoard( [files.file_5,boardRankByTurn[turn]])]
        let leftRookOnPlayerSide=board[indexOnJsBoard( [files.file_1,boardRankByTurn[turn]])]
        let rigthRookOnPlayerSide=board[indexOnJsBoard( [files.file_8,boardRankByTurn[turn]] ) ]

        if(kingOnPlayerSide!==turn+"k"){
            castle[turn+"l"]=0
            castle[turn+'r']=0
        }

        if(leftRookOnPlayerSide!==turn+"r"){
            castle[turn+'l']=0
        }

        if(rigthRookOnPlayerSide!==turn+"r"){
            castle[turn+'r']=0
        }
    }
}

function checkRookCastle(){
    if(castle[turn+'l']+castle[turn+"r"]>0){
            if(board[indexOnJsBoard([files.file_1,boardRankByTurn[turn]])]!==turn+"r"){
                castle[turn+"l"]=0
            }else if(board[indexOnJsBoard( [files.file_8,boardRankByTurn[turn]])]!==turn+"r"){
                castle[turn+"r"]=0
            }
    }
}


function castleClearWay(jsBoardIndx){
    //check if castle is allowed for playing side
    if(castle[turn+'l']+castle[turn+"r"]>0){
        //check if castle squeres are attacked
        let chekway=rightAttackedSqueres[switchTurns[turn]]

        if(board[jsBoardIndx+1]==emptySquere&&board[jsBoardIndx+2]==emptySquere&&castle[turn+"r"]!==0&&chekway.indexOf(jsBoardIndx+1)==-1&&chekway.indexOf(jsBoardIndx+2)==-1&&!iskingincheck){
            potMoves.push(jsBoardIndx+2)
        }   

        if(board[jsBoardIndx-1]==emptySquere&&board[jsBoardIndx-2]==emptySquere&&board[jsBoardIndx-3]==emptySquere&&castle[turn+"l"]!==0&&chekway.indexOf(jsBoardIndx-1)==-1&&chekway.indexOf(jsBoardIndx-2)==-1&&!iskingincheck){
            potMoves.push(jsBoardIndx-2)
        }
    }
}


//checking for attacking squere alomost same as validMoves but a little bit more efficient
function attackingSqueres(pisce,jsBoardIndx){
    switch(pisce[1]){
        case "r":
            addPotMoves(jsBoardIndx,validRook)
            break;
        case "b":
            addPotMoves(jsBoardIndx,validBishop)
            break;
        case "q":
            addPotMoves(jsBoardIndx,validQueenKing)
            break;
        case "n":
            addPotMoves(jsBoardIndx,validHorse)
            break;
        case "k":
            addPotMoves(jsBoardIndx,validQueenKing)
            break;
        case "p":
            addPotMoves(jsBoardIndx,vlaidpawnCaptures)
            break;
    }
    
}


//validmoves AI 
function validMovesAi(pisce,jsBoardIndx){
    switch(pisce[1]){
        case "r":
            addPotMoves(jsBoardIndx,validRook)
            checkRookCastle()
            break;
        case "b":
            addPotMoves(jsBoardIndx,validBishop)
            break;
        case "q":
            addPotMoves(jsBoardIndx,validQueenKing)
            break;
        case "n":
            addPotMoves(jsBoardIndx,validHorse)
            break;
        case "k":
            addPotMoves(jsBoardIndx,validQueenKing)
            allowedCastle()
            castleClearWay(jsBoardIndx)
            break;
        case "p":
            pawnValidmoves(jsBoardIndx)
            pownPromotion()
            break;
    }
    
}