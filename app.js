let nightButton=document.querySelector(".night")
let sunButton=document.querySelector(".sun")
let darkLight="light"

let levels=document.querySelectorAll(".level")
nightButton.addEventListener('click',function(){
    document.querySelector("body").style.background="var(--second-main-pg-color)"
    document.querySelector(".to-cover").style.background="var(--second-main-pg-color)"
    darkLight="dark"
    nightButton.classList.add("hidden")
    sunButton.classList.remove("hidden")
})

sunButton.addEventListener('click',function(){
    document.querySelector("body").style.background="var(--first-main-pg-color)"
    document.querySelector(".to-cover").style.background="var(--first-main-pg-color)"
    darkLight="light"
    sunButton.classList.add("hidden")
    nightButton.classList.remove("hidden")
})

levels.forEach(elem=>{
    elem.addEventListener("click",function(){
        let username=document.querySelector(".your-name")
        if(!username.value){
            username.classList.remove("blue")
            username.classList.add("red")
            username.style.borderColor="red"
            setTimeout(function(){
                alert("fill your name field")
                username.classList.remove("red")
                username.classList.add("blue")
                username.style.borderColor="var(--text-color)"
            },50)
        }else{
            localStorage.setItem("theme", darkLight)
            localStorage.setItem("level", elem.textContent)
            localStorage.setItem("name", username.value)
            location.href="main.html"
        }
    })
})
//falling numbers
window.addEventListener("DOMContentLoaded",function(){
    amountOfNums()
    setInterval(function(){
        addNumsToFall(amount0fNumbers)
    }, 500)
    setTimeout(function(){
        deleteElems(amount0fNumbers)
   }, 7500)
})

//height/width/font of elems
let width= window.innerWidth
let dropHeight=window.innerHeight+300
document.documentElement.style.setProperty('--drop-height', `${dropHeight}px`);
let fontSizeToChange;
let staticFontSize;
//class names
let randomClassNames=[]
let alphabet='abcdefghijklmnopqrstuvwxyz'
 
let howManyTimesAdded=1
let infinte=0
let innerhtml=''
let amount0fNumbers;
//spots
var spotss=[]


function addNumsToFall(num){
    for(let i=0;i<num;i++){
        //creating adding random class on randomclaasnames
        let randomNum1=Math.floor(Math.random()*alphabet.length)
        let randomNum2=Math.floor(Math.random()*alphabet.length)
        let randomNum3=Math.floor(Math.random()*alphabet.length)
        let randomNum4=Math.floor(Math.random()*alphabet.length)
        let randomNum5=Math.floor(Math.random()*alphabet.length)
        let randomClass=`${alphabet[randomNum1]}${alphabet[randomNum2]}${alphabet[randomNum3]}${alphabet[randomNum4]}${alphabet[randomNum5]}`
        randomClassNames.push(randomClass)
    }   
    let classnamesToPick=howManyTimesAdded*num
    spotss=[]
    for(let i=classnamesToPick-num; i<classnamesToPick;i++){
        let randomNam= Math.ceil(Math.random()*9)
        let randomspot=randomSpot()
        let randomFont=Math.floor(Math.random()*fontSizeToChange)+staticFontSize
        innerhtml=""
        innerhtml+=`<div class="number ${randomClassNames[i]}">${randomNam}</div>`
        document.querySelector(".failing-numbers").insertAdjacentHTML('afterbegin',innerhtml)
        let currentElem=document.querySelector(`.${randomClassNames[i]}`)
        currentElem.style.left=`${randomspot}px`
        currentElem.style.fontSize=`${randomFont}px`
    }

    infinte++
    howManyTimesAdded++
}

function deleteElems(num){
    let lengthofNode=document.querySelectorAll(".number").length-num
    let copy=lengthofNode
    setInterval(()=>{
        for(let i=document.querySelectorAll(".number").length;i>copy;i--){
            document.querySelector(".failing-numbers").removeChild(document.querySelectorAll(".number")[i-1])
        }
    },550)
}

//amount of nums
function amountOfNums(){
    if(width>700&&width<1200){
        amount0fNumbers=16
        fontSizeToChange=16
        staticFontSize=12
    }else if(width>300&&width<700){
        amount0fNumbers=8
        fontSizeToChange=14
        staticFontSize=14
    }else if(width<300){
        amount0fNumbers=4
        fontSizeToChange=7
        staticFontSize=7
    }else if(width>2000&&width<2400){
        amount0fNumbers=30
        fontSizes=25
        staticFontSize=22.5
    }else if(width>2400){
        amount0fNumbers=40
        fontSizes=30
        staticFontSize=25
    }else{
        amount0fNumbers=20
        fontSizeToChange=20
        staticFontSize=20
    }
}
//randomspot
function randomSpot(){
    let randomspot=Math.floor(Math.random()*(width+20))
    let openspot=spotss.every(elem=>{
        if(randomspot-25>elem){
            return true
        }else if(randomspot+25<elem){
            return true
        }else{
            return false
        }
    })

    if(openspot){
        spotss.push(randomspot)
        return randomspot
    }else {
       return randomSpot()
    }
}