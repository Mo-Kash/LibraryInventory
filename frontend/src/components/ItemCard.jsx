import React, {useState} from 'react';
import { Card, Button, Badge, Form, Row, Col, Alert } from 'react-bootstrap';

function ItemCard( {item, onUpdateQuantity, onBack} ) {

  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const getDemandColour = (rating)=>{
    switch (rating) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
      case 5: return 'dark';
      default: return 'secondary';
    }
  }

  const getDemandText = (rating)=>{
    switch(rating){
      case 1: return 'Low';
      case 2: return 'Medium-Low';
      case 3: return 'Medium';
      case 4: return 'High';
      case 5: return 'Very High';
      default: return 'Unknown';
    }
  }

  const getStockStatus = (quantity, rating)=>{
    const reqStock = rating*5; //idk

    if(quantity === 0) return {status: "Out of Stock", color: "danger"};
    if(quantity < reqStock*0.5) return {status: "Low Stock", color: "warning"};
    if(quantity < reqStock && quantity>=reqStock*0.5) return {status: "Moderate Stock", color: "info"};
    return {status: "Well Stocked", color: "success"};
  }

  const handleQuantityUpdate = async ()=>{
    if(newQuantity===item.quantity) return;

    setIsUpdating(true);
    setUpdateMessage('Updating quantity...');

    try {
      await onUpdateQuantity(item.id, parseInt(newQuantity));
      setUpdateMessage('Quantity updated successfully');
      setTimeout(()=>setUpdateMessage(''), 3000);
    } catch (error) {
      setUpdateMessage('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  }

  const categories = Array.isArray(item.categories)?item.categories:[];
  const types = Array.isArray(item.types)?item.types:[];
  const stockStatus = getStockStatus(item.quantity, item.demand_rating);
  const attributes = item.attributes || {};

  return (
    <Card className="border border-dark bporder-2 rounded-3">
      <Card.Header className="bg-dark text-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{item.name}</h4>
        <Button variant="outline-info" size="sm" onClick={onBack}>
          ← Back to List
        </Button>
      </Card.Header>
      <Card.Body>
        {
          updateMessage && (
            <Alert variant={updateMessage.includes('successfully') ? 'success':'danger'} dismissible>
              {updateMessage}
            </Alert>
          )
        }
        <Row>
          <Col md={8}>
            <h6>Description</h6>
            <p className="text-muted">{item.description}</p>
            <hr />
            <Row className="mb-3">
              <Col md={6}>
                <h6>Quantity</h6>
                <div className="d-flex align-items-center">
                  <span className="h5 mb-0 me-2">{item.quantity}</span>
                  <Badge bg={stockStatus.color}>{stockStatus.status}</Badge>
                </div>
              </Col>
              <Col md={6}>
                <h6>Price</h6>
                <span className="h5 text-primary">${item.price}</span>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <h6>Demand Rating</h6>
                <Badge bg={getDemandColour(item.demand_rating)} size="lg">
                  {getDemandText(item.demand_rating)} ({item.demand_rating}/5)
                </Badge>
              </Col>
              <Col md={6}>
                <h6>Recommended Stock:</h6>
                <span className="h7">{item.demand_rating * 5} units</span>
              </Col>
            </Row>

            {categories.length > 0 && (
              <div className="mb-3">
                <h6>Categories</h6>
                <div>
                  {categories.map((category, index) => (
                    <Badge key={index} bg="secondary" className="me-1">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {types.length > 0 && (
              <div className="mb-3">
                <h6>Type</h6>
                <div>
                  {types.map((type, index) => (
                    <Badge key={index} bg="primary" className="me-1">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(attributes).length > 0 && (
              <div className="mb-3">
                <h6>General Info</h6>
                <hr />
                <Row>
                  {Object.entries(attributes).map(([key, value]) => (
                    <Col key={key} md={6} className="mb-2">
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          <Col md={4}>
            <Card className="bg-light">
              <Card.Header>
                <h6 className="mb-0">Update Quantity</h6>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>New Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleQuantityUpdate}
                    disabled={isUpdating || newQuantity === item.quantity}
                    className="w-100"
                  >
                    {isUpdating ? 'Updating...' : 'Update Quantity'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ItemCard