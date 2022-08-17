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

let popup = document.getElementById("popup");
let submitForm = document.querySelector('#submit-form');
submitForm.addEventListener('click', openPopUp);

let close = document.querySelector("#close");
close.addEventListener('click', closePopup);

let resetBtn = document.querySelector("#reset-btn");

let phoneInput = document.getElementById("phoneInput");


function resetToDefault() {
  window.location.reload();
}

function openPopUp(e) {
  let fname = document.querySelector("#first_name");
  let person = document.querySelector(".detail");
  let email = document.querySelector("#email");
  
  person.innerText = `Hi ${fname.value}, your details and ${phoneInput.dataset.selectedPhoneNo} number has been confirmed`;
  if (phoneInput.checkValidity() && fname.checkValidity() && email.checkValidity()) {
    e.preventDefault();
    popup.classList.add("open-popup");
  }

}


function closePopup() {
  resetBtn.click();
  resetToDefault()
  popup.classList.remove("open-popup")

}




//Main phonie functionality

// Changing network operators when alternating between Nigeria and Kenya



let countryCarrier = {
  Nigeria: ["Glo", "MTN", "Airtel", "9 Mobile"],
  Kenya: ["Safaricom", "Airtel", "Telkom", "Equitel"]
}

//Regex pattern for major Nigerian Network providers
let countryCarrierPattern = {
  Nigeria: {
    MTN: "^(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(0)(3|6)|8(0(3|6)|1(0|3|4|6))|9(0(3|6)|1(3|6)))\\d{7})$",

    Glo: "^(((^0)|((^\\+)(234){1}0?)|((^234)0?))(7(05)|8(0(5|7)|1(1|5))|9(0|1)5)\\d{7})$",

    Airtel: "^(((^0)|((^\\+)(234){1}0?)|((^234)0?))(70(1|2|4|8)|8(0(2|8)|1(2))|90(1|2|4|7)|91(2))\\d{7})$",

    "9 Mobile": "^(((^0)|((^\\+)(234){1}0?)|((^234)0?))(8(0(9)|1(7|8))|90(8|9))\\d{7})$"
  },
  Kenya: {
    Safaricom: "^(?:254|\\+254|0)?0?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$",

    Airtel: "^(?:254|\\+254|0)0??((?:(?:7(?:(?:3[0-9])|(?:5[0-6])|(8[5-9])))|(?:1(?:[0][0-2])))[0-9]{6})$",

    Telkom: "^(?:254|\\+254|0)0??(77[0-9][0-9]{6})$",

    Equitel: "^(?:254|\\+254|0)0??(76[3-6][0-9]{6})$"
  }
}

let selectNationality = document.querySelector('select');
selectNationality.addEventListener('change', displayCountryCarriers);

function displayCountryCarriers(e) {
  let selectElement = e.target;
  let selectedCountry = selectElement.options[selectElement.selectedIndex].text;

  phoneInput.dataset.selectedCountry = selectedCountry;

  if (selectedCountry == "Nigeria") {
    phoneInput.setAttribute('placeholder', "e.g +234913XXXXXXX")
  } else {
    phoneInput.setAttribute('placeholder', "e.g +254748 xxxxxx")
  }

  //selects all radio button containers
  let radioContainers = document.querySelectorAll(".radio");

  for (let i = 0; i < radioContainers.length; i++) {
    let input = radioContainers[i].querySelector("input");
    let label = radioContainers[i].querySelector("label");

    input.setAttribute('id', countryCarrier[selectedCountry][i]);
    input.setAttribute('value', countryCarrier[selectedCountry][i]);

    label.setAttribute('for', countryCarrier[selectedCountry][i]);
    label.innerText = countryCarrier[selectedCountry][i];

    if (input.checked) {
      phoneInput.setAttribute('pattern', countryCarrierPattern[selectedCountry][countryCarrier[selectedCountry][i]]);

      phoneInput.dataset.selectedPhoneNo = countryCarrier[selectedCountry][i];

      displayCarrier();
    }
  }
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
  
  phoneInput.setAttribute('pattern', countryCarrierPattern[phoneInput.dataset.selectedCountry][carrier]);
}

let inputContainer = document.querySelector('#input-container');

phoneInput.addEventListener('input', displayCarrier);
inputContainer.addEventListener('click', disableInput);

let carrierImg = document.querySelector("#carrier-img");

//Disables input field if carrier isn't selected
function disableInput() {
  if (!phoneInput.dataset.selectedPhoneNo) {
    phoneInput.disabled = true;
    text.innerText = `Please select a carrier above`;
    text.style.color = "#d64d22";
    
    phoneInput.style.backgroundColor = "#f4f4f0";
    selectedCarrier.classList.add('shake');
    setTimeout(() => {
      selectedCarrier.classList.remove('shake');
    }, 820)
  }
}

//checks if phone input is valid if no of characters is reached

function checkInputValidity(phoneNo) {
  let regexPattern = new RegExp(phoneInput.getAttribute("pattern"));

  let testValidity = regexPattern.test(phoneNo);
  return testValidity;
}

function displayCarrier() {
  let checkValidity = checkInputValidity(phoneInput.value);
  let formattedNo = formatPhoneNo(phoneInput.value);

  if (phoneInput.dataset.selectedCountry == "Nigeria") validateNCarrierProcess(formattedNo)

  else validateKCarrierProcess(formattedNo)

  if (formattedNo.length == 3 && formattedNo.startsWith("0")) {
    displayPrefixesSuggestions(phoneInput.value, formattedNo);
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

  if (phoneNo.startsWith("+2540")) phoneNo = phoneNo.replace("+254", "");


  if (phoneNo.startsWith("2340")) phoneNo = phoneNo.replace("234", "");
  if (phoneNo.startsWith("2540")) phoneNo = phoneNo.replace("254", "");

  if (phoneNo.startsWith("+234")) phoneNo = phoneNo.replace("+234", "0");
  if (phoneNo.startsWith("+254")) phoneNo = phoneNo.replace("+254", "0");

  if (phoneNo.startsWith("234")) phoneNo = phoneNo.replace("234", "0");
  if (phoneNo.startsWith("254")) phoneNo = phoneNo.replace("254", "0");
  return phoneNo;
}

//stores possible carrier prefixes
let prefixesSuggestions = {
  MTN: ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913","0916"],
  Glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  Airtel: ["0701", "0702", "0704", "0708", "0802", "0808", "0812","0901", "0902", "0904", "0904", "0912"],
  "9 Mobile": ["0809", "0817", "0818", "0908", "0909"]

}

//Displays possible carrier prefixes to user
function displayPrefixesSuggestions(phoneNo, formattedNo) {
  let selectedCarrier = phoneInput.dataset.selectedPhoneNo;
 
  if (!prefixesSuggestions[selectedCarrier]) return;
  let dataList = document.querySelector('#suggest-prefixes');
  dataList.replaceChildren();
  for (let value of prefixesSuggestions[selectedCarrier]) {
    if (value.startsWith(formattedNo)) {
      let option = document.createElement('option');

      option.value = phoneNo + value.slice(-1);
      dataList.append(option);
    }
  }
}



//checks if user is on the right track as input is entered
function validateNCarrierProcess(phoneNo) {
  let selectedCarrier = phoneInput.dataset.selectedPhoneNo;
  if (!selectedCarrier) return;
  if (phoneNo.length <= 3) {
    text.innerText = `No carrier detected yet`;
    text.style.color = "#d64d22";
    return;
  }


  if (checkInputValidity(phoneNo)) {
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
  text.innerText = `phone number doesn't match the selected carrier. You selected ${selectedCarrier}`;
  text.style.color = "#d64d22";

}

let kenyaPrefixesRange = {
  Safaricom(prefix) {
    if (+prefix >= 110 && +prefix <= 115) return true;
    if (+prefix >= 701 && +prefix <= 729) return true;
    if (+prefix >= 740 && +prefix <= 743) return true;
    if (+prefix >= 745 && +prefix <= 746) return true;
    if (+prefix == 748) return true;
    if (+prefix >= 757 && +prefix <= 759) return true;
    if (+prefix >= 768 && +prefix <= 769) return true;
    if (+prefix >= 790 && +prefix <= 799) return true;
    else return false;
  },

  Airtel(prefix) {
    if (+prefix >= 100 && +prefix <= 103) return true;
    if (+prefix >= 730 && +prefix <= 739) return true;
    if (+prefix >= 750 && +prefix <= 756) return true;
    if (+prefix == 762) return true;
    if (+prefix >= 780 && +prefix <= 789) return true;
    return false;
  },

  Telkom(prefix) {
    if (+prefix >= 770 && +prefix <= 779) return true;
    return false;
  },

  Equitel(prefix) {
    if (+prefix >= 763 && +prefix <= 766) return true;
    return false;
  }
}

function validateKCarrierProcess(phoneNo) {
  let selectedCarrier = phoneInput.dataset.selectedPhoneNo;
  if (!selectedCarrier) return;
  if (phoneNo.length <= 2) {
    text.innerText = `No carrier detected yet`;
    text.style.color = "#d64d22";
    return;
  }

  if (checkInputValidity(phoneInput.value)) {
    text.innerText = `phone number matches carrier: ${selectedCarrier}`;
    text.style.color = "#329721";
    return;
  }


  if (phoneNo.length > 10 && checkInputValidity(phoneNo.slice(0, 10))) {
    text.innerText = `You are on the right track phone number matches ${selectedCarrier} but no of characters exceeded`;
    text.style.color = "#d64d22";
    return;
  }

  let prefix = phoneNo.slice(1, 4);
  if (kenyaPrefixesRange[selectedCarrier](prefix)) {
    text.innerText = `You are on the right track so far`;
    text.style.color = "#329721";
    return;
  }

  if (phoneNo.length > 4) {
    text.innerText = `phone number doesn't match the selected carrier. You selected ${selectedCarrier}`;
    text.style.color = "#d64d22";
  }

}








