import React, {Component} from 'react';

class HeaderComponent extends Component {
    constructor(props){
        super(props);
        this.state = {

            adminAuth:false,
            operatorAuth:false,
            accessUserAuth:false
        }

        this.RoleId = sessionStorage.getItem("roleid");
        this.UserName = sessionStorage.getItem("username")
        //console.log(this.UserName)

        if(this.RoleId==="1"){
            this.state.adminAuth = true;
        }
        else if(this.RoleId==="2"){
            this.state.operatorAuth = true;
        }
        else if(this.RoleId==="3"){
            this.state.accessUserAuth = true;
        }
    }
    render() { 
        return ( 
            
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        {/* <li ><a href="/home">Dashboard</a></li>
                        <li><a href="/role">Roles</a></li>
                        <li><a href="/users">Users</a></li>
                        <li><a href="/userslist">Users-List</a></li>
                        <li><a href="/personlist">Persons-List</a></li>
                    </ul>
                    <ul className="nav navbar-nav1 logout-div">
                        <li><a href="/logout">Logout</a></li> */}
                    <li ><a href="/home">Home</a></li>
                    { this.state.adminAuth ?
                         <li><a href="/role">Roles</a></li> : null
                    }

                    { this.state.adminAuth || this.state.operatorAuth ?
                         <li><a href="/users">Add Users</a></li> : null 
                    }
                    
                    { this.state.adminAuth || this.state.operatorAuth ?
                          <li><a href="/userslist">Userslist</a></li> : null
                    }
                   
                    { this.state.adminAuth ?
                         <li><a href="/pending">Pending</a></li> : null
                    }

                    { this.state.operatorAuth ?
                         <li><a href="/pending">Pending</a></li> : null
                    }

                    { this.state.adminAuth ?
                         <li><a href="/rejected">Rejected</a></li> : null
                    }

                    { this.state.adminAuth ?
                         <li><a href="/approved">Approved</a></li> : null
                    }

                    {/* { this.state.adminAuth ?
                         <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Personal Info<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="/pending">Pending</a></li>
                                <li><a href="/rejected">Rejected</a></li>
                                <li><a href="/approved">Approved</a></li>
                            </ul>
                        </li> : null
                    } */}

                    { this.state.accessUserAuth ?
                          <li><a href="/mypersonalinfo">My PersonalInfo</a></li> : null
                    }
                </ul>

                <ul className="nav navbar-nav logout-menu">   
                        <li ><a href="/logout">Welcome {this.UserName}</a></li>                 
                        <li ><a href="/">Logout</a></li>                       
                    </ul>
                
                {/* <ul className="nav navbar-nav logout-menu">
                    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Hello {this.UserName}<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li ><a href="/logout">Logout</a></li>
                        </ul>
                    </li>

                    </ul> */}

                    
                </div>
            </nav>
         );
    }
}

// render() { 
//     return ( 
//         <nav className="navbar navbar-default">
//             <div className="container-fluid">
//                 <ul className="nav navbar-nav">
//                     <li ><a href="/home">Home</a></li>
//                     { this.state.adminAuth ?
//                          <li><a href="/role">Roles</a></li> : null
//                     }

//                     { this.state.adminAuth || this.state.operatorAuth ?
//                          <li><a href="/users">Add Users</a></li> : null 
//                     }
//                     { this.state.adminAuth || this.state.operatorAuth ?
//                           <li><a href="/userslist">Show Userslist</a></li> : null
//                     }
//                     { this.state.adminAuth ?
//                          <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Personal Info<span className="caret"></span></a>
//                             <ul className="dropdown-menu">
//                                 <li><a href="/personinfolist/pending">Pending</a></li>
//                                 <li><a href="/personinfolist/rejected">Rejected</a></li>
//                                 <li><a href="/personinfolist/approved">Approved</a></li>
//                             </ul>
//                         </li> : null
//                     }
//                     { this.state.accessUserAuth ?
//                           <li><a href="/mypersonalinfo">My PersonalInfo</a></li> : null
//                     }
//                 </ul>
                
//                 <ul className="nav navbar-nav logout-menu">
//                     <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Hello {this.userName}<span className="caret"></span></a>
//                         <ul className="dropdown-menu">
//                             <li ><a href="/logout">Logout</a></li>
//                         </ul>
//                     </li>
                     
//                 </ul>
//             </div>
//         </nav>
//      );
// }
 
export default HeaderComponent;