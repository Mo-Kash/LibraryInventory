import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

function AddItemForm( {categories, types, onSubmit, onCancel} ) {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0.00,
    demand_rating: 3,
    categories: [],
    types: [],
    attributes: {}
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));

    if(errors[name]){
      setErrors(prev=>({
        ...prev, 
        [name]:''
      }));
    }
  }

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleTypeChange = (typeId) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter(id => id !== typeId)
        : [...prev.types, typeId]
    }));
  };

  const handleAttributeChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

    const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater';
    }
    
    if (formData.price < 0) {
      newErrors.price = 'Price must be 0 or greater';
    }
    
    if (formData.demand_rating < 1 || formData.demand_rating > 5) {
      newErrors.demand_rating = 'Demand rating must be between 1 and 5';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-dark rounded-3">
      <Card.Header className="bg-dark text-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Add New Item</h4>
        <Button variant="outline-info" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isValid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price *</Form.Label>
                <Form.Control 
                  type="number" 
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  isValid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Demand Rating *</Form.Label>
                <Form.Select
                  name="demand_rating"
                  value={formData.demand_rating}
                  onChange={handleInputChange}
                  isInvalid={!!errors.demand_rating}
                >
                  <option value={1}>1 - Low</option>
                  <option value={2}>2 - Medium-Low</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Very High</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.demand_rating}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categories</Form.Label>
                  <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {
                      categories.map((category)=>(
                        <Form.Check 
                          key={category.id}
                          type="checkbox"
                          id={`category-${category.id}`}
                          label={category.name}
                          checked={formData.categories.includes(category.id)}
                          onChange={()=>handleCategoryChange(category.id)}
                        />
                      ))
                    }
                  </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Types</Form.Label>
                  <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {
                      types.map((type)=>(
                        <Form.Check 
                          key={type.id}
                          type="checkbox"
                          id={`type-${type.id}`}  
                          label={type.name}
                          checked={formData.categories.includes(type.id)}
                          onChange={()=>handleCategoryChange(type.id)}
                        />
                      ))
                    }
                  </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
              <Form.Label>Additional Attributes (Optional)</Form.Label>
                <div className="border rounded p-3">
                  <Row>
                    <Col md={6}>
                      <Form.Control 
                        type="text"
                        placeholder="Attributes, such as author/platform/pages/etc..."
                        className="mb-2"
                        onKeyPress={(e)=>{
                          if(e.key === 'Enter'){
                            e.preventDefault();
                            const value = e.target.value.trim();
                            if(value){
                              handleAttributeChange(value, "");
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  {
                    Object.keys(formData.attributes).map((key)=>(
                      <Row>
                        <Col md={4}>
                          <Form.Control 
                            type="text"
                            value={key}
                            disabled
                            className="bg-light"
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Control 
                            type="text"
                            placeholder="Value"
                            value={formData.attributes[key]}
                            onChange={(e) => handleAttributeChange(key, e.target.value)}
                          />
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={()=>{
                              const newAtt = {...formData.attributes};
                              delete newAtt[key];
                              setFormData(prev=>({
                                ...prev,
                                attributes: newAtt
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))
                  }
                </div>
            </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="info" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddItemForm