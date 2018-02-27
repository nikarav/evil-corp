import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
//import { getProviderActivitiesData } from '../actions/providers';

class ProviderStatistics extends React.Component{
  componentWillMount() {
      this.props.getActs();
      //console.log(this.props);
    }

findNewAct(act){
    var activ = [];
    var date = new Date();
    var i;
    for (i=0; i<act.length; i++){
      var dateNew = new Date(act[i].date);
        if(date.getTime() < dateNew.getTime()){
          activ.push(act[i]);
        }
}
    return activ;

}

findOldAct(act){
    var activ = [];
    var date = new Date();
    var i;
    for (i=0; i<act.length; i++){
      var dateNew = new Date(act[i].date);
        if(date.getTime() >= dateNew.getTime()){
          activ.push(act[i]);
        }
}
    return activ;

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
                  <td>{activ.name}</td>
                  <td>{activ.date.substring(0,10)}</td>
                  <td>{activ.total_tickets - activ.available_tickets}</td>
                  <td>{(activ.total_tickets - activ.available_tickets)*activ.price}</td>
                </tr>

              );
            });
}


    render(){
        const { posts } = this.props.activities;
        console.log(typeof(posts[0].date));
      return (
        <Block>
          <h4>Ιστορικό Δραστηριοτήτων</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Όνομα Δραστηριότητας</th>
                <th>Ημερομηνία</th>
                <th>Σύνολο Πωληθέντων εισιτηρίων</th>
                <th>Κέρδος(€)</th>
              </tr>
            </thead>
            <tbody>
              {this.calculateSums(this.findOldAct(posts))}
            </tbody>
          </Table>
            <h4>Μελλοντικές Δραστηριότητες</h4>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Όνομα Δραστηριότητας</th>
                  <th>Ημερομηνία</th>
                  <th>Σύνολο Πωληθέντων εισιτηρίων(μέχρι στιγμής)</th>
                  <th>Κέρδος(€)</th>
                </tr>
              </thead>
              <tbody>
                {this.calculateSums(this.findNewAct(posts))}
              </tbody>
            </Table>
        </Block>
      );
    }
}

export default ProviderStatistics;
