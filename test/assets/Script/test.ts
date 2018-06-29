
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    tower1: cc.Sprite = null;
    @property(cc.Sprite)
    tower2: cc.Sprite = null;

    private r = 100;
    private rot = 0;
    update (dt) {
        this.rot += dt * 10;
        let radian = cc.degreesToRadians(this.rot);
        this.tower2.node.setPositionX(this.r * Math.cos(radian));
        this.tower2.node.setPositionY(this.r * Math.sin(radian));

        this.tower1.node.rotation = 360 - this.rot;

        let ps = cc.pSub(this.tower1.node.position,this.tower2.node.position);
        let no = cc.pNormalize(ps);
        let ra = cc.pAngleSigned(no,cc.p(1,0));
        let angle = cc.radiansToDegrees(ra);
        this.tower2.node.rotation = angle;
    }
}
