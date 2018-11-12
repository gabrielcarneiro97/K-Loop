const batteryBar = new BatteryBar('battery-bar');
const clock = new Clock('hora', 'minuto', 'segundo', 'dia', 'mes');
const weather = new Weather('sun-icon', 'moon-icon', 'cloud-icon', 'rain-icon', 'snow-icon', 'temp', 'coord', 'loc-name');


function rotateElement(elementID, angle) {
  var element = document.querySelector("#" + elementID);

  element.style.transform = "rotate(" + angle + "deg)";
}

function everySec() {
  batteryBar.tic();
  clock.tic();
}

function everyMin() {
  weather.update();
}

function bindEvents() {
  // Add an event listener to update the screen immediately when the device wakes up
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      everySec();
    }
  });
}

window.onload = () => {
  bindEvents();

  setInterval(() => {
    everySec();
  }, 1000);

  everyMin();
  setInterval(() => {
    everyMin();
  }, 60000);

  document.addEventListener('ambientmodechanged', (ev) => {
    const { ambientMode } = ev.detail;
    if (ambientMode) {
      aodOn();
    } else {
      aodOff();
    }
  });
};
