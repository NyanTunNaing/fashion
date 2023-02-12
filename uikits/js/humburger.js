const humburger = document.querySelector(".humburger");
const navBtns = document.querySelector(".nav--btns");
const linkBtns = document.querySelectorAll(".nav--btns a");


humburger.addEventListener("click", () => {
    navBtns.classList.toggle("open");
});

linkBtns.forEach(link=>{
    link.addEventListener("click",()=>{
        link.parentElement.classList.remove("open");
    })
});