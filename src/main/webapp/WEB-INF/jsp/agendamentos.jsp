<%-- 
    Document   : home
    Created on : 31/08/2019, 20:40:03
    Author     : mateu
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="resources/bower_components/fullcalendar/dist/fullcalendar.min.css">
<link rel="stylesheet" href="resources/bower_components/fullcalendar/dist/fullcalendar.print.min.css" media="print">
<link rel="stylesheet" href="resources/bower_components/bootstrap-daterangepicker/daterangepicker.css">

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
        <!--
    <div class="col-md-3">
        <div class="box box-solid">
            <div class="box-header with-border">
                <h4 class="box-title">Novo Agendamento</h4>
                <div class="pull-right">
                    <button class="btn btn-sm btn-primary"><i class="fa fa-plus"></i></button>
                </div>
            </div>
            <div class="box-body">
        <div id="external-events">
        <c:forEach items="${servicos}" var="servico">
            <div name="servico-${servico.id}" class="external-event bg-${servico.id} ui-draggable ui-draggable-handle" style="position: relative;">${servico.nome}</div>
        </c:forEach>
    </div>
</div>
</div>
        <div class="box box-solid">
            <div class="box-header with-border">
                <h3 class="box-title">Create Event</h3>
            </div>
            <div class="box-body">
                <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                   <ul class="fc-color-picker" id="color-chooser">
                        <li><a class="text-aqua" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-blue" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-light-blue" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-teal" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-yellow" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-orange" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-green" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-lime" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-red" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-purple" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-fuchsia" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-muted" href="#"><i class="fa fa-square"></i></a></li>
                        <li><a class="text-navy" href="#"><i class="fa fa-square"></i></a></li>
                    </ul>
                </div>
                <div class="input-group">
                    <input id="new-event" type="text" class="form-control" placeholder="Event Title">

                    <div class="input-group-btn">
                        <button id="add-new-event" type="button" class="btn btn-primary btn-flat">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        -->
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
                <div class="form-group">
                    <div class="form-group">
                        <label>Serviço</label>
                        <select id="selectServicoModal" class="form-control">
                            <c:forEach items="${servicos}" var="servico">
                                <option value="${servico.id}">${servico.nome}</div>
                                </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="nomeClienteModal">Nome do Cliente</label>
                    <input type="text" class="form-control" id="nomeClienteModal" placeholder="">
                </div>
                <div class="row">
                    <div class="form-group col-md-8">
                        <label for="horarioAgendamento">Data e Hora de início</label>
                        <input type="text" class="form-control" id="horarioAgendamento">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="duracaoAgendamento">Duração (em horas)</label>
                        <input type="time" class="form-control" id="duracaoAgendamento">
                    </div>
                </div>
                <div class="row">
                    
                    <div class="form-group col-md-9">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-dollar"></i> Preço</span>
                            <input type="number" min="0.00" step="0.01" max="100000.00" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-3">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox">
                                Promoção
                            </label>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Salvar</button>
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

<script>
                $(function () {

                    /* initialize the external events
                     -----------------------------------------------------------------*/
                    function init_events(ele) {
                        ele.each(function () {

                            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                            // it doesn't need to have a start or end
                            var eventObject = {
                                title: $.trim($(this).text()) // use the element's text as the event title
                            };

                            // store the Event Object in the DOM element so we can get to it later
                            $(this).data('eventObject', eventObject);

                            // make the event draggable using jQuery UI
                            $(this).draggable({
                                zIndex: 1070,
                                revert: true, // will cause the event to go back to its
                                revertDuration: 0  //  original position after the drag
                            });

                        });
                    }
                    ;

                    init_events($('#external-events div.external-event'));

                    /* initialize the calendar
                     -----------------------------------------------------------------*/
                    //Date for the calendar events (dummy data)
                    var date = new Date();
                    var d = date.getDate(),
                            m = date.getMonth(),
                            y = date.getFullYear();
                    $('#calendar').fullCalendar({
                        locale: 'pt-br',
                        defaultView: 'agendaWeek',
                        allDaySlot: false,
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'agendaWeek,agendaDay'
                        },
                        //Random default events
                        events: 'listaAgendamentos',
                        eventOverlap: false,
                        selectOverlap: false,
                        editable: false, /*
                         droppable: true,
                         drop: function (date, allDay) { // this function is called when something is dropped
                         abrirModal(this, date);
                         
                         // retrieve the dropped element's stored Event Object
                         var originalEventObject = $(this).data('eventObject');
                         
                         // we need to copy it, so that multiple events don't have a reference to the same object
                         var copiedEventObject = $.extend({}, originalEventObject);
                         
                         // assign it the date that was reported
                         copiedEventObject.start = date;
                         copiedEventObject.allDay = allDay;
                         copiedEventObject.backgroundColor = $(this).css('background-color');
                         copiedEventObject.borderColor = $(this).css('border-color');
                         
                         // render the event on the calendar
                         // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                         $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                         
                         
                         }
                         */
                    });

                    /* ADDING EVENTS */
                    var currColor = '#3c8dbc'; //Red by default
                    //Color chooser button
                    var colorChooser = $('#color-chooser-btn');
                    $('#color-chooser > li > a').click(function (e) {
                        e.preventDefault();
                        //Save color
                        currColor = $(this).css('color');
                        //Add color effect to button
                        $('#add-new-event').css({'background-color': currColor, 'border-color': currColor});
                    });
                    $('#add-new-event').click(function (e) {
                        e.preventDefault();
                        //Get value and make sure it is not null
                        var val = $('#new-event').val();
                        if (val.length == 0) {
                            return;
                        }

                        //Create events
                        var event = $('<div />');
                        event.css({
                            'background-color': currColor,
                            'border-color': currColor,
                            'color': '#fff'
                        }).addClass('external-event');
                        event.html(val);
                        $('#external-events').prepend(event);

                        //Add draggable funtionality
                        init_events(event);

                        //Remove event from text input
                        $('#new-event').val('');
                    });
                });

                //Date range picker with time picker
                $('#horarioAgendamento').daterangepicker({
                    singleDatePicker: true,
                    timePicker: true,
                    timePickerIncrement: 15,
                    timePicker24Hour: true,
                    minimumNights: 0,
                    applyButtonClasses: 'btn-primary',
                    locale: {
                        format: 'DD/MM/YYYY HH:mm ',
                        cancelLabel: 'Limpar',
                        applyLabel: 'Confirmar'
                    }
                });

                function abrirModal(servico, data) {
                    /*
                     var idServico = $(servico).attr('name').split('-');
                     $("#selectServicoModal").find('option').not("[value='" + idServico[1] + "']").addClass('hide');
                     $("#selectServicoModal").find("[value='" + idServico[1] + "']").prop('selected', 'selected');
                     $('#horarioAgendamento').data('daterangepicker').setStartDate(moment(data).format("DD/MM/YYYY HH:mm"));
                     $("#modal-evento").modal('show');
                     */
                    $("#modal-evento").modal("show");
                }

</script>

<style>
    .bg-1{
        color: white;
        background-color: rgb(0, 166, 90);
    }

    .bg-2{
        color: white;
        background-color: rgb(243, 156, 18);
    }

    .bg-3{
        color: white;
        background-color: rgb(0, 192, 239);
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

</style>