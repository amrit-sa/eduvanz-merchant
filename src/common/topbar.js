import React, { Component } from 'react';
import $ from "jquery";
import { openProfileModel } from "../actions/model"
import { Link } from "react-router-dom";
import TopBarRight from './tobar-rigth';
import { getGlobalSearch,setShowSearched , emptyserachList} from "../actions/user"
//import { useParams } from 'react-router-dom';

import {
    openBulkModel,
    updateProId,
    openLeadProfileModel,
    openFilterModel,
    openEmailModel,
    openRequestModel,
    openPreviewModel,
    openSuccessModel,
    openCreateLeadModel,
    openLeadApplicationModel
} from "../actions/model"

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Gsearch: null,
            serach: ""

        }
    }

    componentDidMount() {
        // const url = useParams();
        // console.log(url,"=============")
        // const { merchant_sfid } = this.props.match.params
        // const { search_keyword } = this.props.match.params
        // const { section } = this.props.match.params
        // const { sub_section } = this.props.match.params


        //  fetch('https://eduvanz-api-01.herokuapp.com/api/merchant_search?merchant_sfid=${merchant_sfid}&search_keyword=${search_keyword}&section=${section}&sub_section=${sub_section}').then((resp)=>{

        //     resp.json().then((result)=>{
        //         // console.warn('result',result.data)
        //         this.setState({Gsearch:result.data})
        //     })
        //  })


        // let sfid = localStorage.getItem('sfid');
        // let sideData =  localStorage.getItem('section');
        // const {keyword,sectionb,sub_sectionc}= this.state;

        // this.props.dispatch(getGlobalSearch(sfid,sideData,sectionb,sub_sectionc));


        $('#sidebarToggleTop').on('click', function () {
            $('#accordionSidebar').toggleClass('toggled');
        })
        $('#sidebarClose').on('click', function () {
            $('#accordionSidebar').removeClass('toggled');
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search) {
           
            if (this.state.serach.length > 3) {

                this.getsearchdata()
            }
        }
    }
    getserachInput = (e) => {
        this.setState({ serach: e.target.value });
        if (e.target.value.length >=2) {
            this.props.dispatch(setShowSearched(true))
            this.getsearchdata(e.target.value);
        }
        else if(e.target.value.length == 0) {
            this.props.dispatch(emptyserachList())
        }else{
            this.props.dispatch(setShowSearched(false))
        } 
        
    }


    getsearchdata = (query_search) => {
        let sfid = localStorage.getItem('sfid');
        // let sideData =  localStorage.getItem('section');
        const {title , stage} = this.props;
        console.log(this.props,'=============')
        this.props.dispatch(getGlobalSearch(sfid, query_search?query_search:this.state.serach , title , stage.charAt(0).toUpperCase()+stage.slice(1) ));
        //clearTimeout(myTimeout);
    }

    openProfile = () => {
        this.props.dispatch(openProfileModel());
    }


    openCreateLeads = () => {
        this.props.dispatch(openCreateLeadModel());
    }

    openLeads = (id) => {
        this.props.dispatch(openLeadProfileModel(id));
    }

    openLeadApplication = (id, sfid) => {
        this.props.dispatch(openLeadApplicationModel(id));
        this.props.dispatch(updateProId(sfid));
    }

    openBulkModel = () => {
        this.props.dispatch(openBulkModel());
    }

    openFilter = () => {
        this.props.dispatch(openFilterModel());
    }

    openRequest = () => {
        this.props.dispatch(openRequestModel());
    }

    openEmail = () => {
        this.props.dispatch(openEmailModel());
    }

    openPreview = () => {
        this.props.dispatch(openPreviewModel());
    }

    openSuccess = () => {
        this.props.dispatch(openSuccessModel());
    }

    
  

    render() {
        const { title, createLead, createProduct } = this.props
        return (
            <>
                {/* Topbar */}
                {/* <nav className="navbar navbar-expand navbar-light bg-white topbar mb-5 static-top shadow"> */}

                {/* Sidebar Toggle (Topbar) */}
                <div className="container-fluid leads_header">
                    <div className="row align-items-center">
                        <div className="col-md-7 d-flex flex-wrap">

                            <h1 className="mr-3 min-width150">
                                <button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>{title ? title : "Dashboard"}</h1>


                            {/* {title && (
                        <h1 className="mr-3 min-width150">
                            <button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                            </button>{title}</h1>
                        )} */}

                            <div className="header_search_wrapper">
                                <div className="search-form nav_search" onSubmit="return false;">
                                    <div className={`form-group has-feedback ${title == "Dashboard" || title=="Report" ?'d-none':''}`}>
                                        {/* {
                                    this.state.Gsearch ? 
                                    this.state.Gsearch.map((item,i)=>
                                    <div>
                                        <p>{i}--</p>
                                        {item.name}
                                    </div>)
                                     : null
                                } */}

                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="search"
                                            id="search"
                                            placeholder="Search Application id, Name, Mobile number, Product, Status"
                                            // onChange={(e)=>{this.setState({search : e.target.value})}}
                                            onChange={this.getserachInput}
                                            //onInput={this.getserachInput}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-5">
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
                                {createProduct && (
                                    <li>
                                        <a
                                            href="#"
                                            className="d-sm-inline-block btn btn-sm btn-primary btn-dark"
                                            data-toggle="modal"
                                            data-target="#myModal2"
                                        >
                                            <i className="fas fa-plus" /> Add New Product
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
                                <li  >
                                    <Link to="/help" className="header_icons">   <img src="img/Help.svg" alt="help" /></Link>
                                    {/* <a
                            href="#" 
                            > </a> */}
                                </li>
                                {/* <li  onClick={this.openPreview}>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <span className="bell">
                                    <i className="fa fa-bell-o"></i>
                                </span>
                            </a>
                        </li> */}
                                <TopBarRight
                                    dispatch={this.props.dispatch}
                                />
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

export default Topbar;