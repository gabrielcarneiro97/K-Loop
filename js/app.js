const batteryBar = new BatteryBar('battery-bar');
const clock = new Clock('hora', 'minuto', 'segundo', 'dia', 'mes');
const weather = new Weather('sun-icon', 'moon-icon', 'cloud-icon', 'rain-icon', 'snow-icon', 'temp', 'coord', 'loc-name');

function everySec() {
  batteryBar.tic();
  clock.tic();
}

function everyMin() {
  weather.update();
}

function bindEvents() {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      everySec();
    }
  });
}

function alwaysOnDisplayController() {
  document.addEventListener('ambientmodechanged', (ev) => {
    const { ambientMode } = ev.detail;
    if (ambientMode) {
      aodOn();
    } else {
      aodOff();
    }
  });

  document.addEventListener('timetick', () => {
    everySec();
  });
}

window.onload = () => {
  bindEvents();
  alwaysOnDisplayController();

  setInterval(() => {
    everySec();
  }, 1000);

  everyMin();
  setInterval(() => {
    everyMin();
  }, 60000);
};
