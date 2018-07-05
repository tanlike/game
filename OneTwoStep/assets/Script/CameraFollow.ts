const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    @property(cc.Node)
    hero: cc.Node = null;

    private offsetHero: cc.Vec2;

    onLoad(){
        let position: cc.Vec2 = this.hero.parent.convertToWorldSpaceAR(this.hero.position);
        this.offsetHero = cc.pSub(this.node.position,position);
    }

    update(dt){
        if(cc.isValid(this.hero)){
            let position: cc.Vec2 = this.hero.parent.convertToWorldSpaceAR(this.hero.position);
            this.node.setPosition(cc.pAdd(position,this.offsetHero));
        }
    }
}
