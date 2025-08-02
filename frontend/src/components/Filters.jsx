import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function Filters( {categories, selectedCategory, onCategorySelect} ) {

  console.log("Categories For filter section: ", categories);
  const handleCategorySelection = (categoryId)=>{
    if(selectedCategory === categoryId){
      onCategorySelect(null); //deselect category if already selected
    } else {
      onCategorySelect(categoryId);
    }
  }

  return (
    <Card className="bg-dark text-light">
      <Card.Header>
        <h5>Categories</h5>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item
          action //makes it clickable
          active={selectedCategory === null} //set as active if no category is selected
          onClick={()=>onCategorySelect(null)}
          className="cursor-pointer"
        >
          All Items
        </ListGroup.Item>
        {
          categories.map((category)=>(
            <ListGroup.Item
              key={category.id}
              action
              active = {selectedCategory === category.id} //set category as active if clicked
              onClick={()=>handleCategorySelection(category.id)}
              className="cursor-pointer"
            >
              {category.name}
              {
                category.description && (
                  <small className="text-muted d-block">{category.description}</small>
                )
              }
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card>
  )
}

export default Filters