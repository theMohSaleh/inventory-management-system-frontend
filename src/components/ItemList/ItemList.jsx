import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

const ItemList = (props) => {

  return (
    <Container className='mx-auto'>
      <h1 className='mt-3'>Item List</h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-5">
        {props.items.map((item) => (
          <Col key={item._id}>
            <Container>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title><Link to={`/items/${item._id}`}>
                    <h2>{item.name}</h2>
                  </Link></Card.Title>
                  <Card.Text>
                    Description: {item.description}
                  </Card.Text>
                  <Card.Text>
                    Quantity: {item.quantity}
                  </Card.Text>
                  <Card.Text>
                    Category: {item.category}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
