const openInfoBtn = document.querySelector(".openInfoBtn");
const closeInfoBtn = document.querySelector(".closeInfoBtn");
const infoDiv = document.querySelector(".info");

openInfoBtn.addEventListener("click", () => {
  infoDiv.style.display =
    infoDiv.style.display === "none" ? "inline-flex" : "none";
});

closeInfoBtn.addEventListener("click", () => {
  infoDiv.style.display =
    infoDiv.style.display === "none" ? "inline-flex" : "none";
});

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

function getPrimeInRange(min, max) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (!isPrime(num));
  return num;
}

function encryptText(text) {
  const characters = Array.from(text);
  const primePairs = [];
  const encryptedText = [];

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const charCode = char.charCodeAt(0);
    const prime1 = getPrimeInRange(2, 1000);
    const prime2 = getPrimeInRange(1001, 2000);
    const encryptedValue = charCode * prime1 * prime2;
    primePairs.push([prime1, prime2]);
    encryptedText.push(encryptedValue);
  }

  return { encryptedText, primePairs };
}

function decryptText(encrypted, primePairs) {
  const decryptedText = [];

  for (let i = 0; i < encrypted.length; i++) {
    const [prime1, prime2] = primePairs[i];
    const decryptedValue = encrypted[i] / (prime1 * prime2);
    const decryptedChar = String.fromCharCode(decryptedValue);
    decryptedText.push(decryptedChar);
  }

  return decryptedText.join("");
}

let message = document.getElementById("message");
let primePairsElement = document.getElementById("primePairs");
let resultElement = document.getElementById("result");

message.value = "";
primePairsElement.value = "";
resultElement.value = "";

function encrypt() {
  const { encryptedText, primePairs } = encryptText(message.value);
  primePairsElement.value = JSON.stringify(primePairs);
  resultElement.value = encryptedText.join(", ");
}

function decrypt() {
  const encryptedMessage = message.value.split(", ");
  const decryptedText = decryptText(
    encryptedMessage.map(Number),
    JSON.parse(primePairsElement.value)
  );
  resultElement.value = decryptedText;
}
