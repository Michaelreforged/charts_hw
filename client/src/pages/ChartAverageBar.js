import axios from "axios";
import React, { useEffect, useState } from "react";
import {Bar} from "react-chartjs-2"
import { Segment } from "semantic-ui-react";

const  ChartAverageBar = () =>{
  const[info, setInfo] = useState([])
  
  useEffect(()=>{
    getInfo();
  },[])

  const getInfo = async () => {
    try {
      let res = await axios.get("/api/sellers/average_price")
      setInfo(normalizedData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  
  const normalizedData = (data) => {
    let sellerID = data.map((c) => c.id)
    let uniqueSellerID = [... new Set(sellerID)]
    return uniqueSellerID.map((seller)=>{
      let seller_items = data.filter((c)=> c.id === seller )
      let {name} = seller_items[0]
      let categoryData = []
      let priceData = []
      let label = seller_items.map((c)=>{
        let name = c.category 
        categoryData.push(name)
        let avgPrice = c.avg_price
        priceData.push(avgPrice)
      })
      let normData = {name, categoryData, priceData}
      return{normData}
    })
  }

  const mapdata = (data) => {
    return({
    labels: data.normData.categoryData,
    datasets: [
      {
        label: '# of Seller',
        data: data.normData.priceData,
        backgroundColor: [
          'rgba(131, 188, 212, 0.2)',
          'rgba(164, 209, 224, 0.2)',
          'rgba(177, 222, 224, 0.2)',
          'rgba(214, 247, 210, 0.2)',
          'rgba(190, 232, 183, 0.2)',
          'rgba(209, 107, 117, 0.2)',
          'rgba(237, 126, 126, 0.2)',
          'rgba(255, 171, 128, 0.2)',
          'rgba(247, 228, 16, 0.2)',
          'rgba(255, 253, 191, 0.2)',
        ],
        borderColor: [
          'rgba(131, 188, 212, 1)',
          'rgba(164, 209, 224, 1)',
          'rgba(177, 222, 224, 1)',
          'rgba(214, 247, 210, 1)',
          'rgba(190, 232, 183, 1)',
          'rgba(209, 107, 117, 1)',
          'rgba(237, 126, 126, 1)',
          'rgba(255, 171, 128, 1)',
          'rgba(247, 228, 16, 1)',
          'rgba(255, 253, 191, 1)',
        ],
        borderWidth: 1,
      },
    ],}
    )
  };

  const mapCharts = () =>{
    return info.map((data)=>{
      return(
      <div style={{width:"25vw"}}>
        <Segment >
          <div className='header'>
            <h1 className='title'>{data.normData.name} Average Price</h1>
            <h1 className='title'>Per Category</h1>
          </div>
          <Bar 
          data={mapdata(data)} />
      </Segment>
    </div>
    )
    })
  }
    
  return(
    <>
    <h1>Bar charts</h1> 
    <div className="chart-container" style={
      {display:"flex",
      flexWrap:"wrap",
      justifyContent: "space-around",
      position: "relative",
      height:"40vh",
    }} >{mapCharts()}</div>
    </>
  )
}
export default ChartAverageBar