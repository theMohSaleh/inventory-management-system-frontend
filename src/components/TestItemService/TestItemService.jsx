import { useState, useContext } from 'react';
import * as itemsService from '../../services/itemsService'
import { AuthedUserContext } from '../../App'



function TestItemService() {
  const user = useContext(AuthedUserContext);
  const [testItemShow, setTestItemShow] = useState(null)
  const [itemCreated, setItemCreated] = useState(null)

  const dummyData = {
    "name": "An Even Bigger Pen",
    "description": "GIANT GIANT Pen",
    "quantity": 145,
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

  return (
    <main>
      <section>
        <button onClick={getItem}>Get Item</button>
        <button onClick={createItem}>Create Item</button>
      </section>
    </main>
  )
}

export default TestItemService