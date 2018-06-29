const {ccclass, property} = cc._decorator;

@ccclass
export class Bomb extends cc.Component {

    start () {
        let anim: cc.Animation = this.node.getComponent(cc.Animation);
        anim.on("finished",this.onFinished,this);
        anim.play();
    }

    private onFinished(evt: cc.Event.EventCustom){
       // cc.log('回收爆炸图');
        this.node.destroy();
    }

    // update (dt) {}
}
