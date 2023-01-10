import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { salesForceLogin } from "../actions/auth";
import { getLeadFunnelData, getdashboard, getSalesInsightGraphData, getCustInsighGraphData, getTopProductGraphData, getCategory } from '../actions/user'
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
import Topbar from "../common/topbar";
import Filter from "../common/filter";
import Sidebar from "../common/sidebar";
import FunnelGraph from "funnel-graph-js";


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
        '#1251F1',
        '#F44DAF',
        '#F8E593',
        '#7AF496',
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
      //data: [19, 8, 5, 8, 6],
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        '#1251F1',
        '#F44DAF',
        '#F8E593',
        '#7AF496',
        '#1824AC'
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
    padding: {
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
    linearScale: {

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
    padding: {

    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20,
        boxHeight: 20,
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
    tooltip: {
      backgroundColor: 'rgba(132, 177, 209, 1)',
    }
  },
};

const labels = [];

export const data3 = {
  labels,
  datasets: [
    {
      label: 'Refund/Cancelled',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#0600FF',
      borderColor: '#0600FF',
      borderWidth: 2,
      data: []
    },
    {
      label: 'Disbursed',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#FF0097',
      borderColor: '#FF0097',
      borderWidth: 2,
      data: []
    }
  ]
};

export const options4 = {
  scale: {
    x: {
      stacked: true,
      min: 0,
      ticks: {
        stepSize: 5
      }
    },
    y: {
      stacked: true,
      beginAtAero: true,
    }
  },
  layout: {
    padding: {

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
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        padding: 20,

        font: {
          size: 16
        },
      }
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


export const data4 = {
  // labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
  labels: [''],

  datasets: [
    {
      label: 'Disbursed',
      //data: [3, 7, 3, 11, 12, 3, 9],
      data: [0],

      // borderColor: 'rgba(248, 229, 147, 1)',
      backgroundColor: '#1251F1',
    },
    {
      label: 'Cancelled',
      data: [0],
      //data: [12, 19, 3, 5, 2, 3, 8],
      // borderColor: 'rgba(244, 77, 175, 1)',
      backgroundColor: '#F44DAF',
    },
    {
      label: 'Leads',
      data: [0],
      //data: [1, 5, 8, 7, 6, 10, 12],
      // borderColor: 'rgba(18, 81, 241, 1)',
      backgroundColor: '#F8E593',
    }


  ],
};

const TODAY = "Today";
const WEEK = "This Week";
const MONTH = "This Month";
const GRAPH1 = "1";
const GRAPH2 = "2";
const GRAPH3 = "3";

class Home extends Component {
  constructor(props) {
    super(props);
    this.getSalesInsight = this.getSalesInsight.bind(this);
    this.getTopProduct = this.getTopProduct.bind(this);
    this.getCustInsight = this.getCustInsight.bind(this);
    this.state = {
      content: "",
      page: 1,
      // SummarySelectValue: TODAY,
      SummarySelectValue: MONTH,
      funnelSelectValue: MONTH,
      salesGraphData: data3,
      custInsigh: data2,
      topProData: data4,
      salesSelectValue: MONTH,
      topProSeleValue: MONTH,
      RejDropSeleValue: TODAY,
      custInsightValue: MONTH,
      topProCat: ""
    };
  }

  getfunneldata = (sifIdIs, isUpdate) => {
    // let sfid = localStorage.getItem('sfid');
    this.props.dispatch(getLeadFunnelData(this.state.funnelSelectValue, sifIdIs)).then(response => {
      let graphData = [['0'], ['0'], ['0'], ['0'], ['0'], ['0']]
      if (response.status == "success") {
        // let graphData = [[response.rowData.approved_leads ? response.rowData.approved_leads : "10"], [response.rowData.cancelled_leads ? response.rowData.cancelled_leads : "8"], [response.rowData.disbursal_pending_leads ? response.rowData.disbursal_pending_leads : "6"], 
        // [response.rowData.disbursed_leads ? response.rowData.disbursed_leads : "4"], [response.rowData.received_leads ? response.rowData.received_leads : "2"], [response.rowData.wip_leads ? response.rowData.wip_leads : "2"]]
        graphData = [[response.rowData.received_leads ? response.rowData.received_leads : '0'], [response.rowData.wip_leads ? response.rowData.wip_leads : '0'], [response.rowData.approved_leads ? response.rowData.approved_leads : '0'],
        [response.rowData.disbursal_pending_leads ? response.rowData.disbursal_pending_leads : '0'], [response.rowData.disbursed_leads ? response.rowData.disbursed_leads : '0'], [response.rowData.cancelled_leads ? response.rowData.cancelled_leads : '0']]
      }
      const funneldata = {
        labels: [
          "Leads Received",
          "WIP",
          "Approved",
          "Disbursal Pending",
          "Disbursed",
          "Cancelled"
        ],
        subLabels: ["Data"],
        colors: [["#e7edfe", "#d0dcfc", "#a0b9f9", "#7197f7", "#4174f4", "#1251f1"]],
        values: graphData
      };

      const graph = new FunnelGraph({
        container: ".App1",
        gradientDirection: "horizontal",
        data: funneldata,
        displayPercent: false,
        direction: "Horizontal",
        // width: 1000,
        // height: 350,
        subLabelValue: "values"
      });
      // document.getElementsByClassName("App1").innerHTML = "";
      graph.draw();
      if (isUpdate == "update") {
        graph.updateData(graphData)
        // graph.updateData({graphData}) 
      }
    })
      .catch(error => {
        console.log(error)
      })
  }
  getSummarydata = (event) => {
    let sfid = localStorage.getItem('sfid');
    this.setState({ SummarySelectValue: event.target.value }, () => {
      this.props.dispatch(getdashboard(this.state.SummarySelectValue, sfid));
    });
  }
  componentDidMount() {
    let sfid = localStorage.getItem('sfid');
    const { funnelSelectValue } = this.state;
    this.props.dispatch(getCategory());
    this.getfunneldata(sfid);
    const { SummarySelectValue } = this.state;
    this.props.dispatch(getdashboard(SummarySelectValue, sfid));
    this.getSalesInsight(sfid)
    this.getTopProduct(sfid);
    this.getCustInsight(sfid, this.state.custInsightValue);
    console.log(this.props.salesInsightGraphData);
    let getProd = { merchant_id: this.props.user_id }
    //alert(sfid)


    // this.props.dispatch(getdashboard(getProd, sfid)).then((response) => {
    //   if (!response.responseCode) {
    //     this.setState({ rowData: response });
    //   }
    // });


    // if(this.props.products){
    //     this.setState({products : this.props.products})
    // }
  }

  getSalesInsight = (sfIdis) => {
    this.props.dispatch(getSalesInsightGraphData(sfIdis, this.state.salesSelectValue)).then(res => {
      console.log(res, "graph data response")
      // let year = res.disburseData[0].year;
      // let labelD =[];
      // let labelR =[];
      let disbursedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let refundData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (res.status == "success") {
        for (let i = 0; i < res.disburseData.length; i++) {
          // labelD.push(res.disburseData[i].month);
          const disDataIs = res.disburseData[i]
          switch (disDataIs.month) {
            case "January":
              disbursedData[0] = disDataIs.amount
              break;
            case "February":
              disbursedData[1] = disDataIs.amount
              break;
            case "March":
              disbursedData[2] = disDataIs.amount
              break;
            case "April":
              disbursedData[3] = disDataIs.amount
              break;
            case "May":
              disbursedData[4] = disDataIs.amount
              break;
            case "June":
              disbursedData[5] = disDataIs.amount
              break;
            case "July":
              console.log("case jul")
              disbursedData[6] = disDataIs.amount
              break;
            case "August":
              console.log("case aug")
              disbursedData[7] = disDataIs.amount
              break;
            case "September":
              disbursedData[8] = disDataIs.amount
              break;
            case "October":
              disbursedData[9] = disDataIs.amount
              break;
            case "November":
              disbursedData[10] = disDataIs.amount
              break;
            case "December":
              disbursedData[11] = disDataIs.amount
              break;
            default:
              break;
          }
          // disbursedData.push(res.disburseData[i].amount)
        }
        for (let i = 0; i < res.refundData.length; i++) {
          // labelR.push(res.refundData[i].month);
          const refDataIs = res.refundData[i]
          switch (refDataIs.month) {
            case "January":
              refundData[0] = refDataIs.amount
              break;
            case "February":
              refundData[1] = refDataIs.amount
              break;
            case "March":
              refundData[2] = refDataIs.amount
              break;
            case "April":
              refundData[3] = refDataIs.amount
              break;
            case "May":
              refundData[4] = refDataIs.amount
              break;
            case "June":
              refundData[5] = refDataIs.amount
              break;
            case "July":
              refundData[6] = refDataIs.amount
              break;
            case "August":
              refundData[7] = refDataIs.amount
              break;
            case "September":
              refundData[8] = refDataIs.amount
              break;
            case "October":
              refundData[9] = refDataIs.amount
              break;
            case "November":
              refundData[10] = refDataIs.amount
              break;
            case "December":
              refundData[11] = refDataIs.amount
              break;
            default:
              break;
          }
          // refundData.push(res.refundData[i].amount)
        }
      }
      //  let labels = [...new Set([...labelD,...labelR])];
      console.log(refundData, disbursedData, '>>>>>>>>>>> line chart data is')
      let datas = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Refund/Cancelled',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#0600FF',
            borderColor: '#0600FF',
            borderWidth: 2,
            data: refundData,
          },
          {
            label: 'Disbursed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#FF0097',
            borderColor: '#FF0097',
            borderWidth: 2,
            data: disbursedData,
          }
        ]
      };
      this.setState({ salesGraphData: datas });



    });
  }

  getTopProduct = (sfIdIs) => {
    //console.log('top pro cat',this.state.topProCat)
    this.props.dispatch(getTopProductGraphData(sfIdIs, this.state.topProSeleValue, this.state.topProCat !== 'All Category' ? this.state.topProCat : "")).then(response => {
      if (response.status == "success") {
        let labelArray = []
        let disbusdata = []
        let cancelData = []
        let totalLead = []

        let graphData = response.top5Product ? response.top5Product : []
        if (graphData) {
          labelArray = graphData.labels ? graphData.labels : []
          disbusdata = graphData.Disbursed ? graphData.Disbursed : []
          cancelData = graphData.Cancelled ? graphData.Cancelled : []
          totalLead = graphData.Leads ? graphData.Leads : []
        }

        // for (let i = 0; i < response.top5Product.length; i++) {
        //   const productIs = response.top5Product[i];
        //   let disCount = 0;
        //   let cancelCount = 0;
        //   if (productIs.product_name) {
        //     labelArray.push(productIs.product_name)
        //     for (let j = 0; j < response.topProductByStatus.length; j++) {
        //       const singleProd = response.topProductByStatus[j];
        //       if (productIs.product_name == singleProd.product_name) {
        //         totalLead.push(productIs.total_lead)
        //         if (singleProd.status == "Loan Disbursed") {
        //           disCount += singleProd.total_lead
        //         } else if (singleProd.status == "Loan Cancelled") {
        //           cancelCount += singleProd.total_lead
        //         }
        //       }
        //     }
        //     disbusdata.push(disCount);
        //     cancelData.push(cancelCount);
        //     disCount = 0; cancelCount = 0;
        //   }
        // }

        // if(labelArray.length == 0){
        //   labelArray = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']
        // }
        // if(disbusdata.length == 0){
        //   disbusdata = [5,8,6,9,2]
        // }
        // if(cancelData.length == 0){
        //   cancelData = [10,8,2,6,9]
        // }
        // if(totalLead.length == 0){
        //   totalLead = [15,16,8,15,11]
        // }


        let data = {
          labels: labelArray,
          //labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
          datasets: [
            {
              label: 'Disbursed',
              data: disbusdata,
              //data: [5,8,6,9,20],
              // borderColor: 'rgba(248, 229, 147, 1)',
              backgroundColor: '#1251F1',
            },
            {
              label: 'Cancelled',
              data: cancelData,
              //data: [10,8,2,6,9],
              // borderColor: 'rgba(244, 77, 175, 1)',
              backgroundColor: '#F44DAF',
            },
            {
              label: 'Leads',
              data: totalLead,
              //data: [15,16,8,15,11],
              // borderColor: 'rgba(18, 81, 241, 1)',
              backgroundColor: '#F8E593',
            }


          ],
        };
        this.setState({
          topProData: data,
        })
      }
    })
      .catch(error => {

      })
  }

  getCustInsight = (sfIdis) => {
    this.props.dispatch(getCustInsighGraphData(sfIdis, this.state.custInsightValue)).then(response => {
      let graphData = [response.customerInsight[0].ageGroupCount18to30 ? response.customerInsight[0].ageGroupCount18to30 : "0", response.customerInsight[0].ageGroupCount30to40 ? response.customerInsight[0].ageGroupCount30to40 : "0",
      response.customerInsight[0].ageGroupCount40to50 ? response.customerInsight[0].ageGroupCount40to50 : "0",
      response.customerInsight[0].ageGroupCount50to60 ? response.customerInsight[0].ageGroupCount50to60 : "0", response.customerInsight[0].ageGroupCount60plus ? response.customerInsight[0].ageGroupCount60plus : "0"];
      // for (let i = 0; i < response.customerInsight.length; i++) {
      //   const element = response.customerInsight[i];

      // }
      // console.log('cust insight', graphData)
      let data = {
        labels: ['18 - 30', '30 - 40', '40 - 50', '50 - 60', "60+"],
        datasets: [
          {
            data: graphData,
            backgroundColor: [
              '#1251F1',
              '#F44DAF',
              '#F8E593',
              '#7AF496',
              '#1824AC'
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
      // console.log('graph data is', data)
      this.setState({
        custInsigh: data,
      })
    })
      .catch(error => {

      })
  }

  render() {

    const { user_id, dashboardData, leadFunnelData, salesInsightGraphData, category } = this.props;
    let sfid = localStorage.getItem('sfid');
    console.log('ddddddd', this.props.dashboardData)
    console.log('salesInsightGraphData', category);


    if (!user_id) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Helmet>
          <title> Eduvanz - Dashboard </title>
        </Helmet>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar
                dispatch={this.props.dispatch}
                title={"Dashboard"}
              />

              <div className="container-fluid">
                {/* Content Row */}
                {/* {dashboardData && dashboardData.rowData ?
                    ( */}

                <div className="row">
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-md-12">
                    <div className="section-heading">
                      <h4>Summary</h4>
                      {/* <div className="select-rounded">
                            <select>
                              <option>Today</option>
                              <option>Tommrrow</option>
                              <option>Sunday</option>
                            </select>
                          </div> */}
                      <div className="select-rounded mr-3">
                        <select style={{ float: "right" }} onChange={this.getSummarydata}>
                          <option value="Today" >Today</option>
                          <option value="This Week">This Week</option>
                          <option value="This Month" selected>This Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Total Loans</p>
                      <h3>₹ {dashboardData && dashboardData && dashboardData.total_loans ? dashboardData.total_loans : '0'}</h3>
                      <p className="application">{dashboardData && dashboardData && dashboardData.application_count ? dashboardData.application_count : '0'} applications</p>
                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Total Leads</p>
                      <h3>{dashboardData && dashboardData && dashboardData.total_lead ? dashboardData.total_lead : '0'}</h3>

                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Avg. Order Value</p>
                      <h3>₹ {dashboardData && dashboardData && dashboardData.avg_order_value ? dashboardData.avg_order_value : '0'}</h3>

                    </div>
                  </div>
                  {/* Pending Requests Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Avg. Loan Tenure</p>
                      <h3> {dashboardData && dashboardData && dashboardData.avg_tenure ? dashboardData.avg_tenure : '0'} mo</h3>
                    </div>

                  </div>
                </div>
              </div>
              {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Total Loans</p>
                      <h3>₹ {dashboardData && dashboardData.rowData && dashboardData.rowData.total_loans ? dashboardData.rowData.total_loans : '-'}</h3>
                      <p className="application">{dashboardData && dashboardData.rowData && dashboardData.rowData.application_count ? dashboardData.rowData.application_count : '-'} applications</p>
                    </div>
                  </div> */}
              {/* Earnings (Monthly) Card Example */}
              {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Total Leads</p>
                      <h3>{dashboardData && dashboardData.rowData && dashboardData.rowData.total_lead ? dashboardData.rowData.total_lead : '-'}</h3>

                    </div>
                  </div> */}
              {/* Earnings (Monthly) Card Example */}
              {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Avg. Order Value</p>
                      <h3>₹ {dashboardData && dashboardData.rowData && dashboardData.rowData.avg_order_value ? dashboardData.rowData.avg_order_value : '-'}</h3>

                    </div>
                  </div> */}
              {/* Pending Requests Card Example */}
              {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card summary-info">
                      <p className="total">Avg. Loan Tenure</p>
                      <h3> {dashboardData && dashboardData.rowData && dashboardData.rowData.avg_tenure ? dashboardData.rowData.avg_tenure : '-'} mo</h3>
                    </div>
                  </div> */}
            </div>
            {/* ) : ""
                      } */}
            <hr></hr>
            <div>

              <div className="row">
                <div className="col-6">
                  <div className="section-heading">
                    <h4 style={{ marginBottom: "20px" }}>Lead Funnel</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="select-rounded mr-3">
                    <select style={{ float: "right" }} onChange={(e) => {
                      this.setState({
                        funnelSelectValue: e.target.value,
                      }, () => { this.getfunneldata(sfid, "update") })
                    }}>
                      <option value="Today" >Today</option>
                      <option value="This Week">This Week</option>
                      <option value="This Month" selected>This Month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>Leads Received</h6>
                      <h4>{leadFunnelData.received_leads && leadFunnelData.received_leads}</h4>
                    </div>
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>WIP</h6>
                      <h4>{leadFunnelData.wip_leads && leadFunnelData.wip_leads}</h4>
                    </div>
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>Approved</h6>
                      <h4>{leadFunnelData.approved_leads && leadFunnelData.approved_leads}</h4>
                    </div>
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>Disbursal Pending</h6>
                      <h4>{leadFunnelData.disbursal_pending_leads && leadFunnelData.disbursal_pending_leads}</h4>
                    </div>
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>Disbursed</h6>
                      <h4>{leadFunnelData.disbursed_leads && leadFunnelData.disbursed_leads}</h4>
                    </div>
                    <div className="col-md-2 col-sm-6 lead-funnel">
                      <h6>Cancelled</h6>
                      <h4>{leadFunnelData.cancelled_leads && leadFunnelData.cancelled_leads}</h4>
                    </div>
                  </div> */}
              <div className="App1 col-12" style={{ height: "350px" }} />
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-lg-7 px-lg-5 border-right">
                <div className="row">
                  <div className="col-12">
                    <div className="section-heading">
                      <h4>Top Products</h4>
                      <div className="d-flex align-items-center mt-3 mt-lg-0">
                        <div className="select-rounded mr-3">
                          <select onChange={(e) => {
                            e.target.value &&
                              this.setState({
                                topProCat: e.target.value,
                              }, () => { this.getTopProduct(sfid) });
                          }}>
                            <option value="All Category">All Categories</option>
                            {
                              category &&
                              category.map(data => {
                                return (
                                  <option value={data.category_name}>{data.category_name}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                        <div className="select-rounded">
                          <select onChange={(e) => {
                            this.setState({
                              topProSeleValue: e.target.value,
                            }, () => { this.getTopProduct(sfid) });
                          }}>
                            <option value={TODAY}>Today</option>
                            <option value={WEEK}>This Week</option>
                            <option value={MONTH} selected>This Month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Bar options={options4} data={this.state.topProData} />
                <p>Cnt (in Thousand)</p>
              </div> 
              <div className="col-lg-5 px-lg-5">
                <div className="row">
                  <div className="col-12">
                    <div className="section-heading">
                      <h4>Reject/Drop reason</h4>
                      <div className="d-flex align-items-center">

                        <div className="select-rounded">
                          <select onChange={(e) => {
                            this.setState({
                              RejDropSeleValue: e.target.value,
                            })
                          }}>
                            <option value={TODAY}>Today</option>
                            <option value={WEEK}>This Week</option>
                            <option value={MONTH} selected>This Month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Doughnut options={options} data={data} />
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
                          <select onChange={(e) => {
                            this.setState({
                              custInsightValue: e.target.value,
                            }, () => { this.getCustInsight(sfid) })
                          }}>
                            <option value={TODAY}>Today</option>
                            <option value={WEEK}>This Week</option>
                            <option value={MONTH} selected>This Month</option>
                          </select>
                        </div>
                        {/* <div className="select-rounded">
                              <select>
                                <option>By age</option>
                                <option>Tommrrow</option>
                                <option>Sunday</option>
                              </select>
                            </div> */}

                      </div>
                    </div>
                  </div>
                </div>
                <Doughnut options={options} data={this.state.custInsigh} />
              </div>
              <div className="col-lg-7 px-lg-5">
                <div className="row">
                  <div className="col-12">
                    <div className="section-heading">
                      <h4>Sales/Revenue Chart</h4>
                      <div className="d-flex align-items-center">

                        <div className="select-rounded">
                          <select onChange={(e) => {
                            this.setState({
                              salesSelectValue: e.target.value,
                            }, () => { this.getSalesInsight(sfid) })
                          }}>
                            <option value={TODAY}>Today</option>
                            <option value={WEEK}>This Week</option>
                            <option value={MONTH} selected>This Month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Line options={options3} data={this.state.salesGraphData} />
              </div>
            </div>
          </div>
        </div>
        {/* </div>
        </div> */}
        <Filter />
      </>
    );
  }
}


function mapStateToProps(state) {
  const { leads, leadFunnelData, salesInsightGraphData, dashboardData, category } = state.user;
  const { user_id, token } = state.auth;
  const { message } = state.message;
  return {
    leads,
    user_id,
    token,
    message,
    leadFunnelData,
    dashboardData,
    salesInsightGraphData,
    category
  };
}
export default connect(mapStateToProps)(Home);
