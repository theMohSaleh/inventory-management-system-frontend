import { useState, useContext } from 'react';
import * as itemsService from '../../services/itemsService'
import { AuthedUserContext } from '../../App'



function TestItemService() {
  const user = useContext(AuthedUserContext);
  const [testItemShow, setTestItemShow] = useState(null)
  const [itemCreated, setItemCreated] = useState(null)
  const [itemDeleted, setItemDeleted] = useState(null)

  const dummyData = {
    "name": "An Even Bigger Pen",
    "description": "GIANT GIANT Pen",
    "quantity": 145,
    "category": "Art Supplies",
    "owner": user._id,
  }

  const dummyDataUpdate = {
    "name": "none-typing Pen",
    "description": "smoll Pen",
    "quantity": 1,
    "category": "Art Supplies",
    "owner": user._id,
  }

  const getItem = async () => {
    try {
      const item = await itemsService.show('673afdb362ac71e716422e33');
      setTestItemShow(item);
    } catch (error) {
      console.log(error);
    }
  }
  
  const createItem = async () => {
    try {
      const newItem = await itemsService.create(dummyData);
      setItemCreated(newItem);
    } catch (error) {
      console.log(error);
    }
  }

  const updateItem = async () => {
    try {
      const item = await itemsService.update(dummyDataUpdate, '673d3352411c4bd1d919b2ab');
      setTestItemShow(item);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteItem = async () => {
    try {
      const deletedItem = await itemsService.remove('673d3352411c4bd1d919b2ab');
      setItemDeleted(deletedItem);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <section>
        <button onClick={getItem}>Get Item</button>
        <button onClick={createItem}>Create Item</button>
        <button onClick={updateItem}>Update Item</button>
        <button onClick={deleteItem}>Delete Item</button>
      </section>
    </main>
  )
}

export default TestItemService