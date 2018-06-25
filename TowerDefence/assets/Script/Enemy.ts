
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    hp: number = 3;

    @property(cc.Animation)
    walk: cc.Animation = null;

    start () {

    }

    public hurt(){
        this.hp--;
        if(this.hp <= 0){
            this.node.destroy();
        }
    }

    update (dt) {}
}
