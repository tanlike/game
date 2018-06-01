class GameEvent extends egret.Event{
    public static OPEN_TILE : string = "open_tile";
    public open_tile_index : number = 0;
    public static START_GAME : string = "start_game";
    public static OVER_GAME : string = 'over_game';

    public constructor(type : string,bubbles : boolean = false,cancelable : boolean = false){
        super(type,bubbles,cancelable);
    }
}
