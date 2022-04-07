const offBoard=0;
const emptySquere=100;

const materialValues={
    "p": 100,
    "n": 320,
    "b": 330,
    "r": 500,
    "q": 900,
    "k": 2000000000,
}

let materialcount=[]

const bpawnMidlegame=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard, 0,  0,  0,  0,  0,  0,  0,  0,offBoard,
    offBoard,50, 50, 50, 50, 50, 50, 50, 50,offBoard,
    offBoard,10, 10, 20, 40, 40, 20, 10, 10,offBoard,
    offBoard, 5,  5, 10, 30, 30, 10,  5,  5,offBoard,
    offBoard, 0,  0,  0, 20, 20,  0,  0,  0,offBoard,
    offBoard, 10, -5,-10,  0,  0,-10, -5, 10,offBoard,
    offBoard, 5, 10, 10,-20,-20, 10, 10,  5,offBoard,
    offBoard, 0,  0,  0,  0,  0,  0,  0,  0,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]          

const bpawnEndgame=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard, 0,  0,  0,  0,  0,  0,  0,  0,offBoard,
    offBoard,50, 50, 50, 50, 50, 50, 50, 50,offBoard,
    offBoard,40, 40, 40, 40, 40, 40, 40, 40,offBoard,
    offBoard, 30,  30, 30, 30, 30, 30,  30,30,offBoard,
    offBoard, 20,  20,  20, 20, 20,  20,20,20,offBoard,
    offBoard, 10, 10, 10,  10,  10, 10, 10,10,offBoard,
    offBoard, 0,0,0,0,0,0,0,0,offBoard,
    offBoard, 0,0,0,0,0,0,0,0,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]


const bnight=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-50,-40,-30,-30,-30,-30,-40,-50,offBoard,
    offBoard,-40,-20,  0,  0,  0,  0,-20,-40,offBoard,
    offBoard,-30,  0, 10, 15, 15, 10,  0,-30,offBoard,
    offBoard,-30,  5, 15, 20, 20, 15,  5,-30,offBoard,
    offBoard,-30,  0, 15, 20, 20, 15,  0,-30,offBoard,
    offBoard,-30,  5, 25, 15, 15, 10,  5,-30,offBoard,
    offBoard,-40,-20,  0,  5,  5,  0,-20,-40,offBoard,
    offBoard, 50,-40,-30,-30,-30,-30,-40,-50,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]    
            
            
const bbishop=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-20,-10,-10,-10,-10,-10,-10,-20,offBoard,
    offBoard,-10,  0,  0,  0,  0,  0,  0,-10,offBoard,
    offBoard,-10,  0,  5, 10, 10,  5,  0,-10,offBoard,
    offBoard,-10,  5,  5, 10, 10,  5,  5,-10,offBoard,
    offBoard,-10,  0, 10, 10, 10, 10,  0,-10,offBoard,
    offBoard,-10, 10, 10, 10, 10, 10, 10,-10,offBoard,
    offBoard,-10,  5,  0,  5,  5,  0,  5,-10,offBoard,
    offBoard,-20,-10,-30,-10,-10,-30,-10,-20,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]


const brook=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,0,  0,  0,  0,  0,  0,  0,  0,offBoard,
    offBoard, 5, 10, 10, 10, 10, 10, 10,  5,offBoard,
    offBoard,-5,  0,  0,  0,  0,  0,  0, -5,offBoard,
    offBoard,-5,  0,  0,  0,  0,  0,  0, -5,offBoard,
    offBoard,-5,  0,  0,  0,  0,  0,  0, -5,offBoard,
    offBoard,-5,  0,  0,  0,  0,  0,  0, -5,offBoard,
    offBoard,-5,  0,  0,  0,  0,  0,  0, -5,offBoard,
    offBoard, 0,  0,  0,  5,  5,  0,  0,  0,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]
    
const bqueen=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-20,-10,-10, -5, -5,-10,-10,-20,offBoard,
    offBoard,-10,  0,  0,  0,  0,  0,  0,-10,offBoard,
    offBoard,-10,  0,  5,  5,  5,  5,  0,-10,offBoard,
    offBoard,-5,  0,  5,  5,  5,  5,  0, -5,offBoard,
    offBoard, 0,  0,  5,  5,  5,  5,  0, -5,offBoard,
    offBoard,-10,  0,  0,  5,  5,  0,  0,-10,offBoard,
    offBoard, -10,  0, 0,  0,  0,  0,  0,-10,offBoard,
    offBoard,-20,-10,-10, -5, -5,-10,-10,-20,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]


const bkingOpening=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-30,-40,-40,-50,-50,-40,-40,-30,offBoard,
    offBoard,-30,-40,-40,-50,-50,-40,-40,-30,offBoard,
    offBoard,-30,-40,-40,-50,-50,-40,-40,-30,offBoard,
    offBoard,-30,-40,-40,-50,-50,-40,-40,-30,offBoard,
    offBoard,-20,-30,-30,-40,-40,-30,-30,-20,offBoard,
    offBoard,-10,-20,-20,-20,-20,-20,-20,-10,offBoard,
    offBoard, 20, 20,  0,  0,  0,  0, 20, 20,offBoard,
    offBoard, 20, 50, -5,  0,  0, -5, 50, 20,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]
    

const bkingEndgame=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-50,-40,-30,-20,-20,-30,-40,-50,offBoard,
    offBoard,-30,-20,-10,  0,  0,-10,-20,-30,offBoard,
    offBoard,-30,-10, 20, 30, 30, 20,-10,-30,offBoard,
    offBoard,-30,-10, 30, 40, 40, 30,-10,-30,offBoard,
    offBoard,-30,-10, 30, 40, 40, 30,-10,-30,offBoard,
    offBoard,-30,-10, 20, 30, 30, 20,-10,-30,offBoard,
    offBoard,-30,-30,  0,  0,  0,  0,-30,-30,offBoard,
    offBoard,-50,-30,-30,-30,-30,-30,-30,-50,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]





const wnight=reverseBoard(bnight)           
const wbishop=reverseBoard(bbishop)
const wrook=reverseBoard(brook)
const wqueen=reverseBoard(bqueen)

const wpawnMidlegame=reverseBoard(bpawnMidlegame)
const wpawnEndgame=reverseBoard(bpawnEndgame)
const wkingOpening=reverseBoard(bkingOpening)
const wkingEndgame=reverseBoard(bkingEndgame)


let isItMiddleGame="true"

const wPiecesEval={
    "wn": wnight,
    "wb": wbishop,
    "wr": wrook,
    "wq": wqueen,
}

const wkingeval={
    "true": wkingOpening,
    "false": wkingEndgame,
}

const wpawneval={
    "true": wpawnMidlegame,
    "false": wpawnEndgame
}

const bPiecesEval={
    "bn": bnight,
    "bb": bbishop,
    "br": brook,
    "bq": bqueen,
}

const bkingeval={
    "true": bkingOpening,
    "false": bkingEndgame,
}

const bpawnEval={
    "true": bpawnMidlegame,
    "false": bpawnEndgame
}

const shortcuts={
    "w": wPiecesEval,
    "b": bPiecesEval,
}

const shortcutskings={
    "w": wkingeval,
    "b": bkingeval,
}

const shortcutspawn={
    "w": wpawneval,
    "b": bpawnEval,
}

function reverseBoard(copyboard){
    let copyy=[...copyboard]
    copyy.forEach((elem,index)=>{
        if(index<60){
        copyy[index]=copyy[copyy.length-1-index]
        copyy[copyy.length-1-index]=elem
    }
    })
    return copyy
}

let fakeboard=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,"wr","wn","wb","wq","wk","wb","wn","wr",offBoard,
    offBoard,"wp","wp","wp","wp","wp","wp","wp","wp",offBoard,
    offBoard,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,offBoard,
    offBoard,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,offBoard,
    offBoard,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,offBoard,
    offBoard,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,emptySquere,offBoard,
    offBoard,"bp","bp","bp","bp","bp","bp","bp","bp",offBoard,
    offBoard,"br","bn","bb","bq","bk","bb","bn","br",offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]

let evaluation=0
let whitesideEvaluation=0
let blacksideEvaluation=0


function evaluateBothSide(copyboard){
    evaluation=0
    evaluateBoard("w",copyboard)
    evaluateBoard("b",copyboard)
}

function evaluateBoard(side,copyboard){
    let trakedpisces=piscesTracker[side]
    let wholesideEvaluation=0
    
    trakedpisces.forEach(elem=>{
        let pisce=copyboard[elem]
        let pisceevaluation;
        
        if(pisce[1]=="k"){
            pisceevaluation=materialValues[pisce[1]]+shortcutskings[side][isItMiddleGame][elem]
        }else if(pisce[1]=="p"){
            pisceevaluation=materialValues[pisce[1]]+shortcutspawn[side][isItMiddleGame][elem]
        }else{
           pisceevaluation=materialValues[pisce[1]]+shortcuts[side][pisce][elem]
        }
        wholesideEvaluation+=pisceevaluation
    })


    if(side=="w"){
        evaluation+=wholesideEvaluation
    }else if(side=="b"){
        evaluation-=wholesideEvaluation
    }
}
function bothsideEval(){
    return shortcutseval['w']-shortcutseval["b"]
}
function startgingPositionEvaluate(){
piscesTracker["w"].forEach(elem=>{
    let pisce=board[elem]
    let pisceevaluation;
    
    if(pisce[1]=="k"){
        pisceevaluation=materialValues[pisce[1]]+shortcutskings["w"][isItMiddleGame][elem]
    }else if(pisce[1]=="p"){
        pisceevaluation=materialValues[pisce[1]]+shortcutspawn["w"][isItMiddleGame][elem]
    }else{
       pisceevaluation=materialValues[pisce[1]]+shortcuts["w"][pisce][elem]
    }
    whitesideEvaluation+=pisceevaluation
})

piscesTracker["b"].forEach(elem=>{
    let pisce=board[elem]
    let pisceevaluation;
    
    if(pisce[1]=="k"){
        pisceevaluation=materialValues[pisce[1]]+shortcutskings["b"][isItMiddleGame][elem]
    }else if(pisce[1]=="p"){
        pisceevaluation=materialValues[pisce[1]]+shortcutspawn["b"][isItMiddleGame][elem]
    }else{
       pisceevaluation=materialValues[pisce[1]]+shortcuts["b"][pisce][elem]
    }
    blacksideEvaluation+=pisceevaluation
})

    shortcutseval={
        "w": whitesideEvaluation,
        "b": blacksideEvaluation
    }

}


let shortcutseval={
    "w": whitesideEvaluation,
    "b": blacksideEvaluation
}
