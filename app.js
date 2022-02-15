let skipBtn=document.getElementById("skip")
let submitBtn=document.getElementById("submit")



submitBtn.addEventListener("click",function(){
    localStorage.setItem("name",document.querySelector("#Name").value)
    localStorage.setItem("type",document.querySelector("#Type").value)
    localStorage.setItem("amount",document.querySelector("#Number").value)
})


skipBtn.addEventListener("click",function(){
    localStorage.setItem("name","YOU")
    localStorage.setItem("type","infinite")
    localStorage.setItem("amount","0")
    window.location.href="main.html"
})