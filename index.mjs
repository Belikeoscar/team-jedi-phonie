import startApp from './app.mjs';

document.addEventListener('DOMContentLoaded', startApp);

//opening and closing the side navbar on smaller screen sizes
let bar = document.querySelector('.bx-menu')
let exit = document.querySelector('.bx-x')
let menu = document.querySelector('ul')

bar.addEventListener('click', () => {

  menu.style.transform = 'translateX(0%)'

})

exit.addEventListener('click', () => {
  menu.style.transform = 'translateX(100%)'
})

//adding color to the input field once it is filled 
let inputField = document.querySelectorAll('input')

inputField.forEach(input => {
  input.addEventListener('keyup', (e) => {

    if (input.value !== "") {
      input.style.backgroundColor = '#FAF5F3'
    }
    else {
      input.style.backgroundColor = '#fff'
    }
  })
})

// Changing network operators when alternating between Nigeria and Kenya

let kenyanOperators = document.querySelectorAll('.radio.kenya')
let nigerianOperators = document.querySelectorAll('.radio.nigeria')
let select = document.querySelector('select')



select.addEventListener('click', ()=>{
    
    if(select.value == 'Kenya'){
        
   kenyanOperators.forEach(item=>{
       item.style.display = 'flex'
   })

   
   nigerianOperators.forEach(item=>{
       item.style.display = 'none'
   })
   
}

if(select.value == 'Nigeria'){

    kenyanOperators.forEach(item=>{
       item.style.display = 'none'
   })
   
   nigerianOperators.forEach(item=>{
       item.style.display = 'flex'
   })
    
}

})





