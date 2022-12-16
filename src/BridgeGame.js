const MU = require("@woowacourse/mission-utils");
/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(currentLocation, nextStep) {
    currentLocation[currentLocation.length] = nextStep;
    return currentLocation;
  }

  moveMap(currentLocation, BRIDGE) {
    let gameMap = [[],[]];
    for(let i = 0; i < currentLocation.length; i++) {
      if(currentLocation[i] === 'U') 
        gameMap[0][i] = currentLocation[i] == BRIDGE[i] ? 'O' : 'X';
      if(currentLocation[i] === 'D') 
        gameMap[1][i] = currentLocation[i] == BRIDGE[i] ? 'O' : 'X';
    }
    return gameMap;
  }
  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    return [];
  }

  ErrorHandlerRetry(answer) {
    if(answer != 'R' && answer != 'Q') {
      MU.Console.print('\n[ERROR] 재시작 입력은 R 혹은 Q 만 가능합니다.');
      throw new Error();
    }
  }

  ErrorHandlerSize(size) {
    if(isNaN(size)) {
      MU.Console.print('\n[ERROR] 다리 길이는 숫자여야 합니다.');
      throw new Error();
    }
    if(size < 3 || size > 20) {
      MU.Console.print('\n[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
      throw new Error();
    }
  }

  ErrorHandlerNextStep(nextStep) {
    if(nextStep != 'U' && nextStep != 'D') {
      MU.Console.print('\n[ERROR] 이동할 칸은 U 혹은 D 만 가능합니다.');
      throw new Error();
    }
  }

  
}

module.exports = BridgeGame;
