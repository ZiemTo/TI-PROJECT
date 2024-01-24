
var background;


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
const targetTextarea = document.querySelectorAll("textarea");
const targetCheckbox = document.querySelectorAll("input[type=\"checkbox\"]");


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
    if(getCookie("seconds").length>0)
    {
        
        document.querySelector("#time").lastChild.previousSibling.setAttribute("value",getCookie("seconds"));
    }
    
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
    document.querySelector("menu").style.width="0";
}
function openNav()
{
    document.querySelector("menu").style.width="350px";
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
    document.querySelector(".time:first-child").setAttribute("style","pointer-events:none;")
    document.querySelector(".time:last-child").setAttribute("style","pointer-events:none;")
}
function Pause()
{
    document.querySelector(".time:first-child").removeAttribute("style")
    document.querySelector(".time:last-child").removeAttribute("style")
}
function SetBackground(a)
{
    div = document.querySelector(a.getAttribute("href"))
    src = div.firstChild.nextSibling.getAttribute("src")
    document.querySelector("#background").setAttribute("src",src);
    localStorage.setItem("background",src);
}
function SetDefaultValues()
{
    const cookieMinutes = "minutes";
    const cookieSeconds = "seconds";
 
    const cookieMinutesValue = document.querySelector("#defaulttimer").firstChild.nextSibling.value;
    const cookieSecondsValue = document.querySelector("#defaulttimer").lastChild.previousSibling.value;
    
    const exp = new Date(2147483647 * 1000).toUTCString();
    document.cookie = cookieMinutes + '=' + cookieMinutesValue + ';expires=' + exp;
    document.cookie = cookieSeconds + '=' + cookieSecondsValue + ';expires=' + exp;
}


