const dom = {
  byId: id => document.getElementById(id),
  byClass: cl => document.getElementsByClassName(cl),
}

function html(el, inner) {
  if (!el) return false;
  try {
    el.innerHTML = inner;
    return true;    
  } catch (err) {
    return err;
  }
}

function showElement(el) {
  if (!el) return false;
  try {
    el.style.display = 'unset';
    return true;
  } catch (err) {
    return err;
  }
}

function hideElement(el) {
  if (!el) return false;
  try {
    el.style.display = 'none';
    return true;
  } catch (err) {
    return err;
  }
}

function pad(el) {
  el = el.toString();
  if (el.length === 1) return '0' + el;
  else return el;
}

const openWeatherKey = '67793f8e2edddad949ad82665b43655a';

const ktoc = (kelvin) => parseFloat(kelvin) - 273.15;