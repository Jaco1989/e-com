import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery
} from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';


const OrderScreen = () => {
    const { id: orderId } = useParams()
    const { data: order, refetch, isLoading, isError } = 
    useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const {data: paypal, isLoading: loadingPayPal, isError: errorPayPal,
    } = useGetPaypalClientIdQuery();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPaypalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        if (order && !order.isPaid) {
          if (!window.paypal) {
            loadPaypalScript();
          }
        }
      }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    

  return (
    isLoading ? (<><Loader/></>) : isError ? (<><Message variant={"danger"}/></>) : (
    <>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                          <strong>Name:</strong> {order.user.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.user.email}
                        </p>
                        <p>
                          <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {" "}, {order.shippingAddress.postalCode} {" "}, {order.shippingAddress.country} {" "}
                        </p>
                        {order.isDelivered ? (
                        <>
                          <Message variant={"success"}>
                            Delivered on {order.deliveredAt}
                          </Message>
                        </>) : (
                        <>
                          <Message variant={"danger"}>
                            Not Deliverd
                          </Message>
                        </>
                    )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Payment Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                        <>
                          <Message variant={"success"}>
                            Paid on {order.paidAt}
                          </Message>
                        </>) : (
                        <>
                          <Message variant={"danger"}>
                            Not Paid
                          </Message>
                        </>
                    )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded>
                                    </Image>
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                </Col>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>Order Summary</ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ <b>{order.itemsPrice}</b></Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ <b>{order.shippingPrice}</b></Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ <b>{order.taxPrice}</b></Col>
                            </Row>
                            <Row>
                                <Col>Total Cost</Col>
                                <Col>$ <b>{order.totalPrice}</b></Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    )
  )
}

export default OrderScreen
