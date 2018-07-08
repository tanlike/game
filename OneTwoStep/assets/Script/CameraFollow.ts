import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    @property(cc.Node)
    hero: cc.Node = null;

    private offsetHero: cc.Vec2;
    private game: Game;

    onLoad(){
        let position: cc.Vec2 = this.hero.parent.convertToWorldSpaceAR(this.hero.position);
        this.offsetHero = cc.pSub(this.node.position,position);
        this.game = cc.find("Canvas").getComponent("Game");
    }

    update(dt){
        if(!this.game.gameover && cc.isValid(this.hero)){
            let position: cc.Vec2 = this.hero.parent.convertToWorldSpaceAR(this.hero.position);
            this.node.setPosition(cc.pAdd(position,this.offsetHero));
        }
    }
}
