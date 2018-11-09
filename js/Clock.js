class Clock {
  constructor(horaId, minutoId, segundoId) {
    this.horaDomElement = document.getElementById(horaId);
    this.minutoDomElement = document.getElementById(minutoId);
    this.segundoDomElement = document.getElementById(segundoId);
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

      resolve();
    });
  }
}