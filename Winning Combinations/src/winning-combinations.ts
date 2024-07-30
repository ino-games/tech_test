type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const winningCombinations: WinningCombinationsResult = [];
  const lineLength = lines.length;

  if (lineLength < 3) {
    return winningCombinations;
  }

  let currentNumber = lines[0];
  let currentIndices: number[] = [0];

  // Identificar sequências de números iguais
  for (let i = 1; i < lineLength; i++) {
    if (lines[i] === currentNumber) {
      currentIndices.push(i);
    } else {
      if (currentIndices.length >= 3) {
        winningCombinations.push([currentNumber, currentIndices]);
      }
      currentNumber = lines[i];
      currentIndices = [i];
    }
  }

  // Verificar a última sequência
  if (currentIndices.length >= 3) {
    winningCombinations.push([currentNumber, currentIndices]);
  }

  // Mesclar sequências adjacentes e sobrepostas
  const mergedCombinations: WinningCombinationsResult = [];
  const numberMap = new Map<number, number[]>();

  for (const [number, indices] of winningCombinations) {
    if (numberMap.has(number)) {
      numberMap.get(number)?.push(...indices);
    } else {
      numberMap.set(number, [...indices]);
    }
  }

  // Criar resultados mesclados
  for (const [number, indices] of numberMap) {
    // Remover duplicatas e ordenar índices
    const uniqueIndices = Array.from(new Set(indices)).sort((a, b) => a - b);
    // Mesclar indices adjacentes
    const mergedIndices = [];
    let tempIndices = [uniqueIndices[0]];

    for (let i = 1; i < uniqueIndices.length; i++) {
      if (uniqueIndices[i] === tempIndices[tempIndices.length - 1] + 1) {
        tempIndices.push(uniqueIndices[i]);
      } else {
        if (tempIndices.length >= 3) {
          mergedIndices.push(...tempIndices);
        }
        tempIndices = [uniqueIndices[i]];
      }
    }

    if (tempIndices.length >= 3) {
      mergedIndices.push(...tempIndices);
    }

    if (mergedIndices.length > 0) {
      mergedCombinations.push([number, mergedIndices]);
    }
  }

  return mergedCombinations;
}

export const WinningCombinations = { call };
