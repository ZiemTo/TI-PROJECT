window.addEventListener('resize', updateTasksLayout);
function ResizeTextarea()
{
    const task = document.getElementsByTagName("textarea");
    for (let i = 0; i < task.length; i++) {
    task[i].setAttribute("style", "height:" + (task[i].scrollHeight) + "px;");
    task[i].addEventListener("input", OnInput, false);
    updateTasksLayout()
}
}
function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
    
}
function AddTask()
{
    const newspan = document.createElement("span");
    newspan.setAttribute("class","spantask")
    newspan.innerHTML = "<input type=\"checkbox\" name=\"task\" class=\"taskcheck\"> <label for=\"task\"><textarea class=\"task\" oninput=\"ResizeTextarea()\" placeholder=\"Write your task here\" ></textarea></label>";
    document.querySelector("#tasks").appendChild(newspan);
    updateTasksLayout();
}
function HideTasks()
{   
    var checkboxes = document.querySelectorAll(".taskcheck");
    
   checkboxes.forEach((checkbox)=>
   {
        if(checkbox.checked)
        {
            checkbox.parentElement.setAttribute("class","hidden-span");
        }
   })
}
function updateTasksLayout()
{
      var listHeight = document.querySelector(".list").offsetHeight-100;
      if(document.querySelector("#tasks").offsetHeight>=listHeight)
      {
        console.log(true);
        document.querySelector(".spantask:last-child").setAttribute("class","hidden-span");
      }
     
}
