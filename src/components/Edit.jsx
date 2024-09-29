import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Edit = ({id}) => {
    const navigate = useNavigate();
    const [editData, setEditData] = useState({
        productName: '',
        productPrice: '',
        productImage: '',
    });
    useEffect(() => {
        fetchData();
      }, []);
      const fetchData = async () => {
        await axios
          .get(`https://ecomm-backend-oc1a.onrender.com/api/products/${id}`)
          .then((res) => setEditData(res.data.result))
          .catch((err) => console.log(err));
      };

      const handleChange=(e)=>{
        const {name,value}=e.target; // e.target.value e.target.name
        setEditData((preData)=>({
            ...preData, [name]: value // product: 4 => 4000
        }))
      }

      const handleFormSubmit = async(e)=>{
        e.preventDefault();
        await axios
          .put(
            `https://ecomm-backend-oc1a.onrender.com/api/products/${id}`,
            editData
          )
          .then((res) => console.log(res.data.result))
          .catch((err) => console.log(err));

        navigate('/products');
      }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Product Name:
                <input type="text" name='productName' value={editData.productName} onChange={handleChange} />
                </label>
                <br/>
                <label>Product Price:
                <input type="text" name='productPrice' value={editData.productPrice} onChange={handleChange} />
                </label>
                <br/>
                <label>Product Image:
                <input type="text" name='productImage' value={editData.productImage} onChange={handleChange} />
                </label>
                <br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Edit;