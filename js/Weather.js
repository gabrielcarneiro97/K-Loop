const openWeatherKey = '67793f8e2edddad949ad82665b43655a';

const ktoc = (kelvin) => parseFloat(kelvin) - 273.15;

class Weather {
  constructor(sunId, moonId, cloudId, rainId, snowId, tempId, coordId, locId) {
    this.sunElement = dom.byId(sunId);
    this.moonElement = dom.byId(moonId);
    this.cloudElement = dom.byId(cloudId);
    this.rainElement = dom.byId(rainId);
    this.snowElement = dom.byId(snowId);

    this.tempElement = dom.byId(tempId);

    this.coordElement = dom.byId(coordId);
    this.locElement = dom.byId(locId);

  }

  setTime() {
    const datetime = tizen.time.getCurrentDateTime();

    this.hour = datetime.getHours();
    this.minute = datetime.getMinutes();
    this.second = datetime.getSeconds();
  }

  defineSunMoonIcon(sunriseInt, sunsetInt) {
    const sunrise = new tizen.TZDate(new Date(sunriseInt * 1000));
    const sunset = new tizen.TZDate(new Date(sunsetInt * 1000));
    const now = tizen.time.getCurrentDateTime();

    if (sunrise.earlierThan(now) && now.earlierThan(sunset)) {
      showElement(this.sunElement);
      hideElement(this.moonElement);
    } else {
      hideElement(this.sunElement);
      showElement(this.moonElement);
    }
  }

  defineRainCloudIcon(code) {
    if (code >= 200 && code < 600) {
      showElement(this.rainElement);
      hideElement(this.cloudElement);
      hideElement(this.snowElement);
    } else if (code >= 600 && code <= 622) {
      showElement(this.snowElement);
      hideElement(this.rainElement);
      hideElement(this.cloudElement);
    } else if (code >= 800) {
      showElement(this.cloudElement);
      hideElement(this.rainElement);
      hideElement(this.snowElement);
    } else {
      hideElement(this.rainElement);
      hideElement(this.cloudElement);
      hideElement(this.snowElement);
    }

  }

  tic() {
    return new Promise((resolve) => {
      this.setTime();
      resolve();
    });
  }

  lonLat(lon, lat) {
    // Lon (-) W (+) E
    // Lat (-) S (+) N
    let text = '';
    let lonTxt = '';
    let latTxt = '';

    if (lon < 0) {
      lonTxt = `${(-lon)}°W`;
    } else {
      lonTxt = `${lon}°W`;      
    }

    if (lat < 0) {
      latTxt = `${(-lat)}°S`;
    } else {
      latTxt = `${lat}°N`;      
    }

    text = `${latTxt} ${lonTxt}`;

    return text;
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
          let { temp } = data.main;
          const { name } = data;
          const { sunrise, sunset } = data.sys;
          const { id } = data.weather[0];

          temp = ktoc(temp);

          this.tempElement.innerHTML = `${pad(Math.round(temp))}°C`;

          this.defineSunMoonIcon(sunrise, sunset);
          this.defineRainCloudIcon(id);

          this.locElement.innerHTML = name;
          resolve();
        }).catch(err => reject(err));

        this.coordElement.innerHTML = this.lonLat(longitude, latitude);
      });
    });
  }
}