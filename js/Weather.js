const openWeatherKey = '67793f8e2edddad949ad82665b43655a';

const ktoc = (kelvin) => parseFloat(kelvin) - 273.15;

class Weather {
  constructor(sunId, moonId, cloudId, rainId) {
    this.sunElement = document.getElementById(sunId);
    this.moonElement = document.getElementById(moonId);
    this.cloudElement = document.getElementById(cloudId);
    this.rainElement = document.getElementById(rainId);
    this.pointers = document.getElementsByClassName('pointer');
    this.coordElement = document.getElementById('coord');
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

  defineSunMoonIcon() {
    if (this.hour >= 18 || this.hour <= 6) {
      this.sunElement.style.display = 'none';
      this.moonElement.style.display = '';
    } else {
      this.sunElement.style.display = '';
      this.moonElement.style.display = 'none';
    }
  }

  defineRainCloudIcon(rain, clouds) {
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
  }

  tic() {
    return new Promise((resolve) => {
      this.setTime();
      this.defineSunMoonIcon();
      this.rotate();


      resolve();
    });
  }

  weatherUpdate() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { longitude, latitude } = pos.coords;
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: parseInt(latitude, 10),
            lon: parseInt(longitude, 10),
            appId: openWeatherKey,
          }
        }).then((data) => console.log(data)).catch(err => console.error(err));
        this.coordElement.innerHTML = `Long: ${pos.coords.longitude} Lat: ${pos.coords.latitude}`;
      });
      // try {
      //   tizen.humanactivitymonitor.getHumanActivityData('GPS', (gps) => {

      //     this.coordElement.innerHTML = `Long: ${gps.longitude} Lat: ${gps.latitude}`;

      //     const clouds = false;
      //     const rain = false;

      //     defineRainCloudIcon(rain, clouds);
      //   }, (err) => {
      //     this.coordElement.innerHTML = err; 
      //   }); 
      // } catch (error) {
      //   this.coordElement.innerHTML = error;
      // }
    });
  }
}