const batteryBar = new BatteryBar('battery');
const clock = new Clock('hora', 'minuto', 'segundo');
const weather = new Weather('sun-icon', 'moon-icon', 'cloud-icon', 'rain-icon');


function rotateElement(elementID, angle) {
  var element = document.querySelector("#" + elementID);

  element.style.transform = "rotate(" + angle + "deg)";
}


function everySec() {
  batteryBar.tic();
  clock.tic();
  weather.tic();

}

function fiveMin() {
  weather.weatherUpdate();
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

  fiveMin();
  setInterval(() => {
    fiveMin();
  }, 30000);
};
