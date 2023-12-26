customElements.define("my-custom-element", MyCustomElement);

// Create a class for the element
export default class MyCustomElement extends HTMLElement {
  // Les attributs du composents à surveiller. par attributeChangedCallback
  static observedAttributes = ["attribut1", "attribut2"];

  constructor() {
    // Le composant est créé
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Le composant est instancié
    console.log("Custom element added to page.");
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
  }
}
