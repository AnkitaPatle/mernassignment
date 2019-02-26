import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import PersonService from '../services/PersonService.jsx';

class PersonProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         PersonId: "",
         FirstName: "",
         MiddleName: "",
         LastName: "",
         Gender: "",
         DateOfBirth: "",
         Age: "",
         FlatNumber: "",
         SocietyName: "",
         AreaName: "",
         Email: "",
         City: "",
         State: "",
         PinCode: "",
         PhoneNo: "",
         MobileNo: "",
         PhysicalDisability: "",
         MaritalStatus: "",
         Education: "",
         BirthSign: ""
         }

         this.serv = new PersonService();
         this.token = sessionStorage.getItem("token");
         this.rRoleName = sessionStorage.getItem("roleName");
        // this.userId = sessionStorage.getItem("userId");
         
         // if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
         //     var h = this.props.history;
         //     h.push('/login');
         // }
    }

    componentDidMount(){
        this.serv.getPersonsInfo(this.userId, this.token)
        .then((data) => data.json())
        .then((value) => {
            if(value.status === 200) {
                //console.log(value.data);
            let valueInfo = value.data;
                this.setState({
                    PersonId:valueInfo[0].PersonId,
                    FirstName:valueInfo[0].FirstName,
                    MiddleName:valueInfo[0].MiddleName,
                    LastName:valueInfo[0].LastName,
                    DateOfBirth:valueInfo[0].DateOfBirth,
                    Gender:valueInfo[0].Gender,
                    Age:valueInfo[0].Age,
                    FlatNumber:valueInfo[0].FlatNumber,
                    SocietyName:valueInfo[0].SocietyName,
                    AreaName:valueInfo[0].AreaName,
                    City:valueInfo[0].City,
                    State:valueInfo[0].State,
                    Email:valueInfo[0].Email,
                    PinCode:valueInfo[0].PinCode,
                    MobileNo:valueInfo[0].MobileNo,
                    PhoneNo:valueInfo[0].PhoneNo,
                    PhysicalDisability:valueInfo[0].PhysicalDisability,
                    MaritalStatus:valueInfo[0].MaritalStatus,
                    Education:valueInfo[0].Education,
                    BirthSign:valueInfo[0].BirthSign,
                    IsAuthorized:valueInfo[0].IsAuthorized
                    });
                }
            })
    }

    render() { 
        return ( 
            <div className="container page-backcolor">
                <HeaderComponent/>

                <div className="main-content">
                    <div className="row">
                        <div className="col-md-8">
                        <h3 className="perinfo-title">My PersonalInfo</h3>
                        <table className="table table-bordered table-striped">
                                    <tbody>
                                         <tr>
                                            <td>Person Id</td>
                                            <td>{this.state.PersonId}</td>
                                         </tr> 
                                         <tr>
                                            <td>Full Name</td>
                                            <td>{this.state.FirstName} {this.state.MiddleName} {this.state.LastName}</td>
                                         </tr> 
                                         <tr>
                                            <td>Gender</td>
                                            <td>{this.state.Gender}</td>
                                         </tr>
                                         <tr>
                                            <td>Date Of Birth</td>
                                            <td>{this.state.DateOfBirth}</td>
                                         </tr>
                                         <tr>
                                            <td>Age</td>
                                            <td>{this.state.Age}</td>
                                         </tr> 
                                         <tr>
                                            <td>Address</td>
                                            <td>{this.state.FlatNumber}, {this.state.SocietyName}, {this.state.AreaName}</td>
                                         </tr>
                                         <tr>
                                            <td>City</td>
                                            <td>{this.state.City}</td>
                                         </tr>
                                         <tr>
                                            <td>State</td>
                                            <td>{this.state.State}</td>
                                         </tr>
                                         <tr>
                                            <td>Pincode</td>
                                            <td>{this.state.PinCode}</td>
                                         </tr>
                                         <tr>
                                            <td>Email</td>
                                            <td>{this.state.Email}</td>
                                         </tr>
                                         <tr>
                                            <td>Phone No</td>
                                            <td>{this.state.PhoneNo}</td>
                                         </tr>
                                         <tr>
                                            <td>Mobile No</td>
                                            <td>{this.state.MobileNo}</td>
                                         </tr>
                                         <tr>
                                            <td>Physical Disability</td>
                                            <td>{this.state.PhysicalDisability}</td>
                                         </tr>
                                         <tr>
                                            <td>Marital Status</td>
                                            <td>{this.state.MaritalStatus}</td>
                                         </tr>
                                         <tr>
                                            <td>Education</td>
                                            <td>{this.state.Education}</td>
                                         </tr>
                                         <tr>
                                            <td>Birth Sign</td>
                                            <td>{this.state.BirthSign}</td>
                                         </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
                <FooterComponent/>    
            </div>
         );
    }
}
 
export default PersonProfileComponent;