const offBoard=0;
const emptySquere=100;

const materialValues={
    "p": 100,
    "n": 320,
    "b": 330,
    "r": 500,
    "q": 900,
    "k": 100000,
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
    offBoard,-30,  5, 25, 15, 15, 25,  5,-30,offBoard,
    offBoard,-40,-20,  0,  5,  5,  0,-20,-40,offBoard,
    offBoard,-50,-40,-30,-30,-30,-30,-40,-50,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
]    
            
            
const bbishop=[
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
    offBoard,-20,-10,-10,-10,-10,-10,-10,-20,offBoard,
    offBoard,-10,  0,  0,  0,  0,  0,  0,-10,offBoard,
    offBoard,-10,  0,  5, 10, 10,  5,  0,-10,offBoard,
    offBoard,-10,  10,  5, 10, 10,  5, 10,-10,offBoard,
    offBoard,-10,  0, 10, 10, 10, 10,  0,-10,offBoard,
    offBoard,-10, 10, 10, 10,  0, 10, 10,-10,offBoard,
    offBoard,-10, 15,  0, 15, 15,  0, 15,-10,offBoard,
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
    offBoard, 0,  0,  5,  5,  5,  -5, -5,  0,offBoard,
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

//white pisce shortcuts so we don't have to use a lot of if statments
const wkingeval={
    "true": wkingOpening,
    "false": wkingEndgame,
}

const wpawneval={
    "true": wpawnMidlegame,
    "false": wpawnEndgame
}

let wPiecesEval={
    "wn": wnight,
    "wb": wbishop,
    "wr": wrook,
    "wq": wqueen,
    "wp": wpawnMidlegame,
    "wk": wkingOpening
}

//black pisce shortcuts so we don't have to use a lot of if statments

const bkingeval={
    "true": bkingOpening,
    "false": bkingEndgame,
}

const bpawnEval={
    "true": bpawnMidlegame,
    "false": bpawnEndgame
}

let bPiecesEval={
    "bn": bnight,
    "bb": bbishop,
    "br": brook,
    "bq": bqueen,
    "bk": bkingOpening,
    "bp": bpawnMidlegame
}

let shortcuts={
    "w": wPiecesEval,
    "b": bPiecesEval,
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

let evaluation=0
let whitesideEvaluation=0
let blacksideEvaluation=0

function bothsideEval(){
    return shortcutseval['w']-shortcutseval["b"]
}


let shortcutseval={
    "w": whitesideEvaluation,
    "b": blacksideEvaluation
}
