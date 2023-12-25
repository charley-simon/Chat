import SecondTimer from "./components/SecondTimer.js";
import Datepicker from "./components/DatePicker.js";
import MyButton from "./components/MyButton.js";

customElements.define('second-timer', SecondTimer);
customElements.define('date-picker', Datepicker, {extends: "input"});
customElements.define('my-button', MyButton);

document.querySelector("#add").addEventListener("click", function () {
  /*document.querySelector('second-timer').remove();*/
  document.querySelector('second-timer').setAttribute("prefix", "Démonstration");
  document.body.appendChild(new Datepicker());
})