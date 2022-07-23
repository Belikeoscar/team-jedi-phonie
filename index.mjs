import startApp from './app.mjs';

document.addEventListener('DOMContentLoaded', startApp); 

let bar = document.querySelector('.bx-menu')
let exit = document.querySelector('.bx-x')
let menu = document.querySelector('ul')

bar.addEventListener('click', ()=>{
   
    menu.style.transform='translateX(0%)'
    
})

exit.addEventListener('click', ()=>{
   menu.style.transform='translateX(100%)'
})