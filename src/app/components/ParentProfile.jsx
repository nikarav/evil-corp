import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import wallet from '../images/wallet.png';

const popoverRight = (
<Popover
id="popover-basic"
    placement="right"
    positionLeft={380}
    positionTop={350}
    >
  Για εισαγωγή <strong>50-100</strong>  πόντων υπάρχει bonus 3 πόντων, ενω για εισαγωγή <strong>περισσότερων απο 100</strong> , υπάρχει bonus 7 πόντων! Επιπλέον <strong>για κάθε 10 εισιτήρια</strong> δίνεται bonus 10 πόντων!
</Popover>
);



class ParentProfile extends React.Component {
  componentWillMount() {
      this.props.getCredits();
      this.props.getData();
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
          <Block

          marginBot= {5}
          >



            <Block
textDecoration= "underline  "
color="#20B2AA"

             >
              <h3> Στοιχεία Χρήστη </h3>
</Block>
              <Block>
              <h4> Όνομα: {this.props.profile.name} </h4>
            <h4>  Επώνυμο: {this.props.profile.surname}</h4>
            <h4>  Email  : {this.props.profile.email}</h4>
              <h4>Τηλέφωνο:{this.props.profile.telephone}</h4>
            <h4>  Διεύθυνση: {this.props.profile.address}</h4>
            <h4>  Ημ/νια Γέννησης:        {this.props.profile.birthday}</h4>

            </Block>



            <Block
            marginRight={900}
            textDecoration= "underline  "
            fontStyle="italic"
            color="#F4A460"


            >









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


                      <ButtonToolbar>

                      <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
                      <Button bsStyle="info">Bonus Πόντοι</Button>
                      </OverlayTrigger>
                      </ButtonToolbar>

                  <Button type="submit" bsStyle="warning">Εισαγωγή Πόντων</Button>
                </Form>
              </Inline>
            </Block>




            <Block

            marginRight={900}
            textDecoration= "underline  "
            fontStyle="italic"

            color="#B22222"



            >
            <h1> Αλλαγή στοιχείων Προφιλ Parent </h1>

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
                    <label> Ημ/νια γέννησης </label>
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
                  <Button type="submit" bsStyle="primary">Αλλαγή Στοιχείων Προφιλ</Button>


                </Form>
            </Block>



  <Block

  marginRight={900}
  fontStyle="italic"
  textDecoration= "underline  "
  color="#228B22"

  >

  <h1> Αλλαγή στοιχείων Credential Parent </h1>

            <Form
              model="Forms.parentChangeCredentials"
              onSubmit={(val) => this.handleCredentialsSubmit(val)}
            >
            <div className="field">
                <label>Όνομα Χρήστη</label>
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

                <label> Κωδικός Πρόσβασης </label>
                <Control.text
                  model=".password"
                  component={FormControl}
                 />

                 <Button type="submit" bsStyle="primary">Αλλαγή Διαπιστευτηρίων Χρήστη</Button>

            </div>
          </Form>
          </Block>
      </Block>
        );

  }
}

export default ParentProfile;
