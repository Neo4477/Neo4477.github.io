const files={
    file_1:0,
    file_2:1,
    file_3:2,
    file_4:3,
    file_5:4,
    file_6:5,
    file_7:6,
    file_8:7,
}

const ranks={
    rank_1:0,
    rank_2:1,
    rank_3:2,
    rank_4:3,
    rank_5:4,
    rank_6:5,
    rank_7:6,
    rank_8:7,
}



let board=[ offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,offBoard,
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
];//exact representation of board


//converting numbers
//pickelemetn on real board
function pickElement(fileRankIndxs){
    return board_files[fileRankIndxs[0]].children[fileRankIndxs[1]]
 }

 //from realboard indexes to jsboard
 function indexOnJsBoard(fileRankIndxs){
    return ((21+fileRankIndxs[0])+(fileRankIndxs[1]*10))
}

//from jsboard to realboard
function indexOnRealBoard(index){
    let rank=Math.floor(index/10)-2
    let file=Math.floor(index%10)-1
    
    return [file,rank]
}