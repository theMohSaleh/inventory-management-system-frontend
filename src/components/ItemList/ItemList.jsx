import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Stack } from 'react-bootstrap';

const ItemList = (props) => {

  return (
    <Container className='mx-auto'>
      <h1 className='mt-3'>Item List</h1>
        {props.items.map((item) => (
          <Container key={item._id}>
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
        ))}
    </Container>
  );
};

export default ItemList;
