import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "../assets/styles/index.css"


const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination className='center-text'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin 
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  :`/page/${x + 1}` 
                : `/admin/productlist/${x + 1}` } active={x + 1 === page}>
            <Pagination.Item active={x + 1 === page}>
                {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;