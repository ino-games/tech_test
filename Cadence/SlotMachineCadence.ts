type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences: RoundsCadences = { roundOne: [], roundTwo: [], roundThree: [] };

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  // Initialize cadence array with the default cadence value for each column
  const columnCount = anticipatorConfig.columnSize;
  const cadence: SlotCadence = Array(columnCount).fill(0).map((_, i) => i * anticipatorConfig.defaultCadence);

  // Count special symbols per column
  const symbolCountPerColumn: { [key: number]: number } = {};
  for (const symbol of symbols) {
    if (symbolCountPerColumn[symbol.column]) {
      symbolCountPerColumn[symbol.column]++;
    } else {
      symbolCountPerColumn[symbol.column] = 1;
    }
  }

  // Calculate cadences based on special symbols
  let currentCadence = anticipatorConfig.defaultCadence;
  for (let col = 0; col < columnCount; col++) {
    const specialSymbolCount = symbolCountPerColumn[col] || 0;
    if (specialSymbolCount >= anticipatorConfig.minToAnticipate) {
      currentCadence = anticipatorConfig.anticipateCadence;
      if (specialSymbolCount > anticipatorConfig.maxToAnticipate) {
        currentCadence = anticipatorConfig.defaultCadence;
      }
    } else {
      currentCadence = anticipatorConfig.defaultCadence;
    }
    cadence[col] = col * currentCadence;
  }

  return cadence;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);

  return slotMachineCadences;
}

// Test the implementation
console.log('CADENCES: ', handleCadences(gameRounds));
