<%-- 
    Document   : home
    Created on : 31/08/2019, 20:40:03
    Author     : mateu
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="resources/bower_components/fullcalendar/dist/fullcalendar.min.css">
<link rel="stylesheet" href="resources/bower_components/fullcalendar/dist/fullcalendar.print.min.css" media="print">
<link rel="stylesheet" href="resources/bower_components/bootstrap-daterangepicker/daterangepicker.css">

<link rel="stylesheet" href="resources/plugins/autocomplete/autocomplete.css">

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Agendamentos
        <div class="pull-right">
            <button onclick="abrirModal()" class="btn btn-sm btn-primary"><i class="fa fa-plus"> Novo</i></button>
        </div>
    </h1>
</section>

<!-- Main content -->
<section class="content container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <div id="calendar"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="modal fade in" id="modal-evento">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Novo Agendamento</h4>
            </div>
            <div class="modal-body">
                <form method="POST" id="formAtendimento">
                    <input type="hidden" id="idAtendimentoModal" name="id" value="0">
                    <div class="form-group">
                        <div class="form-group">
                            <label>Serviço</label>
                            <select name="servico" id="selectServicoModal" class="form-control">
                                <c:forEach items="${servicos}" var="servico">
                                    <option value="${servico.id}" name="${servico.preco}">${servico.nome}</div>
                                    </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nomeClienteModal">Nome do Cliente</label>
                        <input name="cliente.nome" type="text" class="form-control" id="nomeClienteModal" placeholder="" required>
                        <input name="cliente.id" type="hidden" id="idClienteSelecionado" required>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-8">
                            <label for="horarioAgendamento">Data e Hora de início</label>
                            <input name="dataInicioAtendimento" type="text" class="form-control" id="horarioAgendamento">
                            <div class="invalid-feedback">
                                Já existem agendamentos na data e hora selecionada.
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="duracaoAgendamento">Duração (em horas)</label>
                            <input name="duracaoAtendimento" type="time" class="form-control" id="duracaoAgendamento">
                            <div class="invalid-feedback">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="promocao">
                                    Promoção
                                </label>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-dollar"></i> Preço</span>
                                <input id="preco" name="preco" type="number" min="0.00" step="0.01" max="100000.00" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-money"></i> Parcelas</span>
                                <input id="parcelas" name="parcelas" type="number" min="1" step="1" max="12" class="form-control" value="1">
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left hide" id="btnExcluirAtendimento">Excluir</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="btnSalvarAtendimento">Salvar</button>
            </div>
        </div>
    </div>
</div>

<!-- /.content -->

<script src="resources/bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="resources/bower_components/moment/moment.js"></script>
<script src="resources/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
<script src="resources/bower_components/fullcalendar/dist/locale/pt-br.js"></script>
<script src="resources/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="resources/plugins/autocomplete/autocomplete.js"></script>


<script src="resources/dist/js/agendamentos.js"></script>

<style>
    .bg-1{
        color: black;
        background-color: #c9f5f3;
    }

    .bg-2{
        color: black;
        background-color: #fffea6;
    }

    .bg-3{
        color: black;
        background-color: #ffbfe9;
    }

    .bg-4{
        color: white;
        background-color: rgb(60, 141, 188);
    }

    .bg-5{
        color: white;
        background-color: rgb(221, 75, 57);
    }


    .drp-calendar.right thead>tr:nth-child(2) {
        display: none;
    }
    .drp-calendar.right tbody {
        display: none;
    }
    .daterangepicker.ltr .ranges, .daterangepicker.ltr .drp-calendar {
        float: none !important;
    }
    .daterangepicker .drp-calendar.right .daterangepicker_input {
        position: absolute;
        top: 45px;
        left: 8px;
        width: 230px;
    }
    .drp-calendar.left .drp-calendar-table {
        margin-top: 45px;
    }

    .invalid-feedback{
        display: none;
    }

    .is-invalid .invalid-feedback{
        display: block;
        color: red;
    }

    .is-invalid input{
        border: 1px solid red;
    }


</style>