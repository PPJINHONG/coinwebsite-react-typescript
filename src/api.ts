
export function fetchcoins(){
  
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());

}


export function fetchinfo(coinid : string | undefined){
    return  fetch(`https://api.coinpaprika.com/v1/coins/${coinid}`).then(response => response.json());
}

export function fetchprice(coinid : string | undefined){
    return  fetch(`https://api.coinpaprika.com/v1/tickers/${coinid}`).then(response => response.json());
}


export function fetchhistorical(coinid : string | undefined){
    const enddate = Math.floor(Date.now() / 1000);
    const startdate = enddate - 60 * 60 * 23;
    //return fetch(`https://api.coinpaprika.com/v1/coins/${coinid}/ohlcv/historical?start=${startdate}&end=${enddate}`).then(response => response.json());
   return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinid}`).then(response => response.json());
  
}


