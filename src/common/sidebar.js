import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserProfile,setShowSearched ,emptyserachList} from "../actions/user";
import { openProfileModel, openPasswordModel } from "../actions/model"
//import sidelogo from "/images/pin.png"

class Sidebar extends Component {   
  constructor(props){
    super(props)
    this.state={
      path:'',
      f_name:"",
      l_name:"",

    }
  }

  componentDidMount(){
    const pathArray = window.location.pathname.split("/");
    const segment_1 = pathArray[1];
    this.setState({path: segment_1});
    console.log('click side bar',segment_1)
    this.props.dispatch(setShowSearched(false))
    this.props.dispatch(emptyserachList())


    const { user_id } = this.props;
    let userData = {
        user_sfid: localStorage.getItem('sfid')
      }
    this.props.dispatch(getUserProfile(userData))
    .then((response) => {
      if(response.responseCode === 200)

      {
        let profileData=response.profile;
        if(profileData){
        this.setState({f_name:profileData.first_name__c,l_name:profileData.last_name__c})
        }

        this.setState({first_name : response.first_name});
        this.setState({last_name : response.last_name});
        this.setState({email : response.email});
        this.setState({mobile_number : response.mobile});
      }
      console.log('f_name',response.profile)
      //console.log('l_name',this.state.last_name)

        
    })


    $('#sidebarClose').click(function(){
      $("#accordionSidebar").removeClass("open-close")
     })
  }

  
  openProfile = () =>{
    this.props.dispatch(openProfileModel());
  }

  openPassword = () =>{
    this.props.dispatch(openPasswordModel());
  }
    render(){
        console.log(this.props);
        return(
            <>
            <div className='sidebar' id="accordionSidebar">
              <div className='d-flex justify-content-end w-100'>
              <button id="sidebarClose" className="btn d-lg-none mb-0">
                <i className="fa fa-times"></i>
              </button>
              </div>
            
            <ul
                    className="navbar-nav bg-gradient-primary sidebar-dark accordion"
                    id=""
                >
                    <li className="nav-item text-center" style={{height:"120px"}}>
                    <Link
                        className="sidebar-brand admin-name-w-75"
                        to="/home"
                    >
                    <div className="sidebar-brand-text">
                     
                       {/* <div className='brand-logo-sidebar'><img src="images/icons/croma-logo.png"  alt=''/></div>
                         Croma India ok
                      </div> */}
                      <div className='brand-logo-sidebar'><img src="images/custom/profiles.png"  alt='' style={{width:"50px"}}/></div>
                         {`${this.state.f_name} ${this.state.l_name}`}
                      </div>
                    </Link>
                    <div className="sidebar-brand-subtext">{this.state.first_name?(this.state.first_name+" "+this.state.last_name):''}</div>
                    </li>

                    <li className={`nav-item icon_dashboard ${this.state.path === 'home'?'active':''}`}>
                    <Link className="nav-link" to="/home">
                        <span>Dashboard</span>
                    </Link>
                    </li>
                    <li className={`nav-item icon_leads ${this.state.path === 'leads'?'active':''}`}>
                    <Link className="nav-link" to="/leads">
                        <span>Leads</span>
                    </Link>
                    </li>
                    <li 
                    // onClick={()=> {localStorage.setItem("section",settlement)}}
                    className={`nav-item icon_settlements ${this.state.path === 'settlement'?'active':''}`}
                    >
                    <Link  className="nav-link" to="/settlement">
                        <span>Settlements</span>
                    </Link>
                    </li>

                    <li className={`nav-item icon_products ${this.state.path === 'products'?'active':''}`}>
                    
                    <Link className="nav-link" to="/products">
                        <span>Products</span>
                    </Link>
                    </li>
                    <li className={`nav-item icon_api_key ${this.state.path === 'report'?'active':''}`}>
                    <Link className="nav-link" to="/report">
                        <span>Reports</span>
                    </Link>
                    </li>
                    <li  className={`nav-item icon_settings ${this.state.path === 'settings'?'active':''}`}>
                    <Link 
                    
                    className="nav-link" to="/settings">
                        <span>Settings</span>
                    </Link>
                    </li>
                    {/* Sidebar Toggler (Sidebar) */}
                    {/* <div className="nav_profile" style={{background:"#000000"}}> */}
                    <div className="nav_profile">
                          {/* <div className="brand-text">Eduvanz</div>   */}
                          {/* <img src="images/logo-stride.png" alt="icon"></img> */}
                          <img src="images/stride_logo.png" alt="icon"></img>

                    </div>
                </ul>
            </div>
              
                {/* End of Sidebar */}

            </>
        )
    }
}

function mapStateToProps(state) {
    const { user_id } = state.auth;
    return {
        user_id,
    };
  }

export default  connect(mapStateToProps)(Sidebar);