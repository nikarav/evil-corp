import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';




class ProviderProfile extends React.Component {
  componentWillMount() {
    // console.log(this.props.profile);
    this.props.getData();
  }

  handleProfileSubmit(values) {
    console.log(values);
    this.props.changeProfile(values);
  }

  handleCredentialsSubmit(values) {
    console.log(values);
    this.props.changeCredentials(values);
  }

  render() {
        return (
          <Block>


            <Block
            textDecoration= "underline  "
            color="#20B2AA"

            >
              <h3> Στοιχεία Παρόχου </h3>

          </Block>

              <Block>
              <h4>Διέυθυνση: {this.props.profile.address}</h4>
            <h4>  Τραπεζικό iban: {this.props.profile.bank_iban}</h4>
            <h4>  Όνομα Εταιρείας: {this.props.profile.brand_name}</h4>
            <h4>  Email:{this.props.profile.email}</h4>
              <h4>Φορολογική Εγγραφή : {this.props.profile.tax_registration}</h4>
            <h4>  Τηλέφωνο:          {this.props.profile.telephone}</h4>

            </Block>



           <Block

           marginRight={900}
           textDecoration= "underline  "
           fontStyle="italic"
           color="#F4A460"



           >



              <h1> Αλλαγή στοιχείων προφιλ Provider</h1>
              <Form
                model="Forms.providerChangeProfile"
                onSubmit={(val) => this.handleProfileSubmit(val)}
              >
                <div className="field">
                    <label> Επωνυμία επιχείρησης </label>
                    <Control.text
                      component={FormControl}
                      model=".brand_name"
                    />
                </div>

                <div className="field">
                  <label>Email</label>
                  <Control
                    type="email"
                    model=".email"
                    placeholder="email@example.com"
                    required
                    validateOn="blur"
                    component={FormControl}
                  />
                  <Errors
                    className="errors"
                    model=".email"
                    show="touched"
                    messages={{
                      valueMissing: 'Email is required',
                      typeMismatch: 'Invalid email address',
                    }}
                  />
                </div>

                <div className="field">
                  <label> Διέυθυνση </label>
                  <Control.text
                    model=".address"
                    component={FormControl}
                  />

                    <label> Τηλέφωνο </label>
                    <Control.text
                      model=".telephone"
                      component={FormControl}
                    />

                </div>

                <div className="field">
                  <label> Φορολογική Εγγραφή </label>
                  <Control.text
                    // type="number"
                    model=".tax_registration"
                    placeholder="99"
                    required
                    min={18}
                    validateOn="blur"
                    component={FormControl}
                  />
                  <label> Τραπεζικό IBAN</label>
                  <Control.text
                    // type="number"
                    model=".bank_iban"
                    placeholder="99"
                    required
                    min={18}
                    validateOn="blur"
                    component={FormControl}
                  />
                </div>
                <Button type="submit" bsStyle="primary">Αλλαγή Στοιχείων Προφιλ</Button>


              </Form>
          </Block>





          <Block
          marginRight={100}
          textDecoration= "underline  "
          fontStyle="italic"

          color="#B22222"


          >
              <h1> Αλλαγή στοιχείων Credential Provider </h1>
          </Block>

<Block
marginRight={900}
textDecoration= "underline  "
fontStyle="italic"

color="#B22222"


>

          <Form
            model="Forms.providerChangeCredentials"
            onSubmit={(val) => this.handleCredentialsSubmit(val)}
          >
          <div className="field">
              <label>Όνομα Χρήστη</label>
              <Control.text
                model=".username"
                placeholder="username"
                required
                validators={{ maxLength: (val) => val.length <= 12 }}
                validateOn="blur"
                component={FormControl}
              />
              <Errors
                className="errors"
                model=".username"
                show="touched"
                messages={{
                  valueMissing: 'Username is required',
                  maxLength: 'Must be 12 characters or less'
                }}
              />

              <label> Κωδικός Πρόσβασης </label>
              <Control.text
                model=".password"
                component={FormControl}
                required
               />

               <Button type="submit"bsStyle="primary">Αλλαγή Διαπιστευτηρίων Χρήστη</Button>

          </div>
        </Form>
        </Block>
      </Block>
        );

  }
}

export default ProviderProfile;
