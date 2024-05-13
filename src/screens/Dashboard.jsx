import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrders, updateProducts } from "../redux/appSlice";
import axios from "axios";
import { SERVER_BASE_URL } from "../config";

const Dashboard = () => {
  const { products, orders } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(orders);

  const fetchData = async () => {
    const { data: productsData } = await axios.get(
      `${SERVER_BASE_URL}/product/all`
    );
    dispatch(updateProducts(productsData?.products));

    const { data: ordersData } = await axios.get(
      `${SERVER_BASE_URL}/order/all`
    );
    dispatch(updateOrders(ordersData?.orders));
  };

  return (
    <div className="Dashboard">
      <section>
        <div>
          <img
            src="https://img.icons8.com/material-rounded/25/017fed/product.png"
            alt="edit--v1"
          />
          <h4>Products</h4>
        </div>
        {products ? <h1>{products?.length}</h1> : <h4>Loading...</h4>}
        <span>Manage Products</span>
        <Link to={"/products"}>
          <img
            src="https://img.icons8.com/material-rounded/25/ffffff/forward.png"
            alt="edit--v1"
          />
        </Link>
      </section>
      <section>
        <div>
          <img
            src="https://img.icons8.com/material-rounded/25/017fed/product.png"
            alt="edit--v1"
          />
          <h4>Orders</h4>
        </div>
        {orders ? <h1>{orders?.length}</h1> : <h4>Loading...</h4>}
        <span>Manage Orders</span>
        <Link to={"/orders"}>
          <img
            src="https://img.icons8.com/material-rounded/25/ffffff/forward.png"
            alt="edit--v1"
          />
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
