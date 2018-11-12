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
      html(this.horaDomElement, pad(datetime.getHours()));
      html(this.minutoDomElement, pad(datetime.getMinutes()));
      html(this.segundoDomElement, pad(datetime.getSeconds()));
      html(this.diaDomElement, pad(datetime.getDate()));
      html(this.mesDomElement, pad(datetime.getMonth() + 1));
      
      resolve();
    });
  }
}