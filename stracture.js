//general variables
let gameType=localStorage.getItem("type");
let board=[ 
            " "," "," ",
            " "," "," ",
            " "," "," ",
        ]
let winingCombs=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
var winnercomb=""
var ceils=document.querySelectorAll(".ceil")
var enableClick=document.querySelector(".board")
//result page
let resultPage=document.querySelector(".win-lost-draw")
let resultTitle=document.querySelector(".result-title")
let refresheButton=document.querySelector(".refresh")
let reset=document.querySelector(".reset")
//friend
let player1=document.querySelector(".turn-1")
let player2=document.querySelector(".turn-2")
let turn=1

//computer
let starts="you"
let nameofplayer=localStorage.getItem("name")
let lastplayer;
let scores={
    x: 1,
    o: -1,
    draw: 0,
}
let starting;
let continiuing;

let player1X="x"
let player2O="o"

if(gameType==="friends"){
    window.addEventListener("load",function(){
        //add names
        player1.textContent=`${localStorage.getItem("player1")}s turn`
        player2.textContent=`${localStorage.getItem("player2")}s turn`
        //change turns
        addTurn()

    })
}



function addTurn(){
    if(turn===1){
        player1.style.color="#ffff33"
        player2.style.color="#00ff00"
    }else if(turn===2){
        player1.style.color="#00ff00"
        player2.style.color="#ffff33"
    }
}
//game
ceils.forEach((elem,indx)=>{
    elem.addEventListener("click",function(e){
        if(gameType==="friends"){
            if(turn==1){
                addMove(e.currentTarget,player1X,indx)
                win()
                drawChechker()
                turn++
                addTurn()

            }else if(turn==2){
                addMove(e.currentTarget,player2O,indx)
                win()
                drawChechker()
                turn--
                addTurn()
            }
        }else if(gameType==="computer"){
                addMove(e.currentTarget,player1X,indx)
                win()
                let check=drawChechker()
                turn=2
                if(!check){
                computersmove(player2O,player1X,2,1)
                win()
                drawChechker()
                disableonClicked(player2O)
                turn=1}
        }
    },{once: true})

    elem.addEventListener("mouseenter",function(e){
        if(turn==1&&!elem.classList.contains(player1X)&&!elem.classList.contains(player2O)){
            mousEenter(e.currentTarget,"pre-x")
        }else if(turn==2&&!elem.classList.contains(player1X)&&!elem.classList.contains(player2O)){
            mousEenter(e.currentTarget,"pre-o")
        }
    })

    elem.addEventListener("mouseleave",function(e){
        if(turn==1&&!elem.classList.contains(player1X)&&!elem.classList.contains(player2O)){
            mouseleave(e.currentTarget,"pre-x")
        }else if(turn==2&&!elem.classList.contains(player1X)&&!elem.classList.contains(player2O)){
            mouseleave(e.currentTarget,"pre-o")
        }
    })
})


//add element
function addMove(currentelement,player,indx){
    currentelement.classList.add(player)
    currentelement.style.opacity=1
    board[indx]=player
}

//hover effect mauseenter
function mousEenter(currentelement,elemToAdd){
    currentelement.classList.add(elemToAdd)
    currentelement.style.opacity=0.3
}
//hover effect mausleeve
function mouseleave(currentelement,elemToAdd){
    currentelement.classList.remove(elemToAdd)
    currentelement.style.opacity=0.0001
}
//action afther winner detected
function win(){
//variebles to add class
let hor=document.querySelector(".win-horizont").classList
let height=document.querySelector(".win-height").classList
let leftDig=document.querySelector(".win-dig-left").classList
let rightdig=document.querySelector(".win-dig-right").classList
    if(checkWinner()){
        //adds wining line
        switch(winnercomb){
            case 0:
                hor.add(`win-${winnercomb}`)
                break;
            case 1:
                hor.add(`win-${winnercomb}`)
                break;
            case 2:
                hor.add(`win-${winnercomb}`)
                break;
            case 3:
                height.add(`win-${winnercomb}`)
                break; 
            case 4:
                height.add(`win-${winnercomb}`)
                break; 
            case 5:
                height.add(`win-${winnercomb}`)
                break;   
            case 6:
                rightdig.add(`win-${winnercomb}`)
                break; 
            case 7:
                leftDig.add(`win-${winnercomb}`)
                break;      
        }
        if(gameType==="computer"){
            resultTitle.textContent=`computer won`
        }else{
        if(turn===1){
            resultTitle.textContent=`${localStorage.getItem("player1")} won`
        }else if(turn==2){
            resultTitle.textContent= `${localStorage.getItem("player2")} won`
        }}
        enableClick.style.pointerEvents="none"
        setTimeout(()=>{
            resultPage.classList.add("displayshow")
            enableClick.style.pointerEvent="normal"
        },1000)

    }else if(drawChechker()){
        resultTitle.textContent="Draw"
        setTimeout(function(){
            resultPage.classList.add("displayshow")
        },500)
    }
}
//checks winner
function checkWinner(){
return winingCombs.some((elem,index)=>{
         if(turn==1){
            winnercomb=index
            lastplayer="x"
            let winer=elem.every(element=>{
                        return board[element]==="x"
                    })
            return winer
        }else if(turn==2){
            winnercomb=index
            lastplayer="o"
            let winer=elem.every(element=>{
                        return board[element]==="o"
                        })
            return winer
        }
    })
}

//result page buttons
refresheButton.addEventListener("click",function(){
    document.location.reload()
})

reset.addEventListener("click",function(){
    window.location.href = "index.html";
})
//draw checker
function drawChechker(){
    return board.every(elem=>{
        return elem!==" "
    })
}

//computer
function computersmove(first, second, starter,continiuer){
    let bestscore=+Infinity
    let bestmove;
    for(let i=0;i<board.length;i++){
        if(board[i]==" "){
            turn=2
            board[i]=first
            let score=minmax(board,0,true,first,second)
            console.log(score)
            board[i]=" "
            if(score<bestscore){
                bestscore=score
                bestmove=i
            }
        }
    }
     addMove(ceils[bestmove],first,bestmove)
     turn=2
}

function minmax(board,depth,maximazing,first,second){
    let result=checkWinner()
    let drawresult=drawChechker()
    
    if(result){
        return scores[lastplayer]
    }else if(drawresult){
        return scores["draw"]
    }

    if(!maximazing){
    let bestscore=+Infinity
    for(let i=0;i<board.length;i++){
        if(board[i]==" "){
            turn=2
            board[i]=first
            let score=minmax(board,depth+1,true,first,second)
            board[i]=" "
            bestscore=Math.min(score,bestscore)
            }
        }return bestscore 
    }else if(maximazing){
        let bestscore=-Infinity
        for(let i=0;i<board.length;i++){
            if(board[i]==" "){
                turn=1
                board[i]=second
                let score=minmax(board,depth+1,false,first,second)
                board[i]=" "
                bestscore=Math.max(bestscore,score)
            }
        }return bestscore
    }
}

//disable clicks on computer choices
function disableonClicked(player){
    let arr=document.querySelectorAll(`.${player}`)
   arr.forEach(elem=>{
       elem.style.pointerEvents="none"
   })
}