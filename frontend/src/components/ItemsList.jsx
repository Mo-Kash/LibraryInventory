import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

function ItemsList( {items, onItemSelect} ) {
  
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

  return (
    <div>
      <h3 className="mb-3">{items.length==1?'1 Library Item':`${items.length} Library Items`}</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {
          items.map((item)=>{
            const categories = Array.isArray(item.categories)?item.categories:[];
            const types = Array.isArray(item.types)?item.types:[];
            const stockStatus = getStockStatus(item.quantity, item.demand_rating);
            
            return (
              <Col>
                <Card className="bg-light border border-2 rounded-4 border-dark">
                  <Card.Body>
                    <Card.Title className="h6 mb-2">{item.name}</Card.Title>
                    <Card.Text className="small text-muted mb-2">
                      {item.description}
                    </Card.Text>

                    <div className="mb-2">
                      <strong>Quantity:</strong> {item.quantity}
                      <Badge
                        bg={stockStatus.color}
                        className="ms-2"
                      >
                        {stockStatus.status}
                      </Badge>
                    </div>

                    <div className="mb-2">
                      <strong>Price:</strong> ₹{item.price}
                    </div>

                    <div className="mb-3">
                      <strong>Demand:</strong>
                      <Badge
                        bg={getDemandColour(item.demand_rating)}
                        className="ms-2"
                      >
                        {getDemandText(item.demand_rating)} ({item.demand_rating}/5)
                      </Badge>
                    </div>

                    {
                      categories.length > 0 &&(
                        <div className="mb-2">
                          <strong>Categories:</strong>
                          <div className="mt-1">
                            {
                              categories.map((category, index)=>(
                                <Badge key={index} bg="secondary" className="me-1">
                                  {category}
                                </Badge>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }

                    {
                      types.length > 0 &&(
                        <div className="mb-2">
                          <strong>Types:</strong>
                          <div className="mt-1">
                            {
                              types.map((type, index)=>(
                                <Badge key={index} bg="primary" className="me-1">
                                  {type}
                                </Badge>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }

                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={()=>onItemSelect(item)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default ItemsList