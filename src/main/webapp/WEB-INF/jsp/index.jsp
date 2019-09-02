<%-- 
    Document   : index
    Created on : 26/08/2019, 15:43:52
    Author     : mateusmatinato
--%>

<%@page import="java.util.Date"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Estética</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="resources/bower_components/bootstrap/dist/css/bootstrap.min.css">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="resources/bower_components/font-awesome/css/font-awesome.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="resources/bower_components/Ionicons/css/ionicons.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="resources/dist/css/AdminLTE.min.css">
        <link rel="stylesheet" href="resources/dist/css/skins/skin-blue.min.css">
        <!-- CSS Pace -->
        <link rel="stylesheet" href="resources/plugins/pace/pace.min.css">
        
        
        <link rel="stylesheet" href="resources/dist/css/style.css">
        
        <!-- Datatables -->
        <link rel="stylesheet" href="resources/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
        
        
        <!-- Google Font -->
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    </head>

    <body class="fixed hold-transition skin-blue sidebar-mini">
        <div class="wrapper">

            <!-- Main Header -->
            <header class="main-header">

                <!-- Logo -->
                <a href="index2.html" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>E</b>MM</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>Estética</b>MM</span>
                </a>

                <!-- Header Navbar -->
                <nav class="navbar navbar-static-top" role="navigation">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <!-- Navbar Right Menu -->
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <!-- User Account Menu -->
                            <li class="dropdown user user-menu">
                                <!-- Menu Toggle Button -->
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <!-- The user image in the navbar-->
                                    <c:choose>
                                        <c:when test="${usuarioLogado.cpf == '45010444895'}">
                                            <img src="resources/dist/img/mateus.jpg" class="user-image" alt="User Image">
                                        </c:when>
                                        <c:when test="${usuarioLogado.cpf == '11111111111'}">
                                            <img src="resources/dist/img/mariana.jpg" class="user-image" alt="User Image">
                                        </c:when>
                                    </c:choose>
                                    <!-- hidden-xs hides the username on small devices so only the image appears. -->
                                    <span class="hidden-xs">${usuarioLogado.nome}</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- The user image in the menu -->
                                    <li class="user-header">
                                        <c:choose>
                                            <c:when test="${usuarioLogado.cpf == '45010444895'}">
                                                <img src="resources/dist/img/mateus.jpg" class="img-circle" alt="User Image">
                                            </c:when>
                                            <c:when test="${usuarioLogado.cpf == '11111111111'}">
                                                <img src="resources/dist/img/mariana.jpg" class="img-circle" alt="User Image">
                                            </c:when>
                                        </c:choose>

                                        <p>
                                            ${usuarioLogado.nome}
                                        </p>
                                    </li>
                                    <!-- Menu Footer-->
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="meusDados" class="btn btn-default btn-flat">Meus dados</a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="logout" class="btn btn-default btn-flat">Sair</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar">

                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">

                    <!-- Sidebar user panel (optional) -->
                    <div class="user-panel" >
                        <div class="info">
                            <p>${usuarioLogado.nome}</p>
                            <!-- Status -->
                            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>

                    <!-- Sidebar Menu -->
                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="header">Menu</li>
                        <!-- Optionally, you can add icons to the links -->
                        <li class="active"><a href="home" class="btnMenu"><i class="fa fa-home"></i> <span>Início</span></a></li>
                        <li><a href="clientes" class="btnMenu"><i class="fa fa-user"></i> <span>Clientes</span></a></li>
                        <li><a href="agenda" class="btnMenu"><i class="fa fa-calendar"></i> <span>Agenda</span></a></li>
                        <li><a href="#" class="btnMenu"><i class="fa fa-list"></i> <span>Serviços</span></a></li>
                    </ul>
                    <!-- /.sidebar-menu -->
                </section>
                <!-- /.sidebar -->
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                
            </div>
            <!-- /.content-wrapper -->

            <!-- Main Footer -->
            <footer class="main-footer">
                <!-- Default to the left -->
                <strong>Copyright &copy;<a href="www.github.com/mateusmatinato">Mateus Matinato</a>.</strong> 
            </footer>
        </div>
        <!-- ./wrapper -->

        <!-- REQUIRED JS SCRIPTS -->

        <!-- jQuery 3 -->
        <script src="resources/bower_components/jquery/dist/jquery.min.js"></script>
        <!-- Bootstrap 3.3.7 -->
        <script src="resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <!-- AdminLTE App -->
        <script src="resources/dist/js/adminlte.min.js"></script>
        <!--Pace: animação de loading das páginas -->
        <script src="resources/bower_components/PACE/pace.min.js"></script>
        <!--Datatables-->
        <script src="resources/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="resources/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
        <!-- Input mask -->
        <script src="resources/plugins/input-mask/jquery.inputmask.js"></script>
        <script src="resources/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
        <script src="resources/plugins/input-mask/jquery.inputmask.extensions.js"></script>
        
        <script src="resources/dist/js/index.js"></script>

    </body>
</html>
