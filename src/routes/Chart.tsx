import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchhistorical } from "../api";
import ReactApexChart from "react-apexcharts";
import { transform } from "typescript";
import Price from "./Price";
interface Icoin{
    coinid : string;
}
interface Ihistorical{
    close: number;
    high:number;
    low:number;
    market_cap:number;
    open:number;
    time_close: number;
    time_open: number;
    volume:number;
}

function Chart () {
    
    const {coinid}  = useOutletContext<Icoin>();
    
    console.log(coinid);

    const {isLoading,data} = useQuery<Ihistorical[]>(["ohlcv",coinid],() => fetchhistorical(coinid))
    console.log(data?.map(a => new Date(a.time_open * 1000).getDate()));
    return <div>{isLoading ? "loading chart" : 
    <ReactApexChart 
        type="line"
        series={[
            {
                name: "Price",
                data: data?.map((price) => 
                price.close) as number[],
            },
            ]}
        options= {{
        
            chart: { 
                height: 350,
                type: "line",
                stacked: false,
                 background: "transparents",
            },
            dataLabels: {
                enabled: false
              },
            grid: { show: false },
            stroke: {
                width: [4, 4]
              },
              plotOptions: {
                bar: {
                  columnWidth: "20%"
                }
              },

              yaxis: {
                axisTicks: {
                show: true
                  },
                  axisBorder: {
                    show: true,
                    color: "white"
                  },
                  labels: {
                    style: {
                      colors: "gray"
                    }
                  },
              },
              tooltip: {
                shared: false,
                intersect: true,
                x: {
                  show: false
                }
              },
              legend: {
                horizontalAlign: "left",
                offsetX: 40
              }
        }}
    
    />}</div>
}
export default Chart;