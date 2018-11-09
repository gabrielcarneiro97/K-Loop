class Weather {
  constructor(sunId, moonId) {
    this.sunElement = document.getElementById(sunId);
    this.moonElement = document.getElementById(moonId);
    this.pointers = document.getElementsByClassName('pointer');
  }

  setTime() {
    const datetime = tizen.time.getCurrentDateTime();
    this.hour = datetime.getHours();
    this.minute = datetime.getMinutes();
    this.second = datetime.getSeconds();
  }

  rotate() {

    const angle = ((this.hour + (this.minute / 60) + (this.second / 3600)) * 30) - 98;

    Array.from(this.pointers).forEach((el) => {
      el.style.transform = 'rotate(' + angle + 'deg)';
    });

    this.moonElement.style.transform = 'rotate(' + (-angle) + 'deg)';
  }

  defineIcon() {
    if (this.hour >= 18 || this.hour <= 6) {
      this.sunElement.style.display = 'none';
      this.moonElement.style.display = '';
    } else {
      this.sunElement.style.display = '';
      this.moonElement.style.display = 'none';
    }
  }

  tic() {
    return new Promise((resolve) => {
      this.setTime();
      this.defineIcon();
      this.rotate();


      resolve();
    });
  }
}