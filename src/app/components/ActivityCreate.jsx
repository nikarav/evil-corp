import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createActivity } from '../actions/ActivityShow';
import { Button, FormControl } from 'react-bootstrap';
import { Block } from 'jsxstyle';
//import dateChoose from '../components/datepicker';


class ActivityCreate extends React.Component {
    handleSubmit(values, event) {
        if (this.props.user.authenticated_provider) {
            const formData = new FormData(event.target);
            this.props.createActivity(formData);
            event.preventDefault();
        }
    }

    render() {
        if (this.props.user.authenticated_provider) {
            return (
              <div>


                <Block color="#4B0082"
                marginTop={60}
                marginBot = {100}
                marginRight={400}
                marginLeft={400}
                borderRadius={50}
                textAlign= "center"
                textDecoration= "underline  "
                fontStyle="normal"

                backgroundColor = "#E0FFFF"
                >

                <h1> Προσθήκη Νέας Δραστηριότητας </h1>
                </Block>




                <Block color="#4B0082"
                marginTop={0}
                marginBot= {150}
                fontStyle="oblique"
                // textDecoration= "underline  "
                backgroundColor = "	#E6E6FA"
                borderRadius={100}
                marginRight={400}
                marginLeft={400}
                >

                <Form
                        model="Forms.newActivity"

                        onSubmit={(val, event) => this.handleSubmit(val, event)}

                    >




                      <Block color="#4B0082"
                      fontWeight={900}
                      fontStyle="oblique"
                      // textDecoration= "underline  "
                      marginRight = {100}
                      marginLeft = {100}
                      marginTop = {60}
                      textAlign = "left"
                      fontSize = "150% "

                      >

                  <div className="field">
                    <label> Όνομα Δραστηριότητας:</label>
                    <Control.text
                      placeholder="Δώστε το όνομα της Δραστηριότητας"
                      component={FormControl}
                      model=".name" required />
                  </div>

                  </Block>

                  <Block color="#4B0082"
                  fontWeight={900}
                  fontStyle="oblique"
                  // textDecoration= "underline  "
                  marginRight = {100}
                  marginLeft = {100}
                  marginTop = {20}
                  textAlign = "left"
                  fontSize = "150% "

                  >

                  <div className="field">
                    <label> Τοποθεσία :</label>
                    <Control.text
                      placeholder="π.χ. 37.53 , 23.63  (Γεωγραφικό μήκος/πλάτος)"
                      component={FormControl}
                      model=".location" required />
                  </div>

                  </Block>

                  <Block color="#4B0082"
                  fontWeight={900}
                  fontStyle="oblique"
                  // textDecoration= "underline  "
                  marginRight = {100}
                  marginLeft = {100}
                  marginTop = {20}
                  textAlign = "left"
                  fontSize = "150% "

                  >


                  <div className="field">
                    <label> Περιγραφή Δραστηριότητας :</label>
                    <Control.textarea
                      type="text"
                      placeholder="Γράψτε εδώ την περιγραφή σας..."
                      component={FormControl}
                      model=".description" required />
                  </div>
                  {/* <div className="field"   className="row h-100 justify-content-center align-items-center">
                    <Control model=".date"
                      component={dateChoose}

                    /> */}
                    </Block>

                    <Block color="#4B0082"
                    fontWeight={900}
                    fontStyle="oblique"
                    // textDecoration= "underline  "
                    marginRight = {110}
                    marginLeft = {120}
                    marginTop = {20}
                    textAlign = "left"
                    fontSize = "150% "

                    >

                    <div className="field"   className="row h-100 justify-content-center align-items-center">
                      <label>Ημερομηνία Διεξαγωγής Δραστηριότητας:</label>
                      <Control.text
                        type="date"
                        placeholder="ΗΗ/ΜΜ/ΕΕΕΕ"
                        component = {FormControl}
                        model=".date"

                      />
                    </div>


                    </Block>



                    <Block color="#4B0082"
                    fontWeight={900}
                    fontStyle="oblique"
                    // textDecoration= "underline  "
                    marginRight = {100}
                    marginLeft = {100}
                    marginTop = {20}
                    textAlign = "left"
                    fontSize = "150% "

                    >


                  <div className="field" class="container h-100">
                    <label> Φωτογραφία Εκδήλωσης </label>
                    <Control.file model=".photo" />
                  </div>





                </Block>



                <Block color="#4B0082"
                fontWeight={900}
                fontStyle="oblique"
                // textDecoration= "underline  "
                marginRight = {100}
                marginLeft = {100}
                marginTop = {20}
                textAlign = "left"
                fontSize = "150% "

                >



                  <div className="field">
                    <label> Μέγιστος αριθμός διαθέσιμων εισιτηρίων </label>
                    <Control
                                type="number"
                                model=".total_tickets"
                                placeholder="99"
                                component= {FormControl}
                                required
                                min={0}
                                validateOn="blur"
                            />
                    <Errors
                                className="errors"
                                model=".total_tickets"
                                show="touched"
                                messages={{
                                    valueMissing: 'Tickets is required',
                                    typeMismatch: 'Must be a number',
                                }}
                            />
                  </div>


                  </Block>





                                  <Block color="#4B0082"
                                  fontWeight={900}
                                  fontStyle="oblique"
                                  // textDecoration= "underline  "
                                  marginRight = {100}
                                  marginLeft = {100}
                                  marginTop = {40}
                                  textAlign = "left"
                                  fontSize = "150% "

                                  >

                  <div className="field">


                     <label>
                        Ηλικίες που απευθύνεται η δραστηριότητα: </label>




                    <h3>Από:</h3>
                    <Control
                                type="number"
                                model=".min_age"
                                placeholder="5"
                                required
                                min={5}
                                validateOn="blur"
                            />
                    <h3>Μέχρι:</h3>
                    <Control
                                type="number"
                                model=".max_age"
                                placeholder="16"
                                required
                                max={16}
                                validateOn="blur"
                            />
                    <Errors
                                className="errors"
                                model=".age"
                                show="true"
                                messages={{
                                    valueMissing: 'Age is required',
                                    typeMismatch: 'Must be a number',
                                    rangeUnderflow: 'Sorry, the kid be at least 5 years old',
                                    rangerUpperflow: 'Age should be less or equal to 16',
                                }}
                            />
                  </div>

                    </Block>





                    <Block color="#4B0082"
                    fontWeight={900}
                    fontStyle="oblique"
                    // textDecoration= "underline  "
                    marginRight = {100}
                    marginLeft = {100}
                    marginTop = {40}
                    textAlign = "left"
                    fontSize = "150% "

                    >


                  <div>
                    <label> Επιλέξτε κατηγορία δραστηριότητας: </label>
                    <Control.select
                                model="user.tags"
                                required
                                validateOn="blur"
                            >
                      <option value="athletics">Αθλητισμός</option>
                      <option value="music">Μουσική</option>
                      <option value="dance">Χορός</option>
                      <option value="kallitexnika">Καλλιτεχνικά</option>
                      <option value="theater">Θέατρο</option>

                    </Control.select>
                  </div>


                    </Block>



                    <Block color="#4B0082"
                    fontWeight={900}
                    fontStyle="oblique"
                    // textDecoration= "underline  "
                    marginRight = {100}
                    marginLeft = {100}
                    marginTop = {40}
                    textAlign = "left"
                    fontSize = "150% "

                    >




                  <div className="field">
                    <label> Ορίστε τιμή εισιτηρίου: </label>
                    <Control
                                type="number"
                                model=".price"
                                placeholder="€€"
                                component = {FormControl}
                                required
                                min={0}
                                validateOn="blur"
                            />
                    <Errors
                                className="errors"
                                model=".price"
                                show="touched"
                                messages={{
                                    valueMissing: 'Price is required',
                                    typeMismatch: 'Must be a number',
                                }}
                            />
                  </div>
                  </Block>



                  <Block

                  marginRight = {100}
                  marginLeft = {100}
                  marginTop = {40}
                  marginBot = {40}



                  >

                  <Button type="submit" bsStyle = "primary"> <strong> Προσθήκη Δραστηριότητας </strong> </Button>
                  </Block>

                </Form>

              </Block>


              </div>

            );
        }
        else{
          return(
            <div>
              <h1>Access Denied</h1>
            </div>
          );
        }


    }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {createActivity})(ActivityCreate);
