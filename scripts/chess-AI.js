

let lastPickedPisce;
let lastPickedMove;
let boardevaluation;
let evall;
let legalMove=true;


function chessAi(){
    let pisces=[...piscesTracker[turn]]
    //potmoves
    let finalEvaluationMove=+Infinity
    let aipiscetomove;
    let aipisctomoveindx;
    let aimove;
    //potcaptures
    let finalEvaluationCapture=+Infinity
    let aipiscetoCaptureWith;
    let aipiscetoCaptureWithindx;
    let aicapture;

    let piscecount=piscesTracker["w"].length+piscesTracker["b"].length

    pisces.forEach(piscetomoveind=>{
        let pisce=board[piscetomoveind]
        let copypisceTochangeValue=board[piscetomoveind]
        turn="b"
        checkTurn=new RegExp("^"+turn,"i")
        if(iskingincheck){
            validMovesAi(pisce,piscetomoveind)
            uncheck(pisce,piscetomoveind)
        }else{
            validMovesAi(pisce,piscetomoveind)
        }
        let copyPotMoves=[...potMoves]
        let copyCaptures=[...potCaptures]
        copyPotMoves.forEach(moveindx=>{
            let temporarycastle=Object.assign({},castle)
            let piscetomovecopy=pisce
            let temporaryevaluation=Object.assign({},shortcutseval)
            var copypisces=[...piscesTracker[turn]]
            let tempturn=turn
            var copyBoard=[...board]
            let tempiskingincheck=iskingincheck
            legalMove=true

            if(pisce[1]=="p"){
                if(potPromotion.length>0){
                    pisce=turn+"q"
                    //add eval
                    shortcutseval[turn]+=800
                }
            }

            if(pisce[1]=="k"){
                let isItCastle=moveindx-piscetomoveind
                if(isItCastle==2){
                    castlecheck(files.file_8,files.file_6)
                }else if(isItCastle==-2){
                    castlecheck(files.file_1,files.file_4)
                }   


            }

            //change js board
            board[piscetomoveind]=emptySquere
            board[moveindx]=pisce
            //change piscetrack
            piscesTracker[turn].splice(piscesTracker[turn].indexOf(piscetomoveind),1)
            piscesTracker[turn].push(moveindx)
            //change evaluation start
            if(pisce[1]=="k"){
                shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][piscetomoveind]
                shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][moveindx]
            }else if(pisce[1]=="p"){
                shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][piscetomoveind]
                shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][moveindx]
            }else{
                if(piscetomovecopy[1]=="p"){
                    shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][piscetomoveind]
                }else{
                    shortcutseval[turn]-=shortcuts[turn][pisce][piscetomoveind]
                }
                shortcutseval[turn]+=shortcuts[turn][pisce][moveindx]
            }
            //end
            let tempetempturn=turn
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")
            addAttackedSqueres("b")
            checkIfKingIsInCheck()
            isitCheckmate("w")
            turn=tempetempturn
            iskingincheck=tempiskingincheck
            checkTurn=new RegExp("^"+turn,"i")

            if(checkMate){
                evall=-1000000000000
            }else if(stalmate){
                evall=0
            }

             //check if move is illegal
            if(pisce[1]=="k"){
                let legality=validQueenKing.every(elem=>{
                    return board[elem+moveindx]!=="wk"
                })
                if(!legality){
                    console.log("dsadasda")
                    evall=100000000000000  
                    legalMove=false     
                }
            }


        if(!checkMate&&!stalmate&&legalMove){
            if(piscecount>10){
                evall=minimax(3,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }else if(piscecount>5){
                evall=minimax(4,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }else{
                evall=minimax(5,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }
        }

            stalmate=false
            checkMate=false
            turn=tempturn

            if(evall<finalEvaluationMove){
                finalEvaluationMove=evall
                aipiscetomove=copypisceTochangeValue
                aipisctomoveindx=piscetomoveind
                aimove=moveindx
            }
            board=copyBoard
            piscesTracker[turn]=copypisces
            castle=temporarycastle
            shortcutseval=temporaryevaluation
        })

        copyCaptures.forEach(moveindx=>{
            var copyBoard=[...board]
            let temporarycastle=Object.assign({},castle)
            var copybpisces=[...piscesTracker[turn]]
            var copywpisces=[...piscesTracker[switchTurns[turn]]]
            let tempturn=turn
            let tempiskingincheck=iskingincheck
            let temporaryevaluation=Object.assign({},shortcutseval)
            let piscetomovecopy=pisce
            let pisceToCapture=board[moveindx]
            legalMove=true
            if(pisce[1]=="p"&&potPromotion.length>0){
                    pisce=turn+"q"   
                     //add eval
                     shortcutseval[turn]+=800
            }
            
            //change js board
            board[piscetomoveind]=emptySquere
            board[moveindx]=pisce
            //change piscetrack
            piscesTracker[turn].splice(piscesTracker[turn].indexOf(piscetomoveind),1)
            piscesTracker[turn].push(moveindx)
            piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(moveindx),1)
            //change eval start
            if(pisce[1]=="k"){
                shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][piscetomoveind]
                shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][moveindx]
                shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                if(pisceToCapture[1]=="p"){
                    shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][moveindx]
                }else if(pisceToCapture[1]=="k"){
                    shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                }else{
                    shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][moveindx]
                }
            }else if(pisce[1]=="p"){
                shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][piscetomoveind]
                shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][moveindx]
                shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                if(pisceToCapture[1]=="p"){
                    shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][moveindx]
                }else if(pisceToCapture[1]=="k"){
                    shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                }else{
                    shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][moveindx]
                }
            }else{
                if(piscetomovecopy[1]=="p"){
                    shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][piscetomoveind]
                }else{
                    shortcutseval[turn]-=shortcuts[turn][pisce][piscetomoveind]
                }
                shortcutseval[turn]+=shortcuts[turn][pisce][moveindx]
                shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                if(pisceToCapture[1]=="p"){
                    shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][moveindx]
                }else if(pisceToCapture[1]=="k"){
                    shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                }else{
                    shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][moveindx]
                }
            }
            //change eval end
            addPosition()
            if(repetition){
                evall==0
            }

            let tempetempturn=turn
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")
            addAttackedSqueres("b")
            checkIfKingIsInCheck()
            isitCheckmate("w")
            turn=tempetempturn
            iskingincheck=tempiskingincheck
            checkTurn=new RegExp("^"+turn,"i")

            if(checkMate){
                evall=-1000000000000
            }else if(stalmate){
                evall=0
            }
            
            //check if move is illegal
           if(pisce[1]=="k"){
                let legality=validQueenKing.every(elem=>{
                    return board[moveindx+elem]!="wk"
                })
                if(!legality){
                    evall=100000000000000  
                    legalMove=false     
                }
            }

        if(!checkMate&&!stalmate&&legalMove&&!repetition){
            if(piscecount>10){
                evall=minimax(3,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }else if(piscecount>5){
                evall=minimax(4,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }else{
                evall=minimax(5,-Infinity,+Infinity,true,piscesTracker["w"],"w")
            }
        }

            stalmate=false
            checkMate=false

            turn=tempturn
            if(evall<finalEvaluationCapture){
                finalEvaluationCapture=evall
                aipiscetoCaptureWith=copypisceTochangeValue
                aipiscetoCaptureWithindx=piscetomoveind
                aicapture=moveindx
            }

            piscesTracker[switchTurns[turn]]=copywpisces
            board=copyBoard
            piscesTracker[turn]=copybpisces
            castle=temporarycastle
            shortcutseval=temporaryevaluation
        })

    })

    checkTurn=new RegExp("^"+turn,"i")
    console.log(finalEvaluationMove)
    console.log(finalEvaluationCapture)
    if(finalEvaluationMove<finalEvaluationCapture){
        validMoves(aipiscetomove,aipisctomoveindx)
        pisceToMoveIndx=indexOnRealBoard(aipisctomoveindx)
        pisceToMove=aipiscetomove
        currentPisceindxs=indexOnRealBoard(aimove)
        currentPisce=100
        guiChess()
    }else{
        validMoves(aipiscetoCaptureWith,aipiscetoCaptureWithindx)
        pisceToMoveIndx=indexOnRealBoard(aipiscetoCaptureWithindx)
        pisceToMove=aipiscetoCaptureWith
        currentPisceindxs=indexOnRealBoard(aicapture)
        currentPisce=board[aicapture]
        guiChess()
    }
}


function minimax(depth,alpha,beta,maxsimazingPlayer,piscecTocheck,turnvalue){ 
    if(depth==0){
       return bothsideEval()
    }
    let checkpisces=[...piscecTocheck]


    if(maxsimazingPlayer){
        let maxvalue;
        let maxvaluepotmove=-Infinity
        let maxvaluepotCapture=-Infinity

    
            for(let j=0;j<checkpisces.length;j++){
                let maxPlayerMoveindx=checkpisces[j]
                turn=turnvalue 
                checkTurn=new RegExp("^"+turnvalue,"i")
                let maxPlayerpisce=board[maxPlayerMoveindx]
                let copypisce=maxPlayerpisce
                validMovesAi(maxPlayerpisce,maxPlayerMoveindx)
                let potmovescopy=[...potMoves]
                let potCapturescopy=[...potCaptures]
                let tempcastle=Object.assign({},castle)

                for(let i=0;i<potmovescopy.length;i++){
                    let tempPistrack=[...piscesTracker["w"]]
                    let tempboard=[...board]
                    let temporaryevaluation=Object.assign({},shortcutseval)
                    
                    if(maxPlayerpisce[1]=="p"){
                        //check if move is unpassant
                        if(potPromotion.length>0){
                            maxPlayerpisce=turn+"q"   
                            //add eval
                            shortcutseval[turn]+=800
                        }
                    }

                    
                    if(maxPlayerpisce[1]=="k"){
                        let isItCastle=potmovescopy[i]-maxPlayerMoveindx
                        if(isItCastle==2){
                            castlecheck(files.file_8,files.file_6)
                        }else if(isItCastle==-2){
                            castlecheck(files.file_1,files.file_4)
                        }   
                    }

                                
                     //change js board
                    board[maxPlayerMoveindx]=emptySquere
                    board[potmovescopy[i]]=maxPlayerpisce
                    //change piscetrack
                    piscesTracker[turn].splice(piscesTracker[turn].indexOf(maxPlayerMoveindx),1)
                    piscesTracker[turn].push(potmovescopy[i])
                    //change evalluation start
                    if(maxPlayerpisce[1]=="k"){
                        shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][maxPlayerMoveindx]
                        shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][potmovescopy[i]]
                    }else if(maxPlayerpisce[1]=="p"){
                        shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                        shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][potmovescopy[i]]
                    }else{
                        if(copypisce[1]=="p"){
                            shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                        }else{
                            shortcutseval[turn]-=shortcuts[turn][maxPlayerpisce][maxPlayerMoveindx]
                        }
                        shortcutseval[turn]+=shortcuts[turn][maxPlayerpisce][potmovescopy[i]]
                    }
                    //end
                    evall=minimax(depth-1,alpha,beta,false,piscesTracker["b"],"b")
                    maxvaluepotmove=Math.max(maxvaluepotmove,evall)
                    board=tempboard
                    piscesTracker["w"]=tempPistrack
                    turn=turnvalue
                    castle=tempcastle
                    shortcutseval=temporaryevaluation
                    alpha=Math.max(evall,alpha)
                    if(alpha>=beta){
                       break;
                    }
                }

                if(alpha>=beta){
                    break;
                }

                for(let i=0;i<potCapturescopy.length;i++){
                    let tempPistrack=[...piscesTracker["w"]]
                    var copywpiscess=[...piscesTracker["b"]]
                    let tempboard=[...board]
                    let temporaryevaluation=Object.assign({},shortcutseval)
                    let pisceToCapture=board[potCapturescopy[i]]

                    if(maxPlayerpisce[1]=="p"&&potPromotion.length>0){
                        maxPlayerpisce=turn+"q"   
                        //add eval
                        shortcutseval[turn]+=800
                    }

  
                    //change js board
                    board[maxPlayerMoveindx]=emptySquere
                    board[potCapturescopy[i]]=maxPlayerpisce
                    //change piscetrack
                    piscesTracker[turn].splice(piscesTracker[turn].indexOf(maxPlayerMoveindx),1)
                    piscesTracker[turn].push(potCapturescopy[i])
                    piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(potCapturescopy[i]),1)
                    //change evaluation start
                    //change eval start
                    if(maxPlayerpisce[1]=="k"){
                        shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][maxPlayerMoveindx]
                        shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][potCapturescopy[i]]
                        shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                        if(pisceToCapture[1]=="p"){
                            shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else if(pisceToCapture[1]=="k"){
                            shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else{
                            shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                        }
                    }else if(maxPlayerpisce[1]=="p"){
                        shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                        shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][potCapturescopy[i]]
                        shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                        if(pisceToCapture[1]=="p"){
                            shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else if(pisceToCapture[1]=="k"){
                            shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else{
                            shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                        }
                    }else{
                        if(copypisce[1]=="p"){
                            shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                        }else{
                            shortcutseval[turn]-=shortcuts[turn][maxPlayerpisce][maxPlayerMoveindx]
                        }
                        shortcutseval[turn]+=shortcuts[turn][maxPlayerpisce][potCapturescopy[i]]
                        shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                        if(pisceToCapture[1]=="p"){
                            shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else if(pisceToCapture[1]=="k"){
                            shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                        }else{
                            shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                        }
                    }
                    //end
                    evall=minimax(depth-1,alpha,beta,false,piscesTracker["b"],"b")
                    maxvaluepotCapture=Math.max(evall,maxvaluepotCapture)
                    piscesTracker["b"]=copywpiscess
                    board=tempboard
                    piscesTracker["w"]=tempPistrack
                    turn=turnvalue
                    castle=tempcastle
                    shortcutseval=temporaryevaluation
                    alpha=Math.max(evall,alpha)
                    if(alpha>=beta){
                        break;
                    }
                }

                if(alpha>=beta){
                    break;
                }

            }


            maxvalue=Math.max(maxvaluepotmove,maxvaluepotCapture)
            if(maxvalue==-Infinity){
                return -100000000
            }

            return maxvalue
    }else{
        let minvalue;
        let minvaluepotmove=+Infinity
        let minvaluepotCapture=+Infinity


        for(let j=0;j<checkpisces.length;j++){
            let maxPlayerMoveindx=checkpisces[j]
            turn=turnvalue
            checkTurn=new RegExp("^"+turnvalue,"i")
            let maxPlayerpisce=board[maxPlayerMoveindx]
            let copypisce=maxPlayerpisce
            validMovesAi(maxPlayerpisce,maxPlayerMoveindx)
            let potmovescopy=[...potMoves]
            let potCapturescopy=[...potCaptures]
            let tempcastle=Object.assign({},castle)

            for(let i=0;i<potmovescopy.length;i++){
                let tempPistrack=[...piscesTracker["b"]]
                let tempboard=[...board]
                let temporaryevaluation=Object.assign({},shortcutseval)
                
                if(maxPlayerpisce[1]=="p"){
                    if(potPromotion.length>0){
                        maxPlayerpisce=turn+"q"   
                        //add value
                        shortcutseval[turn]+=800
                    }
                }

                
                if(maxPlayerpisce[1]=="k"){
                    let isItCastle=potmovescopy[i]-maxPlayerMoveindx
                    if(isItCastle==2){
                        castlecheck(files.file_8,files.file_6)
                    }else if(isItCastle==-2){
                        castlecheck(files.file_1,files.file_4)
                    }   
                }

                 //change js board
                board[maxPlayerMoveindx]=emptySquere
                board[potmovescopy[i]]=maxPlayerpisce
                //change piscetracker
                piscesTracker[turn].splice(piscesTracker[turn].indexOf(maxPlayerMoveindx),1)
                piscesTracker[turn].push(potmovescopy[i])
                //change evall start
                 if(maxPlayerpisce[1]=="k"){
                    shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][maxPlayerMoveindx]
                    shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][potmovescopy[i]]
                }else if(maxPlayerpisce[1]=="p"){
                    shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                    shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][potmovescopy[i]]
                }else{
                    if(copypisce[1]=="p"){
                        shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                    }else{
                        shortcutseval[turn]-=shortcuts[turn][maxPlayerpisce][maxPlayerMoveindx]
                    }
                    shortcutseval[turn]+=shortcuts[turn][maxPlayerpisce][potmovescopy[i]]
                }
                //end
                evall=minimax(depth-1,alpha,beta,true,piscesTracker["w"],"w")
               

                minvaluepotmove=Math.min(evall,minvaluepotmove)
                board=tempboard
                piscesTracker["b"]=tempPistrack
                turn=turnvalue
                castle=tempcastle
                shortcutseval=temporaryevaluation
                beta=Math.min(evall,beta)
                if(alpha>=beta){
                    break;
                }
            }

            if(alpha>=beta){
                break;
            }

            for(let i=0;i<potCapturescopy.length;i++){
                let tempPistrack=[...piscesTracker["w"]]
                var copywpiscess=[...piscesTracker["b"]]
                let tempboard=[...board]
                let pisceToCapture=board[potCapturescopy[i]]
                let temporaryevaluation=Object.assign({},shortcutseval)

                if(maxPlayerpisce[1]=="p"&&potPromotion.length>0){
                    maxPlayerpisce=turn+"q"   
                    //add value
                    shortcutseval[turn]+=800
                }
        

                //change js board
                board[maxPlayerMoveindx]=emptySquere
                board[potCapturescopy[i]]=maxPlayerpisce
                //change piscetrack
                piscesTracker[turn].splice(piscesTracker[turn].indexOf(maxPlayerMoveindx),1)
                piscesTracker[turn].push(potCapturescopy[i])
                piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(potCapturescopy[i]),1)
                //change evall start
                if(maxPlayerpisce[1]=="k"){
                    shortcutseval[turn]-=shortcutskings[turn][isItMiddleGame][maxPlayerMoveindx]
                    shortcutseval[turn]+=shortcutskings[turn][isItMiddleGame][potCapturescopy[i]]
                    shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                    if(pisceToCapture[1]=="p"){
                        shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else if(pisceToCapture[1]=="k"){
                        shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else{
                        shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                    }
                }else if(maxPlayerpisce[1]=="p"){
                    shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                    shortcutseval[turn]+=shortcutspawn[turn][isItMiddleGame][potCapturescopy[i]]
                    shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                    if(pisceToCapture[1]=="p"){
                        shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else if(pisceToCapture[1]=="k"){
                        shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else{
                        shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                    }
                }else{
                    if(copypisce[1]=="p"){
                        shortcutseval[turn]-=shortcutspawn[turn][isItMiddleGame][maxPlayerMoveindx]
                    }else{
                        shortcutseval[turn]-=shortcuts[turn][maxPlayerpisce][maxPlayerMoveindx]
                    }
                    shortcutseval[turn]+=shortcuts[turn][maxPlayerpisce][potCapturescopy[i]]
                    shortcutseval[switchTurns[turn]]-=materialValues[pisceToCapture[1]]
                    if(pisceToCapture[1]=="p"){
                        shortcutseval[switchTurns[turn]]-=shortcutspawn[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else if(pisceToCapture[1]=="k"){
                        shortcutseval[switchTurns[turn]]-=shortcutskings[switchTurns[turn]][isItMiddleGame][potCapturescopy[i]]
                    }else{
                        shortcutseval[switchTurns[turn]]-=shortcuts[switchTurns[turn]][pisceToCapture][potCapturescopy[i]]
                    }
                }
                //end
                evall=minimax(depth-1,alpha,beta,true,piscesTracker["w"],"w")

                minvaluepotCapture=Math.min(evall,minvaluepotCapture)
                piscesTracker["b"]=copywpiscess
                board=tempboard
                piscesTracker["w"]=tempPistrack
                turn=turnvalue
                castle=tempcastle
                shortcutseval=temporaryevaluation
                beta=Math.min(evall,beta)
                if(alpha>=beta){
                   break;
                }
            }
       
            if(alpha>=beta){
               break;
            }
        }
        minvalue=Math.min(minvaluepotmove,minvaluepotCapture)
        if(minvalue==+Infinity){
            return 100000000
        }
        return minvalue
    }



    
}


function castlecheck(rankToRemoveRook,rankToMoveRook){
    let rook=turn+"r"
    let rooksquere=[rankToRemoveRook,boardRankByTurn[turn]]
    let rooksquereToMove=[rankToMoveRook,boardRankByTurn[turn]]
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