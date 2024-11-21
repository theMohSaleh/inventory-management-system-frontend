// src/components/ItemDetails/ItemDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as itemService from '../../services/itemsService';
import * as logsService from '../../services/logsService';
import { Container, Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AuthedUserContext } from '../../App';

const ItemDetails = (props) => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [logs, setLogs] = useState([]);
  const user = useContext(AuthedUserContext);

  // Fetch item details and owner info
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await itemService.show(itemId);
        setItem(itemData);

      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };
    fetchItem();
  }, [itemId]);

  // Fetch logs related to the item
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const allLogs = await logsService.show(itemId);
        setLogs(allLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchLogs();
  }, [item]);

  const handleDelete = async () => {
    try {
      await props.handleRemoveItem(itemId);
      navigate("/items");
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!item) return <Container> Loading... <Spinner /></Container>;

  return (
    <Container className='mt-2'>
      <header>
        <Container>
          <h1>{item.name}</h1>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.category}</p>
          <p>Owner: {item.owner.username}</p>
        </Container>
        <Container>
          {/* Edit and Delete Buttons - Only if the user is the owner */}
          {user && user._id === item.owner._id && (
            <>
              <Link className='me-3' to={`/items/${item._id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={handleDelete}>Delete</Button>
            </>
          )}
        </Container>
      </header>
      <Container className='mt-5'>
        <h2>Logs</h2>
        {logs.length > 0 ? (
          <Container>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Item:</th>
                  <th>Action:</th>
                  <th>Details:</th>
                  <th>Date:</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>{log.item}</td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                    <td>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <p>No logs found for this item.</p>
        )}
      </Container>
    </Container>
  );
};

export default ItemDetails;
