import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import wallet from '../images/wallet.png';




class ParentProfile extends React.Component {
  componentWillMount() {
      this.props.getCredits();
      console.log(this.props.profile);
  }

  handleCreditsSubmit(values) {
    this.props.addCredits(values);
  }

  handleProfileSubmit(values) {
    //console.log(values);
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
              name: {this.props.profile.name}
              surname: {this.props.profile.surname}
              email       {this.props.profile.email}
              telephone:          {this.props.profile.telephone}
              address: {this.props.profile.address}
              birthday:           {this.props.profile.birthday}

            </Block>
            <Block>
              <h1> Το πορτοφόλι μου </h1>
              <Inline>
                Πόντοι: {this.props.credits}
              </Inline>
              <Inline>
                <Form
                  model="Forms.parentAddCredits"
                  onSubmit={(val) => this.handleCreditsSubmit(val)}
                >
                      <Control
                        model=".credits"
                        placeholder="credits e.g. 10"
                        required
                        validateOn="blur"
                        component={FormControl}
                      />

                  <Button type="submit">Add credits!</Button>
                </Form>
              </Inline>
            </Block>
            <Block>
                <h1> Αλλαγή στοιχείων προφιλ Parent </h1>
                <Form
                  model="Forms.parentChangeProfile"
                  onSubmit={(val) => this.handleProfileSubmit(val)}
                >
                  <div className="field">
                      <label> Όνομα </label>
                      <Control.text
                        component={FormControl}
                        model=".name"
                      />
                      <label> Επώνυμο </label>
                      <Control.text
                        model=".surname"
                        component={FormControl}
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
                    <label> birthday </label>
                    <Control
                      type="number"
                      model=".birthday"
                      placeholder="99"
                      required
                      min={18}
                      validateOn="blur"
                      component={FormControl}
                    />
                    <Errors
                      className="errors"
                      model=".age"
                      show="touched"
                      messages={{
                        valueMissing: 'Age is required',
                        typeMismatch: 'Must be a number',
                        rangeUnderflow: 'Sorry, you must be at least 18 years old',
                      }}
                    />
                  </div>
                  <Button type="submit">Αλλαγή στοιχείων προφιλ!</Button>


                </Form>
            </Block>
  <Block>
            <h1> Αλλαγή στοιχείων Credential Parent </h1>
            <Form
              model="Forms.parentChangeCredentials"
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

export default ParentProfile;
