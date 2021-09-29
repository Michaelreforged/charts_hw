import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, List, Table } from 'semantic-ui-react';

function Products(props) {
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

  const normalizeInfo = (data) =>{
    let ids =  data.map((s)=> s.seller_id);
    let unique_seller = [... new Set(ids)];
    return unique_seller.map((id) => {
      let products = data.filter((p) => p.seller_id === id)
      let {sellers_name, email} = products[0];
      let sellersProducts = products.map((p) =>{
        return{
          name: p.name,
          price: p.price,
          description: p.description, 
          category: p.category,
          productID: p.product_id
        };
      });
      return {sellers_name, email, products: sellersProducts}    
    });
  }

  const renderProducts = (products) => {
      return products.map((p) => {
        return (
          <Table.Row>
            <Table.Cell>{p.name}</Table.Cell>
            <Table.Cell>{p.price}</Table.Cell>
            <Table.Cell>{p.description}</Table.Cell>
            <Table.Cell>{p.category}</Table.Cell>
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
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
          />
          <List.Header>
            {s.sellers_name}
          </List.Header>
          <List.Content>
            <List.Content>{s.name}</List.Content>
          </List.Content>
          <List.Content>
            <Table celled style={{ marginTop: "10px" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
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
};


export default Products;