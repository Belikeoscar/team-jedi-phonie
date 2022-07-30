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


//Main phonie functionality
let phoneInput = document.getElementById("phoneInput");

//Regex pattern for major Nigerian Network providers
let nigeriaCarrierPattern = {
  mtn: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(0)(3|6)|8(0(3|6)|1(0|3|4|6))|9(0(3|6)|1(3)))\\d{7})",
  
  glo: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(05)|8(0(5|7)|1(1|5))|9(0|1)5)\\d{7})",
  
  airtel: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(70(1|2|4|8)|80(2|8)|90(1|2|4|7))\\d{7})",
  
  "9mobile": "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(8(0(9)|1(7|8))|90(8|9))\\d{7})"
}

//store selected carrier
let selectedCarrier = document.querySelector("#selectCarrier");
selectedCarrier.addEventListener('click', knowCarrier);

//stores selected carrier in input data attribute
function knowCarrier(e) {
    let checkedCarrier = e.target.id;
    if (e.target.name !== "carrier") return;

    phoneInput.dataset.selectedPhoneNo = checkedCarrier;

    setPatternAttribute(checkedCarrier);
    if (phoneInput.value !== "") displayCarrier(phoneInput.value);
}

// sets input pattern to the pattern of the selected carrier
function setPatternAttribute(carrier) {
  phoneInput.setAttribute('pattern', nigeriaCarrierPattern[carrier]);
}

phoneInput.addEventListener('input', displayCarrier);

let carrierImg = document.querySelector("#carrier-img");

function displayCarrier() {
    let checkValidity = phoneInput.checkValidity();
    if (checkValidity) carrierImg.src = `images/${phoneInput.dataset.selectedPhoneNo}.svg`;
    else carrierImg.src = "images/alt.svg";
}

//regex kenya equitel: ^(?:254|\+254|0)?(76[34][0-9]{6})$
  
 // safari: ^(?:254|\+254|0)?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$
  //i saw nwei this time figuring this thing out 
 // airtel: ^(?:254|\+254|0)?((?:(?:7(?:(?:3[0-9])|(?:5[0-6])|(8[5-9])))|(?:1(?:[0][0-2])))[0-9]{6})$
  
//  "telcom/Orange": ^(?:254|\+254|0)?(77[0-6][0-9]{6})$








