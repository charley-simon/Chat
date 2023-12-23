import pc from "./picocolors.js";

/** Define a WeatherStation class
 * @class
 */
"use strict"
class WeatherStation {
  /**
   * Represents a WeatherStation.
   * @constructor
   */
  constructor() {
    // Initialize an empty array to hold observers
    this.observers = [];
    // Initialize the temperature to 0
    this.temperature = 0;
  }

  /** Method to add an observer to the list
   * @addObserver
   * @param {Object} observer - The observer to add
   */
  addObserver(observer) {
    this.observers.push(observer);
  }


  /** Method to remove an observer from the list
   * @removeObserver
   * @param {Object} observer - The observer to remove
   */
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /** Method to set the temperature and notify observers
   * @setTemperature
   * @param {number} temperature - The temperature to set
   */
  setTemperature(temperature) {
    this.temperature = temperature;
    this.notifyObservers();
  }

  /** Method to notify all observers about the temperature change
   * @notifyObservers
   */
    notifyObservers() {
    this.observers.forEach((observer) => {
      // Call the update method on each observer
      observer.update(this.temperature);
    });
  }
}

/** Define a DisplayDevice observer class
 * @class
 */
class DisplayDevice {
  /** Represents a WeatherStatDisplayDevice.
   * @constructor
   * @param {name} string - Name of the device
   */
  constructor(name) {
    // Store the name of the display device
    this.name = name;
  }

  /** Method called when the display is updated with temperature
   * @update
   * @param {temperature} number - the new temperature
   */
  update(temperature) {
    // Log a message indicating the name of the display and the temperature
    console.log( pc.bgGreen (pc.white( `${this.name} ` ) ) + 
                 pc.yellow(`Message: Temperature is ${temperature}°C`));
  }
}

// Test scenarios
console.log( pc.blue( "Début des tests" ));

// Create an instance of the WeatherStation class
const weatherStation = new WeatherStation();

// Create two instances of the DisplayDevice class with different names
const displayDevice1 = new DisplayDevice("Display 1");
const displayDevice2 = new DisplayDevice("Display 2");
const displayDevice3 = new DisplayDevice("Display 3");

// Add both display devices as observers to the weather station
weatherStation.addObserver(displayDevice1);
weatherStation.addObserver(displayDevice2);

// Simulate a change in temperature by setting it to 25°C
weatherStation.setTemperature(25);

// Simulate another change in temperature by setting it to 30°C
weatherStation.setTemperature(30);

weatherStation.addObserver(displayDevice3);

weatherStation.setTemperature(28);

console.log( pc.blue( "Fin des tests" ));

