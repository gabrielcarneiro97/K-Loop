class Clock {
  constructor(horaId, minutoId, segundoId, diaId, mesId) {
    this.horaDomElement = document.getElementById(horaId);
    this.minutoDomElement = document.getElementById(minutoId);
    this.segundoDomElement = document.getElementById(segundoId);
    this.diaDomElement = document.getElementById(diaId);
    this.mesDomElement = document.getElementById(mesId);
  }

  padding(el) {
    el = el.toString();
    if (el.length === 1) return '0' + el;
    else return el;
  }

  tic() {
    return new Promise((resolve) => {
      var datetime = tizen.time.getCurrentDateTime();
      this.horaDomElement.innerHTML = this.padding(datetime.getHours());
      this.minutoDomElement.innerHTML = this.padding(datetime.getMinutes());
      this.segundoDomElement.innerHTML = this.padding(datetime.getSeconds());
      this.diaDomElement.innerHTML = this.padding(datetime.getUTCDate());
      this.mesDomElement.innerHTML = this.padding(datetime.getUTCMonth() + 1);
      
      resolve();
    });
  }
}