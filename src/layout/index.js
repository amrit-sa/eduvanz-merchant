
import React from 'react';
import Helmet from "react-helmet";

const LayoutOne = ({children}) =>
      <div>
        <Helmet>
            <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />
            <link rel="stylesheet" type="text/css" href="fonts/linearicons-v1.0.0/icon-font.min.css" />
            <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css" />
            <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css" />
            <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css" />
            <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css" />
            <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css" />
            <link rel="stylesheet" type="text/css" href="vendor/slick/slick.css" />
            <link rel="stylesheet" type="text/css" href="vendor/MagnificPopup/magnific-popup.css" />
            <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css" />
            <link rel="stylesheet" type="text/css" href="css/util.css" />
            <link rel="stylesheet" type="text/css" href="css/main.css" />
            <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
            <script src="vendor/animsition/js/animsition.min.js"></script>
            <script src="vendor/bootstrap/js/popper.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
            <script src="vendor/select2/select2.min.js"></script>
            <script src="vendor/daterangepicker/moment.min.js"></script>
            <script src="vendor/daterangepicker/daterangepicker.js"></script>
            <script src="vendor/slick/slick.min.js"></script>
            <script src="js/slick-custom.js"></script>
            <script src="vendor/parallax100/parallax100.js"></script>
            <script src="vendor/isotope/isotope.pkgd.min.js"></script>
            <script src="vendor/sweetalert/sweetalert.min.js"></script>
            <script src="js/main.js"></script>
    </Helmet>
    {children}
  </div>;

const LayoutTwo = ({children}) =>
    <>
        <Helmet>
        <title> Eduvanz - Dashboard </title>
        <link href="vendor/custom/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        <link  href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet" />
        <link   href="css/eduvanz-custom.css" rel="stylesheet" />
        <body id="page-top" />
        <script src="vendor/custom/jquery/jquery.min.js"></script>
        <script src="vendor/custom/jquery-easing/jquery.easing.min.js"></script>
        <script src="vendor/custom/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="js/sb-admin-2.min.js"></script>
        <script src="vendor/custom/chart.js/Chart.min.js"></script>
        <script src="js/demo/chart-area-demo.js"></script>
        <script src="js/demo/chart-pie-demo.js"></script>
        </Helmet>
        {children}
    </>;

export { LayoutOne, LayoutTwo }; 