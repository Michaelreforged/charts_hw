import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, List, Table } from 'semantic-ui-react';
import useAxiosOnMount from '../hooks/useAxiosOnMount'


function Categories(props) {
  // const {data} = useAxiosOnMount('/api/products')
  const [info, setInfo] = useState([])
  
  useEffect(()=>{
    getInfo()
  },[]);

  const getInfo = async () => {
    try {
      let res = await axios.get('/api/products')
      setInfo(normalizeInfo(res.data))
    } catch (error) {
      console.log("error getting Products", error)
    }
  }
  
  
  const normalizeInfo = (data) => {
    let categories = data.map((d)=> d.category)
    let uniqueCategories = [...new Set(categories)]
    
    return uniqueCategories.map((c)=> {
      let products = data.filter((d)=> d.category === c)
      let { category } = products[0]
      console.log(products)
      let categoryProducts = products.map((p)=>{
        return{
          name: p.name,
          price: p.price,
          description: p.description, 
          seller: p.sellers_name,
          productID: p.product_id
        }})
        let x = {category, products:categoryProducts}
        console.log(x)
        
        return {category, products:categoryProducts}
      })
    }

  const renderProducts = (products) => {
    return products.map((p) => {
      return (
        <Table.Row>
          <Table.Cell>{p.name}</Table.Cell>
          <Table.Cell>{p.price}</Table.Cell>
          <Table.Cell>{p.description}</Table.Cell>
          <Table.Cell>{p.seller}</Table.Cell>
        </Table.Row>
    );
  });
};

const renderList = () => {
  return info.map((s) => {
    return (
      <List.Item>
        <Image
          avatar
          src="https://cdn0.iconfinder.com/data/icons/profession-and-occupation-icons/110/avatar_occupation_profile_cook_kitchener_flunkey_food-512.png"
        />
        <List.Header>
          {s.category}
        </List.Header>
        <List.Content>
          {/* <List.Content>{s.name}</List.Content> */}
        </List.Content>
        <List.Content>
          <Table celled style={{ marginTop: "10px" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Seller</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{renderProducts(s.products)}</Table.Body>
          </Table>
        </List.Content>
      </List.Item>
    );
  });
};


return (
  <List
    divided
    verticalAlign="middle"
    style={{ border: "1px solid", padding: "10px " }}
  >
    {renderList()}
  </List>
);
}

export default Categories;