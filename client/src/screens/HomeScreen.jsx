import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useParams } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate';


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const {data, isLoading, isError} = useGetProductsQuery({pageNumber, keyword})

  return (
    <>
    {isLoading ? (<Loader/>) : isError ? (<div>{isError?.data.message || isError.error}</div>) : (<>
      <h1>Products</h1>
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
