import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Table } from 'semantic-ui-react';

function Products(props) {
  const [info, setInfo] = useState([])
  const [seller, setSeller] = useState([])
  const [product, setProduct] = useState([])

  useEffect(()=>{
    getInfo()
  },[]);

  const getInfo = async () => {
    try {
      let res = await axios.get('/api/products')
      console.log(res)
      setInfo(res.data)
    } catch (error) {
      console.log("error getting Products", error)
    }
  }

  const normalizeInfo = () =>{

    
    // let seller = info.map((s)=>{
    //   let name = s.seller_name
    //   let products = {name: s.name, price: s.price, description: s.description, category: s.category}
    //   // return {seller:name, products: products}
    // })

    // Format we want info in
    // const seller = [
    //   {
    //     name: "Tony",
    //     email: "test@test.com",
    //     products: [
    //       {name: lasgna, price: 123, description: 1, category: 2},
    //       {
    //         name: rice,
    //         price: 1223423,
    //         beds: 1,
    //       },
    //     ],
    //   }
    // ]

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
    return seller.map((s) => {
      return (
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
          />
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
    <div> Products </div>
    // <List
    //   divided
    //   verticalAlign="middle"
    //   style={{ border: "1px solid", padding: "10px " }}
    // >
    //   {renderList()}
    // </List>
  );
};


export default Products;