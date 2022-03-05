document.querySelector(".first-submit").addEventListener("click",firstSubmit)

document.querySelector(".second-submit").addEventListener("click",secondSubmit)

function firstSubmit(){
    var userName=document.querySelector(".firstInput")
    if(!userName.value){
        noInput(".firstInput",".firstUser","your name")
    }else{
        localStorage.setItem("type", "computer");
        localStorage.setItem("name", userName.value)
        window.location.href = "main.html";
    }
}

function secondSubmit(){
    var player1=document.querySelector(".player1")
    var player2=document.querySelector(".player2")
    if(!player1.value&&!player2.value){
        noInput(".player1",".firstPlayer","first players name")
        noInput(".player2",".secondPlayer","second players name")
    }else if(!player1.value){
        noInput(".player1",".firstPlayer","first players name")
    }else if(!player2.value){
        noInput(".player2",".secondPlayer","second players name")
    }else{
        localStorage.setItem("type", "friends");
        localStorage.setItem("player1", player1.value)
        localStorage.setItem("player2", player2.value)
        window.location.href = "main.html";
    }
}


function noInput(element,secondelem,text){
    document.querySelector(element).style.border="red 0.3rem solid"
    document.querySelector(secondelem).style.color="red"
    document.querySelector(element).placeholder=`${text}`
    setTimeout(function(){
        window.alert(`fill the input (${text}) with valid username`)
        document.querySelector(element).style.border="var(--green) 0.3rem solid"
        document.querySelector(secondelem).style.color="var(--green)"
        document.querySelector(element).placeholder=""
        },50)
}

