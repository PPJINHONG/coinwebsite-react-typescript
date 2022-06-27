import {useMatch ,useParams ,useLocation} from "react-router";
import { useEffect, useState  } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchinfo, fetchprice } from "../api";

const Container = styled.div`
 padding: 0px 20px;
 max-width: 500px;
 margin: auto;
 `
const Header = styled.header`
 height: 15vh;
 display: block;
 justify-content: center;
 margin-top:15px;
 padding-top: 30px;
`
const Home = styled.h1`
font-size: 30px;
color:${prop=>prop.theme.textcolor};
text-align: center;
margin-bottom: 22px;
`
const Title = styled.h2`
font-size: 24px;
color:${prop=>prop.theme.textcolor};
text-align: left;
padding-left: 30px;
padding-top: 10px;
`
const Loading = styled.span`
    display: block;
    text-align: center;
`
const Pricecontainer = styled.div`
    display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 60px 40px;
    max-width: 500px;
    margin: 13px 0px;
    text-align: center;
    align-items: center;
    background-color: ${prop=>prop.theme.tabbgcolor};
    padding: 0px;
    border-radius: 10px;
`
const Pricebox1 = styled.div`
    grid-column: 1 / 2; 
	grid-row: 1 / 2;
    font-size: 20pt;
    text-align: center; 
    margin: auto;
    padding-top: 10px;
    
`
const Pricebox2 = styled.div`
    grid-column: 2 / 6; 
	grid-row: 1 / 2;
    font-size: 18pt;
    text-align: center;
    margin: auto;
    padding-top: 10px;
    
`
const Pricebox3 = styled.div`
    grid-column: 1 / 2; 
	grid-row: 2 / 3;
    font-size: 9pt;
`
const Pricebox4 = styled.div`
    grid-column: 2 / 3; 
	grid-row: 2 / 3;
    font-size: 9pt;
`
const Pricebox5 = styled.div`
    grid-column: 3 / 4; 
	grid-row: 2 / 3;
    font-size: 9pt;
`
const Pricebox6 = styled.div`
    grid-column: 4 / 5; 
	grid-row: 2 / 3;
    font-size: 9pt;
    text-align: center;

    
`





const Description = styled.div`
    max-width: 500px;
    color : ${prop  => prop.theme.textcolor};
    background-color: ${prop=>prop.theme.tabbgcolor};
    margin: auto;
    padding: 10px 15px 10px 15px;
    border-radius: 10px;
    text-align: center;
    line-height: 22px;
    font-size: 12pt;

`

const Tabcontainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 500px;
    margin: 15px 0px;
    gap: 5px;
    text-align: center;
  
    
`

const Tabcp = styled.span<{isck:boolean}>`
    color: ${prop => prop.isck ? prop.theme.accentcolor : prop.theme.textcolor};
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    padding:10px 0px;
    border-radius: 10px;
    margin: 0%;
    a {
      display: block;
      }
      background-color: ${prop=>prop.theme.tabbgcolor};

`

interface Ilocation {  
    state : { 
        name: string;
    }
}
interface Iinfodata {
    description: string
    first_data_at: string
    hardware_wallet: boolean
    hash_algorithm: string
    id: string
    is_active: boolean    
    is_new: boolean
    last_data_at: string
    links: object
    links_extended: object
    message: string
    name: string
    open_source: boolean
    org_structure: string
    proof_type: string
    rank: number
    started_at: string
    symbol: string
    tags: object
    team: object
    type: string
    whitepaper: object
    development_status: string
}
export interface Ipriceinfo {
    beta_value: number
    first_data_at: string
    id: string
    last_updated: string
    circulating_supply: number
    name: string
    quotes: {
        USD : {
            ath_date: string
            market_cap: number
            market_cap_change_24h: number
            percent_change_1h: number
            percent_change_1y: number
            percent_change_6h: number
            percent_change_7d: number
            percent_change_12h: number
            percent_change_15m: number
            percent_change_24h: number
            percent_change_30d: number
            percent_change_30m: number
            percent_from_price_ath: number
            price:number           
            volume_24h: number
            volume_24h_change_24h: number
            ath_price: number
        }
    }
    rank: number
    symbol:string    
    total_supply: number
    max_supply: number
}


function Coin(){
    
    const { coinid } = useParams() ;   
    const { state } = useLocation() as Ilocation;
  
    // const [loading,setloading] = useState(true);  
    // const [info,setinfo] = useState<Iinfodata>(); 
    // const [priceinfo,setpriceinfo] = useState<Ipriceinfo>();

    const pricematch = useMatch("/:coinid/price");
    const chartmatch = useMatch("/:coinid/chart");
   
 

    const {isLoading: infoloading, data : infodata} = useQuery<Iinfodata >(["info",coinid],() => fetchinfo(coinid));
    const {isLoading: priceloading, data : pricedata} = useQuery<Ipriceinfo>(["price",coinid],
    () => fetchprice(coinid));
//    {
//     refetchInterval : 10000,//10초 리랜더
//     });
    // console.log(infodata);
    // console.log(pricedata);
    console.log(coinid);
    const loading = infoloading || priceloading;
    
    // useEffect(() => {
    //     (async () => { 
    //         const infodata = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinid}`)).json();
    //         const pricedata = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinid}`)).json();
    //         setinfo(infodata);
    //         setpriceinfo(pricedata);
    //         setloading(false);
    //         console.log(infodata);
    //         console.log(pricedata);
        
    //     })();
    // } ,[coinid]);
  
    
    

    return (
        <Container>
            <Header>
                <Home>
                    <Link to={`./..`}>
                    Coin List
                    </Link>
                </Home>
                  <Title>
                      {state?.name ? state.name : loading ? "Loading..." : infodata?.name}
                      </Title>
            </Header>
            { loading ? (<Loading>loading...</Loading>) :(
                <>
                <Pricecontainer>
                    <Pricebox1>
                        {pricedata?.symbol}
                    </Pricebox1>
                    <Pricebox2>
                        $ {pricedata?.quotes.USD.price.toFixed(7)}
                    </Pricebox2>
                    <Pricebox3>
                        Rank : {pricedata?.rank}
                    </Pricebox3>
                    <Pricebox4>
                        24H(%) : {pricedata?.quotes.USD.percent_change_24h}
                    </Pricebox4>
                    <Pricebox5>
                        30D(%) : {pricedata?.quotes.USD.percent_change_30d}
                    </Pricebox5>
                    <Pricebox6>
                    Total($) : {pricedata?.total_supply}
                    </Pricebox6>
                
                </Pricecontainer>


           <Description>
               {infodata?.description.slice(0,85)}...
           </Description>
            <Tabcontainer>
            <Tabcp isck={chartmatch !== null}>
                <Link to={`/${coinid}/chart`}>chart</Link>
            </Tabcp>
            <Tabcp isck={pricematch !== null}>
                <Link to={`/${coinid}/price`}>time price</Link>
            </Tabcp>
            
            </Tabcontainer>
           
            <Outlet context={{coinid}} />

            </>
            )}
            
        </Container>
    ) 
}
export default Coin;