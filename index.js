// Алфавиты
const rusLower = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const rusUpper = rusLower.toUpperCase();
const engLower = "abcdefghijklmnopqrstuvwxyz";
const engUpper = engLower.toUpperCase();

// Проверки символов
function isRussianLetter(ch) {
  return rusLower.includes(ch) || rusUpper.includes(ch);
}

function isEnglishLetter(ch) {
  return engLower.includes(ch) || engUpper.includes(ch);
}

// Шифр Цезаря
function caesarEncrypt(text, key) {
  const shift = parseInt(key);
  if (isNaN(shift)) return text;

  return text
    .split("")
    .map((char) => {
      if (isRussianLetter(char)) {
        const alphabet = rusLower.includes(char) ? rusLower : rusUpper;
        const index = alphabet.indexOf(char);
        return alphabet[(index + shift + alphabet.length) % alphabet.length];
      }
      if (isEnglishLetter(char)) {
        const alphabet = engLower.includes(char) ? engLower : engUpper;
        const index = alphabet.indexOf(char);
        return alphabet[(index + shift + alphabet.length) % alphabet.length];
      }
      return char;
    })
    .join("");
}

// Дешифрование для шифра Цезаря
function caesarDecrypt(text, key) {
  const shift = parseInt(key);
  if (isNaN(shift)) return text;

  return text
    .split("")
    .map((char) => {
      if (isRussianLetter(char)) {
        const alphabet = rusLower.includes(char) ? rusLower : rusUpper;
        const index = alphabet.indexOf(char);
        return alphabet[(index - shift + alphabet.length) % alphabet.length];
      }
      if (isEnglishLetter(char)) {
        const alphabet = engLower.includes(char) ? engLower : engUpper;
        const index = alphabet.indexOf(char);
        return alphabet[(index - shift + alphabet.length) % alphabet.length];
      }
      return char;
    })
    .join("");
}

// Шифр Виженера
function vigenereEncrypt(text, keyword) {
  let result = "";
  let j = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isRus = isRussianLetter(char);
    const isEng = isEnglishLetter(char);

    if (!isRus && !isEng) {
      result += char;
      continue;
    }

    const alphabet = isRus
      ? rusLower.includes(char)
        ? rusLower
        : rusUpper
      : engLower.includes(char)
      ? engLower
      : engUpper;

    const baseAlpha = isRus ? rusLower : engLower;

    const keyChar = keyword[j % keyword.length];
    const keyAlpha = baseAlpha.includes(keyChar.toLowerCase())
      ? baseAlpha
      : baseAlpha.toUpperCase();
    const keyIndex = keyAlpha.indexOf(keyChar.toLowerCase());

    const charIndex = alphabet.indexOf(char);
    const newIndex = (charIndex + keyIndex) % alphabet.length;

    result += alphabet[newIndex];
    j++;
  }

  return result;
}

// Дешифрование для шифра Виженера
function vigenereDecrypt(text, keyword) {
  let result = "";
  let j = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isRus = isRussianLetter(char);
    const isEng = isEnglishLetter(char);

    if (!isRus && !isEng) {
      result += char;
      continue;
    }

    const alphabet = isRus
      ? rusLower.includes(char)
        ? rusLower
        : rusUpper
      : engLower.includes(char)
      ? engLower
      : engUpper;

    const baseAlpha = isRus ? rusLower : engLower;

    const keyChar = keyword[j % keyword.length];
    const keyAlpha = baseAlpha.includes(keyChar.toLowerCase())
      ? baseAlpha
      : baseAlpha.toUpperCase();
    const keyIndex = keyAlpha.indexOf(keyChar.toLowerCase());

    const charIndex = alphabet.indexOf(char);
    const newIndex = (charIndex - keyIndex + alphabet.length) % alphabet.length;

    result += alphabet[newIndex];
    j++;
  }

  return result;
}

// "DES" (упрощённая XOR-имитация)
function desEncrypt(text, key) {
  if (!key) return text;

  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const xorChar = String.fromCharCode(charCode ^ keyCharCode);
    result += xorChar;
  }

  // Возвращаем в base64 для читаемого вывода
  return btoa(unescape(encodeURIComponent(result)));
}

// Функция для дешифрования текста с использованием DES
function desDecrypt(text, key) {
  if (!key) return text;

  let decoded;
  try {
    decoded = decodeURIComponent(escape(atob(text))); // из base64 в строку
  } catch (e) {
    return "Ошибка: Неверный формат зашифрованного текста.";
  }

  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    const charCode = decoded.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const xorChar = String.fromCharCode(charCode ^ keyCharCode);
    result += xorChar;
  }

  return result;
}

// Функция для шифрования текста с использованием AES
function aesEncrypt(text, key) {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
}

// Функция для дешифрования текста с использованием AES
function aesDecrypt(encryptedText, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}


// Функция для расшифрования текста с использованием AES
function aesDecrypt(encryptedText, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Функция для шифрования текста с использованием RC4
function rc4Encrypt(text, key) {
  const encrypted = CryptoJS.RC4.encrypt(text, key);
  return encrypted.toString();
}

// Функция для расшифрования текста с использованием RC4
function rc4Decrypt(encryptedText, key) {
  const bytes = CryptoJS.RC4.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Атбаш
function atbashEncrypt(text) {
  return text.split("").map((char) => {
    if (isRussianLetter(char)) {
      const alphabet = rusLower.includes(char) ? rusLower : rusUpper;
      const index = alphabet.indexOf(char);
      return alphabet[alphabet.length - 1 - index];
    }
    if (isEnglishLetter(char)) {
      const alphabet = engLower.includes(char) ? engLower : engUpper;
      const index = alphabet.indexOf(char);
      return alphabet[alphabet.length - 1 - index];
    }
    return char;
  }).join("");
}

// Дешифрование для Атбаш
function atbashDecrypt(text) {
  return atbashEncrypt(text); // Атбаш работает как для шифрования, так и для дешифрования
}

// ROT13 (en) / ROT11 (ru)
function rotEncrypt(text) {
  return text.split("").map((char) => {
    if (isEnglishLetter(char)) {
      const alphabet = engLower.includes(char) ? engLower : engUpper;
      const index = alphabet.indexOf(char);
      return alphabet[(index + 13) % 26];
    }
    if (isRussianLetter(char)) {
      const alphabet = rusLower.includes(char) ? rusLower : rusUpper;
      const index = alphabet.indexOf(char);
      return alphabet[(index + 11) % 33];
    }
    return char;
  }).join("");
}

// Дешифрование для ROT13 (для английского) / ROT11 (для русского)
function rotDecrypt(text) {
  return text.split("").map((char) => {
    if (isEnglishLetter(char)) {
      const alphabet = engLower.includes(char) ? engLower : engUpper;
      const index = alphabet.indexOf(char);
      return alphabet[(index + 13) % 26];
    }
    if (isRussianLetter(char)) {
      const alphabet = rusLower.includes(char) ? rusLower : rusUpper;
      const index = alphabet.indexOf(char);
      return alphabet[(index + 11) % 33];
    }
    return char;
  }).join("");
}

// Перестановка по 2 символа
function transposeEncrypt(text) {
  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    const first = text[i];
    const second = text[i + 1] || "";
    result += second + first;
  }
  return result;
}

// Дешифрование для перестановки
function transposeDecrypt(text) {
  return transposeEncrypt(text); // Перестановка работает как для шифрования, так и для дешифрования
}

// Шифрование в Base64
function base64Encrypt(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

// Дешифрование из Base64
function base64Decrypt(encodedText) {
  try {
    return decodeURIComponent(escape(atob(encodedText)));
  } catch (e) {
    return "Ошибка: Неверный формат Base64.";
  }
}
// Генерация RSA-ключей
function generateRSAKeys() {
  const crypt = new JSEncrypt({ default_key_size: 2048 });
  crypt.getKey(); // Генерация

  const publicKey = crypt.getPublicKey();
  const privateKey = crypt.getPrivateKey();

  document.getElementById("rsaPublicKey").value = publicKey;
  document.getElementById("rsaPrivateKey").value = privateKey;
}

//RSA-шифрование и дешифрование с новыми полями
function rsaEncrypt(text, publicKey) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const encrypted = encryptor.encrypt(text);
  return encrypted || "Ошибка шифрования RSA.";
}

function rsaDecrypt(encryptedText, privateKey) {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  const decrypted = decryptor.decrypt(encryptedText);
  return decrypted || "Ошибка дешифрования RSA.";
}

// Главная функция обработки
function encryptText() {
  const cipher1 = document.getElementById("cipher1").value;
  const cipher2 = document.getElementById("cipher2").value;
  const key1 = document.getElementById("key1").value;
  const key2 = document.getElementById("key2").value;
  const inputText = document.getElementById("inputText").value;
  const rsaPublicKey = document.getElementById("rsaPublicKey").value;
  const rsaPrivateKey = document.getElementById("rsaPrivateKey").value;

  let encrypted = inputText;

  if (cipher1 === "caesar") {
    encrypted = caesarEncrypt(encrypted, key1);
  } else if (cipher1 === "vigenere") {
    encrypted = vigenereEncrypt(encrypted, key1);
  } else if (cipher1 === "des") {
    encrypted = desEncrypt(encrypted, key1);
  }else if (cipher1 === 'aes') {
    encrypted = aesEncrypt(encrypted, key1);
  } else if (cipher1 === 'rc4') {
    encrypted = rc4Encrypt(encrypted, key1);
  }else if (cipher1 === "atbash") {
    encrypted = atbashEncrypt(encrypted);
  } else if (cipher1 === "rot") {
    encrypted = rotEncrypt(encrypted);
  } else if (cipher1 === "transpose") {
    encrypted = transposeEncrypt(encrypted);
  }else if (cipher1 === "base64") {
    encrypted = base64Encrypt(encrypted);
  }else if (cipher1 === "rsa") {
    encrypted = rsaEncrypt(encrypted, rsaPublicKey);
  }

  if (cipher2 && cipher2 !== 'none') {
    if (cipher2 === 'caesar') {
      encrypted = caesarEncrypt(encrypted, key2);
    } else if (cipher2 === 'vigenere') {
      encrypted = vigenereEncrypt(encrypted, key2);
    } else if (cipher2 === 'des') {
      encrypted = desEncrypt(encrypted, key2);
    }else if (cipher2 === 'aes') {
      encrypted = aesEncrypt(encrypted, key2);
    } else if (cipher2 === 'rc4') {
      encrypted = rc4Encrypt(encrypted, key2);
    }else if (cipher2 === "atbash") {
      encrypted = atbashEncrypt(encrypted);
    } else if (cipher2 === "rot") {
      encrypted = rotEncrypt(encrypted);
    } else if (cipher2 === "transpose") {
      encrypted = transposeEncrypt(encrypted);
    } else if (cipher2 === "base64") {
      encrypted = base64Encrypt(encrypted);
    }else if (cipher2 === "rsa") {
      encrypted = rsaEncrypt(encrypted, rsaPublicKey);
    }
  }

  document.getElementById("outputText").value = encrypted;
}

function decryptText() {
  const cipher1 = document.getElementById("cipher1").value;
  const cipher2 = document.getElementById("cipher2").value;
  const key1 = document.getElementById("key1").value;
  const key2 = document.getElementById("key2").value;
  const inputText = document.getElementById("inputText").value;
  const rsaPrivateKey = document.getElementById("rsaPrivateKey").value;

  let decrypted = inputText;

  // Сначала cipher2
  if (cipher2 && cipher2 !== 'none') {
    if (cipher2 === 'caesar') {
      decrypted = caesarDecrypt(decrypted, key2);
    } else if (cipher2 === 'vigenere') {
      decrypted = vigenereDecrypt(decrypted, key2);
    } else if (cipher2 === 'des') {
      decrypted = desDecrypt(decrypted, key2);
    } else if (cipher2 === 'aes') {
      decrypted = aesDecrypt(decrypted, key2);
    } else if (cipher2 === 'rc4') {
      decrypted = rc4Decrypt(decrypted, key2);
    } else if (cipher2 === "atbash") {
      decrypted = atbashDecrypt(decrypted);
    } else if (cipher2 === "rot") {
      decrypted = rotDecrypt(decrypted);
    } else if (cipher2 === "transpose") {
      decrypted = transposeDecrypt(decrypted);
    } else if (cipher2 === "base64") {
      decrypted = base64Decrypt(decrypted);
    } else if (cipher2 === "rsa") {
      decrypted = rsaDecrypt(decrypted, rsaPrivateKey);
    }
  }

  // Затем cipher1
  if (cipher1 === "caesar") {
    decrypted = caesarDecrypt(decrypted, key1);
  } else if (cipher1 === "vigenere") {
    decrypted = vigenereDecrypt(decrypted, key1);
  } else if (cipher1 === "des") {
    decrypted = desDecrypt(decrypted, key1);
  } else if (cipher1 === "aes") {
    decrypted = aesDecrypt(decrypted, key1);
  } else if (cipher1 === "rc4") {
    decrypted = rc4Decrypt(decrypted, key1);
  } else if (cipher1 === "atbash") {
    decrypted = atbashDecrypt(decrypted);
  } else if (cipher1 === "rot") {
    decrypted = rotDecrypt(decrypted);
  } else if (cipher1 === "transpose") {
    decrypted = transposeDecrypt(decrypted);
  } else if (cipher1 === "base64") {
    decrypted = base64Decrypt(decrypted);
  } else if (cipher1 === "rsa") {
    decrypted = rsaDecrypt(decrypted, rsaPrivateKey);
  }

  document.getElementById("outputText").value = decrypted;
}

function toggleKeyFields() {
  const cipher1 = document.getElementById('cipher1').value;
  const cipher2 = document.getElementById('cipher2').value;

  const key1Field = document.getElementById('key1');
  const key2Field = document.getElementById('key2');

  const key1Label = document.querySelector('label[for="key1"]') || key1Field.previousElementSibling;
  const key2Label = document.querySelector('label[for="key2"]') || key2Field.previousElementSibling;

  const noKeyCiphers = ['atbash', 'rot', 'transpose', 'none', 'base64'];
  
  const rsaBlock = document.getElementById("rsaKeysContainer");
  if (cipher1 === "rsa" || cipher2 === "rsa") {
    rsaBlock.style.display = "";
    key1Field.style.display = 'none';
    key1Label.style.display = 'none';
  } else {
    rsaBlock.style.display = "none";
  }

  // Ключ 1
  if (noKeyCiphers.includes(cipher1) || cipher1 === "rsa" ) {
    key1Field.style.display = 'none';
    key1Label.style.display = 'none';
  } else {
    key1Field.style.display = '';
    key1Label.style.display = '';
  }

  // Ключ 2
  if (noKeyCiphers.includes(cipher2) || cipher2 === "rsa") {
    key2Field.style.display = 'none';
    key2Label.style.display = 'none';
  } else {
    key2Field.style.display = '';
    key2Label.style.display = '';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cipher1').addEventListener('change', toggleKeyFields);
  document.getElementById('cipher2').addEventListener('change', toggleKeyFields);
  toggleKeyFields(); // вызов при загрузке
});
