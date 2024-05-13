import React, { useState } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateOrders } from "../redux/appSlice";
import axios from "axios";

const Orders = () => {
  const { orders } = useSelector((state) => state.app);
  const [order, setOrder] = useState({
    id: null,
    deliveryDate: null,
    deliveryStatus: null,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const updateOrder = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/order/update",
      order
    );
    dispatch(updateOrders(data?.orders));
    setOpen(false);
  };
  console.log(order);

  return (
    <div className="Orders">
      {orders &&
        orders?.map((o) => (
          <div className="order">
            <img src={o?.products[0]?.product?.photo} alt="" />
            <span>{o?._id}</span>
            <h3>{o?.user?.name}</h3>
            <p>
              Deliver by: <h5>{o?.deliveryDate?.split("T")[0]}</h5>
            </p>
            <p>
              Status: <h5>{o?.deliveryStatus}</h5>
            </p>
            <Link to={"/order/" + o?._id}>More details</Link>
            <button
              style={{
                width: "max-content",
                padding: "0 20px",
                margin: "30px",
              }}
              onClick={() => {
                setOrder({
                  id: o?._id,
                  deliveryDate: o?.deliveryDate,
                  deliveryStatus: o?.deliveryStatus,
                });
                setOpen(true);
              }}
            >
              Update Tracking Info
            </button>
          </div>
        ))}
      {open && (
        <section className="o-edit">
          <main>
            <img
              onClick={() => setOpen(false)}
              src="https://img.icons8.com/material-rounded/25/017fed/multiply.png"
              alt="edit--v1"
            />
            <input
              type="date"
              value={order?.deliveryDate}
              onChange={(e) =>
                setOrder({ ...order, deliveryDate: e.target.value })
              }
              placeholder="Delivery Date"
            />
            <select
              onChange={(e) =>
                setOrder({ ...order, deliveryStatus: e.target.value })
              }
            >
              <option
                value="PLACED"
                selected={order.deliveryStatus === "PLACED"}
              >
                PLACED
              </option>
              <option
                value="SHIPPED"
                selected={order.deliveryStatus === "SHIPPED"}
              >
                SHIPPED
              </option>
              <option
                value="DELIVERED"
                selected={order.deliveryStatus === "DELIVERED"}
              >
                DELIVERED
              </option>
            </select>
            {/* <input
              type="text"
              value={order?.deliveryStatus}
              onChange={(e) =>
                setOrder({ ...order, deliveryStatus: e.target.value })
              }
              placeholder="Delivery Status"
            /> */}
            <button onClick={() => updateOrder()}>Update</button>
          </main>
        </section>
      )}
    </div>
  );
};

export default Orders;
