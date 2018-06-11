class GameEvent extends egret.Event{
    public static BOXDROP: string = 'boxdrop';

    public constructor(type : string,bubbles : boolean = false,cancelable : boolean = false){
        super(type,bubbles,cancelable);
    }
}
