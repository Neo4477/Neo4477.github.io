//get items 
let theme=localStorage.getItem("theme");
let level=localStorage.getItem("level")
//theme vairables
let nightButton=document.querySelector(".night")
let sunButton=document.querySelector(".sun")

let levelAmountOfBlocks={
    "Easy": 65,
    "Medium": 56,
    "Hard": 47,
    "Very hard": 38,
}

window.addEventListener("DOMContentLoaded",function(){
    changeTheme()
    setItems()
    if(level!="Sudoku Solver"){
        currentBoard=solve(currentBoard)
        deleteNums()
        addLevel()
    }
})

//changes theme
function changeTheme(){
    if(theme=="dark"){
        document.querySelector("body").style.background=" var(--second-main-pg-color)"
        document.documentElement.style.setProperty('--heighlate-blocks',"white");
        document.documentElement.style.setProperty('--number-color',"--heighlate-blocks");
        document.querySelector(".sudokuComplited").style.backgroundColor="var(--second-main-pg-color)"
        nightButton.classList.add("hidden")
        sunButton.classList.remove("hidden")
    }else{
        document.querySelector(".sudokuComplited").style.backgroundColor="var(--first-main-pg-color)"
        document.querySelector("body").style.background="var(--first-main-pg-color)"
        document.documentElement.style.setProperty('--heighlate-blocks',"#002F5F");
        document.documentElement.style.setProperty('--number-color',"white");
    }
}

//theme buttons functionality
nightButton.addEventListener('click',function(){
    document.querySelector("body").style.background=" var(--second-main-pg-color)"
    document.querySelector("body").style.background="var(--second-main-pg-color)"
    nightButton.classList.add("hidden")
    sunButton.classList.remove("hidden")
    document.documentElement.style.setProperty('--heighlate-blocks',"white");
    document.documentElement.style.setProperty('--number-color',"--heighlate-blocks");
})

sunButton.addEventListener('click',function(){
    document.querySelector(".sudokuComplited").style.backgroundColor="var(--first-main-pg-color)"
    document.querySelector("body").style.background="var(--first-main-pg-color)"
    document.documentElement.style.setProperty('--number-color',"white");
    sunButton.classList.add("hidden")
    nightButton.classList.remove("hidden")
    document.documentElement.style.setProperty('--heighlate-blocks',"#002F5F");
})

//functionality from top
let sudokuFromTop=document.querySelector(".first-block").clientHeight+100
document.documentElement.style.setProperty('--from-top', `${sudokuFromTop}px`);

//set timer/localstorage items
//time variable
let seconds=0;
let exactTime;
let timer=document.querySelector('.exact-time')
//localstorage var
let userName=localStorage.getItem("name");
//innerfield var
let nameToShow=document.querySelector(".name")
let levelToShow=document.querySelector(".levle")


function setItems(){
    nameToShow.innerHTML=userName
    levelToShow.innerHTML=level
    setInterval(setTIme,1000)
}

function setTIme(){
    seconds=seconds+1
    exactTime=time(seconds)
    timer.innerHTML=exactTime
}

function time(second){
    return new Date(second*1000).toISOString().substr(11,8)
}

//board functionality
let fullBlocks=document.querySelectorAll(".full-block")
let ceilBlocks=document.querySelectorAll(".ceil-block")
let numbersToAdd=document.querySelectorAll(".num")
let sudokuSolver=document.querySelector(".solved")
let xIcon=document.querySelector(".x")
let vIcon=document.querySelector(".v")
let refresh=document.querySelector(".refresh")
//checks baords validity
let validboard;
let wrongspots=[]

let currentBoard=[
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
];
let cureentCellElemnt=false;
let currentCellIndx;
//cureent elements row/block/horizont in order to add borders and check if there is duplicate number
let numbersToCheck=[]

//ceils on click
ceilBlocks.forEach((elem,index)=>{
    elem.addEventListener("click",function(e){
        validboard=true;
        wrongspots=[];
        checkValidBoard()
        if(!validboard){
            boardNotValid()
        }else{
        cureentCellElemnt=e.currentTarget
        currentCellIndx=cellIndex(index)
        numbersToCheck=[]
        highlight(elem)}
    })
})

//nums on click
numbersToAdd.forEach((elem)=>{
    elem.addEventListener("click",function(e){
        if(!cureentCellElemnt.classList.contains("unchaingeble")){
            cureentCellElemnt.textContent=e.currentTarget.textContent
            currentBoard[currentCellIndx[0]][currentCellIndx[1]]=Number(e.currentTarget.textContent)
            validAnimation(elem)
            if(!findEmptuSquere(currentBoard)&&level!="Sudoku Solver"){
                checkValidBoard()
                if(!validboard){
                  validboard=true
                }else{
                    document.querySelector(".exactTime").textContent=exactTime
                    document.querySelector(".sudokuComplited").classList.remove("none")
                }
            }
        }else{
            cannotChange()
        }
    })
})
//x icon on click
xIcon.addEventListener("click",function(){
    if(!cureentCellElemnt.classList.contains("unchaingeble")){
        cureentCellElemnt.textContent=""
        cureentCellElemnt=""
        clearAll()
    }else{
        cannotChange()
    }
})

//v icon on click
vIcon.addEventListener("click",function(){
    let copyboard=[...currentBoard]
    let solvedBoard=solve(copyboard)
    if(cureentCellElemnt){
        if(solvedBoard){
            cureentCellElemnt.textContent=solvedBoard[currentCellIndx[0]][currentCellIndx[1]]
            currentBoard[currentCellIndx[0]][currentCellIndx[1]]=solvedBoard[currentCellIndx[0]][currentCellIndx[1]]
            if(!findEmptuSquere(currentBoard)&&level!="Sudoku Solver"){
                checkValidBoard()
                if(!validboard){
                  validboard=true
                }else{
                    document.querySelector(".exactTime").textContent=exactTime
                    document.querySelector(".sudokuComplited").classList.remove("none")
                }
            }
        }else{
            //when board is unsolveble
            unsolvebleSudoku()
        }
    }else{
        return ""
    }
})


//refresh button
refresh.addEventListener("click",function(){
    location.reload()
})

document.querySelector(".ref").addEventListener("click",function(){
    location.reload()
})
//sudoku solver
sudokuSolver.addEventListener("click",function(){
    validboard=true;
    wrongspots=[];
    checkValidBoard()
    if(validboard){
        let validOrNot=solve(currentBoard)
        if(validOrNot){
        currentBoard=validOrNot
        clearAll()
        blockelems()
        addelelems()
    }else{
        unsolvebleSudoku()
    }
    }else{
        boardNotValid()
    }
})

//returns index where element could be found on currentBoard
function cellIndex(indx){
    let currentblock=Math.floor(indx/9)
    let currentCell=Math.floor(indx%9)
    return [currentblock,currentCell]
}   

//higliths imoportant blocks
function highlight(elem){
    clearAll()
    elem.style.background="var(--heighlate-blocks)"
    block()
    horizont()
    vertical()
}

function clearAll(){
    ceilBlocks.forEach(elem=>{
        elem.style.border="none"
        elem.style.background="var(--text-color)"
        elem.classList.remove("wrongInput")
    })
}

//adds elements block borders
function block(){
    for(let i=0;i<9;i++){
        fullBlocks[currentCellIndx[0]].children[i].style.border="solid var(--heighlate-blocks) var(--border-width)"
        if(fullBlocks[currentCellIndx[0]].children[i].textContent){
            numbersToCheck.push(fullBlocks[currentCellIndx[0]].children[i])
        }
    }
}

//adds elements horizontal line borders
function horizont(){
    //calculete from which block and then from which ceil i should start
    let startingBlock= Math.floor(currentCellIndx[0]/3)*3
    let startingCell= Math.floor(currentCellIndx[1]/3)*3

    for(let i=startingBlock;i<startingBlock+3;i++){
        for(j=startingCell;j<startingCell+3;j++){
            fullBlocks[i].children[j].style.border="solid var(--heighlate-blocks) var(--border-width)"
            if(fullBlocks[i].children[j].textContent){
                numbersToCheck.push(fullBlocks[i].children[j])
            }
        }
    }
}

//adds elements vertical line borders
function vertical(){
     //calculete from which block and then from which ceil i should start
    let startingBlock=currentCellIndx[0]%3
    let startingCell=currentCellIndx[1]%3
    for(let i=startingBlock;i<startingBlock+9;i+=3){
        for(j=startingCell;j<startingCell+9;j+=3){
            fullBlocks[i].children[j].style.border="solid var(--heighlate-blocks) var(--border-width)"
            if(fullBlocks[i].children[j].textContent){
                numbersToCheck.push(fullBlocks[i].children[j])
            }
        }
    }
}

function validAnimation(elem){
    
  ceilBlocks.forEach(elem=>{
      elem.style.background="var(--text-color)"
      elem.style.borderColor="var(--heighlate-blocks)"
      elem.classList.remove("wrongInput")
  })
 let valid=numbersToCheck.filter(element=>{
                                if(element != cureentCellElemnt){
                                    return element.textContent==elem.textContent
                                }else{
                                     return   false
                                    }})
            
            
            
    valid.forEach(elements=>{
                    elements.classList.add("wrongInput")
                    elements.style.background="red"
                    elements.style.borderColor="red"
                    cureentCellElemnt.classList.add("wrongInput")
                    cureentCellElemnt.style.background="red"
                    cureentCellElemnt.style.borderColor="red"
                })
   if(valid.length<1){
        ceilBlocks.forEach(element=>{
            element.classList.remove("wrongInput")
            element.style.background="var(--text-color)"
            element.style.borderColor="var(--heighlate-blocks)"
            cureentCellElemnt.classList.remove("wrongInput")
            cureentCellElemnt.style.background="var(--heighlate-blocks)"
            cureentCellElemnt.style.borderColor="var(--heighlate-blocks)"
        })
    }           
}

function checkValidBoard(){

    for(let i=0;i<ceilBlocks.length;i++){
        if(ceilBlocks[i].classList.contains("wrongInput")){
            validboard=false
            wrongspots.push(i)
        }
    }
}

function boardNotValid(){
    for(let i=0;i<wrongspots.length;i++){
        ceilBlocks[wrongspots[i]].classList.remove("wrongInput")
        setTimeout(()=>{
            ceilBlocks[wrongspots[i]].classList.add("wrongInput")
        },10)
    }
}


//sudoku solver
//....................................................................................................................
function solve(board){
    if(solved(board)){
            return board
    }else{
        let possibilitys=nextBoards(board)
        let validboards=keepOnlyValid(possibilitys)
        return searchForSolution(validboards)
    }
}

function searchForSolution(boards){
    if(boards.length<1){
        return false
    }else{
        var first=boards.shift()
        var tryPath=solve(first)
        if(tryPath != false){
            return tryPath
        }else{
            return searchForSolution(boards)
        }
    }
}

function solved(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]==""){
                return false
            }
        }
    }return true

}


function nextBoards(board){
    var temp=[]

    let firstEmpty=findEmptuSquere(board)
    if(firstEmpty != undefined){
        let y=firstEmpty[0]
        let x= firstEmpty[1]
        let arr=[1,2,3,4,5,6,7,8,9]
        for(var i=1;i<=9;i++){
            let randomnum=Math.floor(Math.random()*arr.length)
            var newboard=[...board]
            var row=[...newboard[y]]
            row[x]=arr[randomnum]
            newboard[y] = row
            temp.push(newboard)
            arr.splice(randomnum ,1)
        }
    }
    return temp
}

function findEmptuSquere(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j] == ""){
                return [i,j]
            }
        }
    }
}

function keepOnlyValid(boards){
    return boards.filter((b)=>{
        return validboardss(b)
    })
}

function validboardss(board){
    return row(board) && column(board) && boxBlock(board)
}

function row(board){
    let startingBLock=0;
    let startingCell=0;
    for(let i=0;i<9;i++){
        var cur=[]
        for(let j=startingBLock;j<startingBLock+3;j++){
            for(let e=startingCell;e<startingCell+3;e++){
                if(cur.includes(board[j][e])&&board[j][e]!=""){
                    return false
                }else{
                    cur.push(board[j][e])
                }
            }
        }
        startingCell=i%3*3
        startingBLock=Math.floor(i/3)*3
    }return true
}

function column(board){
    let startingBLock=0;
    let startingCell=0;
    for(let i=0;i<9;i++){
        var cur=[]
        for(let j=startingBLock;j<startingBLock+9;j+=3){
            for(let e=startingCell;e<startingCell+9;e+=3){
                if(cur.includes(board[j][e])&&board[j][e]!=""){
                    return false
                }else{
                    cur.push(board[j][e])
                }
            }
        }
        startingCell=i%3
        startingBLock=Math.floor(i/3)
    }return true
}


function boxBlock(board){
    for(let i=0;i<9;i++){
        let cur=[]
        for(let j=0;j<9;j++){
            if(cur.includes(board[i][j])&&board[i][j]!=""){
                return false
            }else{
                cur.push(board[i][j])
            }
        }
    }return true
}

//add elemets to the real board
function addelelems(){
    let block=0
    let cell=0
    let counter=0
    
 interval=setInterval(() => {
        if(counter<82){
                clearAll()
                cureentCellElemnt=fullBlocks[block].children[cell]
                currentCellIndx=cellIndex(block*9+cell)
                highlight(fullBlocks[block].children[cell])
                fullBlocks[block].children[cell].textContent=currentBoard[block][cell]
                cell++
                if(cell==9){
                cell=0
                block++
            }
            if(block*9+cell==81){
                clearAll()
            }
        }
     counter++
    }, 200);

    setTimeout(()=>{
       clearInterval(this.interval)
       enablelems()
       cureentCellElemnt=""
    },16200)
}

//block filing
function blockelems(){
    ceilBlocks.forEach(elem=>{
        elem.style.pointerEvents="none"
    })

    document.querySelectorAll(".numbers").forEach(elem=>{
        elem.style.pointerEvents="none"
    })

    sudokuSolver.style.pointerEvents="none"
}

function enablelems(){
    ceilBlocks.forEach(elem=>{
        elem.style.pointerEvents="auto"
    })

    document.querySelectorAll(".numbers").forEach(elem=>{
        elem.style.pointerEvents="auto"
    })

    sudokuSolver.style.pointerEvents="auto"
}

//sudoku not solved
function unsolvebleSudoku(){
    window.alert("sudoku is unsolveble")
}

//generate sudokus
function deleteNums(){
    let amount=81-levelAmountOfBlocks[level]
    for(let i=0;i<amount;i++){
        let rightIndex=returnRandomFiled()
        currentBoard[rightIndex[0]][rightIndex[1]]=""
    }
}

function returnRandomFiled(){
    let randomBlock=Math.floor(Math.random()*9)
    let randomCell=Math.floor(Math.random()*9)
    if(currentBoard[randomBlock][randomCell]==""){
        return returnRandomFiled()    
    }else{
        return [randomBlock,randomCell]
    }
}

function addLevel(){
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            let sudokuElement=currentBoard[i][j]
            if(sudokuElement !=""){
                let elem=fullBlocks[i].children[j]
                elem.textContent=sudokuElement
                elem.classList.add("unchaingeble")
            }
        }
    }
}

function cannotChange(){
    window.alert("you cannot change original elements of the board")
}