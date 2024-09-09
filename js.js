function showSection(sectionId){
      
    var sectionlist=document.querySelectorAll('.form-container,.task_list_Container')
console.log(sectionlist)
    sectionlist.forEach(section=>{
  if(section.id==sectionId){
    section.classList.remove('hidden')
    }
    else{
        section.classList.add('hidden') 
    }
    })
   
}


class Task{

    constructor(title,description,duedate,assignee){
        this.title=title;
        this.description=description;
        this.duedate=new Date(duedate);
        this.assignee=assignee;
        this.completed=false;
        this.currentDate=new Date();
        


    }
    markCompleted(){
        this.completed=true;
    }

  

    display(index){
 
        return `<div class="task-item">
              <button class="delete-btn text-danger"  style="float:inline-end" onclick=objTaskManager.remove(${index})>
  <i class="fa fa-times"></i>
</button>
            

<h3>${this.title}</h3>
<p>description: ${this.description}</p>
<p> DueDate:${this.duedate.toDateString()}</p>
<p> Assigned by:${this.assignee}</p>
   <p> Completed:${this.completed ?'<i class="fa fa-check" style="font-size:16px"></i>':'No'}</p>
   
   ${this.completed ? '' : ` <button onclick=objTaskManager.mark(${index})> Mark Completed </button>`}
   <br><br>
        <span class="text-danger "> ${this.currentDate > this.duedate ?'Due Date Passed':''}</span>

      
</div>`

    }
}
class TaskManager{
    constructor(){
        this.tasks=[];
    }

addTasks(){

let title=document.getElementById('tasktitle').value;
let description=document.getElementById('TaskDescription').value;
let duedate=document.getElementById('DueDate').value;
let assignee=document.getElementById('AssignedBy').value;

if(title && description && duedate &&assignee){


      var objTask=new Task(title,description,duedate,assignee)
      this.tasks.push(objTask);
      this.displaytasks();
      this.clearFields();
    
      
      alert('Your Task Added Successfully!')

}
else{
    alert("please fill up fields")
}
}
displaytasks(){


let taskcontainer=document.getElementById('tasklist');
if(this.tasks.length>0){
  taskcontainer.innerHTML=this.tasks.map((task,index)=>task.display(index)).join('');
}
else{
    taskcontainer.innerHTML='<h3> No Task Added</h3>'
}
}
clearFields(){
    
 document.getElementById('tasktitle').value = '';
document.getElementById('TaskDescription').value = '';
document.getElementById('DueDate').value = '';
document.getElementById('AssignedBy').value = '';
   }

mark(index){

if(this.tasks[index]){
    this.tasks[index].markCompleted();
    this.displaytasks();
}
}

remove(index) {

     if(this.tasks[index]){
        this.tasks.splice(index, 1)
    
 
     this.displaytasks();
    }
    
}
}

const objTaskManager=new TaskManager();
document.getElementById('addbutton').addEventListener('click',()=>{
event.preventDefault(); 
objTaskManager.addTasks();

})

