const dom = {
  byId: id => document.getElementById(id),
  byClass: cl => document.getElementsByClassName(cl),
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