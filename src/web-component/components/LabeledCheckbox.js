class LabeledCheckbox extends HTMLElement {
  static observedAttributes = ["checked", "--checked"];

  constructor() {
    super();
  }

  connectedCallback() {
    // Attach an ElementInternals to get states property
    this._internals = this.attachInternals();
    // this._internals.states.add("--checked");
    this.addEventListener("click", this._onClick.bind(this));

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = 
      `<style>
        :host {
          display: block;
        }
        :host::before {
          content: '[ ]';
          white-space: pre;
          font-family: monospace;
        }
        :host(:--checked)::before { 
          content: '[x]';
          background: grey; 
        }
      </style>
      <slot>Label</slot>`;
  }

  get checked() {
    return this._internals.states.has("--checked");
  }

  set checked(flag) {
    if (flag) {
      console.log('this._internals.states.add("--checked");' )
      this._internals.states.add("--checked");
    } else {
      this._internals.states.delete("--checked");
    }
  }

  _onClick(event) {
    // Toggle the 'checked' property when the element is clicked
    console.log('onClick()')
    this.checked = !this.checked;
  }
}

customElements.define("labeled-checkbox", LabeledCheckbox);