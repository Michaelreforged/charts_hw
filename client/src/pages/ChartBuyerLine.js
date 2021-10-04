import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import { Segment } from "semantic-ui-react";

const  ChartBuyerLine = () =>{
  const[info, setInfo] = useState([])
  const[loaded, setLoaded] = useState(false)
  
  useEffect(()=>{
    getInfo();
  },[])

  const getInfo = async () => {
    try {
      let res = await axios.get("/api/buyers/category_price_avg")
      setInfo(normalizData(res.data))
    } catch (error) {
      console.log(error)
    } finally{
      setLoaded(true)
    }
  }
  
  const normalizData = (data) => {
    let avgPrice = []
    let countData = []
    let categoryData = []
    let label = data.map((c)=>{
      let desiredCategory = c.desired_category
      categoryData.push(desiredCategory)
      let price = c.avg_max 
      avgPrice.push(price)
      let count = c.count
      countData.push(count)
    })
    let normData = {categoryData, avgPrice, countData}
    return{normData}
  }

  const mapdata = (data) => {
    return({
    labels: data.normData.categoryData,
    datasets: [
      {
        label: 'Average Price',
        data: data.normData.avgPrice,
        backgroundColor: [
          'rgba(131, 188, 212, 0.2)',
          'rgba(164, 209, 224, 0.2)',
          'rgba(177, 222, 224, 0.2)',
          'rgba(214, 247, 210, 0.2)',
          'rgba(190, 232, 183, 0.2)',

        ],
        borderColor: [
          'rgba(131, 188, 212, 1)',
          'rgba(164, 209, 224, 1)',
          'rgba(177, 222, 224, 1)',
          'rgba(214, 247, 210, 1)',
          'rgba(190, 232, 183, 1)',
        ],
        borderWidth: 1,
      },
    ],}
    )
  };

  const mapCharts = () =>{
    return(
      <div style={{width:"25vw"}}>
        <Segment >
          <div className='header'>
            <h1 className='title'>Average max price by Category</h1>
          </div>
          {loaded && <Line 
          data={mapdata(info)}/>}
      </Segment>
    </div>)
  }
    
  return(
    <>
    <h1>Line Charts</h1>
    <div className="chart-container" style={
    {display:"flex",
    flexWrap:"wrap",
    justifyContent: "space-around",
    position: "relative",
    height:"40vh", 
    }}>
      {mapCharts()}
      </div>
  </>
  )
}
export default ChartBuyerLine