// Create a class for the element
export default class MyButtonTemplate extends HTMLElement {
  // Les attributs du composants à surveiller. par attributeChangedCallback
  static observedAttributes = ["checked", "--checked"];

  constructor() {
    // Le composant est créé
    // Always call super in constructor
    super();
    this._checked = false;
  }

  get checked() {
    console.log(`getChecked()`)
    return this._checked;
  }

  set checked(flag) {
    console.log(`setChecked(${flag})`)
    if ( flag && flag === "true ") {
      // Existence of identifier corresponds to "true"
      this._checked = true;
    } else {
      // Absence of identifier corresponds to "false"
      this._checked = false;
    }
  }

  connectedCallback() {
    // Le composant est instancié
    console.log("Custom element added to page.");
    this.addEventListener("click", this._onClick.bind(this));

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<style>
        :host {
          display: block;
        }
       :host::before {
         content: '[ ]';
         white-space: pre;
         font-family: monospace;
       }
       :host(:--checked)::before { content: '[x]'; background: grey; }
       </style>
       <slot>Label</slot>`;
  }

  disconnectedCallback() {
    // Le composant est détruit
    // Attention si le noeud est déplacé alors cette méthode sera appeler puis connectedCallback
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    // Le composant est déplacé
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`L'attribut ${name} à changé de valeur de ${oldValue} à ${newValue}`);
    if ( name === 'checked' && oldValue !== newValue ) {
      this.checked = newValue;
    }
  }

  _onClick(event) {
    // Toggle the 'collapsed' property when the element is clicked
    console.log("Custom element onClick()");
    this.checked = !this.checked;
  }
}

// register the component
customElements.define("my-button-template", MyButtonTemplate);
