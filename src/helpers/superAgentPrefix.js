import superagent from "superagent";

export default  function(prefix){
    let oldEnd = superagent.Request.prototype.end;

    superagent.Request.prototype.end = function(){
        if(prefix){
            this.url = prefix + this.url;
        }
        return oldEnd.apply(this, arguments);
    };
};
