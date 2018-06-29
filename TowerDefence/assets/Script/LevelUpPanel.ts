
const {ccclass, property} = cc._decorator;

@ccclass
export class LevelUpPanel extends cc.Component {

    private onClick(target,customEventData){
        let evt: cc.Event.EventCustom = new cc.Event.EventCustom("leveluprange",true);
        evt.setUserData(customEventData);
        this.node.dispatchEvent(evt);
    }
}
