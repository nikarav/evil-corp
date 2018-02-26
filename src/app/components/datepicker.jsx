import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import DatePicker from '../Utils/index';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import createReactClass from 'create-react-class';

const wapperDivStyle = { border: '1px solid #ccc' };
const scrollingDivStyle = { padding: '10px', height: '70px', overflow: 'auto' };

const dateChoose = createReactClass({

  getInitialState() {
    return {
      date: new Date().toISOString(),
      previousDate: null,
      minDate: null,
      maxDate: null,
      focused: false,
      invalid: false
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
  },

  render(){
    const LabelISOString = new Date().toISOString();
    return <Grid>
      <Row>
        <Col sm={6}>
          <FormGroup controlId="change_handler">
            <ControlLabel>Ημερομηνία</ControlLabel>
            <DatePicker onChange={this.handleChange} placeholder="MM/DD/YYYY" value={this.state.date} id="change_handler_example" />
          </FormGroup>
        </Col>
      </Row>
  </Grid>;
}
});
export default dateChoose;
