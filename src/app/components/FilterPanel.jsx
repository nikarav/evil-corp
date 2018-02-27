import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Button, FormGroup, FormControl , Media} from 'react-bootstrap';
import {Form ,Control} from 'react-redux-form';
import {Col } from 'jsxstyle';
// import Slider,{Range} from 'rc-slider';

class FilterPanel extends React.Component {
  handleSubmit(val){
    console.log("handleSubmit");
    console.log(val);
    this.props.search(val);
  }


  render() {

    return (
      <Col>
        <h1> Φίλτρα Αναζήτησης </h1>

      <Form
        model="Forms.filterPanel"
        onSubmit={(val, event) => this.handleSubmit(val, event)}
        >
        <div className="field">
          <label> Κείμενο </label>
          <Control.text
            component={FormControl}
            model=".text"
          />
          <label> Ελάχιστη Ηλικεία </label>
          <Control.text
            model=".min_age"
            component={FormControl}
          />
        </div>

        <div className="field">
          <label> Μέγιστη Ηλικεία </label>
          <Control.text
            component={FormControl}
            model=".max_age"
          />
          <label> Ελάχιστη τιμή </label>
          <Control.text
            component={FormControl}
            model=".min_price"
          />
          <label> Μέγιστη τιμή </label>
          <Control.text
            component={FormControl}
            model=".max_price"
          />
        </div>




        <Button type="submit"

        bsStyle="success">
          Αναζήτηση
        </Button>
      </Form>
    </Col>
    );
  }
}

export default FilterPanel;
