class Weather {
  constructor(sunId, moonId, cloudId, rainId) {
    this.sunElement = document.getElementById(sunId);
    this.moonElement = document.getElementById(moonId);
    this.cloudElement = document.getElementById(cloudId);
    this.rainElement = document.getElementById(rainId);
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
    this.rainElement.style.transform = 'rotate(' + (-angle) + 'deg)';
    this.cloudElement.style.transform = 'rotate(' + (-angle) + 'deg)';
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

  weatherUpdate() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.coords = pos.coords;

        const clouds = false;
        const rain = false;

        if (rain) {
          this.rainElement.style.display = '';
          this.cloudElement.style.display = 'none';
        } else if (clouds) {
          this.rainElement.style.display = 'none';
          this.cloudElement.style.display = '';
        } else {
          this.rainElement.style.display = 'none';
          this.cloudElement.style.display = 'none';
        }
      }, err => console.error(err));
    });
  }
}