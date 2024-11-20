// src/components/ItemDetails/ItemDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as itemService from '../../services/itemsService';
import * as logsService from '../../services/logsService';

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [owner, setOwner] = useState(null);
  const [logs, setLogs] = useState([]);

  // Fetch item details and owner info
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await itemService.show(itemId);
        setItem(itemData);

        // Fetch owner details if item is fetched successfully
        if (itemData.owner) {
          const ownerData = await itemService.getOwner(itemData.owner);
          setOwner(ownerData);
        }
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
  }, [itemId]);

  if (!item) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>{item.name}</h1>
        <p>Description: {item.description}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Category: {item.category}</p>
        {owner ? (
          <p>Owner: {owner.username}</p>
        ) : (
          <p>Owner ID: {item.owner}</p>
        )}
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
