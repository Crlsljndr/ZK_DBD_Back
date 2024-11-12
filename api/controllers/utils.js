const dayjs = require('dayjs');
const crypto = require('crypto');
const Rut = require('rutjs');
const utc = require('dayjs/plugin/utc');
const iana = require('dayjs-timezone-iana-plugin');

dayjs.extend(utc);
dayjs.extend(iana);

function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// Convertir texto a mayúsculas y minúsculas adecuadas
function capitalizeProperNames(inputString) {
  if (typeof inputString !== 'string' || inputString.trim().length === 0) {
    return '';
  }
  inputString = inputString.replace(/_/g, ' ');

  const exceptions = ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'en', 'a', 'con'];
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  return inputString.toLowerCase().split(' ').map((word, index) => {
    if (index !== 0 && exceptions.includes(word)) {
      return word;
    } else {
      if (romanNumerals.includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }).join(' ');
}

function generateToken() {
  const date = dayjs().tz('America/Santiago');
  const string = date.format("YYYYMMDDHHmm") + "UtalK.,23";
  const token = crypto.createHash('md5').update(string).digest('hex');
  return token;
}

module.exports = {
  sendJSONresponse,
  capitalizeProperNames,
  generateToken
};
