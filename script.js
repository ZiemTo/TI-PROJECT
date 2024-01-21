
window.addEventListener("resize",ResizeTextarea );


function ResizeTextarea(task)
{
    task.setAttribute("style", "height:" + (task.scrollHeight) + "px;");
    task.addEventListener("input", OnInput, false);
}
function OnInput() {
    this.style.height = 'auto';
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
