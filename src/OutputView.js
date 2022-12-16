const MU = require("@woowacourse/mission-utils");
/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(gameMap,length) {
    for(let i = 0; i < length; i++) {
      if(gameMap[0][i] != 'O' && gameMap[0][i] != 'X') {
        gameMap[0][i] = ' ';
      }
      if(gameMap[1][i] != 'O' && gameMap[1][i] != 'X') {
        gameMap[1][i] = ' ';
      }
    }
    MU.Console.print(`[ ${gameMap[0].join(' | ')} ]`);
    MU.Console.print(`[ ${gameMap[1].join(' | ')} ]`);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(currentMap, result, count) {
    MU.Console.print('\n최종 게임 결과');
    this.printMap(currentMap, currentMap.length);

    MU.Console.print(`\n게임 성공 여부: ${result}`);
    MU.Console.print(`총 시도한 횟수: ${count}`);
  },

  printStart() {
    MU.Console.print('다리 건너기 게임을 시작합니다.\n');
  }
};


module.exports = OutputView;
