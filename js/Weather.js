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
    } else if (code > 800) {
      showElement(this.cloudElement);
      hideElement(this.rainElement);
      hideElement(this.snowElement);
    } else {
      hideElement(this.rainElement);
      hideElement(this.cloudElement);
      hideElement(this.snowElement);
    }

  }

  lonLat(lon, lat) {
    // Lon (-) W (+) E
    // Lat (-) S (+) N
    let text = '';
    let lonTxt = '';
    let latTxt = '';

    if (lon < 0) {
      lonTxt = `${(-lon).toFixed(2)}°W`;
    } else if (lon === 0) {
      lonTxt = `${lon.toFixed(2)}°`;
    } else {
      lonTxt = `${lon.toFixed(2)}°W`;
    }

    if (lat < 0) {
      latTxt = `${(-lat).toFixed(2)}°S`;
    } else if (lat === 0) {
      latTxt = `${lat.toFixed(2)}°`;      
    } else {
      latTxt = `${lat.toFixed(2)}°N`;
    }

    text = `${latTxt} ${lonTxt}`;

    return text;
  }

  update() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { longitude, latitude } = pos.coords;

        axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            appId: openWeatherKey,
          }
        }).then(({ data }) => {
          const { name } = data;
          const { temp } = data.main;
          const { sunrise, sunset } = data.sys;
          const { id } = data.weather[0];

          const tempCelsius = ktoc(temp);

          html(this.tempElement, `${pad(Math.round(tempCelsius))}°C`);

          this.defineSunMoonIcon(sunrise, sunset);
          this.defineRainCloudIcon(id);

          html(this.locElement, name);
          resolve();
        }).catch(err => reject(err));

        html(this.coordElement, this.lonLat(longitude, latitude));
      });
    });
  }
}