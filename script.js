let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;
let recorder;
let chunks = []; //media data in chunks
let constraints ={
    video: true,
    audio: true
}
//navigator deals with browser information
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start",(e)=>{
        chunks = [];
    })
    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    })
    recorder.addEventListener("stop",(e)=>{
        //conversion of media chunks to data
        let blob = new Blob(chunks,{type: "video/mp4"});
        let videoURL = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    })
})
recordBtnCont.addEventListener("click",(e)=>{
    if(!recorder) return;
    recordFlag = !recordFlag;
    if(recordFlag){//start record
         recorder.start();
         recordBtn.classList.add("scale-record");
         startTimer();
        }
        else{//stop record
            recorder.stop();
            recordBtn.classList.remove("scale-record");
            stopTimer();
    }
})
let timerID;
let counter = 0;
let timer = document.querySelector(".timer");
function startTimer(){
    timer.style.display = "block";
    function displayTimer(){
        let totalSeonds = counter;
        let hours = Number.parseInt(totalSeonds/3600);
        totalSeonds = totalSeonds % 3600;
        let minutes = Number.parseInt(totalSeonds / 60);
        totalSeonds = totalSeonds % 60;
        let seconds = totalSeonds;
        hours = (hours<10) ? `0${hours}` : hours;
        minutes = (minutes<10) ? `0${minutes}` : minutes;
        seconds = (seconds<10) ? `0${seconds}` : minutes;
        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID = setInterval(displayTimer,1000);
}
function stopTimer(){
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display ="none";
}