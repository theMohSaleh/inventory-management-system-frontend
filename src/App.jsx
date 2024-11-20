// Modules
import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import TestItemService from './components/TestItemService/TestItemService';
// Services
import * as authService from '../src/services/authService';
import * as itemsService from '../src/services/itemsService'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [items, setItems] = useState([])

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  useEffect(() => {
    async function getItems() {
      try {
        const allItems = await itemsService.index();
        if (items.error) {
          throw new Error(items.error)
        }
        setItems(allItems);
      } catch (error) {
        console.log(error);
      }
    }

    getItems();
  }, [])

  // handle functions
  const handleAddItem = async (itemFormData) => {
    try {
      const newItem = await itemsService.create(itemFormData);
      setItems([...items, newItem]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditItem = async (itemFormData, itemId) => {
    try {
      const editedItem = await itemsService.update(itemFormData, itemId);
      const updatedItems = items.map((item) => {
        if (item._id === editedItem._id) {
          return editedItem
        } else {
          return item
        }
      })
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveItem = async () => {
    try {
      const deletedItem = await itemsService.remove('673d3352411c4bd1d919b2ab');
      setItemDeleted(deletedItem);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/test" element={<TestItemService
                items={items}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />} />
            </>

          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path='/signup' element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;