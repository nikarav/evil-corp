import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createActivity } from '../actions/ActivityShow';
import { Button, FormControl,Block, DatePicker, FormGroup,ControlLabel, HelpBlock } from 'react-bootstrap';








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

              <h1> Προσθήκη Νέας Δραστηριότητας </h1>

                <Form
                        model="Forms.newActivity"
                        encType="multipart/form-data"
                        onSubmit={(val, event) => this.handleSubmit(val, event)}
                    >




                  <div className="field">
                    <label> Όνομα Δραστηριότητας</label>
                    <Control.text model=".name" required />
                  </div>


                  <div className="field">
                    <label> Τοποθεσία </label>
                    <Control.text model=".location" required />
                  </div>
                  <div className="field">
                    <label> Περιγραφή Δραστηριότητας </label>
                    <Control.textarea model=".description" required />
                  </div>
                    </Form>


                    <Form
                            model="Forms.newActivity"
                            encType="multipart/form-data"
                            onSubmit={(val, event) => this.handleSubmit(val, event)}
                        >





                  <div className="field">
                    <label> Ημερομηνία </label>
                    <Control.text model=".date" />
                  </div>


</Form>           


                  <Form
                      model="Forms.newActivity"
                      encType="multipart/form-data"
                      onSubmit={(val, event) => this.handleSubmit(val, event)}
                  >

                  <div className="field">
                    <label> Φωτο </label>
                    <Control.file model=".photo" />
                  </div>
                  <div className="field">
                    <label> Μέγιστος αριθμός διαθέσιμων εισιτηρίων </label>
                    <Control
                                type="number"
                                model=".total_tickets"
                                placeholder="99"
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
                  <div className="field">
                    <label> Ηλικίες που απευθύνεται η δραστηριότητα </label>
                    <h1>Από</h1>
                    <Control
                                type="number"
                                model=".min_age"
                                placeholder="5"
                                required
                                min={2}
                                validateOn="blur"
                            />
                    <h1>Μέχρι</h1>
                    <Control
                                type="number"
                                model=".max_age"
                                placeholder="5"
                                required
                                max={17}
                                validateOn="blur"
                            />
                    <Errors
                                className="errors"
                                model=".age"
                                show="touched"
                                messages={{
                                    valueMissing: 'Age is required',
                                    typeMismatch: 'Must be a number',
                                    rangeUnderflow: 'Sorry, you must be at least 2 years old',
                                    rangerUpperflow: 'Age should be less or equal to 17',
                                }}
                            />
                  </div>
                  <div>
                    <label> Επέλεξε κατηγορία</label>
                    <Control.select
                                model="user.tags"
                                required
                                validateOn="blur"
                            >
                      <option value="athletics">Αθλητισμός</option>
                      <option value="music">Μουσική</option>
                      <option value="dance">Χορός</option>
                    </Control.select>
                  </div>
                  <div className="field">
                    <label> Ορίστε τιμή εισιτηρίου </label>
                    <Control
                                type="number"
                                model=".price"
                                placeholder="€€"
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
                  <Button type="submit">Προσθήκη Δραστηριότητας</Button>
                </Form>



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
