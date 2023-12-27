/* TODO
 *
 * Ajouter log4JS
 * Faire la meme chose avec LCH au lieu de HSL
 * faire des couleurs plus shiny
 *
 */
import Log4js from "../../../public/js/log4js.min.js";

let consoleLog = new Log4js.Logger("consoleTest");
consoleLog.setLevel(Log4js.Level.ALL);
let consoleAppender = new Log4js.ConsoleAppender(true);
consoleLog.addAppender(consoleAppender);

class HslColor {
  constructor(hue, saturation, lightness) {
    // Store the name of the display device
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  get hsl() {
    return `hsl(${this.hue}deg ${this.saturation}% ${this.lightness}%)`;
  }

  set hsl(hslColor) {
    [this.hue, this.saturation, this.lightness] = hslColor
      .replace(/hsl|[()]|deg|%/gi, "")
      .split(/ /);
    consoleLog.trace(
      `setHsl(${hslColor}), result: ${this.hue}, ${this.saturation}, ${this.lightness}`
    );
  }

  toString() {
    return this.hsl;
  }
}

// selection du theme par les radio boutons
const switcher = document.querySelector("#theme-switcher");
switcher.addEventListener("input", (e) => setTheme(e.target.value));

const myStyle = document.styleSheets[0].cssRules[0].style;
const inputs = [...document.querySelectorAll(".input-group > input")];
consoleLog.trace(inputs);
const root = document.documentElement;

var brandColor = getBrandColor();
consoleLog.trace("brandColor: " + brandColor);
consoleLog.trace(`hsl(${hue}deg ${saturation}% ${lightness}%)`);
setBrandColor(brandColor);

function setTheme(theme) {
  const doc = document.firstElementChild;
  doc.setAttribute("color-scheme", theme);
  setBrandColor(getBrandColor());
}

function getBrandColor() {
  hue = myStyle.getPropertyValue("--brand-hue").replace("deg", "");
  saturation = myStyle.getPropertyValue("--brand-saturation").replace("%", "");
  lightness = myStyle.getPropertyValue("--brand-lightness").replace("%", "");
  return new HslColor(hue, saturation, lightness);
}

function setBrandColor(color) {
  brandColor = color;
  root.style.setProperty("--brand-hue", brandColor.hue);
  root.style.setProperty("--brand-saturation", brandColor.saturation);
  root.style.setProperty("--brand-lightness", brandColor.lightness);
  root.style.setProperty("--brand", brandColor.hsl);
  consoleLog.trace("setBrandColor: " + color);
  setColorPicker(brandColor);
}

// Gestion de la palette
function setPalette(name) {
  const hue = myStyle.getPropertyValue(`--${name}-hue`).replace("deg", "");
  const saturation = myStyle
    .getPropertyValue(`--${name}-saturation`)
    .replace("%", "");
  const lightness = myStyle
    .getPropertyValue(`--${name}-lightness`)
    .replace("%", "");
  const myColor = new HslColor(hue, saturation, lightness);
  consoleLog.trace("setPalette: " + myColor);
  setBrandColor(myColor);
}

// les onClick sur les pastilles de couleurs
document.querySelector("#blue").onclick = () => setPalette("blue");
document.querySelector("#green").onclick = () => setPalette("green");
document.querySelector("#red").onclick = () => setPalette("red");
document.querySelector("#yellow").onclick = () => setPalette("yellow");

// Brand color picker
function getColorPicker() {
  return new HslColor(inputs[0].value, inputs[1].value, inputs[2].value);
}

function setColorPicker(color) {
  consoleLog.trace("setColorPicker: " + color);
  brandColor = color;
  inputs[0].value = brandColor.hue;
  inputs[1].value = brandColor.saturation;
  inputs[2].value = brandColor.lightness;

  document.querySelector("[data-result]").innerText = brandColor.hsl;
  consoleLog.trace("setColorPicker: " + brandColor.hsl);

  sample.style.setProperty(`--sampleColor`, brandColor.hsl);
}

// la brandColor = sample lors du click sur celui-ci
document.querySelector(`#sample`).onclick = () =>
  setBrandColor(getColorPicker());

// on ecoute l'evenement input des sliders du hsl picker');
const controls = document.querySelector("[data-controls]");
controls.addEventListener("input", (e) => {
  if (!e.target.id) return;
  const color = getColorPicker();
  setColorPicker(color);
});

// les onClick sur les surfaces
document.querySelector(".surface1").onclick = () => setSurfaceColor("surface1");
document.querySelector(".surface2").onclick = () => setSurfaceColor("surface2");
document.querySelector(".surface3").onclick = () => setSurfaceColor("surface3");
document.querySelector(".surface4").onclick = () => setSurfaceColor("surface4");

function setSurfaceColor(surface) {
  root.style.setProperty("--surface", `var(--${surface})`);
}
