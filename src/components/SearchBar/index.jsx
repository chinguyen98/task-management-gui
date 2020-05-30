import React from 'react';
import { Input, Row, Label, FormGroup, Col } from 'reactstrap';

function SearchBar({ handleTyping, handleChangeStatus, searchText, status }) {
  return (
    <Row>
      <Col className='mt-2' md={2}>
        <Label for='searchBar'>Search</Label>
      </Col>
      <Col md={7} className='md-form'>
        <Input
          className='form-control'
          type='search'
          id='searchBar'
          name='searchBar'
          value={searchText}
          onKeyUp={handleTyping}
        />
      </Col>
      <Col md={3}>
        <FormGroup>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={handleChangeStatus}
            defaultValue={status}
          >
            <option>ALL</option>
            <option>OPEN</option>
            <option>DONE</option>
          </Input>
        </FormGroup>
      </Col>
    </Row>
  )
}

export default SearchBar;