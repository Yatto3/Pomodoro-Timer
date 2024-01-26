

const startButton = document.querySelector("[data-start]");
const decreasePomoButton = document.querySelector("[data-decreasePomo]");
const addPomoButton = document.querySelector("[data-addPomo]");
const cancelButton = document.querySelector("[data-cancel]");
const saveButton = document.querySelector("[data-save]");
const addTaskButton = document.querySelector("[data-addTask]");
const addNoteButton = document.querySelector("[data-addNote]");
const pomoButton = document.querySelector("[data-pomo]");
const shBreakButton = document.querySelector("[data-shortBreak]");
const longBreakButton = document.querySelector("[data-longBreak]");

let shBreakCount =  2 ;

shBreakButton.onclick = () => {
    document.querySelector(".container").style.backgroundColor = "#6895D2";
    startButton.classList.toggle("blue");
    startButton.classList.remove("dark-blue");

    const minutesContainer = document.querySelector("[data-min]").innerHTML  = "05 ";
    const secondContainer = document.querySelector("[data-s]").innerHTML = " 00";
    m = 5 ;
    s = 0 ;
}

longBreakButton.onclick = () =>{
    document.querySelector(".container").style.backgroundColor = "#3652AD";
    startButton.classList.toggle("dark-blue");
    startButton.classList.remove("blue");

    const minutesContainer = document.querySelector("[data-min]").innerHTML  = "15 ";
    const secondContainer = document.querySelector("[data-s]").innerHTML = " 00";
    m = 15 ;
    s = 0 ;
}

pomoButton.onclick = () =>{
    pomoButton.classList.toggle("foccus");
    document.querySelector(".container").style.backgroundColor = "";
    startButton.classList.remove("dark-blue");
    startButton.classList.remove("blue");

    const minutesContainer = document.querySelector("[data-min]").innerHTML = "25 ";
    const secondContainer = document.querySelector("[data-s]").innerHTML = " 00";
    m = 25 ;
    s = 0 ;
}


function callShBreak(){
    shBreakCount++;
    console.log(shBreakCount);
    if (shBreakCount === 4) {
        callLongBreak();
        return;
    }
    shBreakButton.click();
    shBreakButton.classList.toggle("foccus");
    pomoButton.classList.remove("foccus");
    longBreakButton.classList.remove("foccus");
}

function callLongBreak(){
    longBreakButton.click();
    longBreakButton.classList.toggle("foccus");
    pomoButton.classList.remove("foccus");
    shBreakButton.classList.remove("foccus");
}
