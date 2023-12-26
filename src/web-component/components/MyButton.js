export default class MyButton extends HTMLElement {

  constructor () {
    super();
    this.shadow = this.attachShadow({mode: "closed"});
    this.shadow.innerHTML = `
    <style>
    :host {
      --bg: black;
    }
    button {
      border: none;
      background: var(--bg);
      color: white;
      border-radius: 3px;
      padding: 3px 10px;
    }
    </style>
    <slot name="outbutton"></slot>
    <button><slot name="inbutton"></slot></button>`;
  }

}