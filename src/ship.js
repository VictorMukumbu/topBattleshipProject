export function Ship (x){

    function hit(){
        return this.hits+=1
    }
    return {
        hits:0,
        hit,
        length:x,
    }
}

// export const ship =Ship(3)