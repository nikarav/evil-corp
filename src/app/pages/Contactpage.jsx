import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import  { Badges } from 'react-bootstrap';
import  { Grid, Row, Col, Image, Media, PageHeader, Panel } from 'react-bootstrap';
import telephone from '../images/telephone.png';
import email from '../images/email.png';
import msg from '../images/msg.png';
import NotificationComponent from '../components/NotificationComponent';
import ContactForm from '../containers/ContactForm';


const Contactpage = () => {
  return (
    <Route
        render={() => {
      return (



<div>


<Block
marginTop={60}
>

<Navigation />
<NotificationComponent />

</Block>



<Block
        marginTop={60}
        marginBot= {60}
        color="#4B0082"
        fontWeight={900}
        fontStyle="oblique"
        textDecoration= "underline  "
        backgroundColor = "#8FBC8F"
        textAlign= "center"
        borderRadius={50}
        marginRight={100}
        marginLeft={100}
>

              <h1>Επικοινωνία  </h1>


</Block>


<Image src={telephone}   height ={45} width ={45} alt="Cinque Terre" />



<Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">Τηλέφωνο</Panel.Title>
    </Panel.Heading>
    <Panel.Body>Οι εκπρόσωποί μας εξυπηρέτησης πελατών είναι διαθέσιμοι μέσω τηλεφώνου 24 ώρες την ημέρα, 7 ημέρες την εβδομάδα.
    Παρακαλούμε καλέστε μας στο : 2106671046-047</Panel.Body>
  </Panel>

  <Image src={email}   height ={45} width ={45}  />


  <Panel bsStyle="success">
    <Panel.Heading>
      <Panel.Title componentClass="h3">Email</Panel.Title>
    </Panel.Heading>
    <Panel.Body>24 ώρες την ημέρα . 7 ημέρες την εβδομάδα.</Panel.Body>
  </Panel>

  <Image src={msg}   height ={45} width ={45}  />



  <Panel bsStyle="info">
    <Panel.Heading>
      <Panel.Title componentClass="h3">Μήνυμα</Panel.Title>
    </Panel.Heading>
    <Panel.Body>Επικοινωνήστε μαζί μας μέσω της παρακάτω φόρμας.</Panel.Body>
  </Panel>

<ContactForm />
<NotificationComponent />



</div>

      );
    }}
    />
  );
};

export default Contactpage;
