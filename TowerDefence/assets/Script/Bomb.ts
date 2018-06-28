const {ccclass, property} = cc._decorator;

@ccclass
export class Bomb extends cc.Component {

    start () {
        let anim: cc.Animation = this.node.getComponent(cc.Animation);
        anim.on("finished",this.onFinished,this);
        anim.play();
    }

    private onFinished(evt: cc.Event.EventCustom){
        this.node.destroy();
    }

    // update (dt) {}
}
