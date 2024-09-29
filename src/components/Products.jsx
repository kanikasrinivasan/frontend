import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Products = ({setId}) => {
  const [products, setProducts] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [deleteData]);
  const fetchData = async () => {
    await axios
      .get("https://ecomm-backend-oc1a.onrender.com/api/products/")
      .then((res) => setProducts(res.data.result))
      .catch((err) => console.log(err));
  };
  const handleEdit=(id)=>{
    setId(id)
    navigate(`/edit/${id}`)
  }

  const handleDelete=async(id)=>{
    await axios
      .delete(`https://ecomm-backend-oc1a.onrender.com/api/products/${id}`)
      .then((res) => setDeleteData(res.data.result))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <>
                <tr key={index}>
                  <th>{index+1}</th>
                  <td> <img src={item.productImage}  /></td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td><button onClick={()=>handleEdit(item._id)}>Edit</button></td>
                  <td><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <button onClick={()=>{navigate('/create')}}>Create</button>
    </div>
  );
};

export default Products;
