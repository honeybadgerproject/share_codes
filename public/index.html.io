<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <title>Lumen - Multi-purpose Bootstrap Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
    <meta name="description" content="">
    <meta name="keywords" content="">

    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <link rel="shortcut icon" href="img/favicon.ico">

    <!-- Core CSS -->
    <link type="text/css" rel="stylesheet" href="css/bootstrap.css"><!-- Bootstrap -->
    <link type="text/css" rel="stylesheet" href="font-awesome/css/font-awesome.min.css"><!-- font-awesome -->
    <link type="text/css" rel="stylesheet" href="css/animate.min.css"><!-- Animation -->
    <link type="text/css" rel="stylesheet" href="css/style.css"><!-- Light Theme Core CSS -->

    <!-- Google Fonts here -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto:100,300,100italic,300italic,400,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

    <!-- Compiled and minified CSS  bootstrap-->
    <!--<link rel="stylesheet" href="styles/vendor/css/bootstrap.min.css">-->

    <!-- previews -->
    <!--<link rel="stylesheet" href="styles/previews.css">-->
  </head>
  <body  ng-app="myApp">

    <div ng-controller="AppCtrl">

      <!-- Preloader Area Start
          ====================================================== -->
          <div id="mask">
              <div id="loader">
              </div>
          </div>
          <!-- =================================================
          Preloader Area End -->


          <!-- Header Area Start
          ====================================================== -->
            <header class="header-area">
              <div class="container clearfix">

                <!-- Start: Logo Area -->
                <div class="logo-area">
                  <a href="#" class="logo"><img src="img/logo.png" alt=""></a>
                  <span class="phone"></span>
                  <a class="toggle-btn"><i class="fa fa-bars"></i></a>
                </div>
                <!-- End: Logo Area -->

                <!-- Start: Navigation Area -->
                <nav class="nav-main">
                  <ul class="menu-cont">
                    <li><a ui-sref="projects">Dashboard</a></li>
                    <li><a ui-sref="search">Search</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li>
                      <div ng-controller="loginCtrl">
                        <button type="button" class="btn btn-primary btn-large" data-ng-show="!logged" data-ng-disabled="!facebookReady" data-ng-click="IntentLogin()">Login with Facebook</button>
                        <button type="button" class="btn btn-danger btn-large" data-ng-show="logged" data-ng-disabled="!facebookReady" data-ng-click="logout()">Logout</button>

                        <div>
                          <debug val="user"></debug>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
                <!-- End: Navigation Area -->

              </div>
            </header>

      <ui-view></ui-view>

    </div>

    <!-- lumen -->
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script><!-- jquery -->
    <script type="text/javascript" src="js/bootstrap.js"></script><!-- Bootstrap Js -->
    <script type="text/javascript" src="js/jquery.particleground.js"></script><!-- Particle Header Js -->
    <script type="text/javascript" src="js/particle.js"></script><!-- Particle Header Js -->
    <script type="text/javascript" src="js/jquery.flexslider.js"></script><!-- Flexslider Js -->
    <script type="text/javascript" src="js/flexslider-settings.js"></script><!-- Flexslider Settings Js -->
    <script type="text/javascript" src="js/jquery.easytabs.min.js"></script><!-- Easy Tab Js -->
    <script type="text/javascript" src="js/easytabs-settings.js"></script><!-- Easy Tab Js -->
    <script type="text/javascript" src="js/testimonialcarousel.js"></script><!-- Testimonial Carousel Js -->
    <script type="text/javascript">

		// --------------- Testimonial Carousel -------------------
		// --------------------------------------------------------

		$('.carousel').carousel({
		  interval: 5000
		})

    </script>
    <!--<script type="text/javascript" src="js/jquery.appear.js"></script> Appear Js -->
    <script type="text/javascript" src="js/responsiveCarousel.js"></script><!-- Appear Js -->
    <script type="text/javascript">

		// --------------- Testimonial Carousel -------------------
		// --------------------------------------------------------

		jQuery(document).ready(function($){
			$('.crsl-items').carousel({ visible: 5, itemMinWidth:171, itemMargin: 50 });
		});

    </script>
    <script type="text/javascript" src="js/jquery.appear.js"></script><!-- Appear Js -->
    <script type="text/javascript" src="js/settings.js"></script><!-- Settings Js -->


    <!-- Angular JS -->
    <!--<script src="js/vendor/angular-1.4.3.min.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script>
    <!-- UI Routes -->
    <script src="jso/vendor/angular-ui-router-0.2.8.min.js"></script>
    <!--facebook-->
    <!--<script src="js/vendor/connect-facebook-sdk.js"></script>-->
    <script src="http://rawgithub.com/Ciul/angular-facebook/master/lib/angular-facebook.js"></script>
    <!-- ui router modal -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.js"></script>
    <script src="https://rawgit.com/christopherthielen/ui-router-extras/0.0.10/release/ct-ui-router-extras.js"></script>
    <!--braintree -->
    <script src="https://js.braintreegateway.com/v2/braintree.js"></script>
    <!-- braintree-angular -->
    <script src="jso/braintree-angular.js"></script>
    <!-- index braintree -->
    <!--<script src="js/index-braintree.js"></script>-->
    <!-- app controller -->
    <script src="controllers/app-controller.js"></script>
    <!-- login controller -->
    <script src="controllers/login-controller.js"></script>
    <!-- braintree controller -->
    <script src="controllers/braintree-controller.js"></script>
    <!-- hacking zone controller -->
    <script src="controllers/hacking-zone-controller.js"></script>


  </body>
</html>
