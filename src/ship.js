export function Ship (x){

    function hit(){
        return this.hits+=1
    }
    function isSunk(){
        return this.hits === this.length
    }
    return {
        hits:0,
        hit,
        length:x,
        isSunk,
    }
}

// export const ship =Ship(3)