import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, TableHeaderColumn,BootstrapTable,FormControl, PageHeader, Row, Col, Grid, Table } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { isLocked, toogleLock, approveProvider, rejectProvider, forgot, changeEmail, getData, providersForApproval, userData} from '../actions/administrator'



class AdminPanel extends React.Component {

  componentWillMount(){
    this.props.getData();
    this.props.providersForApproval();
  }


  handleButton1(){
    this.props.isLocked({username: this.props.Forms.adminPanel.username});
  }
  handleButton2() {
    this.props.toogleLock({username: this.props.Forms.adminPanel.username});
  }

  handleButton3() {
    this.props.approveProvider({username: this.props.Forms.adminPanel.username});
  }

  handleButton4() {
    this.props.rejectProvider({username: this.props.Forms.adminPanel.username});
  }

  handleButton5() {
    this.props.forgot({username: this.props.Forms.adminPanel.username});
  }
  changeEmail(val){
    this.props.changeEmail({email: this.props.Forms.adminPanel.email});
  }

  handleButton6() {
    this.props.userData({username: this.props.Forms.adminPanel.username});
  }

  onProviderClick(provider){
    console.log("provider selected");
    console.log(provider.username);
  }









  renderProviders(providers) {




    return !providers?
    <div><h3> Δεν υπάρχουν πάροχοι για έγκριση </h3></div>
    :
    <div>


      <Block
        marginTop="auto"
        color="#48D1CC"
        textDecoration= "underline  "
        backgroundColor = "#F5F5DC"
>


      <h1> Πάροχοι προς έγκριση :</h1>


</Block>





    {providers.map((provider, index) => {
      return (




             <li key={index}  style={{color:  '	#C71585'}    }>

              <h2>  User {index+1} : {provider.username} </h2>
             </li>





          );




          }

        )
    }

        </div>
      }
  render() {

    // provider:: get data of a user (Provider or Parent)
    let get_userData = null;

      if (this.props.administrator.userData.role == "Parent"){
        get_userData = (



          <div>
              <h2> Στοιχεία parent που ζητήθηκαν </h2>
            name: '', {this.props.administrator.userData.parentData.name}
             surname: '', {this.props.administrator.userData.parentData.surname}
             email: '', {this.props.administrator.userData.parentData.email}
             telephone: '', {this.props.administrator.userData.parentData.telephone}
             address: '', {this.props.administrator.userData.parentData.address}
             birthday: '', {this.props.administrator.userData.parentData.birthday}
             numberOfTickets: '', {this.props.administrator.userData.parentData.numberOfTickets}

          </div>
        );


    } else if (this.props.administrator.userData.role == "Provider"){
       get_userData = (


         <div>
         <h2> Στοιχεία provider που ζητήθηκαν </h2>
        brand_name: '',  {this.props.administrator.userData.providerData.brand_name}
        email:    '',   {this.props.administrator.userData.providerData.email}
        telephone:  '', {this.props.administrator.userData.providerData.telephone}
        address:  '',   {this.props.administrator.userData.providerData.address}
        tax_registration: '', {this.props.administrator.userData.providerData.tax_registration}
        bank_iban: '', {this.props.administrator.userData.providerData.bank_iban}
      </div>);
    } else{
        get_userData = null;
    }


          return(

<div>

            <div>


              <Block
              marginTop={60}
              marginLeft="auto"
              marginRight="auto"
              textAlign="center"
              textDecoration= "underline  "
              backgroundColor = "#F5F5DC"
              color="#FF6347"


              >

              <h1>ΠΙΝΑΚΑΣ ΕΛΕΓΧΟΥ</h1>


            </Block>

            <Block
            marginTop={60}

            textAlign="center"
            textDecoration= "underline  "
            backgroundColor = "#F5F5DC"


            >

              <h2>Διαχείριση χρηστών απο τον administrator</h2>

            </Block>

          </div>





<div>


                <Block
                  fontWeight={900}
                  fontStyle="oblique"
                  textDecoration= "underline  "
                  backgroundColor = "#F5F5DC"


                  >
                  <h3>Administrator's Username: {this.props.administrator.profile.username}</h3>
                  <h3>Administrator's Email:    {this.props.administrator.profile.email}</h3>

                </Block>
              </div>





            <Form
              model="Forms.adminPanel"
            >


            <div className="field">

              <h3>Δώστε το όνομα χρήστη που θέλετε να διαχειριστείτε:</h3>
                <label> Username </label>
                <Control.text
                  model=".username"
                  placeholder="username"
                  required
                  validateOn="blur"
                  component={FormControl}
                />
            </div>
          </Form>


          <h3>Επιλογή ενέργειας:</h3>
          <Button bsStyle="primary" onClick={() => this.handleButton1()}> isLocked  </Button>
          <Button bsStyle="success" onClick={() => this.handleButton2()}> toggleLock  </Button>
          <Button bsStyle="info" onClick={() => this.handleButton3()}> approveProvider </Button>
          <Button bsStyle="warning" onClick={() => this.handleButton4()}> rejectProvider </Button>
          <Button bsStyle="danger" onClick={() => this.handleButton5()}> forgot </Button>
          <Button bsStyle="primary" onClick={() => this.handleButton6()}> get data of a user </Button>

          <Form
            model="Forms.adminPanel"
            onSubmit={(val) => this.changeEmail(val)}
          >



          <div className="field">


              <h3>Φόρμα αλλαγής στοιχείων Administrator:</h3>
              <label> Αλλαγή Email </label>
              <Control.text
                model=".email"
                placeholder="email"
                required
                validateOn="blur"
                component={FormControl}
              />
          </div>
          <Button bsStyle="danger" onClick={() => this.changeEmail()}> Αλλαγή email admin </Button>
        </Form>

        <ul>
          {this.renderProviders(this.props.administrator.profile.providers)}
        </ul>


        {get_userData}


        </div>

          );
      }

}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    administrator: state.administrator,
    Forms: state.Forms,
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps,
  {
    isLocked,
    toogleLock,
    approveProvider,
    rejectProvider,
    forgot,
    changeEmail,
    getData,
    providersForApproval,
    userData
  })
    (AdminPanel);
