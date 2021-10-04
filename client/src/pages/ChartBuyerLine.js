import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import { Segment } from "semantic-ui-react";

const  ChartBuyerLine = () =>{
  const[info, setInfo] = useState([])
  
  useEffect(()=>{
    getInfo();
  },[])

  const getInfo = async () => {
    try {
      let res = await axios.get("/api/sellers/chart_by_category")
      console.log(res)
      setInfo(normalizData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  
  const normalizData = (data) => {
    let cate = data.map((c) => c.category)
    let unique_cate = [... new Set(cate)]
    return unique_cate.map((catego)=>{
      let category_items = data.filter((c)=> c.category === catego )
      let {category} = category_items[0]
      let nameData = []
      let countData = []
      let label = category_items.map((c)=>{
        let name = c.name 
        nameData.push(name)
        let count = c.count
        countData.push(count)
      })
      let normData = {category, nameData, countData}
      return{normData}
    })
  }

  const mapdata = (cat) => {
    return({
    labels: cat.normData.nameData,
    datasets: [
      {
        label: '# of Votes',
        data: cat.normData.countData,
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
    return info.map((cat)=>{
      console.log(cat);
      return(
      <div>
        <Segment >
          <div className='header'>
            <h1 className='title'>{cat.normData.category}</h1>
            <h1 className='title'>By Seller</h1>
          </div>
          <Line 
          data={mapdata(cat)} />
      </Segment>
    </div>
    )
    })
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