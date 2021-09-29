import { Dropdown, Table } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";
import axios from 'axios';

const FindProduct = () => {
  const [sellers, setSellers] = useState([])
  const [products, setPorducts] = useState(null)

  useEffect(()=>{
    getSellers()
  },[])

  const handleChange = async (e, {value}) => {
    console.log(value)
    try{
      let res = await axios.get(`/api/products/${value}`)
      console.log(res.data)
      setPorducts(res.data)
    }catch(err){
      console.log(err)
    }
  }


  const getSellers = async () => {
    try{
      let res = await axios.get('/api/products/sellers')
      console.log(res.data)
      let sellerInfo = res.data.map((s)=> {
       return {key:s.seller_id, text:s.name, value:s.seller_id}
      })
      setSellers(sellerInfo)
    }catch(err){
      console.log(err)
    }
  }

  const renderProducts = () => {
    let productList = products.map((p, ind)=> {
      return(
        <Table.Row key={ind}>
            <Table.Cell>{p.name}</Table.Cell>
            <Table.Cell>{p.price}</Table.Cell>
            <Table.Cell>{p.description}</Table.Cell>
            <Table.Cell>{p.category}</Table.Cell>
          </Table.Row>
      )
    })
    return(
      <div>
        <Table celled style={{ marginTop: "10px" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{productList}</Table.Body>
            </Table>
      </div>
    )
  }

  


  return (
    <>
    <Dropdown
    onChange={handleChange}
    placeholder='Select Seller'
    fluid
    selection
    options={sellers}
  />
  <div>
    {products && renderProducts()}
  </div>
  </>
  )
}

export default FindProduct 