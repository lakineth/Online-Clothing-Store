
import React, { useState, useEffect } from "react";
import axios from "axios";
import {ImUserPlus } from 'react-icons/im'
import { Link } from "react-router-dom";
import {AiFillEdit,AiFillEye} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import '../../css/Table.css';



const AdminList = () => {
  const [users, setUser] = useState([]);
  const[searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8070/user/display");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:8070/user/delete/${id}`);
    swal({

      title: "Success",

      text: "Delete Successfully !!",

      icon: "success",

      button: "OK"

    });
    loadUsers();
  };


    
 // };
    return(
      <>
      
     <main id="site-main"> 
     <div className="container-list">
          
           <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <h4> <b>User Management</b></h4>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-link active" aria-current="page" href="#"></a>
                  <a class="nav-link" href="#">  </a>
                  <a class="nav-link" href="#"></a>
                  
                  <Link to={"/List"}><button class="btn btn-outline-info me-2" type="button"><b>Administrators list</b></button></Link>
                  <Link to={"/patientList"}><button class="btn btn-outline-warning me-2" type="button"><b>Customers list</b></button></Link>
                 
                </div>
              </div>
            </div>
          </nav>
        <br></br>
        <h2 className="h2-user-list"><u>Administrators List</u></h2>
            <div className="box-nav d-flex justify-between">
                <Link className="btn btn-secondary" to={'/dashboard'}>Back TO Home</Link>
               <Link  className="btn btn-primary" to={'/addUser'}>
                     <ImUserPlus  size="27px"/> <b> Add New Admin </b>
                </Link>

              </div>
              <div   className="search">
              
              <div className=" col-lg-16 mt-2 mb-2 ml-1">
                <input
                className="form-control"
                type="search"
                placeholder="search here"
                name="searchTerm"
              // onChange={this.handleTextSearch}

              onChange={(e)=>{

                setsearchTerm(e.target.value);
   
           }}
                
                
                />
                
              </div>
           </div>   

                <br></br>
                
               <form>
                   <table className="table">
                       <thead className="thead-dark">
                           <tr>
                               
                               <th>AdminId</th>
                               <th>Name</th>
                               <th>NIC</th>
                               <th>Email</th>
                               <th>Password</th>
                               <th>Role</th>
                               <th>Tel</th>
                               <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody className="tbody">
                        {users.filter(val =>{

                                  if(searchTerm === ""){

                                      return val;

                                  } else if(

                                      val.adminid.toLowerCase().includes(searchTerm.toLowerCase())||
                                      val.name.toLowerCase().includes(searchTerm.toLowerCase())||
                                      val.role.toLowerCase().includes(searchTerm.toLowerCase())||
                                      val.email.toLowerCase().includes(searchTerm.toLowerCase())

                                  ){

                                      return val;

                                  }

                                  })
                                                          
                        
                        
                         .map((user, index) => (
                               <tr>
                               
                                <td>{user.adminid}</td>
                                <td>{user.name}</td>
                                <td>{user.nic}</td>
                                <td>{user.email}</td>
                                <td>********</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                                <td>
                                     

                                <Link class="btn btn-info"  to={`/users/${user._id}` }>
                                      <AiFillEye size="23px" color="white"/>
                                  
                                       
                                 </Link>

                                   <Link class="btn btn-success"  to={`/Edit/${user._id}` }>
                                      <AiFillEdit size="23px" color="white"/>
                                  
                                       
                                     </Link>
                                       

                                     <Link class="btn btn-danger" onClick={() => deleteUser(user._id)}>
                                     <FaTrashAlt size="23px" color="white"/>
                                  
                                       
                                     </Link>
                                </td>
                            </tr>
                              ))}
                        </tbody>
                    </table>
                </form>       

        
        </div>
     </main>   
     </>
    )
}

export default AdminList;