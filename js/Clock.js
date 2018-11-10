class Clock {
  constructor(horaId, minutoId, segundoId, diaId, mesId) {
    this.horaDomElement = dom.byId(horaId);
    this.minutoDomElement = dom.byId(minutoId);
    this.segundoDomElement = dom.byId(segundoId);
    this.diaDomElement = dom.byId(diaId);
    this.mesDomElement = dom.byId(mesId);
  }

  tic() {
    return new Promise((resolve) => {
      var datetime = tizen.time.getCurrentDateTime();
      this.horaDomElement.innerHTML = pad(datetime.getHours());
      this.minutoDomElement.innerHTML = pad(datetime.getMinutes());
      this.segundoDomElement.innerHTML = pad(datetime.getSeconds());
      this.diaDomElement.innerHTML = pad(datetime.getUTCDate());
      this.mesDomElement.innerHTML = pad(datetime.getUTCMonth() + 1);
      
      resolve();
    });
  }
}