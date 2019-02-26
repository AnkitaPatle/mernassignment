import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import PersonInfoService from "../services/PersonaInfoService.jsx";

class PersonPendingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          authenticated: false,
          persons: []
        };
    
        this.serv = new PersonInfoService();
        this.token = sessionStorage.getItem("token");
        this.RoleId = sessionStorage.getItem("RoleId");
        var h = this.props.history;
    
        //   if(this.token==="" || this.token===null || this.RoleId==="" || this.RoleId===null){
        //       h.push('/login');
        //   }
    
        this.status = "pending";
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
    
      onClickGetApprovedPerson(UserId) {
        this.serv
          .doApprovePerson(UserId, this.token)
          .then(data => data.json())
          .then(value => {
            alert(`${value.message}`);
            window.location.reload();
          })
          .catch(error => {
            console.log(`Error Status ${error.status}`);
          });
      }
    
      onClickGetRejectedPerson(UserId) {
        this.serv
          .doRejectPerson(UserId, this.token)
          .then(data => data.json())
          .then(value => {
            alert(`${value.message}`);
            window.location.reload();
            console.log(value.data);
          })
          .catch(error => {
            console.log(`Error Status ${error.status}`);
          });
      }
    
      render() {
        return (
          <div className="container">
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
                          approve={this.onClickGetApprovedPerson.bind(this)}
                          reject={this.onClickGetRejectedPerson.bind(this)}
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
        this.state = {};
      }
    
      onRowClickApprove() {
        this.props.approve(this.props.row.UserId);
      }
    
      onRowClickReject() {
        this.props.reject(this.props.row.UserId);
      }
    
      render() {
        return (
          <tr>
            {Object.values(this.props.row).map((r, idx) =>
              r === "pending" ? (
                <td key={idx}>
                  <button
                    className="btn btn-success"
                    onClick={this.onRowClickApprove.bind(this)}
                  >
                    Approve
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={this.onRowClickReject.bind(this)}
                    value="reject"
                  >
                    Reject
                  </button>
                </td>
              ) : (
                <td key={idx}> {r} </td>
              )
            )}
          </tr>
        );
      }
    }
    
export default PersonPendingListComponent;
  //     constructor(props) {
  //         super(props);
  //         this.state = {
  //             PersonId: "",
  //                 FirstName: "",
  //                 MiddleName: "",
  //                 LastName: "",

  //                 Gender: "",
  //                 DateOfBirth: "",
  //                 Age: "",

  //                 FlatNumber: "",
  //                 SocietyName: "",
  //                 AreaName: "",

  //                 Email: "",
  //                 City: "",
  //                 State: "",
  //                 PinCode: "",
  //                 PhoneNo: "",
  //                 MobileNo: "",
  //                 PhysicalDisability: "",
  //                 MaritalStatus: "",
  //                 Education: "",
  //                 BirthSign: "",
  //                 IsAuthorized: "",
  //                 errorMsg: "",
  //                 successMsg: "",
  //                 persons: []
  //          }

  //         this.serv = new PersonInfoService();
  //         this.token = sessionStorage.getItem("token");
  //         this.RoleId = sessionStorage.getItem("RoleId");

  //         // if(this.token==="" || this.token===null || this.RoleName==="" || this.RoleName===null){
  //         //     var h = this.props.history;
  //         //     h.push('/login');
  //         // }
  //     }

  //     componentDidMount(){
  //         let prds = this.serv.getPersons(this.token)
  //                             .then((data) => data.json())
  //                             .then((value)=>{
  //                                //console.log(JSON.stringify(value.data));
  //                                this.setState({persons:value.data})
  //                             })
  //                             .catch(error =>{
  //                                 console.log(`Error Status ${error.status}`);
  //                             });
  //     }

  //     render() {
  //         return (
  //             <div className="container">
  //                 <HeaderComponent/>

  //                 <div className="main-content">
  //                     <div className="row roletable">
  //                         <div className="col-md-2">
  //                         </div>

  //                         <div className="col-md-16">
  //                             <table className="table table-bordered table-striped">
  //                                 <thead>
  //                                     <tr>
  //                                         <th>_id</th>
  //                                         <th>FullName</th>
  //                                         <th>Gender</th>
  //                                         <th>DateOfBirth</th>
  //                                         <th>Age</th>

  //                                         <th>Address</th>
  //                                         <th>Email</th>
  //                                         <th>City</th>
  //                                         <th>State</th>

  //                                         <th>PinCode</th>
  //                                         <th>PhoneNo</th>
  //                                         <th>MobileNo</th>
  //                                         <th>PhysicalDisability</th>

  //                                         <th>MaritalStatus</th>
  //                                         <th>Education</th>
  //                                         <th>BirthSign</th>
  //                                         <th>IsAuthorized</th>

  //                                     </tr>
  //                                 </thead>
  //                                 <tbody>
  //                                     {
  //                                         this.state.persons.map((u,i)=>(
  //                                            <TableRow key={i}  row={u} rec={this.state.persons}></TableRow>
  //                                         ))
  //                                     }
  //                                 </tbody>
  //                             </table>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <FooterComponent/>
  //             </div>
  //          );
  //     }
  // }

  // class TableRow extends Component{
  //     constructor(props){
  //         super(props);
  //     }

  //     render(){
  //         return(
  //             <tr>
  //                 {
  //                     Object.keys(this.props.rec[0]).map((u,i)=>(
  //                         <td></td>
  //                     ))
  //                 }
  //             </tr>
  //         )
  //     }

 
