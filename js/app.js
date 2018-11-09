const batteryBar = new BatteryBar('battery');
const clock = new Clock('hora', 'minuto', 'segundo');

function rotateElement(elementID, angle) {
  var element = document.querySelector("#" + elementID);

  element.style.transform = "rotate(" + angle + "deg)";
}

function update() {
  batteryBar.tic();
  clock.tic();
}

function bindEvents() {
  // Add an event listener to update the screen immediately when the device wakes up
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateTime();
    }
  });
}



window.onload = () => {
  bindEvents();
  // Update the watch hands every second
  setInterval(function() {
    update();
  }, 1000);
};
