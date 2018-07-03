
const {ccclass, property} = cc._decorator;

@ccclass
export class Wall extends cc.Component {

    onLoad(){
        cc.director.getCollisionManager().enabled = true;
    }
}
