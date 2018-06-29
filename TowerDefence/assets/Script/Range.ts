
const {ccclass, property} = cc._decorator;

@ccclass
export default class Range extends cc.Component {

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
    }

    private onTouch(evt: cc.Event.EventCustom){
        this.node.destroy();
        evt.stopPropagation();
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouch,this);
    }

    public createTower(evt: cc.Event.EventTouch, customEventData){
        //cc.log('选塔=' + customEventData);
        let towerDispatch: cc.Event.EventCustom = new cc.Event.EventCustom("createtower",true);
        towerDispatch.setUserData(customEventData);
        this.node.dispatchEvent(towerDispatch);
    }
}
