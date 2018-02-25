import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';




class ProviderProfile extends React.Component {
  componentWillMount() {
    console.log(this.props.profile);
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
            <Block>
              <h3> Στοιχεία Provider </h3>
              address: {this.props.profile.address}
              bank_iban: {this.props.profile.bank_iban}
              brand_name: {this.props.profile.brand_name}
              email       {this.props.profile.email}
              tax_registration:           {this.props.profile.tax_registration}
              telephone:          {this.props.profile.telephone}

            </Block>
           <Block>
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
                  <label> address </label>
                  <Control.text
                    model=".address"
                    component={FormControl}
                  />

                    <label> telephone </label>
                    <Control.text
                      model=".telephone"
                      component={FormControl}
                    />

                </div>

                <div className="field">
                  <label> tax registration </label>
                  <Control
                    type="number"
                    model=".tax_registration"
                    placeholder="99"
                    required
                    min={18}
                    validateOn="blur"
                    component={FormControl}
                  />
                  <label> IBAN bank </label>
                  <Control
                    type="number"
                    model=".bank_iban"
                    placeholder="99"
                    required
                    min={18}
                    validateOn="blur"
                    component={FormControl}
                  />
                </div>
                <Button type="submit">Αλλαγή στοιχείων προφιλ!</Button>


              </Form>
          </Block>


<Block>
          <h1> Αλλαγή στοιχείων Credential Provider </h1>
          <Form
            model="Forms.providerChangeCredentials"
            onSubmit={(val) => this.handleCredentialsSubmit(val)}
          >
          <div className="field">
              <label>Username</label>
              <Control.text
                model=".username"
                placeholder="username"
                required
                validators={{ maxLength: (val) => val.length <= 10 }}
                validateOn="blur"
                component={FormControl}
              />
              <Errors
                className="errors"
                model=".username"
                show="touched"
                messages={{
                  valueMissing: 'Username is required',
                  maxLength: 'Must be 10 characters or less'
                }}
              />

              <label> Password </label>
              <Control.text
                model=".password"
                component={FormControl}
               />

               <Button type="submit">Αλλαγή Credentials!</Button>

          </div>
        </Form>
        </Block>
      </Block>
        );

  }
}

export default ProviderProfile;
