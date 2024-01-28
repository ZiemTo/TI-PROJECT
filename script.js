
var background;
var flag1=0;
inp = document.querySelectorAll("input[type=\"number\"]")
inp.forEach((x)=> 
{
    x.addEventListener("keypress", function (evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
        {
            evt.preventDefault();
        }
    });
})
window.addEventListener("resize",ResizeTextareawindow);
function handleMutation(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
        let savetasks=document.querySelectorAll(".visible-span>label>textarea")
        var values=[];
        i=0;
        savetasks.forEach((savetask)=>
        {
            if(!savetask.value.length<1 &&!savetask.parentElement.previousSibling.previousSibling.checked){

        
            values[i]=savetask.value;
            i++;
        }
        
   })
   values=JSON.stringify(values);
   localStorage.setItem("savedtasks",values)
    });
}
const observer = new MutationObserver(handleMutation);

const targetElement = document.querySelector(".list");

const config = {  characterData: true, attributes: true, subtree: true  };
// const targetTextarea = document.querySelectorAll("textarea");
// const targetCheckbox = document.querySelectorAll("input[type=\"checkbox\"]");


observer.observe(targetElement, config);
function SetPrevious()
{
    if(localStorage.getItem("background")!=null)
    {
        document.querySelector("#background").setAttribute("src",localStorage.getItem("background"));
    }
    if(localStorage.getItem("savedtasks")!=null)
    {
        let savedtasks = JSON.parse(localStorage.getItem("savedtasks"));
        savedtasks.forEach((task)=>
        {
            const newspan = document.createElement("span");
        newspan.setAttribute("class","spantask visible-span")
        newspan.innerHTML = "<input type=\"checkbox\" name=\"task\" onclick=\"Cross(this)\" class=\"taskcheck \"> <label for=\"task\"><textarea class=\"task\"  maxlength=\"80\" oninput=\"ResizeTextarea(this)\" placeholder=\"Write your task here\" ></textarea></label>";
        document.querySelector("#tasks").appendChild(newspan);
        newspan.firstChild.nextSibling.nextSibling.firstChild.value=task;
        })
        
    }
    if(getCookie("minutes").length>0)
    {
        
        document.querySelector("#time").firstChild.nextSibling.setAttribute("value",getCookie("minutes"));
    }
    else  document.querySelector("#time").firstChild.nextSibling.setAttribute("value","00")
    if(getCookie("seconds").length>0)
    {
        
        document.querySelector("#time").lastChild.previousSibling.setAttribute("value",getCookie("seconds"));
    } else  document.querySelector("#time").lastChild.previousSibling.setAttribute("value","00");
    
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
function ResizeTextareawindow()
{
    const tasks = document.querySelectorAll("textarea");
    tasks.forEach((task)=>
    {
        ResizeTextarea(task)
    }) 
    
   
}

function ResizeTextarea(task)
{
    var currentHeight = task.scrollHeight;
    task.style.height = "0";
    var minHeight = task.scrollHeight;
    task.style.height = currentHeight + "px";
    if (currentHeight > minHeight) {
        task.style.height = minHeight + "px";
    }
    task.setAttribute("style", "height:" + (task.scrollHeight) + "px;");
    task.addEventListener("input", OnInput, false);
   
   
}
function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
    
}
function AddTask()
{
        const newspan = document.createElement("span");
        newspan.setAttribute("class","spantask visible-span")
        newspan.innerHTML = "<input type=\"checkbox\" name=\"task\" onclick=\"Cross(this)\" class=\"taskcheck \"> <label for=\"task\"><textarea class=\"task\"  maxlength=\"80\" oninput=\"ResizeTextarea(this)\" placeholder=\"Write your task here\" ></textarea></label>";
        document.querySelector("#tasks").appendChild(newspan);
        var checkboxes = document.querySelectorAll(".taskcheck");
        checkboxes.forEach((checkbox)=>
        {
        if(document.querySelector("#btn1").getAttribute("class")=="hidden-span"){
        checkbox.addEventListener('change',HideTasks)}
        })
        
        
}

async function HideTasks()
{   

    await new Promise(resolve => setTimeout(resolve, 800));
    var checkboxes = document.querySelectorAll(".taskcheck");
   checkboxes.forEach((checkbox)=>
   {
        if(checkbox.checked)
        {
            checkbox.parentElement.setAttribute("class","hidden-span");
        }
        checkbox.addEventListener('change',HideTasks)
   })
   document.querySelector("#btn1").setAttribute("class","hidden-span");
   document.querySelector("#btn2").setAttribute("class","visible-span");
   
}
function ShowTasks()
{
    var checkboxes = document.querySelectorAll(".taskcheck");
    checkboxes.forEach((checkbox)=>
   {
        if(checkbox.checked)
        {
            checkbox.parentElement.setAttribute("class","spantask");
            
        }
        checkbox.removeEventListener('change',HideTasks)
        
   })
   document.querySelector("#btn1").setAttribute("class","visible-span");
   document.querySelector("#btn2").setAttribute("class","hidden-span");
}
function Cross(checkbox)
{
    if(checkbox.checked)
    {
        
        checkbox.nextSibling.nextSibling.firstChild.classList.add("crossed")
        ResizeTextarea(checkbox.nextSibling.nextSibling.firstChild);
        
    }
    else{
    
        checkbox.nextSibling.nextSibling.firstChild.classList.remove("crossed")
    }
    
}
function Close()
{
    document.querySelector("#top").setAttribute("style","display:none;")
}
function closeNav()
{
    document.querySelector("#menu").style.width="0";
    document.querySelector("#menu").style.minWidth="0";
}
function openNav()
{
    document.querySelector("#menu").style.width="fit-content";
    document.querySelector("#menu").style.minWidth="300px";
}
function ShowContent(li)
{
    
    if(li.firstChild.innerHTML=="&gt;")
    { 
        li.firstChild.innerHTML="&or;"
        li.nextSibling.nextSibling.classList.add("visible-span");
        
        li.nextSibling.nextSibling.classList.remove("hidden-span");
    }

    else {
        li.firstChild.innerHTML="&gt;"
        li.nextSibling.nextSibling.classList.add("hidden-span");
        
        li.nextSibling.nextSibling.classList.remove("visible-span");
    }
    
    
}

function Start()
{
   
    if(flag1==1) return;

    
    min=document.querySelector("#time").firstChild.nextSibling.value;
    sec = document.querySelector("#time").lastChild.previousSibling.value;
    if(min=="00" && sec=="00") 
    {
        return;
    }
    flag1=1;
    document.querySelector(".time:first-child").setAttribute("style","pointer-events:none;")
    document.querySelector(".time:last-child").setAttribute("style","pointer-events:none;")
    
   
    if(sec>=60){
        min=Number(min)
        min+=Number(Math.floor(sec/60));
        sec=String(sec%60);
        document.querySelector("#time").lastChild.previousSibling.value=sec;
    }
    
    if(min>=60)
    { 
        min=String(59)
        sec=String(59);
        document.querySelector("#time").firstChild.nextSibling.value=min;
        document.querySelector("#time").lastChild.previousSibling.value=sec;
    }
    else 
    {
        min=String(min)
        document.querySelector("#time").firstChild.nextSibling.value=min;
    }
    
    min=Number(min)
    sec=Number(sec);
    min=String(min)
    sec=String(sec)
    document.querySelector("#time").firstChild.nextSibling.value=min
    document.querySelector("#time").lastChild.previousSibling.value=sec

    if(min<10) document.querySelector("#time").firstChild.nextSibling.value="0"+min
    if(sec<10) document.querySelector("#time").lastChild.previousSibling.value="0"+sec
   
    if(min==0) min=-1;
     timer = setInterval(function(){
       
        if (sec < 0 && min>=0) {
            sec=59;
            min--;
            if(min<10) document.querySelector("#time").firstChild.nextSibling.value="0"+min;
            else document.querySelector("#time").firstChild.nextSibling.value=min;
            if(min==-1) document.querySelector("#time").firstChild.nextSibling.value="00"
         }
        if(sec<10) document.querySelector("#time").lastChild.previousSibling.value="0"+sec;
        else document.querySelector("#time").lastChild.previousSibling.value=sec
        sec--;
         if (sec < 0 && min < 0) {
        clearInterval(timer);
        part = document.querySelectorAll(".particle");
        part.forEach((par)=>
        {
            par.classList.add("particle1");
        })
        setTimeout(function(){
            part = document.querySelectorAll(".particle");
        part.forEach((par)=>
        {
            par.classList.remove("particle1");
        })
        },3000)
        flag1=0;
        document.querySelector(".time:first-child").removeAttribute("style")
    document.querySelector(".time:last-child").removeAttribute("style")
    }
       
    }, 1000);
}
function Pause()
{
    document.querySelector(".time:first-child").removeAttribute("style")
    document.querySelector(".time:last-child").removeAttribute("style")
    clearInterval(timer)
    flag1=0;


}
function fadeOut(bg, duration) {
    var opacity = 1;
    var interval = 20;
    var delta = interval / duration;

    function decrease() {
        opacity -= delta;
        bg.style.opacity = opacity;

        if (opacity <= 0.4) {
            
            clearInterval(fadeEffect);
        }
    }

    var fadeEffect = setInterval(decrease, interval);
}

function fadeIn(bg, duration) {
    var opacity = 0.2;
    var interval = 20; 
    var delta = interval / duration;
    bg.style.opacity = opacity;
    function increase() {
        opacity += delta;
        bg.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fadeEffect);
        }
    }

    var fadeEffect = setInterval(increase, interval);
}

function SetBackground(a) {
    var div = document.querySelector(a.getAttribute("href"));
    var src = div.firstChild.nextSibling.getAttribute("src");
    var background = document.querySelector("#background");
    fadeOut(background, 500);
    setTimeout(function () {
        background.setAttribute("src", src);
        fadeIn(background, 900);
    }, 300);

    localStorage.setItem("background", src);
}

function SetDefaultValues()
{
    const cookieMinutes = "minutes";
    const cookieSeconds = "seconds";
 
     cookieMinutesValue = document.querySelector("#defaulttimer").firstChild.nextSibling.value;
     cookieSecondsValue = document.querySelector("#defaulttimer").lastChild.previousSibling.value;
    cookieMinutesValue=Number(cookieMinutesValue);
    cookieMinutesValue=String(cookieMinutesValue)
    cookieSecondsValue=Number(cookieSecondsValue);
    cookieSecondsValue=String(cookieSecondsValue)
    if(cookieSecondsValue>=60){
        cookieMinutesValue=Number(cookieMinutesValue)
        cookieMinutesValue+=Number(Math.floor(cookieSecondsValue/60));
        cookieSecondsValue=String(cookieSecondsValue%60);
    }
    if(cookieMinutesValue>=60)
    {
        cookieMinutesValue = String(59);
        cookieSecondsValue = String(59);
    }
    if(cookieMinutesValue<10) cookieMinutesValue="0"+cookieMinutesValue;
    if(cookieSecondsValue<10) cookieSecondsValue="0"+cookieSecondsValue
    console.log(cookieMinutesValue)
    const exp = new Date(2147483647 * 1000).toUTCString();
    document.cookie = cookieMinutes + '=' + cookieMinutesValue + ';expires=' + exp;
    document.cookie = cookieSeconds + '=' + cookieSecondsValue + ';expires=' + exp;
}
function Submit()
{   
    document.querySelector(".content").innerHTML="Thanks for your opinion!"

}