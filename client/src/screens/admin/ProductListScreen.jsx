import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useGetProductsQuery,
  } from '../../slices/productsApiSlice';
  import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  return (
    <>
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className='my-3' onClick={""}>
          <FaPlus /> Create Product
        </Button>
      </Col>
    </Row>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </>
  )
}

export default ProductListScreen
