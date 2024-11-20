import { useState } from 'react';
import * as itemsService from '../../services/itemsService'

function TestItemService() {
  const [testItemShow, setTestItemShow] = useState(null)

  const getItem = async () => {
    try {
      const item = await itemsService.show('673afdb362ac71e716422e33');
      setTestItemShow(item);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <section>
        <button onClick={getItem}>Get Item</button>
      </section>
    </main>
  )
}

export default TestItemService