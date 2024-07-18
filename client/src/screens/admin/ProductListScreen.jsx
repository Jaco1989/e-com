import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
  } from '../../slices/productsApiSlice';
  import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

    const { data , isLoading, IsError, refetch } = useGetProductsQuery({pageNumber});

    const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
          try {
            await createProduct();
            refetch();
            toast.success("Product Created")
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

    const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
          await deleteProduct(id);
          refetch();
          toast.success("Product Delete")
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

  return (
    <>
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className='my-3' onClick={createProductHandler}>
          <FaPlus /> Create Product
        </Button>
      </Col>
    </Row>
    {loadingDelete && <Loader />}
    {loadingCreate && <Loader />}
    {isLoading ? (
        <Loader />
      ) : IsError ? (
        <Message variant='danger'>{IsError.data.message}</Message>
      ) : (
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
                {data.products.map((product) => (
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                    <Button
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                  </tr>
                ))}
          </tbody>
        </Table>
    )}
    <Paginate
            pages={data.pages}
            page={data.page}
          />
      </>
  )
}

export default ProductListScreen
