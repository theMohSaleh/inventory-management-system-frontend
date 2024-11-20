import { useState, useContext } from 'react';
import * as itemsService from '../../services/itemsService'
import { AuthedUserContext } from '../../App'



function TestItemService(props) {
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
    props.handleAddItem(dummyData);
  }
  
  const updateItem = async () => {
    props.handleEditItem(dummyDataUpdate, '673d373c411c4bd1d919b2ee');
  }

  const deleteItem = async () => {
    
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