import React, { Component } from "react";
import $ from 'jquery';
import { Multiselect } from "multiselect-react-dropdown";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { Link } from 'react-router-dom';
import { getCategory, getAllSubCategory, clearAllSubcategory, updateMerchantCategory } from "../actions/user";
import Footer from "../common/footer";


const objectArray = [
  { key: "Electronice", cat: "1" },
  { key: "Travel", cat: "2" },
  { key: "Education", cat: "3" },
];


class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleOnSubcategoryChange = this.handleOnSubcategoryChange.bind(this);
    this.handleOnSubcategoryRemove = this.handleOnSubcategoryRemove.bind(this);
    this.handleOnCategoryRemove = this.handleOnCategoryRemove.bind(this);
    this.state = {
      username: "",
      password: "",
      user_sfid: localStorage.getItem('user_sfid'),
      successful: false,
      category: '',
      sub_category: '',
      selectedValues: [],
      selectedCatValues: [],
      selectedCategory: [],
      selectedSubCategory: [],
      showSelectedCate:true
    };
    this.style = {
      chips: {
        background: "red"
      },
      searchBox: {
        border: "none",
        "border-bottom": "1px solid blue",
        "border-radius": "0px"
      },
      multiselectContainer: {
        color: "red"
      }
    };
  }

  componentDidMount() {
    $('.labelFocus input').change(function () {
      var $this = $(this);
      if ($this.val())
        $this.addClass('filled')
      else
        $this.removeClass('filled')
    })

    this.props.dispatch(getCategory());
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history } = this.props;

    let data = {
      user_sfid: this.state.user_sfid,
      category: this.state.selectedCategory.join(),
      sub_category: this.state.selectedSubCategory.join(),
    }
    this.props
      .dispatch(
        updateMerchantCategory(data)
      )
      .then((response) => {
        console.log("res", response);
        this.setState({
          successful: true,
        });
        history.push("/bankdetails");
      })
      .catch(() => {
        this.setState({
          successful: false,
        });
      });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSubcategoryRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
    let selectedName = [];
    if (selectedList && selectedList.length > 0) {
      for (var i = 0; i < selectedList.length; i++) {
        selectedName.push(selectedList[i].cat);
      }
      this.setState({ selectedSubCategory: selectedName });
    } else {
      this.setState({ selectedSubCategory: [] });
    }
  }

  handleOnCategoryRemove = (selectedList, removedItem) => {
    let selectedCat = [];
    let selectedName = [];
    this.setState({ selectedCatValues: selectedList });
    if (selectedList && selectedList.length > 0) {
      for (var i = 0; i < selectedList.length; i++) {
        selectedCat.push(selectedList[i].sfid);
        selectedName.push(selectedList[i].cat);
      }
      this.setState({ selectedCategory: selectedName });
      if (selectedCat && selectedCat.length > 0) {
        let obj = {
          parent_id: selectedCat
        }
        this.props.dispatch(getAllSubCategory(obj));
      } else {
        this.setState({ selectedCategory: [] });
        this.props.dispatch(clearAllSubcategory());
      }
    } else {
      this.setState({ selectedCategory: [] });
    }
  }

  handleOnchange = (val) => {
    let selectedCat = null;
    let selectedName = [];
    let selectedCatName=""
    this.setState({ selectedCatValues: val });
    if (val && val.length > 0) {
      for (var i = 0; i < val.length; i++) {
        //selectedCat.push(val[i].sfid);
        selectedCat=val[i].category_id
        selectedCatName=val[i].cat
        selectedName.push(val[i].cat);
      }
      this.setState({ selectedCategory: selectedName });
    } else {
      this.setState({ selectedCategory: [] });
    }
    if (selectedCat !==null) {
      let obj = {
        parent_id: selectedCat,
        
      }
      this.props.dispatch(getAllSubCategory(obj,selectedCatName));
    } else {
      this.setState({ selectedCategory: [] });
      this.props.dispatch(clearAllSubcategory());
    }
  }

  handleOnSubcategoryChange = (val) => {
    this.setState({ selectedValues: val });
    let selectedName = [];
    if (val && val.length > 0) {
      for (var i = 0; i < val.length; i++) {
        selectedName.push(val[i].cat);
      }
      this.setState({ selectedSubCategory: selectedName });
    } else {
      this.setState({ selectedSubCategory: [] });
    }
  }

  handleBack = () => {
    const { history } = this.props;
    history.push("/company_details");
  }


 

  render() {
    const { message, category, sub_cat } = this.props;
    const { selectedSubCategory, selectedCategory } = this.state;

   
   
    console.log("sc", selectedCategory);
    console.log("ssc", selectedSubCategory);
    console.log("sub_cat is", sub_cat);

    let categoryOpt = [];
    let subCategoryOpt = [];

    if (category && category.length > 0) {
      for (var i = 0; i < category.length; i++) {
        categoryOpt.push({ key: category[i].category_name, cat: category[i].category_name, sfid: category[i].sfid,category_id:category[i].category_id});
      }
    }
    if (sub_cat && sub_cat.length > 0) {
      for (var i = 0; i < sub_cat.length; i++) {
        if(sub_cat[i].category_name){
        subCategoryOpt.push({ key: sub_cat[i].category_name, cat: sub_cat[i].category_name, sfid: sub_cat[i].sfid,parentCategory:sub_cat[i].parentCategory });
        }
          // subCategoryOpt.push({ key: sub_cat[i].category_name, cat: sub_cat[i].category_name, sfid: sub_cat[i].sfid,parentCategory:sub_cat[i].parentCategory });
          
      }
    }
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }

    return (
      <>
        <Helmet>
          <title> Product Details </title>
        </Helmet>
        <section className="bg0 login">
          <div className="container-fluid container-zero" style={{ paddingLeft: '0px' }}>
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                  {/* eduvanz. */}
                  <img src="images/logo-stride.png" />
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <Link
                      to="#"
                      onClick={this.handleBack}
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    >
                      <i className="lnr lnr-arrow-left-circle right-circle" />{" "}
                      <span className="backbtn-sty">Back</span>
                    </Link>
                  </div>
                  <div className="col-md-12 mr-t">
                    <h6 className="text-white">Step 2</h6>
                  </div>
                  <div className="col-md-12 mr-t p-lg-0 px-3 text-white">
                    <h1 className="titfnt">
                      Add Product <br />

                    </h1>
                    <p className="col-md-7 mr-t p-0 text-white">
                      What do you have in store for us?
                    </p>
                  </div>

                </div>
                <div className="col-md-12 mr-t login-img">
                  <img src="images/model.png" />
                </div>
              </div>

              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">

                  <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                    <h4 className="mtext-114">
                      <img src="images/icons/icon4_w.png" /> Your Product Details
                    </h4>
                  </div>


                  <form onSubmit={this.handleRegister}>

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type="text"
                                name="BrandName"
                                placeholder=""
                                style={{width:'89%'}}
                            />
                            <span>Brand Name</span>
                          </div>
                      </div> */}

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group input-group labelFocus" style={{flexWrap: 'initial'}}>
                                <input
                                type="text"
                                name="EntityName"
                                className="search-query stext-111 cl2 plh3 size-116 p-r-15"
                                maxLength={'11'}
                                />
                                <span>Entity Name</span>
                                  <span className="input-group-btn">
                                    <button
                                        className="btn btn-danger-search"
                                        type="button"
                                    >
                                        <span className="lnr lnr-magnifier" />
                                    </button>
                                  </span>
                            </div>
                            {this.state.isValid ==false && this.state.errorMsg !='' && (
                              <div className="form-group">
                                <div className={"alert alert-danger" } role="alert">
                                {this.state.errorMsg}
                                </div>
                              </div>
                            )}
                        </div> */}

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type="text"
                                name="BrandName"
                                placeholder=""
                                style={{width:'89%'}}
                            />
                            <span>PAN</span>
                          </div>
                      </div> */}

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type="text"
                                name="BrandName"
                                placeholder=""
                                style={{width:'89%'}}
                            />
                            <span>CIN</span>
                          </div>
                      </div> */}

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type="text"
                                name="BrandName"
                                placeholder=""
                                style={{width:'89%'}}
                            />
                            <span>GSTIN</span>
                          </div>
                      </div> */}


                    <label>Categories</label>
                    <Multiselect
                      options={categoryOpt}
                      displayValue="key"
                      selectedValues={this.state.selectedCatValues}
                      className="mulselect"
                      onSelect={this.handleOnchange}
                      onRemove={this.handleOnCategoryRemove}
                    />


                    {this.state.selectedCategory.length == 0 ? (

                      <div className="valignimg pt-3 pb-3">
                        <img src="images/icons/icon-ind.png" /> Select minimum 1 category
                      </div>

                    ) : ""}

                    <label>Sub-categories</label>
                    <Multiselect
                      options={subCategoryOpt.length>0?subCategoryOpt:[]}
                      displayValue="key"
                      groupBy="parentCategory"
                      selectedValues={this.state.selectedValues}
                      onSelect={this.handleOnSubcategoryChange}
                      onRemove={this.handleOnSubcategoryRemove}
                      className="mulselect"

                    />



                    {this.state.selectedSubCategory.length == 0 ? (

                      <div className="valignimg pt-3 mb-5">
                        <img src="images/icons/icon-ind.png" /> Select minimum 1 sub-category for each category
                      </div>


                    ) : ""}

                    <div className="mb-4">
                      <button
                        disabled={this.state.selectedCatValues.length !== 0 && this.state.selectedValues.length !== 0 ? false : true}
                        className="submit-btn pointer"
                        style={this.state.selectedCatValues.length !== 0 && this.state.selectedValues.length !== 0 ? btnStyle : {}}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { category, sub_cat } = state.user;
  return {
    sub_cat,
    message,
    category,
  };
}

export default connect(mapStateToProps)(ProductDetails);
