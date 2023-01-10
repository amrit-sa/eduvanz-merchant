import React, { Component } from "react";
import $ from 'jquery';
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Redirect } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { getLeads, getLeadsCount, getMerchantProducts } from "../actions/user";
import { salesForceLogin } from "../actions/auth";
import Filter from "../common/filter";
import Sidebar from "../common/sidebar";
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


import { 
    Chart as ChartJS, 
    ArcElement, 
    BarElement, 
    Tooltip, 
    Legend, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
  } from 'chart.js';

    
import { Doughnut, Line, Bar } from 'react-chartjs-2';



ChartJS.register(
    ArcElement,
    BarElement, 
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    
    );


  export const data = {
    labels: ['KYC Failed', 'Verification Failed', 'Low CIBIL', 'Other'],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: [
          '#00838f',
          '#c0c933',
          '#fac02c',
          '#f4511e',
        ],
        borderColor: [
          '#fff',
          '#fff',
          '#fff',
          '#fff',
        ],
        borderWidth: 5,
      },
    ],
  };

  export const data2 = {
    labels: ['18 - 30', '30 - 40', '40 - 50', '50 - 60', "60+"],
    datasets: [
      {
        data: [19, 8, 5, 8, 6],
        backgroundColor: [
          '#00838f',
          '#a41074',
          '#c0c933',
          '#fac02c',
          '#f4511e',
        ],
        borderColor: [
          '#fff',
          '#fff',
          '#fff',
          '#fff',
          '#fff',
        ],
        borderWidth: 5,
      },
    ],
  };


  export const options = {
   
    layout: {
        padding:{
        }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
            padding: 20,
            color: 'rgb(255, 99, 132)',
            color: '#222',
            usePointStyle: true,
           
            font: {
                size: 16
            },
        },
        position: 'right',
       
     },
      linearScale:{

      },
      title: {
        display: false,
        text: 'Reject/Drop reason',
        position: 'right',
      },
    }
  };


export const options3 = {
  layout: {
    padding:{
        
    }
  },
    responsive: true,
    plugins: {
      legend: {
        display:true,
        position: 'bottom',
        labels: {
          padding: 20,
          color: 'rgb(255, 99, 132)',
          color: '#222',
         
          font: {
              size: 16
          },
      },
      },
      title: {
        display: false,
        text: '',
      },
      tooltip:{
        backgroundColor: 'rgba(132, 177, 209, 1)',
      }
    },
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

export const data3 = {
  labels,
  datasets: [
    {
      label: 'Refund/Cancelled',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#00838f',
      borderColor: '#00838f',
      borderWidth: 3.5,
      data: [100, 200, 250, 250, 200, 250, 300, 400, 500, 600, 700, 900]
    },
    {
      label: 'Disbursed',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#f4511e',
      borderColor: '#f4511e',
      borderWidth: 3.5,
      data: [600, 500, 520, 550, 300, 500, 600, 500, 400, 300, 500, 600]
    }
  ]
};
//
export const options4 = {
  layout: {
    padding:{
       
    }
  },
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


export const data4 = {
  labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: '#fac02c',
    },
    {
      label: 'Dataset 2',
      data: [12, 19, 3, 5, 2, 3, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: '#f4511e',
    },
    {
      label: 'Dataset 2',
      data: [12, 19, 3, 5, 2, 3, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: '#00838f',
    }

    
  ],
};
  
  

class FilteredTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            page: 1
        };
    }

    componentDidMount() {
        const { sfid } = this.props
        this.props.dispatch(getLeads('', sfid));
        let getProd = { merchant_id: this.props.user_id }
        this.props.dispatch(getMerchantProducts(getProd));
        this.props.dispatch(getLeadsCount(sfid));
        let obj = { id: this.props.user_id , token: this.props.token }
        this.props.dispatch(salesForceLogin(obj));

        $('#sidebarToggleTop').click(function(){
            $("#accordionSidebar").toggleClass("open-close")
        })
    }

    openCreateLeads = () =>{
        this.props.dispatch(openCreateLeadModel());
    }

    openLeads = (id) =>{
        this.props.dispatch(openLeadProfileModel(id));
    }

    openLeadApplication = (id, sfid) =>{
        this.props.dispatch(openLeadApplicationModel(id));
        this.props.dispatch(updateProId(sfid));
    }

    openBulkModel = () =>{
      this.props.dispatch(openBulkModel());
    }

    openFilter = () =>{
      this.props.dispatch(openFilterModel());
    }

    openRequest = () =>{
         this.props.dispatch(openRequestModel());
    }

    openEmail = () =>{
        this.props.dispatch(openEmailModel());
    }

    openPreview = () =>{
        this.props.dispatch(openPreviewModel());
    }

    openSuccess = () =>{
        this.props.dispatch(openSuccessModel());
    }


    handleChangePage = (event, value) =>{
        const { sfid } = this.props
        let data = `page=${value}`;
        this.setState({page: value});
        this.props.dispatch(getLeads(data, sfid));
    }

  render() {
      const { leads, user_id, leadsCount } = this.props 
      if(!user_id){
        return <Redirect to="/login" />
     }
      const totalPages = Math.ceil(leadsCount/10);
    return (
        <>
        <Helmet>
            <title>Eduvanz - Leads</title>
        </Helmet>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <div className="container-fluid leads_header">
                    <div className="row align-items-center">
                    <div className="col-md-7 d-flex flex-wrap">
                        <h1 className="mr-3 min-width150"><button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                  </button> Leads</h1>
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
                  
                    <div className="col-md-5">
                        <ul className="btn_lists float-right">
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
                        <li  onClick={this.openRequest}>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <i className="fa fa-question-circle-o"></i>
                            </a>
                        </li>
                        <li  onClick={this.openPreview}>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <span className="bell">
                                    <i className="fa fa-bell-o"></i>
                                </span>
                            </a>
                        </li>
                        <li  onClick={this.openSuccess}>
                            <a
                            href="#"
                            className="header_icons"
                            >
                            <i className="fa fa-user-circle-o"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                {/* End of Topbar */}
                {/* Begin Page Content */}


                <div className="container-fluid">
                <div className="row">
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-md-12">
                           <div className="section-heading">
                             <h4>Summary</h4>
                             <div  className="select-rounded">
                             <select>
                               <option>Today</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card summary-info">
                             <p className="total">Total Loans</p>
                             <h3>₹ 40.9 Cr</h3>
                             <p className="application">5,18,483 applications</p>
                          </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card summary-info">
                             <p className="total">Total Leads</p>
                             <h3>6,08,183</h3>
                          
                          </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card summary-info">
                             <p className="total">Avg. Order Value</p>
                             <h3>₹ 9,50,483</h3>
                             
                          </div>
                        </div>
                        {/* Pending Requests Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card summary-info">
                             <p className="total">Avg. Loan Tenure</p>
                             <h3>12 mo</h3>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    <div className="row">
                        <div className="col-lg-7 px-lg-5 border-right">
                          <div className="row">
                            <div className="col-12">
                            <div className="section-heading">
                             <h4>Top Products</h4>
                            <div className="d-flex align-items-center">
                            <div  className="select-rounded mr-3">
                             <select>
                               <option>All category</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                            <div  className="select-rounded">
                             <select>
                               <option>This week</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                            </div>
                           </div>
                            </div>
                          </div>
                        <Bar options={options4} data={data4} />
                        </div>
                        <div className="col-lg-5 px-lg-5">
                        <div className="row">
                            <div className="col-12">
                            <div className="section-heading">
                             <h4>Reject/Drop reason</h4>
                            <div className="d-flex align-items-center">
                          
                            <div  className="select-rounded">
                             <select>
                               <option>This week</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                            </div>
                           </div>
                            </div>
                          </div>
                        <Doughnut options={options} data={data}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-lg-5 px-lg-5 border-right">
                        <div className="row">
                            <div className="col-12">
                            <div className="section-heading align-items-start">
                             <h4>Customer Insights</h4>
                            <div className="">
                            <div className="select-rounded mb-3">
                             <select>
                               <option>This week</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                             <div  className="select-rounded">
                             <select>
                               <option>By age</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                            
                            </div>
                           </div>
                            </div>
                          </div>
                        <Doughnut options={options} data={data2} />
                        </div>
                        <div className="col-lg-7 px-lg-5">
                        <div className="row">
                            <div className="col-12">
                            <div className="section-heading">
                             <h4>Sales revenue chart</h4>
                            <div className="d-flex align-items-center">
                          
                            <div  className="select-rounded">
                             <select>
                               <option>Monthly</option>
                               <option>Tommrrow</option>
                               <option>Sunday</option>
                             </select>
                             </div>
                            </div>
                           </div>
                            </div>
                          </div>
                        <Line options={options3} data={data3} /> 
                        </div>
                    </div>
                    
                </div>

              </div>
            </div>
        </div>
        <Filter />
        </>
    )
    }
}

function mapStateToProps(state) {
    const { leads, leadsCount } = state.user;
    const { user_id, token, sfid } = state.auth;
    const { message } = state.message;
    return {
      sfid,
      leads,
      leadsCount,
      user_id,
      token,
      message
    };
  }
export default connect(mapStateToProps)(FilteredTwo);