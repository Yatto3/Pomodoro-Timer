"use strict";



const taskImgSrc = "./public/img/icons8-done-64.png";
const editImgSrc = "./public/img/icons8-edit-24.png";
const deleteImgSrc = "./public/img/icons8-delete-24.png";

let pomodorsDone = 0;
let pomodoros = 0;
let shortBrMinutes = 0;
let longBrMinutes = 0;
let totalPomos = 0 ;
let selectedTask = null;
let s = 0;
let m = 25;
let timerSetting = "";



if(startButton){
    startButton.addEventListener("click"  ,(e) => {
        if (!selectedTask){
            if (confirm("You didin't selected any task , do you want to continue ?")){
                
                starTimer();
            }
            
        }
    })
}

if(taskContainerElem){
    taskContainerElem.addEventListener("click" , (e) => {
        if (e.target.parentNode.tagName === "DIV" && e.target.parentNode.getAttribute("class") === "task" ){
            taskContainerElem.querySelectorAll(".task").forEach(div => {
                div.classList.remove("selected");
            })
            e.target.parentNode.classList.toggle("selected");
            selectedTask = e.target.parentNode;
           
        }
    })
}

if (addNoteButton){
    addNoteButton.addEventListener("click", (e) => {
        addNoteButton.classList.toggle("hide");
        noteContainer.classList.remove("hide");
    })
}

if (addTaskButton){
    addTaskButton.addEventListener("click" ,(e) => {
       if (e.target.tagName === "BUTTON"){

        addTaskButton.style.display = 'none';
        taskSheetElem.classList.remove("hide");
        window.scrollTo({
            top: `${ taskContainerElem.clientHeight + 300}`,
            behavior: "smooth", 
        })
       }
    })
}

if(pomodoroInputElem){
    pomodoroInputElem.addEventListener("change", (e) => {
        pomodoros = pomodoroInputElem.value;
    })
}


if(addPomoButton){
    addPomoButton.addEventListener("click", (e) => {
        pomodoros++;
        pomodoroInputElem.value = pomodoros;
    })
}

if(decreasePomoButton){
    decreasePomoButton.addEventListener("click",(e) => {
        pomodoros--;
        if(pomodoros <= 0) {
            pomodoros = 0;
            pomodoroInputElem.value = pomodoros;
            return;
        }
        pomodoroInputElem.value = pomodoros;
    
    })
}

if (saveButton){
    saveButton.addEventListener("click" , (e) => {
        
        if (e.target.tagName === "BUTTON"){
            let [input,pomodors,notes] = geTaskData();
            totalPomos += Number(pomodors);
            if(!input || !pomodoros) return;
            createTask(input,pomodors,notes);
            taskSheetElem.classList.toggle("hide");
            addTaskButton.style.display = 'flex';
            updateFinishTime();
            clearBuffer();

        }
    })
}

if(cancelButton){
    cancelButton.addEventListener("click" , (e) => {
        taskSheetElem.classList.toggle("hide");
        addTaskButton.style.display = 'flex';
        window.scrollTo({
            top : 0,
            behavior : 'smooth',
        })
    })
}


function geTaskData(){
    return [
        (taskInputElem.value) ? taskInputElem.value : "" ,
        (pomodoroInputElem.value) ? pomodoroInputElem.value :  Number(0) ,
        (notesInputElem.value) ?  notesInputElem.value : ""
    ]
}

function createTask(input,pomodors,notes = ""){

    let div = document.createElement("div");
    let imgContainer = document.createElement("div");
    let editContainer = document.createElement("div");

    let imgDone = document.createElement("img");
    let deleteImg = document.createElement("img");
    let editImg = document.createElement("img");

    let pContent = document.createElement("p");
    let pomodorosContent = document.createElement("p");
    let notesContainer = document.createElement("p")
    let span = document.createElement("span");

    let container = document.createElement("div");
    container.classList.toggle("task");

    imgDone.src = taskImgSrc;
    editImg.src = editImgSrc;
    deleteImg.src = deleteImgSrc;

    span.innerHTML = pomodorsDone;
    pContent.innerHTML = input;
    pomodorosContent.innerHTML = span.innerHTML + " / " + pomodors;
    notesContainer.innerHTML = notes;

    imgContainer.append(imgDone,pContent);
    editContainer.append(pomodorosContent,editImg,deleteImg );

    div.append(imgContainer,editContainer);
    container.append(div);
 
    if(notes){
        let noteContainer = document.createElement("div");
        let p = document.createElement("p");

        p.innerHTML = notes;

        noteContainer.append(p);
        container.append(div,noteContainer);

        taskContainerElem.append(container);
        return;
    }

    taskContainerElem.append(container);
}

function clearBuffer(){
    taskInputElem.value = "";
    pomodoroInputElem.value = 0;
    notesInputElem.value = "";
    pomodoros = 0;

}

function updateFinishTime(){
    pomoDoneContainer.innerHTML = pomodorsDone;
    pomodoroInputElem.value = "";
    totalPomoElem.textContent = Number(totalPomos) ;
    calcFinishTime()
}

function calcFinishTime(){
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
   
    shortBrMinutes = (totalPomos - 1) * 5 ;
    let totalTime = totalPomos * 25 + shortBrMinutes;
    
    for ( let i = 1 ; i <= totalTime ; i++){
        if (i % 115 === 0){
            console.log(i);
            longBrMinutes++;
        }
    }
   
}

function starTimer(){
    
    const minutesContainer = document.querySelector("[data-min]");
    const secondContainer = document.querySelector("[data-s]");

    let timer = setInterval(() => {
        s--;
        if (s < 0){
            m--;
            s = 60 ;
            s--;
            
           
        }

        if(m === 0 && s ===  0){
            clearInterval(timer);
            callShBreak();
            pomodorsDone++;
            updateFinishTime();
        }
        
        (s > 9) ? secondContainer.innerHTML = " " + s : secondContainer.innerHTML = " 0" + s;
        (m > 9) ? minutesContainer.innerHTML = " " + m + " " : minutesContainer.innerHTML = " 0" + m + " ";

    },1000)
}


