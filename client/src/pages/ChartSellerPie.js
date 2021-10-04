import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"
import { Segment } from "semantic-ui-react";

const  ChartSellerPie = () =>{
  const[info, setInfo] = useState([])
  
  useEffect(()=>{
    getInfo();
  },[])

  const getInfo = async () => {
    try {
      let res = await axios.get("/api/buyers/category")
      setInfo(normalizData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  
  const normalizData = (data) => {
    let cate = data.map((c) => c.desired_category)
    let unique_cate = [... new Set(cate)]
    return unique_cate.map((catego)=>{
      let category_items = data.filter((c)=> c.desired_category === catego )
      let {desired_category} = category_items[0]
      let nameData = []
      let countData = []
      let label = category_items.map((c)=>{
        let name = c.name 
        nameData.push(name)
        let count = c.desired_category_count
        countData.push(count)
      })
      let normData = {desired_category, nameData, countData}
      return{normData}
    })
  }

  const mapdata = (cat) => {
    return({
    labels: cat.normData.nameData,
    datasets: [
      {
        data: cat.normData.countData,
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
    return info.map((cat,index)=>{
      return(
      <div key={index} style={{width:"25vw"}}>
        <Segment >
          <div className='header'>
            <h1 className='title'>Potential</h1>
            <h1 className='title'>{cat.normData.desired_category}</h1>
            <h3 className='title'>Buyers By Seller</h3>
          </div>
          <Pie 
          data={mapdata(cat)} />
      </Segment>
    </div>
    )
    })
  }
    
  return(
    <>
    <h1>Pie charts</h1> 
    <div className="chart-container" style={
      {display:"flex",
      flexWrap:"wrap",
      justifyContent: "space-around",
      position: "relative",
      height:"50vh", 
    }} >{mapCharts()}</div>
    </>
  )
}
export default ChartSellerPie