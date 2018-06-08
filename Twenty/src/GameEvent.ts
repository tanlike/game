class GameEvent extends egret.Event{
    public static CLICKBOX : string = "clickbox";

    public constructor(type : string,bubbles : boolean = false,cancelable : boolean = false){
        super(type,bubbles,cancelable);
    }
}
