//game variebles
//user choice variebles
let userName=localStorage.getItem("name")
let gameType=localStorage.getItem("type")
let pointAmount=localStorage.getItem("amount")

let usersChoice="";
let computerCoice="";
let btns=document.querySelectorAll(".choice")
let refresh=document.querySelector(".refresh")

let userChoicess=document.querySelectorAll(".userss")
let computerChoices=document.querySelectorAll(".computers")



//header variebles
let roundAmount=0;
let userPoints=0;
let computerPoints=0;
let amountOfDraws=0;
let disappear=document.querySelectorAll(".d")
//platforms
let userPlatform=document.querySelector(".user-platform")
let commputerPlatform=document.querySelector(".computer-platform")
//testcase
let testcase=document.querySelector(".title").classList
//game history arrays
let userArray=[`<i class="fa-regular fa-hand-scissors fa-3x rottate"></i>`,`<i class="fa-regular fa-hand-back-fist rot fa-3x  d"></i>`,`<i class="fa-regular fa-hand rot fa-3x  d"></i>`]
let computerArray=[`<i class="fa-regular fa-hand-scissors fa-3x  d"></i>`,`"><i class="fa-regular fa-hand-back-fist  fa-3x rott  d" ></i>`,`<i class="fa-regular fa-hand  fa-3x rott  d"></i>`]
let iconToAddUser=""
let iconToAddComputer=""
let historyy="";
//endgame
let ending=document.querySelector(".endgame")
let textofendgame=document.querySelector(".outcame")
//Preloader
window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("hide-preload")
    document.querySelector(".title").textContent="GAME HISTORY"
    document.querySelector(".users").textContent=`${userName.toUpperCase()}`
    pointRounds()
    Points()
})

//points/rounds reached
function pointRounds(){
   if(gameType==="Points"){
    document.querySelector(".points-rounds-reached").textContent= userPoints>=computerPoints? `POINTS ${userPoints}/${pointAmount}`:`POINTS ${computerPoints}/${pointAmount}`
   }else if(gameType==="Rounds"){
    document.querySelector(".points-rounds-reached").textContent=`ROUNDS PLAYED ${roundAmount}/${pointAmount}`
   }else{
    document.querySelector(".points-rounds-reached").textContent=`ROUND ${roundAmount}`
   }
}

//user-computer-draw point count
function Points(){
    document.querySelector(".user").textContent=`${userName.toUpperCase()}`
    document.querySelector(".user-points").textContent=`${userPoints}`
    document.querySelector(".draw-amount").textContent=`${amountOfDraws}`
    document.querySelector(".comp-points").textContent=`${computerPoints}`
}

//whole game stracture

//user choice
btns.forEach((elem,index)=>{
    elem.addEventListener("click",function(e){
        if(!testcase.contains("testcase")){
        testcase.add("testcase")
        let indexs=Math.floor(Math.random()*3)
        if(index==0){
            usersChoice="scissor"
            document.querySelector(".user-choice-scissor").classList.add("show-choicess")
            document.querySelector(".us").classList.add("unvisibility")
            iconToAddUser=userArray[0]
        }else if(index==1){
            usersChoice="rock"
            document.querySelector(".user-choice-rock").classList.add("show-choicess")
            document.querySelector(".ur").classList.add("unvisibility")
            iconToAddUser=userArray[1]
        }else{
            usersChoice="paper"
            document.querySelector(".user-choice-paper").classList.add("show-choicess")
            document.querySelector(".up").classList.add("unvisibility")
            iconToAddUser=userArray[2]
        }
        if(indexs==0){
            computerCoice="scissor"
            document.querySelector(".computer-platform-scissor").classList.add("show-choicess")
            document.querySelector(".cp").classList.add("unvisibility")
            iconToAddComputer=computerArray[0]
        }else if(indexs==1){
            computerCoice="rock"
            document.querySelector(".computer-platform-rock").classList.add("show-choicess")
            document.querySelector(".cp").classList.add("unvisibility")
            iconToAddComputer=computerArray[1]
        }else{
            computerCoice="paper"
            document.querySelector(".computer-platform-paper").classList.add("show-choicess")
            document.querySelector(".cp").classList.add("unvisibility")
            iconToAddComputer=computerArray[2]
        }

     


        switch(usersChoice+computerCoice){
            case "paperpaper":
            case "rockrock":
            case "scissorscissor":
                draw()
                break;
            case "scissorpaper":
            case "rockscissor":
            case "paperrock":
                win()
                break;
            case "scissorrock":
            case "rockpaper":
            case "paperscissor":
                lost()
                break;
        } 
    
    }})
})


//getback
function returnBack(){
    Points()
    userChoicess.forEach(elem=>{
        if(elem.classList.contains("show-choicess")){
            elem.classList.remove("show-choicess")
        }
    })
    computerChoices.forEach(elem=>{
        if(elem.classList.contains("show-choicess")){
            elem.classList.remove("show-choicess")
        }
})
    roundAmount++
    endGame()
}

//controling
function test(){
    testcase.remove("testcase")
    disappear.forEach(elem=>{
        if(elem.classList.contains("unvisibility")){
            elem.classList.remove("unvisibility")
        }
    })
    document.querySelector(".title").textContent="GAME HISTORY"
    document.querySelector(".title").style.color="hsl(209, 28%, 39%)"
    pointRounds()
    history()
}
//change title
function changeTitlWin(){
    document.querySelector(".title").textContent="YOU WON"
    document.querySelector(".title").style.color="#00ff00"
}
function changeTitlLost(){
    document.querySelector(".title").textContent="YOU LOST"
    document.querySelector(".title").style.color="rgb(255, 0, 0)"
}
function changeTitlDraw(){
    document.querySelector(".title").textContent="DRAW"
    document.querySelector(".title").style.color="rgb(190, 154, 32)"
}

//win/lose/draw functions
//win
function win(){
    userPoints++
    setTimeout(changeTitlWin,750)
    setTimeout(returnBack,1500)
    setTimeout(test,2500)
}
//lose
function lost(){
    computerPoints++
    setTimeout(changeTitlLost,750)
    setTimeout(returnBack,1500)
    setTimeout(test,2500)
}
//draw
function draw(){
    amountOfDraws++
    setTimeout(changeTitlDraw,750)
    setTimeout(returnBack,1500)
    setTimeout(test,2500)
}
//game history add
function history(){
    document.querySelector(".previus-games").innerHTML=`<div class="game">
                                                        <button type="button" class="users-previus-choice p user-history">${iconToAddUser}</button>
                                                        <p class="round-number">${roundAmount}</p>
                                                        <button type="button" class="computers-previus-choice p computer-history">${iconToAddComputer}</button>
                                                        </div>${historyy}`
    historyy =`<div class="game">
    <button type="button" class="users-previus-choice p user-history">${iconToAddUser}</button>
    <p class="round-number">${roundAmount}</p>
    <button type="button" class="computers-previus-choice p computer-history">${iconToAddComputer}</button>
    </div>${historyy}`
}

function endGame(){
if(gameType=="Rounds"&&roundAmount==pointAmount){
    if(userPoints>computerPoints){
        ending.classList.remove("none")
        textofendgame.textContent="CONGRATULATION YOU WON"
    }else if(userPoints<computerPoints){
        ending.classList.remove("none")
        textofendgame.textContent="SORRY YOU LOST"
    }else{ending.classList.remove("none")
    textofendgame.textContent="SORRY YOU LOST"}
}else if(gameType==="Points"){
    if(userPoints==pointAmount){
        ending.classList.remove("none")
        textofendgame.textContent="CONGRATULATION YOU WON"
    }else if(computerPoints==pointAmount){
        ending.classList.remove("none")
        textofendgame.textContent="SORRY YOU LOST"
    }
}else{}
}


refresh.addEventListener("click",function(){
    document.location.reload()
})