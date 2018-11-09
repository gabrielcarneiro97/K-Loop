const openWeatherKey = '67793f8e2edddad949ad82665b43655a';

const ktoc = (kelvin) => parseFloat(kelvin) - 273.15;

class Weather {
  constructor(sunId, moonId, cloudId, rainId, snowId, tempId, coordId) {
    this.sunElement = document.getElementById(sunId);
    this.moonElement = document.getElementById(moonId);
    this.cloudElement = document.getElementById(cloudId);
    this.rainElement = document.getElementById(rainId);
    this.snowElement = document.getElementById(snowId);

    this.tempElement = document.getElementById(tempId);
    this.coordElement = document.getElementById(coordId);

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

  defineSunMoonIcon(sunriseInt, sunsetInt) {
    const sunrise = new tizen.TZDate(new Date(sunriseInt));
    const sunset = new tizen.TZDate(new Date(sunsetInt));
    const now = tizen.time.getCurrentDateTime();

    if (sunrise.earlierThan(now) && now.earlierThan(sunset)) {
      this.sunElement.style.display = 'none';
      this.moonElement.style.display = 'unset';
    } else {
      this.sunElement.style.display = 'unset';
      this.moonElement.style.display = 'none';
    }
  }

  defineRainCloudIcon(code) {
    if (code >= 200 && code < 600) {
      this.rainElement.style.display = 'unset';
      this.cloudElement.style.display = 'none';
      this.snowElement.style.display = 'none';
    } else if (code >= 600 && code <= 622) {
      this.snowElement.style.display = 'unset';
      this.rainElement.style.display = 'none';
      this.cloudElement.style.display = 'none';
    } else if (code >= 800) {
      this.cloudElement.style.display = 'unset';
      this.rainElement.style.display = 'none';
      this.snowElement.style.display = 'none';
    } else {
      this.rainElement.style.display = 'none';
      this.cloudElement.style.display = 'none';
      this.snowElement.style.display = 'none';
    }

  }

  padding(el) {
    el = el.toString();
    if (el.length === 1) return '0' + el;
    else return el;
  }

  tic() {
    return new Promise((resolve) => {
      this.setTime();
      this.rotate();


      resolve();
    });
  }

  weatherUpdate() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        let { longitude, latitude } = pos.coords;

        longitude = longitude.toFixed(2);
        latitude = latitude.toFixed(2);
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            appId: openWeatherKey,
          }
        }).then(({ data }) => {
          console.log(data);
          let { temp } = data.main;
          const { sunrise, sunset } = data.sys;
          const { id } = data.weather[0];

          temp = ktoc(temp);

          this.tempElement.innerHTML = `${this.padding(temp.toFixed(0))}°C`;

          this.defineSunMoonIcon(sunrise, sunset);
          this.defineRainCloudIcon(id);
        }).catch(err => console.error(err));
        this.coordElement.innerHTML = `Lon: ${longitude} Lat: ${latitude}`;
      });
    });
  }
}