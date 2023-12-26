import SecondTimer from "./components/SecondTimer.js";
import Datepicker from "./components/DatePicker.js";
import MyButton from "./components/MyButton.js";
import MyButtonTemplate from "./components/MyBtnTemplate.js";

customElements.define('second-timer', SecondTimer);
customElements.define('date-picker', Datepicker, {extends: "input"});
customElements.define('my-button', MyButton);

document.querySelector("#add").addEventListener("click", function () {
  /*document.querySelector('second-timer').remove();*/
  /*
  document.querySelector('second-timer').setAttribute("prefix", "Démonstration");
  document.body.appendChild(new Datepicker());
  */
  const template = document.querySelector("#demo")
  const templateContent = template.content;
  document.body.appendChild(templateContent.cloneNode(true))
})

document.querySelector("#mybtntemplate").addEventListener("click", function () {
  console.log('mybtntemplate.onclick');
  let myBtn = document.querySelector('my-button-template');
  console.log( myBtn );
  console.log( 'myBtn.checked: ' + myBtn.collapsed );
  myBtn.checked = true;
  myBtn.setAttribute("checked", "true");
})

console.log( document.querySelectorAll("button"))
