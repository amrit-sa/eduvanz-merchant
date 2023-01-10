import React, { Component } from 'react';
import { openProfileModel } from "../actions/model"
import { Link } from "react-router-dom";
import TopBarRight from "./tobar-rigth";
import { asset } from './assets';
import { 
    openRequestModel,
    openCreateLeadModel
 } from "../actions/model"

class Topbarlogo extends Component{
    constructor(props){
        super(props);
    }

    

    openProfile = () =>{
        this.props.dispatch(openProfileModel());
    }

    openCreateLeads = () =>{
        this.props.dispatch(openCreateLeadModel());
    }

    openRequest = () =>{
         this.props.dispatch(openRequestModel());
    }

    render(){
        const { title, createLead } = this.props
        return(
            <>
                {/* Topbar */}
                {/* <nav className="navbar navbar-expand navbar-light bg-white topbar mb-5 static-top shadow"> */}
                    
                    {/* Sidebar Toggle (Topbar) */}
                    <div className="container-fluid leads_header">
                    <div className="row">
                    <div className="col-md-3 d-flex flex-wrap">
                        <h1 className="mr-3 min-width150">
                            {/* <button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                            </button>  */}

                    <div className="sidebar-brand-text">
                     
                     <div onClick={()=> this.props.history.push('/home')} className='brand-logo-sidebar cursor-point'><img src="images/icons/croma-logo.png"  alt=''/></div>
                       <p>Croma India</p>
                    </div>
                  </h1> 
                  </div>
                  <div className="col-md-5 d-flex flex-wrap">
                  <div className="header_search_wrapper">
                  <form className="search-form nav_search">
                            <div className="form-group has-feedback">
                                <label htmlFor="search" className="sr-only">
                                Search
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                name="search"
                                id="search"
                                placeholder="Search Application id, Name, Mobile number, Product, Status"
                                onClick={this.myFunction}
                                />
                            </div>
                            </form>
                  </div>
                    </div>
                  
                    <div className="col-md-4">
                        <ul className="btn_lists float-right">
                            {createLead && (
                        <li>
                            <a
                            href="#"
                            onClick={this.openCreateLeads}
                            className="d-sm-inline-block btn btn-sm btn-primary btn-dark"
                            data-toggle="modal"
                            data-target="#myModal"
                            >
                            <i className="fas fa-plus" /> Create Lead
                            </a>
                        </li>
                            )}
                        {/* <li  onClick={this.openRequest}>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <i className="fa fa-question-circle-o"></i>
                            </a>
                        </li> */}
                        <li >
                           <Link to="/help"  className="header_icons"><i className="fa fa-question-circle-o"></i></Link>
                          
                        </li>
                        {/* <li>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <span className="bell">
                                    <i className="fa fa-bell-o"></i>
                                </span>
                            </a>
                        </li> */}
                            <TopBarRight />
                        </ul>
                    </div>
                    </div>
                </div>
                {/* </nav> */}
                {/* End of Topbar */}

            </>
        );
    }
}

export default Topbarlogo;