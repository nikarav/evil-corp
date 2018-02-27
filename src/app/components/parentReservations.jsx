import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
//import { getProviderActivitiesData } from '../actions/providers';

class parentReservations extends React.Component{
  componentWillMount() {
      this.props.getData();
      //console.log(this.props);
    }

calculateSums(act){
     var i;
    return !act?
        <h1> No available Activities</h1>
          :
          act.map((activ, index) => {
            return (
                <tr>
                  <td>{index+1}</td>
                  <td>{this.props.profile.tickets[index]}</td>
                </tr>

              );
            });
}


    render(){
      return (
        <Block>
          <h1>  MPHKA</h1>
          <h4>Συναλλαγές που τρέχουν: {this.props.profile.pendingTransactions.length}</h4>

          <div>
            <h4>Σύνολο Εισιτηρίων: {this.props.profile.numberOfTickets}</h4>
          </div>
          <h4>Ιστορικό Aγορών</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Id Εισιτηρίου </th>
                <th>Pdf</th>
              </tr>
            </thead>
            <tbody>
              {this.calculateSums(this.props.profile.tickets)}
            </tbody>

            </Table>
        </Block>
      );
    }
}

export default parentReservations;
