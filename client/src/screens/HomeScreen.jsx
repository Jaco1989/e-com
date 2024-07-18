import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate';
import ProductCarousel from "../components/ProductCarousel";


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const {data, isLoading, isError} = useGetProductsQuery({pageNumber, keyword})

  return (
    <>
    {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
    {isLoading ? (<Loader/>) : isError ? (<div>{isError?.data.message || isError.error}</div>) : (<>
      <Row>
        {data.products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
      </>
  )}  
    </>
  );
};

export default HomeScreen;
