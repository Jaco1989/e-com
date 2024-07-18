import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";


const HomeScreen = () => {
  
  const {data, isLoading, isError} = useGetProductsQuery()

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
      </Row></>)}
      
    </>
  );
};

export default HomeScreen;
