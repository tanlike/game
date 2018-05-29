class CatNode{
    public preIndex : number = -1;
    public _isUsed : boolean = false;

    public clean(){
        this.preIndex = -1;
        this._isUsed = false;
    }
}