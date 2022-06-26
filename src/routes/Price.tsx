import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchinfo, fetchprice } from "../api";
import Coin, { Ipriceinfo } from "./Coin"


const Pricecontainer =styled.div`
max-width: 500px;
background-color: ${prop=>prop.theme.tabbgcolor};
height: 250px;
margin: auto;
border-radius: 10px;
padding: 20px;
line-height: 22px;
`
const Textbox = styled.h4`
font-size: 16px;
`
interface Icoin{
    coinid : string;
}


function Price () {
    const {coinid} = useOutletContext<Icoin>();

    const {isLoading: priceloading, data : pricedata} = useQuery<Ipriceinfo>(["price",coinid],
    () => fetchprice(coinid),{
        refetchInterval : 5000
    });

    console.log(pricedata?.name);
    return <>
        { priceloading ? ("loading time price.."): 
    <Pricecontainer>
       
        <Textbox>Price : $ {pricedata?.quotes.USD.price}</Textbox>
        <Textbox>15M(%) : {pricedata?.quotes.USD.percent_change_15m}</Textbox>
        <Textbox>30M(%) : {pricedata?.quotes.USD.percent_change_30m}</Textbox>
        <Textbox>1H(%) : {pricedata?.quotes.USD.percent_change_1h}</Textbox>
        <Textbox>6H(%) : {pricedata?.quotes.USD.percent_change_6h}</Textbox>
        <Textbox>25H(%) : {pricedata?.quotes.USD.percent_change_24h}</Textbox>
        <Textbox>7D(%) : {pricedata?.quotes.USD.percent_change_7d}</Textbox>
        <Textbox>30D(%) : {pricedata?.quotes.USD.percent_change_30d}</Textbox>
        <Textbox>Total supply : $ {pricedata?.total_supply}</Textbox> 
    
    
     </Pricecontainer>
    }

</>
    
}
export default Price;