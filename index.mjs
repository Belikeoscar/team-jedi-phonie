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

// let kenyanOperators = document.querySelectorAll('.radio.kenya')
// let nigerianOperators = document.querySelectorAll('.radio.nigeria')
let countryCarrier = {
  Nigeria: ["Glo", "MTN", "Airtel", "9 Mobile"],
  kenya: ["Safaricom", "Airtel", "Telkom", "Equitel"]
}
let selectNationality = document.querySelector('select');
selectNationality.addEventListener('change', displayCountryCarriers);

function displayCountryCarriers(e) {
  let selectElement = e.target;
  let selectedCountry = selectElement.options[selectElement.selectedIndex].text;

  console.log(selectElement.options[selectElement.selectedIndex])
  let radioContainers = document.querySelectorAll(".radio");

  for (let i = 0; i < radioContainers.length; i++) {
    let input = radioContainers[i].querySelector("input");
    let label = radioContainers[i].querySelector("label");
    console.log(selectedCountry)
 console.log(countryCarrier[selectedCountry])
    input.setAttribute('id', countryCarrier[selectedCountry][i]);
    input.setAttribute('value', countryCarrier[selectedCountry][i]);

    label.setAttribute('for', countryCarrier[selectedCountry][i]);
  }
}

//boo boo | I am tired | i know love but just pull through for us i am sad that i didnt finish the alt vids this far to js syntax before this on the good side you are learning and actually working on a project woth showing off




// select.addEventListener('click', () => {

//   if (select.value == 'Kenya') {

//     kenyanOperators.forEach(item => {
//       item.style.display = 'flex'
//     })


//     nigerianOperators.forEach(item => {
//       item.style.display = 'none'

//     })

//   }

//   if (select.value == 'Nigeria') {

//     kenyanOperators.forEach(item => {
//       item.style.display = 'none'

//     })

//     nigerianOperators.forEach(item => {
//       item.style.display = 'flex'
//     })

//   }

// })


//Main phonie functionality
let phoneInput = document.getElementById("phoneInput");

//Regex pattern for major Nigerian Network providers
let nigeriaCarrierPattern = {
  MTN: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(0)(3|6)|8(0(3|6)|1(0|3|4|6))|9(0(3|6)|1(3)))\\d{7})",

  Glo: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(05)|8(0(5|7)|1(1|5))|9(0|1)5)\\d{7})",

  Airtel: "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(70(1|2|4|8)|80(2|8)|90(1|2|4|7))\\d{7})",

  "9 Mobile": "(((^0)|((^\\+)(234){1}0?)|((^234)0?))(8(0(9)|1(7|8))|90(8|9))\\d{7})"
}

//store selected carrier
let selectedCarrier = document.querySelector("#selectCarrier");
selectedCarrier.addEventListener('click', knowCarrier);

let text = document.querySelector('#validate-process');

//stores selected carrier in input data attribute
function knowCarrier(e) {
  let checkedCarrier = e.target.id;
  if (e.target.name !== "carrier") return;

  phoneInput.dataset.selectedPhoneNo = checkedCarrier;
  phoneInput.disabled = false;
  text.innerText = "";
  phoneInput.style.backgroundColor = "#fff";

  setPatternAttribute(checkedCarrier);
  if (phoneInput.value !== "") displayCarrier(phoneInput.value);
}

// sets input pattern to the pattern of the selected carrier
function setPatternAttribute(carrier) {
  phoneInput.setAttribute('pattern', nigeriaCarrierPattern[carrier]);
}

phoneInput.addEventListener('input', displayCarrier);
phoneInput.addEventListener('click', disableInput);

let carrierImg = document.querySelector("#carrier-img");

//Disables input field if carrier isn't selected
function disableInput() {
  if (!phoneInput.dataset.selectedPhoneNo) {
    phoneInput.disabled = true;
    text.innerText = `Please select a carrier above`;
    text.style.color = "#d64d22";
    phoneInput.style.backgroundColor = "#f4f4f0";
  }
}

function displayCarrier() {
  let checkValidity = phoneInput.checkValidity();
  let formattedNo = formatPhoneNo(phoneInput.value);

  validateProcess(formattedNo)
  if (formattedNo.length == 3 && formattedNo.startsWith("0")) {
    displayPrefixesSuggestions(phoneInput.value);
  }

  if (checkValidity) {
    carrierImg.src = `images/${phoneInput.dataset.selectedPhoneNo}.svg`;
    carrierImg.style.height = "38px";
  }
  else {
    carrierImg.src = "images/alt.svg";
    carrierImg.style.height = "40px";
  }
}

//formats inputted phone number
function formatPhoneNo(phoneNo) {
  if (phoneNo.startsWith("+2340")) phoneNo = phoneNo.replace("+234", "");
  if (phoneNo.startsWith("2340")) phoneNo = phoneNo.replace("234", "");
  if (phoneNo.startsWith("+234")) phoneNo = phoneNo.replace("+234", "0");
  if (phoneNo.startsWith("234")) phoneNo = phoneNo.replace("234", "0");
  return phoneNo;
}

//stores possible carrier prefixes
let prefixesSuggestions = {
  MTN: ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913"],
  Glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  Airtel: ["0701", "0702", "0704", "0708", "0802", "0808", "0901", "0902", "0904", "0904"],
  "9 Mobile": ["0809", "0817", "0818", "0908", "0909"]
}

//Displays possible carrier prefixes to user
function displayPrefixesSuggestions(phoneNo) {
  let selectedCarrier = phoneInput.dataset.selectedPhoneNo;
  if (!prefixesSuggestions[selectedCarrier]) return;
  let dataList = document.querySelector('#suggest-prefixes');
  dataList.replaceChildren();
  for (let value of prefixesSuggestions[selectedCarrier]) {
    if (value.startsWith(phoneNo)) {
      let option = document.createElement('option');
      option.value = value;
      dataList.append(option);
    }
  }
}



//checks if user is on the right track as input is entered
function validateProcess(phoneNo) {
  let selectedCarrier = phoneInput.dataset.selectedPhoneNo;
  if (!selectedCarrier) return;
  if (phoneNo.length <= 3) {
    text.innerText = `No carrier detected yet`;
    text.style.color = "#d64d22";
    return;
  }

  if (phoneInput.checkValidity()) {
    text.innerText = `phone number matches carrier: ${selectedCarrier}`;
    text.style.color = "#329721";
    return;
  }

  let regexPattern = new RegExp(phoneInput.getAttribute("pattern"));

  let testValidity = regexPattern.test(phoneNo.slice(0, 11));
  if (phoneNo.length > 11 && testValidity) {
    text.innerText = `You are on the right track phone number matches ${selectedCarrier} but no of characters exceeded`;
    text.style.color = "#d64d22";
    return;
  }

  for (let value of prefixesSuggestions[selectedCarrier]) {
    if (value == phoneNo.slice(0, 4)) {
      text.innerText = `You are on the right track so far`;
      text.style.color = "#329721";
      return;
    }
  }
  text.innerText = `phone number doesn't matches the selected carrier. You selected ${selectedCarrier}`;
  text.style.color = "#d64d22";

}

// Password


//regex kenya equitel: ^(?:254|\+254|0)?(76[34][0-9]{6})$

 // safari: ^(?:254|\+254|0)?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$
  //i saw nwei this time figuring this thing out 
 // airtel: ^(?:254|\+254|0)?((?:(?:7(?:(?:3[0-9])|(?:5[0-6])|(8[5-9])))|(?:1(?:[0][0-2])))[0-9]{6})$

//  "telcom/Orange": ^(?:254|\+254|0)?(77[0-6][0-9]{6})$








