import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import PersonInfoService from "../services/PersonaInfoService.jsx";

class PersonApprovedListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          authenticated: false,
          persons: []
        };
    
        this.serv = new PersonInfoService();
        this.token = sessionStorage.getItem("token");
        this.roleName = sessionStorage.getItem("roleName");
    
        // if (
        //   this.token === "" ||
        //   this.token === null ||
        //   this.roleName === "" ||
        //   this.roleName === null
        // ) {
        //   var h = this.props.history;
        //   h.push("/login");
        // }
        this.status = "approved";
      }
    
      componentDidMount() {
        this.serv
          .getPersonInfoByStatus(this.status, this.token)
          .then(data => data.json())
          .then(value => {
            if (value.status === 200) {
              this.setState({ persons: [] });
              this.setState({ persons: value.data });
              console.log(value.data);
            } else {
              this.setState({ errorMsg: value.message });
              this.setState({ persons: [] });
            }
          })
          .catch(error => {
            console.log(`Error occured ${error.status}`);
          });
      }
    
      onClickGetSelectedPerson(UserId) {
        this.setState({ UserId: this.props.UserId });
        var h = this.props.history;
        h.push("/personinfo/" + UserId);
      }
    
      render() {
        return (
          <div className="container page-backcolor">
            <HeaderComponent />
    
            <div className="main-content">
                  <div className="row roletable">
                    <div className="col-md-2" />
        
                    <div className="col-md-8 border-table">
                      <h4 className="text-center text-info">Pending List</h4>
                      <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                    <tr>
                      
                      <th>UserName</th>
                      <th>DOB</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.persons.map((u, i) => (
                      <TableRow
                        key={i}
                        row={u}
                        selected={this.onClickGetSelectedPerson.bind(this)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
            <FooterComponent />
          </div>
        );
      }
    }
    
    class TableRow extends Component {
      constructor(props) {
        super(props);
      }
    
      onRowClick() {
        this.props.selected(this.props.row.UserId);
        console.log(this.props.row.UserId);
      }
    
      render() {
        return (
          <tr onClick={this.onRowClick.bind(this)}>
            {Object.values(this.props.row).map((r, idx) =>
              r === "approved" ? (
                <td key={idx}>
                  <button className="btn btn-warning">View Info</button>
                </td>
              ) : (
                <td key={idx}> {r} </td>
              )
            )}
          </tr>
        );
      }
    }
    
    export default PersonApprovedListComponent;
//   constructor(props) {
//     super(props);
//     this.state = {
//       FullName: {
//         FirstName: "",
//         MiddleName: "",
//         LastName: ""
//       },

//       Gender: "",
//       DateOfBirth: "",
//       Age: "",
//       Address: {
//         FlatNumber: "",
//         SocietyName: "",
//         AreaName: ""
//       },

//       Email: "",
//       City: "",
//       State: "",
//       PinCode: "",
//       PhoneNo: "",
//       MobileNo: "",
//       PhysicalDisability: "",
//       MaritalStatus: "",
//       Education: "",
//       BirthSign: "",
//       IsAuthorized: "",
//       errorMsg: "",
//       successMsg: "",
//       persons: []
//     };

//     this.serv = new PersonInfoService();
//     this.token = sessionStorage.getItem("token");
//     this.RoleId = sessionStorage.getItem("RoleId");

//     // if(this.token==="" || this.token===null || this.RoleName==="" || this.RoleName===null){
//     //     var h = this.props.history;
//     //     h.push('/login');
//     // }
//   }

//   componentDidMount() {
//     let prds = this.serv
//       .getPersons(this.token)
//       .then(data => data.json())
//       .then(value => {
//         //console.log(JSON.stringify(value.data));
//         this.setState({ persons: value.data });
//       })
//       .catch(error => {
//         console.log(`Error Status ${error.status}`);
//       });
//   }

//   render() {
//     return (
//       <div className="container">
//         <HeaderComponent />

//         <div className="main-content">
//           <div className="row roletable">
//             <div className="col-md-2" />

//             <div className="col-md-16">
//               <table className="table table-bordered table-striped">
//                 <thead>
//                   <tr>
//                     <th>_id</th>
//                     <th>FullName</th>
//                     <th>Gender</th>
//                     <th>DateOfBirth</th>
//                     <th>Age</th>

//                     <th>Address</th>
//                     <th>Email</th>
//                     <th>City</th>
//                     <th>State</th>

//                     <th>PinCode</th>
//                     <th>PhoneNo</th>
//                     <th>MobileNo</th>
//                     <th>PhysicalDisability</th>

//                     <th>MaritalStatus</th>
//                     <th>Education</th>
//                     <th>BirthSign</th>
//                     <th>IsAuthorized</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.persons.map((u, i) => (
//                     <TableRow key={i} row={u} rec={this.state.persons} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <FooterComponent />
//       </div>
//     );
//   }
// }

// class TableRow extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <tr>
//         {Object.keys(this.props.rec[0]).map((u, i) => (
//           <td />
//         ))}
//       </tr>
//     );
//   }


