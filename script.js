// Seleciona os botões de abrir e fechar informações
const openInfoBtn = document.querySelector(".openInfoBtn");
const closeInfoBtn = document.querySelector(".closeInfoBtn");

// Seleciona a div de informações
const infoDiv = document.querySelector(".info");

// Função para alternar a exibição da div de informações
openInfoBtn.addEventListener("click", () => {
  // Verifica o estado atual da exibição
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "inline-flex"; // Exibe a div
  } else {
    infoDiv.style.display = "none"; // Oculta a div
  }
});

closeInfoBtn.addEventListener("click", () => {
  // Mesmo comportamento do botão de abrir
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "inline-flex";
  } else {
    infoDiv.style.display = "none";
  }
});

// Função para verificar se um número é primo
function isPrime(num) {
  // Casos base: 1 e números menores que 1 não são primos
  if (num <= 1) return false;
  // 2 e 3 são primos
  if (num <= 3) return true;

  // Números divisíveis por 2 ou 3 não são primos
  if (num % 2 === 0 || num % 3 === 0) return false;

  // Otimização para checar divisibilidade apenas por primos até a raiz quadrada de num
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  // Se nenhum divisor for encontrado, o número é primo
  return true;
}

// Função para gerar um número primo dentro de um intervalo
function getPrimeInRange(min, max) {
  let num;
  // Loop para gerar números aleatórios até encontrar um primo
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (!isPrime(num));
  return num;
}

// Função para criptografar texto
function encryptText(text) {
  const characters = Array.from(text); // Converte texto em um array de caracteres
  const primePairs = []; // Armazena pares de números primos usados na criptografia
  const encryptedText = []; // Armazena o texto criptografado

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const charCode = char.charCodeAt(0); // Código ASCII do caractere

    // Gera dois números primos aleatórios em intervalos específicos
    const prime1 = getPrimeInRange(2, 1000);
    const prime2 = getPrimeInRange(1001, 2000);

    // Realiza a criptografia usando multiplicação com os primos
    const encryptedValue = charCode * prime1 * prime2;

    primePairs.push([prime1, prime2]); // Armazena os pares de primos usados
    encryptedText.push(encryptedValue); // Adiciona o valor criptografado
  }

  // Retorna um objeto contendo o texto criptografado e os pares de primos
  return { encryptedText, primePairs };
}

// Função para descriptografar texto
function decryptText(encrypted, primePairs) {
  const decryptedText = [];

  for (let i = 0; i < encrypted.length; i++) {
    const [prime1, prime2] = primePairs[i]; // Recupera o par de primos usado

    // Descriptografa dividindo pelo produto dos primos
    const decryptedValue = encrypted[i] / (prime1 * prime2);

    // Converte o valor de volta para o caractere ASCII
    const decryptedChar = String.fromCharCode(decryptedValue);

    decryptedText.push(decryptedChar);
  }

  // Junta os caracteres descriptografados e retorna a string
  return decryptedText.join("");
}

// Seleciona os elementos de entrada de texto, pares de primos e resultado
let message = document.getElementById("message");
let primePairsElement = document.getElementById("primePairs");
let resultElement = document.getElementById("result");

// Limpa os campos de entrada ao carregar a página
message.value = "";
primePairsElement.value = "";
resultElement.value = "";

// Função para criptografar o texto
function encrypt() {
  // Chama a função encryptText para criptografar a mensagem
  const { encryptedText, primePairs } = encryptText(message.value);

  // Converte os pares de primos para JSON para armazenamento seguro
  primePairsElement.value = JSON.stringify(primePairs);

  // Junta os valores criptografados em uma string separada por vírgulas
  resultElement.value = encryptedText.join(", ");
}

// Função para descriptografar o texto
function decrypt() {
  // Separa os valores criptografados da string de entrada
  const encryptedMessage = message.value.split(", ");

  // Converte os valores criptografados para números
  const encryptedNumbers = encryptedMessage.map(Number);

  // Recupera os pares de primos do elemento JSON
  const primePairs = JSON.parse(primePairsElement.value);

  // Chama a função decryptText para descriptografar a mensagem
  const decryptedText = decryptText(encryptedNumbers, primePairs);

  // Exibe o texto descriptografado no elemento de resultado
  resultElement.value = decryptedText;
}

