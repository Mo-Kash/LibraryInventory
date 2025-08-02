import { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Header from './components/Header';

function App() {
  const API_BASE_URL = 'http://localhost:3000/api';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(()=>{
    fetchInitialData();
  }, []);

  const fetchInitialData = async ()=>{
    try {
      setLoading(true);

      const [itemsResult, categoriesResult, typesResult] = await Promise.all( //Better than calling all three sequentially to improve load times
        [
          await axios.get(`${API_BASE_URL}/items`),
          await axios.get(`${API_BASE_URL}/categories`),
          await axios.get(`${API_BASE_URL}/categories/types`)
        ]
      );

      setItems(itemsResult.data); //result.data
      setCategories(categoriesResult.data);
      setTypes(typesResult.data);
    } catch (error) {
      setError("Failed to load initial data");
      console.error("Error fetching initial data: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Header 
        setSelectedItem={selectedItem}
        setSelectedCategory={selectedCategory}
        setShowAddForm={setShowAddForm}
      />
    </div>
  )
}

export default App
