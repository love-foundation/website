// VARS
const duration = '300ms'
const offset = 50
const tolerance = 0

export function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export function normalizeEventDate(datestring, time = false) {
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let normalizedDate = new Date(datestring);
  if (time) {
    normalizedDate = String(normalizedDate.getDate()).padStart(2, '0') + " " + months[normalizedDate.getMonth()] + " " + normalizedDate.getFullYear() + " \u2014 " + String(normalizedDate.getHours()).padStart(2, '0') + " : " + String(normalizedDate.getMinutes()).padStart(2, '0');
  }
  else {
  normalizedDate = normalizedDate.getDate() + " " + months[normalizedDate.getMonth()] + " " + normalizedDate.getFullYear();
}
  return normalizedDate;
}

export function normalizeTime(datestring) {
  let normalizedTime = new Date(datestring);
  normalizedTime = normalizedTime.getHours() + " : " + normalizedTime.getMinutes();

  return normalizedTime;
}


function deriveClass(y, dy) {
  if (y < offset) {
    return 'show'
  }

  if (Math.abs(dy) <= tolerance) {
    return 'show'
  }

  if (dy > 0) {
    return 'show'
  }

  return 'hide'
}
export function updateClass(y, lastY) {
  const dy = lastY - y
  lastY = y
  return { class: deriveClass(y, dy), lastY: lastY }
}

export function setTransitionDuration(node) {
  node.style.transitionDuration = duration
}
