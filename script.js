const openInfoBtn = document.querySelector(".openInfoBtn");
const closeInfoBtn = document.querySelector(".closeInfoBtn");
const infoDiv = document.querySelector(".info");

openInfoBtn.addEventListener("click", () => {
  infoDiv.style.display = infoDiv.style.display === "none" ? "flex" : "none";
});

closeInfoBtn.addEventListener("click", () => {
  infoDiv.style.display = infoDiv.style.display === "none" ? "flex" : "none";
});

const message = document.getElementById("messageInput");
const keyMatrixString = document.getElementById("keyMatrixInput");
const errorMessage = `
Ops! Parece que a matriz de chave que você forneceu não é válida. 

Para te ajudar, aqui estão algumas matrizes de chave que você pode usar:

  [-2, 5, 1; 0, -1, 3; 6, 7, 9]
  [1, 4, 7; 2, 5, 8; 3, 6, 9]
  [4, 3, 1; 5, 2, 0; 6, 1, 3]

Verifique se a matriz de chave que você está usando corresponde a um desses formatos e tente novamente. 
`;

function encryptMessage(message, keyMatrixString) {
  if (!messageInput.value || !keyMatrixInput.value) {
    alert("Por favor, preencha os campos de mensagem e matriz de chave.");
    return;
  }

  const keyMatrix = convertFlatMatrixToNested(keyMatrixString);

  try {
    validateKeyMatrix(keyMatrix);

    const messageNumbers = messageToNumbers(message);

    const blockSize = keyMatrix[0].length;
    const messageBlocks = splitMessageInBlocks(messageNumbers, blockSize);

    const encryptedBlocks = messageBlocks.map((block) =>
      multiplyMatrix(block, keyMatrix)
    );

    const encryptedMessage = flattenMatrix(encryptedBlocks);

    return encryptedMessage;
  } catch (error) {
    alert(errorMessage);
    return null;
  }
}

function decryptMessage(encryptedMessage, keyMatrixString) {
  const keyMatrix = convertFlatMatrixToNested(keyMatrixString);

  try {
    validateKeyMatrix(keyMatrix);

    const blockSize = keyMatrix[0].length;
    const encryptedBlocks = splitMessageInBlocks(encryptedMessage, blockSize);

    const decryptedBlocks = encryptedBlocks.map((block) =>
      multiplyMatrix(block, keyMatrixInverse)
    );

    const decryptedMessage = flattenMatrix(decryptedBlocks);

    const originalMessage = numbersToMessage(decryptedMessage);

    return originalMessage;
  } catch (error) {
    alert(errorMessage);
    return null;
  }
}

function messageToNumbers(message) {
  const numbers = [];
  for (let char of message) {
    numbers.push(char.charCodeAt(0));
  }
  return numbers;
}

function numbersToMessage(numbers) {
  const message = [];
  for (let number of numbers) {
    message.push(String.fromCharCode(number));
  }
  return message.join("");
}

function splitMessageInBlocks(message, blockSize) {
  const blocks = [];
  for (let i = 0; i < message.length; i += blockSize) {
    blocks.push(message.slice(i, i + blockSize));
  }
  return blocks;
}

function validateKeyMatrix(matrix) {
  if (
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix[0].length)
  ) {
    throw new Error("The matrix must be a rectangle");
  }

  for (let row of matrix) {
    for (let element of row) {
      if (isNaN(element)) {
        throw new Error("Matrix elements must be numbers");
      }
    }
  }
}

function multiplyMatrix(matrix1, matrix2) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix2.length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function flattenMatrix(matrix) {
  const flattened = [];
  for (let row of matrix) {
    flattened.push(...row);
  }
  return flattened;
}

function convertFlatMatrixToNested(flatMatrixString) {
  const rows = flatMatrixString.split(";");

  const nestedMatrix = rows.map((row) => row.split(",").map(Number));

  return nestedMatrix;
}
