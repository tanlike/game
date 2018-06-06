class GameEvent extends egret.Event{
    public static BOX_CLICK : string = "box_click";
    public box_click_index : number = 0;
    public static START_GAME : string = "start_game";
    public static OVER_GAME : string = 'over_game';

    public constructor(type : string,bubbles : boolean = false,cancelable : boolean = false){
        super(type,bubbles,cancelable);
    }
}
