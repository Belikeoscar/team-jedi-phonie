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





