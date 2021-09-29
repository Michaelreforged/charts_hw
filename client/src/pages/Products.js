import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { List } from 'semantic-ui-react';

function Products(props) {
  const [info, setInfo] = useState([])

  useEffect(()=>{
    getInfo()
  },[])

  const getInfo = async() => {
    try{
      let res = await axios.get('/api/products')
      setInfo(res.data)
    }catch(err){

    }
  }

  // const normalizeInfo = () => {
  //   return info.map((i)=>{
  //     let seller = i.sellers_name
  //     if(i.id == i.seller_id){
  //     return (
  //       let products = info.map(()=>{
  //       return {name: i.name, description: i.description, price: i.price, category: i.category}
  //     })
  //     return products
  //   })
  //     return {name: seller, products: products}
  //   })
  // }
  console.log(normalizeInfo())

      // const renderProducts = (products) => {
      //     return products.map((p) => {
      //       return (
      //         <Table.Row>
      //           <Table.Cell>{p.name}</Table.Cell>
      //           <Table.Cell>{p.price}</Table.Cell>
      //           <Table.Cell>{p.description}</Table.Cell>
      //           <Table.Cell>{p.category}</Table.Cell>
      //         </Table.Row>
      //       );
      //     });
      //   };
      //   const renderList = () => {
      //     return seller.map((s) => {
      //       return (
      //         <List.Item>
      //           <Image
      //             avatar
      //             src="https://react.semantic-ui.com/images/avatar/small/molly.png"
      //           />
      //           <List.Content>
      //             <List.Content>{s.name}</List.Content>
      //           </List.Content>
      //           <List.Content>
      //             <Table celled style={{ marginTop: "10px" }}>
      //               <Table.Header>
      //                 <Table.Row>
      //                   <Table.HeaderCell>Name</Table.HeaderCell>
      //                   <Table.HeaderCell>Price</Table.HeaderCell>
      //                   <Table.HeaderCell>Description</Table.HeaderCell>
      //                   <Table.HeaderCell>Category</Table.HeaderCell>
      //                 </Table.Row>
      //               </Table.Header>
      //               <Table.Body>{renderProducts(s.products)}</Table.Body>
      //             </Table>
      //           </List.Content>
      //         </List.Item>
      //       );
      //     });
      //   };


        return (
          <List
            divided
            verticalAlign="middle"
            style={{ border: "1px solid", padding: "10px " }}
          >
            {/* {renderList()} */}
          </List>
        );
      };


export default Products;