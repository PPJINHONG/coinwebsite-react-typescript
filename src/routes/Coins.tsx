import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchcoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isdarkatom } from '../atoms';
import { useRecoilValue } from "recoil";
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
const Title = styled.h1`
font-size :30px;
color: ${(props) => props.theme.textcolor};
text-align: center;
`
const Coinlist = styled.ul`
display:block;
border: 1px solid ${prop=>prop.theme.bordercolor};
border-radius: 6px;
max-width: 480px;

`

const Coin = styled.li`
  background-color: ${(props)=>props.theme.bgcolor};
  color: ${(props) => props.theme.textcolor};
  border-radius: 4px;
  margin-bottom: 0px;
  border-bottom: 0.2px solid ${prop=>prop.theme.bordercolor};
  
  
  
  a {
    padding: 15px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentcolor};
      background-color:whitesmoke;
      opacity: 0.7px;
    }
  }
`
const Loading = styled.span`
    display: block;
    text-align: center;
`
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`
const Toggle = styled.button`
  
  font-size: 15px;
  border: 0.7px solid gray;
  background-color: ${prop=>prop.theme.bgcolor};
  color:${prop=>prop.theme.textcolor};
  &:hover {
      color: ${(props) => props.theme.accentcolor};

  }

`


interface Icoins{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;

}
function Coins(){

    
    const { isLoading , data } = useQuery<Icoins[]>("allcoins",fetchcoins)
    // const [coins,setcoins] = useState<Coininterface[]>([]);
    // const [loading,setloading] = useState(true);

    // useEffect(() =>{
    //     (async () => {
    //         const response = await fetch ("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setcoins(json.slice(0,100));
    //         setloading(false);
    //     })();
    // }, []);
    // console.log(coins);

    const setdarkatom = useSetRecoilState(isdarkatom);
    const togglefn = () => setdarkatom(a => !a);
    const istoggle = useRecoilValue(isdarkatom);

  console.log();
    return (
    <Container>
        <Header>
      
          <Toggle onClick={togglefn}>{istoggle ? "White" : "Dark"}</Toggle> 
            <Title>Coin list</Title>
            </Header>
            { isLoading ? (<Loading>loading...</Loading>) : (
               <Coinlist>{data?.slice(0,100).map((coin)=>(
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`}
                        state={{name : coin.name}}
                    >
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name}
                        </Link>
                </Coin>
            ))}</Coinlist> 
            ) }
            
    </Container>
    
    )
}
export default Coins;