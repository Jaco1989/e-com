import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";


const HomeScreen = () => {
  
  const {data:products, isLoading, error} = useGetProductsQuery()

  return (
    <>
    {isLoading ? (<Loader/>) : error ? (<div>{error?.data.message || error.error}</div>) : (<>
      <h1>Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row></>)}
      
    </>
  );
};

export default HomeScreen;
