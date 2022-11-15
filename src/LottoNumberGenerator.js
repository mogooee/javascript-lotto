const { Console } = require('@woowacourse/mission-utils');
const {
  makeErrorMsg,
  invalidNumber,
  invalidInputNum,
  invalidDuplication,
  invalidRange,
} = require('./utils');
const { MESSAGE, ERROR_MESSAGE, COUNT } = require('./constants');

class LottoNumberGenerator {
  #winnerNumbers = [];

  #bonusNumber;

  drawLottery() {
    Console.readLine(
      MESSAGE.LOTTO_NUMBER_GENERATOR.INPUT_WINNER_NUMBER,
      (numbers) => {
        const winnerNumbers = numbers.split(',').map((n) => +n);
        LottoNumberGenerator.#validate(winnerNumbers, 'WINNER_NUMBER');
        this.#winnerNumbers = winnerNumbers;
      },
    );

    Console.readLine(
      MESSAGE.LOTTO_NUMBER_GENERATOR.INPUT_BONUS_NUMBER,
      (number) => {
        const bonusNumber = number.split(',').map((n) => +n);
        LottoNumberGenerator.#validate(bonusNumber, 'BONUS_NUMBER');
        this.#bonusNumber = bonusNumber;
      },
    );
  }

  static #validate(numbers, type) {
    const { LOTTO_NUMBER, DUPLICATION, RANGE } = ERROR_MESSAGE;

    if (invalidNumber(numbers)) {
      throw new Error(makeErrorMsg(LOTTO_NUMBER));
    }

    if (invalidInputNum(numbers, COUNT[type])) {
      const inputLength = `${type}_LENTH`;
      throw new Error(makeErrorMsg(ERROR_MESSAGE[inputLength]));
    }

    if (invalidDuplication(numbers, COUNT[type])) {
      throw new Error(makeErrorMsg(DUPLICATION));
    }

    if (
      invalidRange(numbers, [COUNT.MIN_LOTTO_NUMBER, COUNT.MAX_LOTTO_NUMBER])
    ) {
      throw new Error(makeErrorMsg(RANGE));
    }
  }

  getNumbers() {
    return [this.#winnerNumbers, this.#bonusNumber];
  }
}

module.exports = LottoNumberGenerator;
