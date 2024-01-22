
window.addEventListener("resize",ResizeTextareawindow);
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
  console.log
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
    console.log(li.firstChild.innerHTML)
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

