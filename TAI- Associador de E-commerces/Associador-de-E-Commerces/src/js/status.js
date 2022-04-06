const deslog = document.getElementById("dsc");
const log = document.getElementById("cnt");
const log2 = document.getElementById("cnt2");

var status = localStorage.getItem("statusVal");
if(status == "true"){
    deslog.classList.add("d-none");
    log.classList.remove("d-none");
    log2.classList.remove("d-none");
}else{
    deslog.classList.remove("d-none");
    log.classList.add("d-none");
    log2.classList.add("d-none");
}