let capturedPisce=NaN;
let isItRepetition3=0;
let bestmovename;
let variationAmount=0;
let wining={
    "w": 100000000,
    "b": -100000000,
}

let infinitysforsides={
    "w": -Infinity,
    "b": Infinity,
}

let finalDepth;

function chessAi(isItMinPlayer){
    variationAmount=0
    let eval;
    //potmovePropertys
    let potMoveMinEval=infinitysforsides[turn];
    let bestPisceToMove;
    let bestPisceToMoveindx;
    let bestpotmove;
    //potcapturepropertys
    let potCaptureMinEval=infinitysforsides[turn]
    let bestPisceToCaptureWith;
    let bestPisceToCaptureWithindx;
    let bestpotCapture;
    let piscesinedxcopy=[...piscesTracker[turn]]
    //piscount/movecount
    let piscount=0
    piscesTracker["w"].forEach(elem=>{
        if(board[elem]!="wp"){
            piscount++
        }
    })
    piscesTracker["b"].forEach(elem=>{
        if(board[elem]!="bp"){
            piscount++
        }
    })


    addAttackedSqueres(turn)
    let potentailmoves=rightAttackedSqueres[turn].length+rightAttackedPieces[turn].length
    let potentialmovesForOpositside=rightAttackedSqueres[switchTurns[turn]].length+rightAttackedPieces[switchTurns[turn]].length
    piscesinedxcopy.forEach(pisceindx=>{
        let pisce=board[pisceindx]
        let potunpassantcopyy=unpassantt
        if(iskingincheck){
            validMovesAi(pisce,pisceindx)
            copyturn=turn
            copycheckturn=checkTurn
            uncheck(pisce,pisceindx)
            checkTurn=copycheckturn
        }else{
            validMovesAi(pisce,pisceindx)
            if(pisce[1]=="k"){
                filtered=isKingMovesValid()
                potMoves=filtered[0]
                potCaptures=filtered[1]
            }
        }



        //copy potcaptures potmoves
        let potMovesCopy=[...potMoves]
        let potCapturesCopy=[...potCaptures]
        potMovesCopy.forEach(potmove=>{
            //create copy evaluation
            let wSideEvaluation=shortcutseval["w"]
            let bSideEvaluation=shortcutseval["b"]
            let piscecopy=board[pisceindx]
            let potUnPassantcopy=unpassantt;

            let temporarycastle=Object.assign({},castle)
            let IsCastlePlayed=false;
            let iskingincheckcopy=iskingincheck;
            let potpromotioncopy=[...potPromotion]

            //is it promotion
            if(pisce[1]=="p"){
                if(potPromotion.length>0){
                    pisce=turn+"q"
                    //add eval
                    shortcutseval[turn]+=800
                }
            }

            //castle
            if(pisce[1]=="k"){
                let isItCastle=potmove-pisceindx
                if(isItCastle==2){
                    castlecheck(files.file_8,files.file_6)
                    IsCastlePlayed="r"
                }else if(isItCastle==-2){
                    castlecheck(files.file_1,files.file_4)
                    IsCastlePlayed="l"
                }   
            }



            playMove(pisce,pisceindx,potmove,false)
            changeEvall(turn,pisce,pisceindx,potmove,NaN,piscecopy)


            //set everything for next player
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")
            //50move rule
            let useminimax=true
            fiftymove++
            if(fiftymove==100){
                eval=0
                useminimax=false
            }

            //3move repetition
            let tempprevposition=[...prevposition]
            addPosition(prevposition)
            checkFor3repetition()
            if(isItRepetition3>=3){
                eval=0
                useminimax=false
            }
            //check if potential move is mate/stalemate
            addAttackedSqueres(switchTurns[turn])
            checkIfKingIsInCheck()
            isitCheckmate(turn)

            
            if(checkMate){
                eval=wining[switchTurns[turn]]
            }else if(stalmate){
                eval=0
            }


            if(!checkMate&&!stalmate&&useminimax){
                if(piscount==2){
                    finalDepth=7
                    eval=minimax(7,-Infinity,Infinity,isItMinPlayer)
                }else if(piscount==3&&potentailmoves<20&&potentialmovesForOpositside<20){
                    finalDepth=6
                    eval=minimax(6,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<14&&movecount>24&&potentialmovesForOpositside<14){
                    finalDepth=6
                    eval=minimax(6,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<20&&movecount>24&&potentialmovesForOpositside<20){
                    finalDepth=5
                    eval=minimax(5,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<30&&movecount>24&&potentialmovesForOpositside<30){
                    finalDepth=4
                    eval=minimax(4,-Infinity,Infinity,isItMinPlayer)
                }else{
                    finalDepth=3
                    eval=minimax(3,-Infinity,Infinity,isItMinPlayer)
                }
            }
            //reset previus positions
            prevposition=tempprevposition
            //reset fiftymovecount
            fiftymove--
            //reset everything 
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")


            if(isItMinPlayer&&eval < potMoveMinEval){
                potMoveMinEval=eval
                bestPisceToMove=piscecopy
                bestPisceToMoveindx=pisceindx
                bestpotmove=potmove
            }else if(!isItMinPlayer&&eval > potMoveMinEval){
                potMoveMinEval=eval
                bestPisceToMove=piscecopy
                bestPisceToMoveindx=pisceindx
                bestpotmove=potmove
            }

            undoMove(piscecopy,pisceindx,potmove,false,NaN,IsCastlePlayed)


            
            //refresh evalution
            shortcutseval["w"]=wSideEvaluation
            shortcutseval["b"]=bSideEvaluation

            castle=temporarycastle
            pisce=piscecopy
            iskingincheck=iskingincheckcopy
            unpassantt=potUnPassantcopy
            potPromotion=potpromotioncopy
    
        })

        //potential captures
        potCapturesCopy.forEach(potcapture=>{
            //create copy evaluation
            let wSideEvaluation=shortcutseval["w"]
            let bSideEvaluation=shortcutseval["b"]

            let potUnPassantcopy=unpassantt;
            let piscecopy=board[pisceindx]
            let temporarycastle=Object.assign({},castle)
            let iskingincheckcopy=iskingincheck;
            let potpromotioncopy=[...potPromotion]
            let tempprevposition=[...prevposition]

            if(pisce[1]=="p"){
                if(potPromotion.length>0){
                    pisce=turn+"q"
                    //add eval
                    shortcutseval[turn]+=800
                }
            }

            

            playMove(pisce,pisceindx,potcapture,true)
            changeEvall(turn,pisce,pisceindx,potcapture,capturedPisce,piscecopy)

            
            //set everything for next player
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")
            let tempcapturedpisce=capturedPisce

             //check if potential move is mate/stalemate
             addAttackedSqueres(switchTurns[turn])
             checkIfKingIsInCheck()
             isitCheckmate(turn)
             if(checkMate){
                 eval=wining[switchTurns[turn]]
             }else if(stalmate){
                 eval=0
             }

             if(!checkMate&&!stalmate){
                if(piscount==2){
                    finalDepth=7
                    eval=minimax(7,-Infinity,Infinity,isItMinPlayer)
                }else if(piscount==3&&potentailmoves<20&&potentialmovesForOpositside<20){
                    finalDepth=6
                    eval=minimax(6,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<14&&movecount>24&&potentialmovesForOpositside<14){
                    finalDepth=6
                    eval=minimax(6,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<20&&movecount>24&&potentialmovesForOpositside<20){
                    finalDepth=5
                    eval=minimax(5,-Infinity,Infinity,isItMinPlayer)
                }else if(potentailmoves<30&&movecount>24&&potentialmovesForOpositside<30){
                    finalDepth=4
                    eval=minimax(4,-Infinity,Infinity,isItMinPlayer)
                }else{
                    finalDepth=3
                    eval=minimax(3,-Infinity,Infinity,isItMinPlayer)
                }
            }
            //reset everything 
            turn=switchTurns[turn]
            checkTurn=new RegExp("^"+turn,"i")
            capturedPisce=tempcapturedpisce

            if(isItMinPlayer&&eval < potCaptureMinEval){
                potCaptureMinEval=eval
                bestPisceToCaptureWith=piscecopy
                bestPisceToCaptureWithindx=pisceindx
                bestpotCapture=potcapture
            }else if(!isItMinPlayer&&eval > potCaptureMinEval){
                potCaptureMinEval=eval
                bestPisceToCaptureWith=piscecopy
                bestPisceToCaptureWithindx=pisceindx
                bestpotCapture=potcapture
            }

            undoMove(piscecopy,pisceindx,potcapture,true,capturedPisce,false)
            //refresh evalution
            shortcutseval["w"]=wSideEvaluation
            shortcutseval["b"]=bSideEvaluation
            prevposition=tempprevposition

            castle=temporarycastle
            pisce=piscecopy
            unpassantt=potUnPassantcopy
            iskingincheck=iskingincheckcopy
            potPromotion=potpromotioncopy
        })
        unpassantt=potunpassantcopyy
    })




    console.log(potMoveMinEval)
    console.log(potCaptureMinEval)
    
    if(isItMinPlayer){
        if(potMoveMinEval<potCaptureMinEval){
            validMoves(bestPisceToMove,bestPisceToMoveindx)
            pisceToMoveIndx=indexOnRealBoard(bestPisceToMoveindx)
            currentPisceindxs=indexOnRealBoard(bestpotmove)
            currentPisce=100
            guiChess()
            //for statistic
            document.querySelector(".eval").textContent=potMoveMinEval
            document.querySelector(".best-move-name").textContent=bestmovename
            document.querySelector(".final-depth").textContent=finalDepth+1
            document.querySelector(".variation-amount").textContent=variationAmount
        }else{
            validMoves(bestPisceToCaptureWith,bestPisceToCaptureWithindx)
            pisceToMoveIndx=indexOnRealBoard(bestPisceToCaptureWithindx)
            currentPisceindxs=indexOnRealBoard(bestpotCapture)
            currentPisce=board[bestpotCapture]
            guiChess()
             //for statistic
            document.querySelector(".eval").textContent=potCaptureMinEval
            document.querySelector(".best-move-name").textContent=bestmovename
            document.querySelector(".final-depth").textContent=finalDepth+1
            document.querySelector(".variation-amount").textContent=variationAmount
        }
    }else{
        if(potMoveMinEval>potCaptureMinEval){
            validMoves(bestPisceToMove,bestPisceToMoveindx)
            pisceToMoveIndx=indexOnRealBoard(bestPisceToMoveindx)
            currentPisceindxs=indexOnRealBoard(bestpotmove)
            currentPisce=100
            guiChess()
            //for statistic
            document.querySelector(".eval").textContent=potMoveMinEval
            document.querySelector(".best-move-name").textContent=bestmovename
            document.querySelector(".final-depth").textContent=finalDepth+1
            document.querySelector(".variation-amount").textContent=variationAmount
        }else{
            validMoves(bestPisceToCaptureWith,bestPisceToCaptureWithindx)
            pisceToMoveIndx=indexOnRealBoard(bestPisceToCaptureWithindx)
            currentPisceindxs=indexOnRealBoard(bestpotCapture)
            currentPisce=board[bestpotCapture]
            guiChess()
            //for statistic
            document.querySelector(".eval").textContent=potCaptureMinEval
            document.querySelector(".best-move-name").textContent=bestmovename
            document.querySelector(".final-depth").textContent=finalDepth+1
            document.querySelector(".variation-amount").textContent=variationAmount
        }
    }
}


function minimax(depth,alpha,beta,maxsimazingPlayer){ 
    let piscesinedxcopy=[...piscesTracker[turn]]
    if(depth==0||piscesinedxcopy.length==0){
       return bothsideEval()
    }
    let eval;
    if(maxsimazingPlayer){
        let maxvaluePotCapture=-Infinity
        let maxvaluePotMove=-Infinity
        for(let i=0;i<piscesinedxcopy.length;i++){
            let pisceindx=piscesinedxcopy[i]
            let pisce=board[pisceindx]
            validMovesAi(pisce,pisceindx)
            //copy potcaptures potmoves
            let potMovesCopy=[...potMoves]
            let potCapturesCopy=[...potCaptures]
            for(let j=0;j<potCapturesCopy.length;j++){
                if(depth==1){
                    variationAmount++
                }
                let potcapture=potCapturesCopy[j]
                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]
                let potpromotioncopy=[...potPromotion]

                let temporarycastle=Object.assign({},castle)
                let copypisce=board[pisceindx];
    
                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }

                playMove(pisce,pisceindx,potcapture,true)
                changeEvall(turn,pisce,pisceindx,potcapture,capturedPisce,copypisce)
                 //set everything for next player
                turn="b"
                checkTurn=/^b/i
                let tempcapturedpisce=capturedPisce
                if(depth==1){
                    eval=quiescenceSearch(potcapture,false)
                }else{
                    eval=minimax(depth-1,alpha,beta,false)
                }
                 //reset everything 
                turn="w"
                checkTurn=/^w/i
                capturedPisce=tempcapturedpisce
    
                maxvaluePotCapture=Math.max(eval,maxvaluePotCapture)
                undoMove(copypisce,pisceindx,potcapture,true,capturedPisce)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation

                castle=temporarycastle
                pisce=copypisce
                potPromotion=potpromotioncopy
                //alpha beta pruning
                alpha=Math.max(eval,alpha)
                if(alpha>=beta){
                    break;
                }
            }
            if(alpha>=beta){
                break;
            }

            for(let j=0;j<potMovesCopy.length;j++){
                if(depth==1){
                    variationAmount++
                }
                let potmove=potMovesCopy[j]
                //create copy evaluation
                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]

                let temporarycastle=Object.assign({},castle)
                let IsCastlePlayed=false;
                let copypisce=board[pisceindx];
                let potpromotioncopy=[...potPromotion]

                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }

                //castle
                if(pisce[1]=="k"){
                    let isItCastle=potmove-pisceindx
                    if(isItCastle==2){
                        castlecheck(files.file_8,files.file_6)
                        IsCastlePlayed="r"
                    }else if(isItCastle==-2){
                        castlecheck(files.file_1,files.file_4)
                        IsCastlePlayed="l"
                    }   
                }

                playMove(pisce,pisceindx,potmove,false)
                changeEvall(turn,pisce,pisceindx,potmove,NaN,copypisce)
                //set everything for next player
                turn="b"
                checkTurn=/^b/i
                //50move rule
                let useminimax=true
                fiftymove++
                if(fiftymove==100){
                    eval=0
                    useminimax=false
                }
                //3move repetition
                let tempprevposition=[...prevposition]
                addPosition(prevposition)
                checkFor3repetition()
                if(isItRepetition3>=3){
                    eval=0
                    useminimax=false
                }

                if(useminimax){
                     eval=minimax(depth-1,alpha,beta,false)
                }
                //reset prevpositions
                prevposition=tempprevposition
                //reset fiftymove
                fiftymove--
                //reset everything
                turn="w"
                checkTurn=/^w/i
                maxvaluePotMove=Math.max(maxvaluePotMove,eval)
                undoMove(copypisce,pisceindx,potmove,false,NaN,IsCastlePlayed)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation

                castle=temporarycastle
                pisce=copypisce
                potPromotion=potpromotioncopy
                //alpha beta pruning
                alpha=Math.max(eval,alpha)
                if(alpha>=beta){
                    break;
                }
            }
            if(alpha>=beta){
                break;
            }
        }
        
    
        let maxValue=Math.max(maxvaluePotCapture,maxvaluePotMove)
        return maxValue
    }else{
        let minvaluePotCapture=Infinity
        let minvaluePotMove=Infinity
        for(let i=0;i<piscesinedxcopy.length;i++){
            let pisceindx=piscesinedxcopy[i]
            let pisce=board[pisceindx]
            validMovesAi(pisce,pisceindx)
            //copy potcaptures potmoves
            let potMovesCopy=[...potMoves]
            let potCapturesCopy=[...potCaptures]
            for(let j=0;j<potCapturesCopy.length;j++){
                if(depth==1){
                    variationAmount++
                }
                let potcapture=potCapturesCopy[j]
                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]

                let temporarycastle=Object.assign({},castle)
                let copypisce=board[pisceindx];
                let potpromotioncopy=[...potPromotion]

                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }

                playMove(pisce,pisceindx,potcapture,true)
                changeEvall(turn,pisce,pisceindx,potcapture,capturedPisce,copypisce)
                //set everything for next player
                turn="w"
                checkTurn=/^w/i
                let tempcapturedpisce=capturedPisce
                if(depth==1){
                    eval=quiescenceSearch(potcapture,true)
                }else{
                    eval=minimax(depth-1,alpha,beta,true)
                }
                //reset everything 
                turn="b"
                checkTurn=/^b/i
                capturedPisce=tempcapturedpisce

                minvaluePotCapture=Math.min(eval,minvaluePotCapture)
                undoMove(copypisce,pisceindx,potcapture,true,capturedPisce,true)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation

                castle=temporarycastle
                pisce=copypisce
                potPromotion=potpromotioncopy
                //alpha beta pruning
                beta=Math.min(eval,beta)
                if(alpha>=beta){
                    break;
                }
            }
            if(alpha>=beta){
                break;
            }

            
            for(let j=0;j<potMovesCopy.length;j++){
                if(depth==1){
                    variationAmount++
                }
                let potmove=potMovesCopy[j]
                //create copy evaluation
                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]

                let temporarycastle=Object.assign({},castle)
                let IsCastlePlayed=false;
                let copypisce=board[pisceindx];
                let potpromotioncopy=[...potPromotion]
                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }

                //castle
                if(pisce[1]=="k"){
                    let isItCastle=potmove-pisceindx
                    if(isItCastle==2){
                        castlecheck(files.file_8,files.file_6)
                        IsCastlePlayed="r"
                    }else if(isItCastle==-2){
                        castlecheck(files.file_1,files.file_4)
                        IsCastlePlayed='l'
                    }   
                }

                playMove(pisce,pisceindx,potmove,false)
                changeEvall(turn,pisce,pisceindx,potmove,NaN,copypisce)
                //set everything for next player
                turn="w"
                checkTurn=/^w/i
                //50move rule
                let useminimax=true
                fiftymove++
                if(fiftymove==100){
                    eval=0
                    useminimax=false
                }
                 //3move repetition
                 let tempprevposition=[...prevposition]
                 addPosition(prevposition)
                 checkFor3repetition()
                 if(isItRepetition3>=3){
                     eval=0
                     useminimax=false
                 }
 
                if(useminimax){
                    eval=minimax(depth-1,alpha,beta,true)
                }
                //reset prevpositions
                prevposition=tempprevposition
                //reset fiftymove
                fiftymove--
                //reset everything
                turn="b"
                checkTurn=/^b/i
                minvaluePotMove=Math.min(minvaluePotMove,eval)
                undoMove(copypisce,pisceindx,potmove,false,NaN,IsCastlePlayed)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation

                castle=temporarycastle
                pisce=copypisce
                potPromotion=potpromotioncopy
                //alpha beta pruning
                beta=Math.min(eval,beta)
                if(alpha>=beta){
                    break;
                }
            }
            if(alpha>=beta){
                break;
            }
        }
        let minvalue=Math.min(minvaluePotCapture,minvaluePotMove)
        return minvalue
    }
}


function playMove(pisce,pisceindx,moveindx,isitcapture){
    if(isitcapture){
        capturedPisce=board[moveindx]
        piscesTracker[switchTurns[turn]].splice(piscesTracker[switchTurns[turn]].indexOf(moveindx),1)
    }

    board[pisceindx]=emptySquere
    board[moveindx]=pisce

    piscesTracker[turn].splice(piscesTracker[turn].indexOf(pisceindx),1)
    piscesTracker[turn].push(moveindx)

}

function undoMove(pisce,pisceindx,moveindx,isitcapture,killedpisce,IsCastlePlayed){
    if(isitcapture){
        piscesTracker[switchTurns[turn]].push(moveindx)
        board[moveindx]=killedpisce
    }else{
        board[moveindx]=emptySquere
    }

    if(IsCastlePlayed){
        if(IsCastlePlayed=="r"){
            removeCastle(files.file_8,files.file_6)
        }else if(IsCastlePlayed=="l"){
            removeCastle(files.file_1,files.file_4)
        }
    }


    board[pisceindx]=pisce
    piscesTracker[turn].splice(piscesTracker[turn].indexOf(moveindx),1)
    piscesTracker[turn].push(pisceindx)
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


function removeCastle(rankToRemoveRook,rankToMoveRook){
    let rook=turn+"r"
    let rooksquereToMove=[rankToRemoveRook,boardRankByTurn[turn]]
    let rooksquere=[rankToMoveRook,boardRankByTurn[turn]]
    //change board
    board[indexOnJsBoard(rooksquere)]=emptySquere
    board[indexOnJsBoard(rooksquereToMove)]=rook
    rightArr=piscesTracker[turn]
    rightArr.splice(rightArr.indexOf(indexOnJsBoard(rooksquere)),1)
    rightArr.push(indexOnJsBoard(rooksquereToMove))
    //change eval
    shortcutseval[turn]-=shortcuts[turn][rook][indexOnJsBoard(rooksquere)]
    shortcutseval[turn]+=shortcuts[turn][rook][indexOnJsBoard(rooksquereToMove)]
}
function checkFor3repetition(){
    isItRepetition3=0;
    let elementToCheck=prevposition[prevposition.length-1];

    prevposition.forEach(position=>{
        if(elementToCheck==position){
            isItRepetition3++
        }
    })
}

function quiescenceSearch(squereindx,maxsimazingPlayer){
    let piscescopy=[...piscesTracker[turn]]
    let focusSquere=squereindx

    if(maxsimazingPlayer){
        let maxvalue=-Infinity
        for(let i=0;i<piscescopy.length;i++){
            let pisceindx=piscescopy[i]
            let pisce=board[pisceindx]
            validMovesAi(pisce,pisceindx)
            let potCapturesCopy=[...potCaptures]
            if(potCapturesCopy.indexOf(focusSquere)>-1){
                potcapture=focusSquere
                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]
                let copypisce=board[pisceindx];
                let potpromotioncopy=[...potPromotion]

                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }
    
                playMove(pisce,pisceindx,potcapture,true)
                changeEvall(turn,pisce,pisceindx,potcapture,capturedPisce,copypisce)
                //set everything for next player
                turn="b"
                checkTurn=/^b/i
                let tempcapturedpisce=capturedPisce
                let eval=quiescenceSearch(focusSquere,false)
                maxvalue=Math.max(eval,maxvalue)
                turn="w"
                checkTurn=/^w/i
                capturedPisce=tempcapturedpisce
                undoMove(copypisce,pisceindx,potcapture,true,capturedPisce)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation

                pisce=copypisce
                potPromotion=potpromotioncopy
            }
        }

        if(maxvalue >-Infinity){
            return maxvalue
        }else{
            return bothsideEval()
        }

    }else{
        let minvalue=Infinity
        for(let i=0;i<piscescopy.length;i++){
            let pisceindx=piscescopy[i]
            let pisce=board[pisceindx]
            validMovesAi(pisce,pisceindx)
            let potCapturesCopy=[...potCaptures]
            if(potCapturesCopy.indexOf(focusSquere)>-1){
                potcapture=focusSquere

                let wSideEvaluation=shortcutseval["w"]
                let bSideEvaluation=shortcutseval["b"]

                let copypisce=board[pisceindx];
                let potpromotioncopy=[...potPromotion]

                //is it promotion
                if(pisce[1]=="p"){
                    if(potPromotion.length>0){
                        pisce=turn+"q"
                        //add eval
                        shortcutseval[turn]+=800
                    }
                }
    
                playMove(pisce,pisceindx,potcapture,true)
                changeEvall(turn,pisce,pisceindx,potcapture,capturedPisce,copypisce)
                //set everything for next player
                turn="w"
                checkTurn=/^w/i
                let tempcapturedpisce=capturedPisce
                let eval=quiescenceSearch(focusSquere,true)
                minvalue=Math.min(eval,minvalue)
                turn="b"
                checkTurn=/^b/i
                capturedPisce=tempcapturedpisce
                undoMove(copypisce,pisceindx,potcapture,true,capturedPisce)
                //refresh evalution
                shortcutseval["w"]=wSideEvaluation
                shortcutseval["b"]=bSideEvaluation
                
                pisce=copypisce
                potPromotion=potpromotioncopy
            }
        }
        if(minvalue < Infinity){
            return minvalue
        }else{
            return bothsideEval()
        }
    }
}

