import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
} from '../slices/ordersApiSlice';


const OrderScreen = () => {
  return (
    <div>
      <h1>OrderScreen</h1>
    </div>
  )
}

export default OrderScreen
