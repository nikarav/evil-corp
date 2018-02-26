// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import {  Button, FormGroup, FormControl , Media} from 'react-bootstrap';
//
// class FilterPanel extends React.Component {
//   handleClick(post){
//     console.log("handleClick");
//   }
//   handleClickMap(posts){
//     console.log("handleClick");
//     console.log(post._id);
//     console.log(post.photo);
//   }
//
//
//   render() {
//
//     return (
//       <div>
//         <h1>
//   Εγγραφή ως πάροχος        </h1>
//
//       <Form
//         model="Forms.filterPanel"
//         onSubmit={(val, event) => this.handleSubmit(val, event)}
//         >
//         <div className="field">
//           <label>Όνομα Εταιρείας</label>
//           <Control.text
//             component={FormControl}
//             model=".brand_name"
//           />
//           <label>Email</label>
//           <Control.text
//             model=".email"
//             component={FormControl}
//           />
//         </div>
//
//         <div className="field">
//           <label>Τηλέφωνο</label>
//           <Control.text
//             component={FormControl}
//             model=".telephone"
//           />
//           <label>Διέυθυνση</label>
//           <Control.text
//             component={FormControl}
//             model=".address"
//           />
//         </div>
//
//         <div className="field">
//           <label>Tax registration</label>
//           <Control.text
//             component={FormControl}
//             model=".tax_registration"
//           />
//           <label>Τραπεζικό iban</label>
//           <Control.text
//             component={FormControl}
//             model=".bank_iban"
//           />
//         </div>
//
//         <div className="field">
//           <label>Νομικό Έγγραφο Επιχείρισης</label>
//           <Control.file model=".document" />
//         </div>
//
//         <div className="field">
//           <label>Όνομα Χρήστη</label>
//           <Control.text
//             component={FormControl}
//             model=".username"
//           />
//           <label>Κωδικός Πρόσβασης</label>
//           <Control.text
//             component={FormControl}
//             model=".password"
//           />
//         </div>
//
//         <Button type="submit"
//
//         bsStyle="success">
//           Εγγραφή
//         </Button>
//       </Form>
//         </div>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//     return {
//
//     };
// };
//
// export default connect(mapStateToProps, )(FilterPanel);
