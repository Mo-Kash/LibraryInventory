import { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import Header from './components/Header';
import AddItemForm from "./components/AddItemForm";
import ItemCard from "./components/ItemCard";
import ItemList from "./components/ItemsList";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from './components/Filters';
import Footer from './components/Footer';

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

      console.log(`Requesting data at ${API_BASE_URL}/...`);
      const [itemsResult, categoriesResult, typesResult] = await Promise.all( //Better than calling all three sequentially to improve load times
        [
          await axios.get(`${API_BASE_URL}/items`),
          await axios.get(`${API_BASE_URL}/categories`),
          await axios.get(`${API_BASE_URL}/categories/types`)
        ]
      );

      setItems(itemsResult.data); //result.data
      console.log("Fetched Items: ", itemsResult.data);
      setCategories(categoriesResult.data);
      console.log("Fetched Categories: ", categoriesResult.data);
      setTypes(typesResult.data);
      console.log("Fetched Types: ", typesResult.data);
    } catch (error) {
      setError("Failed to load initial data");
      console.error("Error fetching initial data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCategorySelect = async (categoryId)=>{
    try {
      setSelectedCategory(categoryId);
      setSelectedItem(null);

      if(categoryId){
        const response = await axios.get(`${API_BASE_URL}/items/category/${categoryId}`);
        setItems(response.data);
      } else {
        const response = await axios.get(`${API_BASE_URL}/items`);
        setItems(response.data);
      }
    } catch (error) {
      setError('Failed to filter by category');
      console.error('Error filtering by category:', error);
    }
  }

  const handleItemSelect = (item)=>{
    setSelectedItem(item);
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const headers = {
        'Content-type':'application/json',
      }
      const response = await axios.patch(`${API_BASE_URL}/items/${itemId}/quantity`, {quantity: newQuantity}, { headers });

      const updatedItem = response.data;
      setItems(items.map(item=> item.id===itemId ? updatedItem:item));
      
      if(selectedItem && selectedItem.id === itemId){
        setSelectedItem(updatedItem);
      }
    } catch (error) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', error);
    }
  }

  const handleAddItem = async (itemData)=>{
    try {
      const headers = {
        "Content-Type": "application/json",
      }
      const response = await axios.post(`${API_BASE_URL}/items`, itemData, {headers});
      setItems([...items, response.data]);
      setShowAddForm(false);
    } catch (error) {
      setError('Failed to add item');
      console.error("Error adding item: ", error);
    }
  }

  return (
    <div className="App">
      <Header 
        setShowAddForm={setShowAddForm}
      />
      <Container fluid className="center">
        <Row>
          <Col md={3}> 
            <Filters 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </Col>
          <Col md={6}>
            {
              showAddForm?(
                <AddItemForm 
                  categories={categories}
                  types={types}
                  onSubmit={handleAddItem}
                  onCancel={()=>setShowAddForm(false)}
                />
              ) : selectedItem ? (
                <ItemCard 
                  item={selectedItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  onBack={()=>setSelectedItem(null)}
                />
              ) : (
                <ItemList 
                  items={items}
                  onItemSelect={handleItemSelect}
                />
              )
            }
          </Col>
          <Col md={3}>
            {/* Additional section for later */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
