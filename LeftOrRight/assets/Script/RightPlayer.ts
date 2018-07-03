
const {ccclass, property} = cc._decorator;

@ccclass
export class RightPlayer extends cc.Component {

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    onCollisionEnter(other,self){
        let evt: cc.Event.EventCustom = new cc.Event.EventCustom("gameover",true);
        this.node.dispatchEvent(evt);
        this.node.destroy();
    }

    // update (dt) {}
}
