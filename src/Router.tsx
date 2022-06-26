import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
function Router() {

return ( 
<BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        <Route path="/:coinid" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins />}></Route>
        
    </Routes>
</BrowserRouter>

)
}
export default Router;