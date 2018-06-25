import Game from './Game';
const {ccclass, property} = cc._decorator;

@ccclass
export default class CannonTurret extends cc.Component {

    @property
    attack: number = 1;
    @property
    attckRange: number = 100;
    @property
    attckInterval: number = 1.0;

    private game: Game = null;

    onLoad () {
        this.game = cc.find("Canvas").getComponent("Game");
    }

    start () {

    }

    // update (dt) {}
}
