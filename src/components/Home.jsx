import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get("https://ecomm-backend-oc1a.onrender.com/api/products/")
      .then((res) => setProducts(res.data.result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div class="row row-cols-1 row-cols-md-3">
        {products.map((item, index) => {
          return (
            <>
            <div key={index}>
              <div class="col mb-4">
                <div class="card">
                  <img src={item.productImage} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{item.productName}</h5>
                    <h5 class="card-title">{item.productPrice}</h5>
                  </div>
                </div>
              </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
