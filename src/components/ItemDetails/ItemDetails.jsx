// src/components/ItemDetails/ItemDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as itemService from '../../services/itemsService';
import * as logsService from '../../services/logsService';
import { AuthedUserContext } from '../../App';

const ItemDetails = (props) => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [owner, setOwner] = useState(null);
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

  if (!item) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>{item.name}</h1>
        <p>Description: {item.description}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Category: {item.category}</p>
        <p>Owner: {item.owner.username}</p>
        <div>
          {/* Edit and Delete Buttons - Only if the user is the owner */}
          {user && user._id === item.owner._id && (
            <>
              <Link to={`/items/${item._id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </header>
      <section>
        <h2>Logs</h2>
        {logs.length > 0 ? (
          <dl>
            {logs.map((log) => (
              <section key={log._id}>
                <dt>Item:</dt>
                <dd>{log.item}</dd>
                <dt>Action:</dt>
                <dd>{log.action} - {log.details}</dd>
                <dt>Date:</dt>
                <dd>{new Date(log.timestamp).toLocaleDateString()}</dd>
              </section>
            ))}
          </dl>
        ) : (
          <p>No logs found for this item.</p>
        )}
      </section>
    </main>
  );
};

export default ItemDetails;
