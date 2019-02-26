import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import PersonInfoService from "../services/PersonaInfoService.jsx";

class PersonInfoComponent extends Component {
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
      BirthSign: "",
      UserId: "",
      IsAuthorized: "",
      errorMsg: "",
      successMsg: "",
      persons: [], //users
      genders: ["Male", "Female", "Other"],
      PhysicalDisabilities: ["Yes", "No"],
      MaritalStatuss: [
        "Married",
        "UnMarried",
        "Divorced",
        "Widow",
        "Widower",
        "etc"
      ]
    };

    this.serv = new PersonInfoService();
    this.token = sessionStorage.getItem("token");
    this.RoleId = sessionStorage.getItem("roleid");

    this.UserId = this.props.match.params.UserId;
    //console.log("Per"+this.UserId);
  }

  OnPropertyChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onPersonSubmit() {
    if (this.state.FirstName === "") {
      this.setState({ errormsg: "Please Enter First Name" });
    } else if (this.state.MiddleName === "") {
      this.setState({ errormsg: "Please Enter Middle Name" });
    } else if (this.state.LastName === "") {
      this.setState({ errormsg: "Please Enter Last Name" });
    } else if (this.state.Gender === "") {
      this.setState({ errormsg: "Please select gender" });
    } else if (this.state.DateOfBirth === "") {
      this.setState({ errormsg: "Please Enter DOB" });
    } else if (this.state.Age === "") {
      this.setState({ errormsg: "Please Enter Age" });
    } else if (this.state.AreaName === "") {
      this.setState({ errormsg: "Please Enter Address" });
    } else if (this.state.Email === "") {
      this.setState({ errormsg: "Please Enter Email" });
    } else if (this.state.City === "") {
      this.setState({ errormsg: "Please Enter City" });
    } else if (this.state.State === "") {
      this.setState({ errormsg: "Please Enter State" });
    } else if (this.state.PinCode === "") {
      this.setState({ errormsg: "Please Enter Pincode" });
    } else if (this.state.MobileNo === "") {
      this.setState({ errormsg: "Please Enter Mobile no." });
    } else if (this.state.PhysicalDisability === "") {
      this.setState({ errormsg: "Please select PhysicalDisability" });
    } else if (this.state.MaritalStatus === "") {
      this.setState({ errormsg: "Please select MaritalStatus" });
    } else if (this.state.Education === "") {
      this.setState({ errormsg: "Please Enter Education" });
    } else if (this.state.BirthSign === "") {
      this.setState({ errormsg: "Please Enter Birth sign" });
    } else {
      alert("Person Info Created");
      var Person = {
        //user
        PersonId: this.state.PersonId,
        FirstName: this.state.FirstName,
        MiddleName: this.state.MiddleName,
        LastName: this.state.LastName,
        Gender: this.state.Gender,
        DateOfBirth: this.state.DateOfBirth,
        Age: this.state.Age,
        FlatNumber: this.state.FlatNumber,
        SocietyName: this.state.SocietyName,
        AreaName: this.state.AreaName,
        Email: this.state.Email,
        City: this.state.City,
        State: this.state.State,
        PinCode: this.state.PinCode,
        PhoneNo: this.state.PhoneNo,
        MobileNo: this.state.MobileNo,
        PhysicalDisability: this.state.PhysicalDisability,
        MaritalStatus: this.state.MaritalStatus,
        Education: this.state.Education,
        BirthSign: this.state.BirthSign,
        UserId: this.state.UserId,
        IsAuthorized: this.state.IsAuthorized
      };

      this.serv
        .postPerson(Person, this.token)
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            //console.log(res.message)
            //console.log("while binding data of user"+JSON.stringify(user));
            this.setState({ successMsg: res.message });
            this.onClickClear();

            // let tempArray = this.state.users.slice();
            // tempArray.push(res.data);
            // this.setState({ users: tempArray });
          } else {
            this.setState({ errormsg: res.message });
          }
        });
    }
  }

  onClickClear() {
    this.setState({ FirstName: "" });
    this.setState({ MiddleName: "" });
    this.setState({ LastName: "" });
    this.setState({ Gender: "" });
    this.setState({ DateOfBirth: "" });
    this.setState({ Age: "" });
    this.setState({ FlatNumber: "" });
    this.setState({ SocietyName: "" });
    this.setState({ AreaName: "" });
    this.setState({ Email: "" });
    this.setState({ City: "" });
    this.setState({ State: "" });
    this.setState({ PinCode: "" });
    this.setState({ PhoneNo: "" });
    this.setState({ MobileNo: "" });
    this.setState({ PhysicalDisability: "" });
    this.setState({ MaritalStatus: "" });
    this.setState({ Education: "" });
    this.setState({ BirthSign: "" });
    this.setState({ IsAuthorized: "" });
  }

  componentDidMount() {
    // let prds = this.serv
    //   .getPersons(this.token)
    //   .then(data => data.json())
    //   .then(value => {
    //     //console.log(JSON.stringify(value.data));
    //     this.setState({ persons: value.data });
    //   })
    //   .catch(error => {
    //     console.log(`Error Status ${error.status}`);
    //   });

    this.serv
      .getPersonInfoByUserId(this.UserId, this.token)
      .then(data => data.json())
      .then(value => {
        let valueInfo = value.data;

        if (valueInfo != null) {
          console.log(valueInfo);
          this.setState({
            PersonId: valueInfo.PersonId,
            FirstName: valueInfo.FirstName,
            MiddleName: valueInfo.MiddleName,
            LastName: valueInfo.LastName,
            DateOfBirth: valueInfo.DateOfBirth,
            Gender: valueInfo.Gender,
            Age: valueInfo.Age,
            FlatNumber: valueInfo.FlatNumber,
            SocietyName: valueInfo.SocietyName,
            AreaName: valueInfo.AreaName,
            City: valueInfo.City,
            State: valueInfo.State,
            Email: valueInfo.Email,
            PinCode: valueInfo.PinCode,
            MobileNo: valueInfo.MobileNo,
            PhoneNo: valueInfo.PhoneNo,
            PhysicalDisability: valueInfo.PhysicalDisability,
            MaritalStatus: valueInfo.MaritalStatus,
            Education: valueInfo.Education,
            BirthSign: valueInfo.BirthSign,
            UserId: this.state.UserId,
            IsAuthorized: this.state.IsAuthorized
          });
        } else {
          alert("Please add person information");
          this.setState({ Person: [] });
        }
      })
      .catch(error => {
        console.log(`Error occured ${error.status}`);
      });
  }

  render() {
    return (
      <div className="container">
        <HeaderComponent />
        <div className="main-content">
          <div id="person">
            <div className="container">
              <div
                id="login-row"
                className="row justify-content-center align-items-center"
              >
                <div id="login-column" className="col-md-6">
                  <div id="login-box" className="col-md-12">
                    <div className="error">{this.state.errormsg}</div>
                    <div className="success">{this.state.successMsg}</div>

                    <h4 className="text-center text-info">
                      Person Information
                    </h4>

                    <div className="form-group">
                      <label htmlFor="PersonId" className="text-info">
                        Person Id
                      </label>
                      <br />
                      <input
                        type="text"
                        name="PersonId"
                        id="PersonId"
                        className="form-control"
                        placeholder="Enter Person Id"
                        value={this.state.PersonId}
                        onChange={this.OnPropertyChange.bind(this)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="FirstName" className="text-info">
                            First Name:
                          </label>
                          <br />
                          <input
                            type="text"
                            name="FirstName"
                            id="FirstName"
                            className="form-control"
                            placeholder="Enter First name"
                            value={this.state.FirstName}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="MiddleName" className="text-info">
                            Middle Name:
                          </label>
                          <br />
                          <input
                            type="text"
                            name="MiddleName"
                            id="MiddleName"
                            className="form-control"
                            placeholder="Enter Middle name"
                            value={this.state.MiddleName}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="LastName" className="text-info">
                            Last Name
                          </label>
                          <br />
                          <input
                            type="text"
                            name="LastName"
                            id="LastName"
                            className="form-control"
                            placeholder="Enter Last name"
                            value={this.state.LastName}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="Gender" className="text-info">
                            Gender
                          </label>
                          <select
                            className="form-control"
                            value={this.state.Gender}
                            name="Gender"
                            onChange={this.OnPropertyChange.bind(this)}
                          ><option>Select gender</option>
                            {this.state.genders.map((c, i) => (
                              <Options key={i} data={c} />
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="DateOfBirth" className="text-info">
                            Date Of Birth
                          </label>
                          <br />
                          <input
                            type="text"
                            name="DateOfBirth"
                            id="DateOfBirth"
                            className="form-control"
                            placeholder="Enter DOB"
                            value={this.state.DateOfBirth}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="Age" className="text-info">
                            Age
                          </label>
                          <br />
                          <input
                            type="text"
                            name="Age"
                            id="Age"
                            className="form-control"
                            placeholder="Enter Age"
                            value={this.state.Age}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="FlatNumber" className="text-info">
                            Flat Number
                          </label>
                          <br />
                          <input
                            type="text"
                            name="FlatNumber"
                            id="FlatNumber"
                            className="form-control"
                            placeholder="Enter Flat Number"
                            value={this.state.FlatNumber}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="SocietyName" className="text-info">
                            Society Name
                          </label>
                          <br />
                          <input
                            type="text"
                            name="SocietyName"
                            id="SocietyName"
                            className="form-control"
                            placeholder="Enter Society Name"
                            value={this.state.SocietyName}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="AreaName" className="text-info">
                            Area Name
                          </label>
                          <br />
                          <input
                            type="text"
                            name="AreaName"
                            id="AreaName"
                            className="form-control"
                            placeholder="Enter Area Name"
                            value={this.state.AreaName}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Email" className="text-info">
                        Email
                      </label>
                      <br />
                      <input
                        type="text"
                        name="Email"
                        id="Email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={this.state.Email}
                        onChange={this.OnPropertyChange.bind(this)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="City" className="text-info">
                            City
                          </label>
                          <br />
                          <input
                            type="text"
                            name="City"
                            id="City"
                            className="form-control"
                            placeholder="Enter City Name"
                            value={this.state.City}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="State" className="text-info">
                            State
                          </label>
                          <br />
                          <input
                            type="text"
                            name="State"
                            id="State"
                            className="form-control"
                            placeholder="Enter State Name"
                            value={this.state.State}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 form-group">
                        <div className="form-group">
                          <label htmlFor="PinCode" className="text-info">
                            PinCode
                          </label>
                          <br />
                          <input
                            type="text"
                            name="PinCode"
                            id="PinCode"
                            className="form-control"
                            placeholder="Enter PinCode"
                            value={this.state.PinCode}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="PhoneNo" className="text-info">
                            Phone no.
                          </label>
                          <br />
                          <input
                            type="text"
                            name="PhoneNo"
                            id="PhoneNo"
                            className="form-control"
                            placeholder="Enter Phone no."
                            value={this.state.PhoneNo}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="MobileNo" className="text-info">
                            Mobile no.
                          </label>
                          <br />
                          <input
                            type="text"
                            name="MobileNo"
                            id="MobileNo"
                            className="form-control"
                            placeholder="Enter Mobile no."
                            value={this.state.MobileNo}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label
                            htmlFor="PhysicalDisability"
                            className="text-info"
                          >
                            Physical Disability
                          </label>
                          <select
                            className="form-control"
                            value={this.state.PhysicalDisability}
                            name="PhysicalDisability"
                            onChange={this.OnPropertyChange.bind(this)}
                          ><option>Select PhysicalDisability</option>
                            {this.state.PhysicalDisabilities.map((c, i) => (
                              <Options key={i} data={c} />
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="MaritalStatus" className="text-info">
                            MaritalStatus
                          </label>
                          <select
                            className="form-control"
                            value={this.state.MaritalStatus}
                            name="MaritalStatus"
                            onChange={this.OnPropertyChange.bind(this)}
                          ><option>Select MaritalStatus</option>
                            {this.state.MaritalStatuss.map((c, i) => (
                              <Options key={i} data={c} />
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="Education" className="text-info">
                            Education
                          </label>
                          <br />
                          <input
                            type="text"
                            name="Education"
                            id="Education"
                            className="form-control"
                            placeholder="Enter Education"
                            value={this.state.Education}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="BirthSign" className="text-info">
                            BirthSign
                          </label>
                          <br />
                          <input
                            type="text"
                            name="BirthSign"
                            id="BirthSign"
                            className="form-control"
                            placeholder="Enter Birth Sign"
                            value={this.state.BirthSign}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="UserId" className="text-info">
                            User Id
                          </label>
                          <br />
                          <input
                            type="text"
                            name="UserId"
                            id="UserId"
                            className="form-control"
                            placeholder="Enter User Id"
                            value={this.state.UserId}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 form-group">
                        <div className="form-group">
                          <label htmlFor="IsAuthorized" className="text-info">
                            IsAuthorized
                          </label>
                          <br />
                          <input
                            type="text"
                            name="IsAuthorized"
                            id="IsAuthorized"
                            className="form-control"
                            placeholder="IsAuthorized"
                            value={this.state.IsAuthorized}
                            onChange={this.OnPropertyChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btn btn-info btn-md"
                        value="Add Person"
                        onClick={this.onPersonSubmit.bind(this)}
                      />
                      &nbsp;
                      <input
                        type="button"
                        value="Clear"
                        className="btn btn-primary"
                        onClick={this.onClickClear.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

class Options extends Component {
  render() {
    return <option value={this.props.data}>{this.props.data}</option>;
  }
}

// class TableRow extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <tr>
//         {Object.keys(this.props.persons[0]).map((r, i) => (
//           <td>{this.props.row[r]}</td>
//         ))}
//       </tr>
//     );
//   }
// }

export default PersonInfoComponent;
