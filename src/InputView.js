const MU = require("@woowacourse/mission-utils");
const BridgeGame = require('./BridgeGame');
const BR = new BridgeGame();
const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const OutputView = require("./OutputView");
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    MU.Console.readLine('다리의 길이를 입력해주세요.\n', (size) => {
      try { 
        BR.ErrorHandlerSize(size);
        const BRIDGE = BridgeMaker.makeBridge(size, BridgeRandomNumberGenerator.generate);
        this.readMoving([], BRIDGE, 1);
      }
      catch {
        this.readBridgeSize();
      }
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(currentLocation, BRIDGE, count) {
    MU.Console.readLine('이동할 칸을 선택해주세요. (위: U, 아래: D)\n', (nextStep) => {
      try{
        BR.ErrorHandlerNextStep(nextStep);
        this.helpMoveing(currentLocation, BRIDGE, count, nextStep);
      }
      catch {
        this.readMoving(currentLocation, BRIDGE, count);
      }
    });
  },

  helpMoveing(currentLocation, BRIDGE, count, nextStep) {
    currentLocation = BR.move(currentLocation, nextStep);
    let currentMap = BR.moveMap(currentLocation, BRIDGE);
    OutputView.printMap(currentMap,currentLocation.length);
    if(BRIDGE.length == currentLocation.length && BRIDGE[currentLocation.length - 1] == nextStep) {
      OutputView.printResult(currentMap,'성공', count);
      return MU.Console.close();
    }
    BRIDGE[currentLocation.length - 1] != nextStep ? this.readGameCommand(currentMap, BRIDGE,count) : this.readMoving(currentLocation, BRIDGE, count); 
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(currentMap, BRIDGE,count) {
    MU.Console.readLine('\n게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', (answer) => {
      try {
        BR.ErrorHandlerRetry(answer);
        this.helpGameCommand(currentMap, BRIDGE, count, answer);
      }
      catch {
        this.readGameCommand(currentMap, BRIDGE,count);
      }
    });
  },

  helpGameCommand(currentMap, BRIDGE, count, answer) {
    if(answer == 'R') {
      this.readMoving(BR.retry(), BRIDGE, ++count)
    }
    else {
      OutputView.printResult(currentMap,'실패', count);
      return MU.Console.close();
    }
  }
};

module.exports = InputView;
