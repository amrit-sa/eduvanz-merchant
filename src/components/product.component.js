import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Sidebar from "../common/sidebar";
import Topbar from "../common/topbar";
import InActiveProducts from "../common/inactive-products";
import ActiveProducts from "../common/active-products";
import OfferProducts from "../common/offer-products";
import AllProduct from "../common/all-products";
import OutofStocks from "../common/outof-stock";
import LowStocks from "../common/low-stocks";
import { updateProductStatus } from "../actions/user";
import { saveAs } from "file-saver";
import XlsxPopulate, { Promise } from "xlsx-populate";
import { merchantProductDownload,setProductTab } from '../actions/user';
import jsPDF from 'jspdf';
import "jspdf-autotable"
// import Pagination from '@material-ui/lab/Pagination';
import {
  openBulkProdModel,
  openFilterpModel,
} from "../actions/model"
import FilterProduct from "../model/filter-model.component"

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DataSet: [],
      tab: 'all',
    }
  }

  componentDidMount() {

    $('#sidebarToggleTop').click(function () {
      $("#accordionSidebar").toggleClass("open-close")
    })
  }

  openFilterp = () => {
    this.props.dispatch(openFilterpModel());
    setTimeout(() => {
      document.getElementsByClassName('product_filter_modal')[1].style.display = "none";
    }, 1000);
  }

  openBulkProdModel = () => {
    this.props.dispatch(openBulkProdModel());
  }

  getSheetData = async (data, header) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }
  generatePDF = () => {
    const { sfid } = this.props
    let section = this.state.tab;
    let required_section = ''
    if (section == 'all') {
      required_section = ''
    }
    else if (section == 'active') {
      required_section = 'active'
    }
    else if (section == 'inactive') {
      required_section = 'inactive'
    }
    else if (section == 'lowstock') {
      required_section = 'low stock'
    }
    else if (section == 'outofstock') {
      required_section = 'out of stock'
    }
    else {
      required_section = ''
    }
    let obj = { "merchant_id": this.props.user_id, "section": required_section }
    this.props.dispatch(merchantProductDownload(obj)).then((response) => {
      console.log('response here product=', response)
      if (response.proData && response.proData.length > 0) {
        const getData = response.proData;
        this.generatePDFData(getData);
      }
    });
  }

  generateCsv = () => {
    const { sfid } = this.props
    let section = this.state.tab;
    let required_section = ''
    if (section == 'all') {
      required_section = ''
    }
    else if (section == 'active') {
      required_section = 'active'
    }
    else if (section == 'inactive') {
      required_section = 'inactive'
    }
    else if (section == 'lowstock') {
      required_section = 'low stock'
    }
    else if (section == 'outofstock') {
      required_section = 'out of stock'
    }
    else {
      required_section = ''
    }
    let obj = { "merchant_id": this.props.user_id, "section": required_section }
    this.props.dispatch(merchantProductDownload(obj)).then((response) => {
      console.log('response here product=', response)
      if (response.proData && response.proData.length > 0) {
        const getData = response.proData;
        this.saveAsExcel(getData);
      }
    });
  }
  saveAsExcel = async (getData) => {
    var data = [];
    await Promise.all(getData.map(async (elament) => {
      const productDet = elament
      data.push({
        name: productDet && productDet.name ? productDet.name : '',
        sku: productDet && productDet.sku && productDet.sku != null ? productDet.sku : '',
        category: productDet && productDet.product_sub_category ? productDet.product_sub_category : '',
        mrp: productDet && productDet.mrp && productDet.mrp != null ? productDet.mrp : '',
        mop: productDet && productDet.mop && productDet.mop != null ? productDet.mop : '',
        selling_price: productDet && productDet.mrp && productDet.mrp != null ? productDet.mrp : '',
        activation_status: productDet && productDet.activation_status == false ? 'inactive' : 'active',
      })
    }));
    let header = ["Product Details", "SKU", "Category", "MRP", "MOP", "Selling Price", "Activation Status"];
    //let header = ["Category","Sub Category","Brand","Product Name","Selling Price","Description"];
    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = await this.getSheetData(data, header);
      const totalColumns = sheetData[0].length;
      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "product_report.xlsx");
      });
    });
  }
  generatePDFData = async getData => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Product Details", "SKU", "Category", "MRP", "MOP", "Selling Price", "Activation Status"];
    const tableRows = [];
    await Promise.all(getData.map((item, index) => {
      const prodData = [
        index + 1,
        item.name ? item.name : '-',
        item.sku && item.sku != null ? item.sku : '-',
        item.product_sub_category ? item.product_sub_category : '-',
        item.mrp ? item.mrp : '-',
        item.mop ? item.mop : '-',
        item.mrp ? item.mrp : '-',
        item.activation_status == false ? 'inactive' : 'active'
      ];


      tableRows.push(prodData);
    }));
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Closed tickets within the last one month.", 14, 15);
    doc.save(`product_report_${dateStr}.pdf`);
  }
  handleSatusChange = (product, event) => {
    const { dispatch } = this.props
    if (product) {
      let obj = {
        product_sfid: product,
        status: event.target.checked
      }
      dispatch(updateProductStatus(obj));
    }
  }

  handleTabChange = (tab) => {
    this.setState({ tab: tab })
    this.props.dispatch(setProductTab(tab))
  }

  render() {
    const { products, offer_details, openFilterpModel, productBulkStart, productBilkLoading, productBulkProgress, productBulkTotal, productBulkNow } = this.props;
    const { DataSet, tab } = this.state

    console.log('onload product is', products)
    return (
      <>
        <Helmet>
          <title> Product </title>
        </Helmet>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar
                title={'Products'}
                createProduct={true}
                stage={this.state.tab}
                dispatch={this.props.dispatch}
              />
              <div className="container-fluid">
                <div className="row flex-lg-row flex-column-reverse">
                  <div className="col-md-8">
                    <div className="product_page_tabs_wrapper">
                      <nav className="product_page_tabs">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {/* <div className="all-green-dot"></div> */}
                          <a
                            className="nav-item nav-link active"
                            id="nav-all-tab"
                            data-toggle="tab"
                            href="#nav-all"
                            role="tab"
                            aria-controls="nav-all"
                            aria-selected="true"
                            onClick={() => this.handleTabChange('all')}
                          >
                            All 
                            <span>({products.all_product_count})</span>
                          </a>
                          <a
                            className="nav-item nav-link nav-Productall"
                            id="nav-active-tab"
                            data-toggle="tab"
                            href="#nav-active"
                            role="tab"
                            aria-controls="nav-active"
                            aria-selected="false"
                            onClick={() => this.handleTabChange('active')}
                          >
                            Active
                            <span>({products.active_product_count})</span>
                            {/* <span>(14)</span> */}
                          </a>
                        {/* <div className="all-green-dot-inactive"></div> */}

                          <a
                            className="nav-item nav-link nav-Productinactive"
                            id="nav-inactive-tab"
                            data-toggle="tab"
                            href="#nav-inactive"
                            role="tab"
                            aria-controls="nav-inactive"
                            aria-selected="false"
                            onClick={() => this.handleTabChange('inactive')}
                          >
                            Inactive
                            <span>({products.inactive_product_count})</span>
                            {/* <span>(9)</span> */}
                          </a>
                          <a
                            className="nav-item nav-link nav-Productlowstock d-none"
                            id="nav-low-stock-tab"
                            data-toggle="tab"
                            href="#nav-low-stock"
                            role="tab"
                            aria-controls="nav-low-stock"
                            aria-selected="false"
                            onClick={() => this.handleTabChange('lowstock')}
                          >
                            Low Stock
                            <span>({products.low_stock_count})</span>
                          </a>
                          <a
                            className="nav-item nav-link nav-Productofs d-none"
                            id="nav-out-stock-tab"
                            data-toggle="tab"
                            href="#nav-out-stock"
                            role="tab"
                            aria-controls="nav-out-stock"
                            aria-selected="false"
                            onClick={() => this.handleTabChange('outofstock')}
                          >
                            Out of Stock
                            <span>({products.out_of_stock_count})</span>
                          </a>
                          {/* <a
                      className="nav-item nav-link"
                      id="nav-offer-tab"
                      data-toggle="tab"
                      href="#nav-offer"
                      role="tab"
                      aria-controls="nav-offer"
                      aria-selected="false"
                      onClick={()=>this.handleTabChange('offer')}
                      >
                      Offer
                      <span>({products.offer_count})</span>
                      </a> */}
                        </div>
                      </nav>
                    </div>
                  </div>

                  <div className="col-md-4 d-flex justify-content-end">
                    <ul className="list-group list-group-horizontal align-items-center product_page">
                      <li className="list-group-item"
                        onClick={this.openFilterp}
                      >
                        <span className="nav_icons nav_filter btn_style">
                          <img src="img/icon_Filter.svg" alt="Filter" />
                          Filter
                        </span>
                      </li>
                      <li className="list-group-item" onClick={this.openBulkProdModel}>
                        <span className="nav_icons nav_bulk_update btn_style">
                          <img src="images/icons/edit_20.png" alt="bulk-update" />
                          Bulk Update
                        </span>
                      </li>
                      {/* download code*/}
                      {/*<li className="list-group-item">
                    <span class="nav_icons nav_download">
                      <img src="img/icon_Download.svg" alt="Download"/>
                      </span>
                    </li>*/}

                      {/* new code */}
                      <li className="list-group-item" id="enableDownloads">
                        <div className="dropdown">
                          <button className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="nav_icons nav_download">
                              <img src="img/icon_Download.svg" alt="Download" />
                            </span>
                          </button>
                          <div className="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                            <div className="d-flex">
                              <button type="button" onClick={this.generateCsv} className="doc-dowlload-btn">
                                <img src="images/icons/xls.png" alt="Download" className="img-fluid" />
                              </button>
                              <button type="button" onClick={this.generatePDF} className="doc-dowlload-btn">
                                <img src="images/icons/pdf.png" alt="Download" className="img-fluid" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </li>
                      {/*new code ends here */}
                      {/* download code ends*/}



                      {productBulkStart && (
                        <li className="list-group-item" onClick={this.openBulkProdModel}>
                          <span className="nav_icons nav_bulk_update progress_style">
                            <div className="progress_txt">
                              {!productBilkLoading && (
                                <><i className="fa fa-check" aria-hidden="true"></i></>
                              )}
                              {productBilkLoading && (
                                <><img src="images/loadinfo.gif" alt="" /> </>
                              )}
                              Uploaded {productBulkNow} of {productBulkTotal}
                            </div>
                            <span id="progessing" style={{ "width": `${productBulkProgress}%` }}></span>
                          </span>
                        </li>
                      )}
                      {DataSet && DataSet.length > 0 && (
                        <li className="list-group-item" id="enableDownloads">
                          <span className="nav_icons nav_download" onClick={this.saveAsExcel}>
                            <img src="img/icon_Download.svg" alt="Download" />
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="tab-content" id="nav-tabContent">

                          {/* all product tab content */}
                          <div
                            className="tab-pane fade show active"
                            id="nav-all"
                            role="tabpanel"
                            aria-labelledby="nav-all-tab"
                          >
                            {tab === "all" && (
                              <AllProduct
                                products={products}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}
                          </div>
                          {/* end all product tab content */}

                          {/* Active product tab content */}
                          <div
                            className="tab-pane fade"
                            id="nav-active"
                            role="tabpanel"
                            aria-labelledby="nav-active-tab"
                          >
                            {tab === "active" && (
                              <ActiveProducts
                                products={products}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}
                          </div>
                          {/* end Active product tab content */}

                          {/* InActive product tab content */}
                          <div
                            className="tab-pane fade"
                            id="nav-inactive"
                            role="tabpanel"
                            aria-labelledby="nav-inactive-tab"
                          >
                            {tab === "inactive" && (
                              <InActiveProducts
                                products={products}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}
                          </div>
                          {/* end InActive product tab content */}

                          {/* Low stock product tab content */}
                          <div
                            className="tab-pane fade"
                            id="nav-low-stock"
                            role="tabpanel"
                            aria-labelledby="nav-low-stock-tab"
                          >
                            {tab === "lowstock" && (

                              <LowStocks
                                products={products}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}
                          </div>
                          {/* end Low stock product tab content */}

                          {/* Out of stock product tab content */}
                          <div
                            className="tab-pane fade"
                            id="nav-out-stock"
                            role="tabpanel"
                            aria-labelledby="nav-out-stock-tab"
                          >
                            {tab === "outofstock" && (
                              <OutofStocks
                                products={products}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id} />
                            )}
                          </div>
                          {/* end Out of stock product tab content */}

                          {/* Offer product tab content */}
                          <div
                            className="tab-pane fade"
                            id="nav-offer"
                            role="tabpanel"
                            aria-labelledby="nav-offer-tab"
                          >
                            {tab === "offer" && (

                              <OfferProducts
                                offer_details={offer_details}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id} />
                            )}
                          </div>
                          {/* end Offer product tab content */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FilterProduct /> */}
      </>
    )
  }
}

function mapStateToProps(state) {
  const { user, user_id, sfid } = state.auth;
  const { products, offer_details } = state.user;
  const { productBulkStart, openFilterpModel, productBilkLoading, productBulkProgress, productBulkTotal, productBulkNow } = state.model
  return {
    productBilkLoading,
    productBulkStart,
    productBulkProgress,
    productBulkTotal,
    productBulkNow,
    openFilterpModel,
    user,
    products,
    offer_details,
    user_id,
    sfid
  };
}

export default connect(mapStateToProps)(Product);
