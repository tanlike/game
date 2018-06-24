
const {ccclass, property} = cc._decorator;

@ccclass
export class Star extends cc.Component {

    @property
    public maxDuration: number = 5;

    private curDuration: number = 0;

    start(){
        this.curDuration = this.maxDuration;
    }

    update (dt) {
        if(this.curDuration > 0){
            this.curDuration -= dt;
            let per: number = (255-50) * this.curDuration / this.maxDuration;
            this.node.opacity = 50 + per;
           // cc.log(this.node.opacity);
        }
    }
}
