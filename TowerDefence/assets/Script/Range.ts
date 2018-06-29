
const {ccclass, property} = cc._decorator;

@ccclass
export default class Range extends cc.Component {

    public createTower(evt: cc.Event.EventTouch, customEventData){
        //cc.log('选塔=' + customEventData);
        let towerDispatch: cc.Event.EventCustom = new cc.Event.EventCustom("createtower",true);
        towerDispatch.setUserData(customEventData);
        this.node.dispatchEvent(towerDispatch);
    }
}
