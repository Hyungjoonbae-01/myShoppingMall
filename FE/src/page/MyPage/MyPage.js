import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "./component/OrderStatusCard";
import "./style/orderStatus.style.css";
import { getOrder } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.level === "admin") {
      console.log("heyyyyyyyyyyy you hi nevigate admin/order");
      navigate("/admin/order");
    }
    dispatch(getOrder());
  }, [dispatch]);

  if (orderList?.length === 0) {
    return (
      <Container className="no-order-box">
        <div>진행중인 주문이 없습니다.</div>
      </Container>
    );
  }
  // if (user.level === "admin") {
  //   navigate("/admin/order");
  // }
  return (
    <Container className="status-card-container">
      {orderList.map((item) => (
        <OrderStatusCard
          orderItem={item}
          className="status-card-container"
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default MyPage;
