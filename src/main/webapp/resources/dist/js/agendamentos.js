$(document).ready(function () {


    $("#nomeClienteModal").devbridgeAutocomplete({
        serviceUrl: 'autocompleteNome',
        autoSelectFirst: 'true',
        onSelect: function (suggestion) {
            $("#idClienteSelecionado").val(suggestion.idCliente);

        },
        onInvalidateSelection: function () {
            $("#nomeClienteModal").val("");
            $("#idClienteSelecionado").val("");
        }
    });



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
        editable: false,
        selectable: true,
        select: function (start, end, jsEvent, view) {
            var seconds = (end - start) / 1000;
            abrirModal(this, start, seconds);
        },
        minTime: "08:00:00",
        maxTime: "24:00:00",
        height: "auto"
    });

    $("#btnSalvarAtendimento").click(function () {
        $.ajax({
            url: 'salvarAtendimento',
            data: $("#formAtendimento").serialize(),
            type: 'post',
            success: function (data, textStatus, jqXHR) {
                if (data === "sucesso") {
                    $("#calendar").fullCalendar('refetchEvents');
                    $("#formAtendimento").trigger("reset");
                    $("#modal-evento").modal('hide');
                } else {
                    $("#horarioAgendamento").parent('.form-group').addClass('is-invalid');
                    $("#duracaoAgendamento").parent('.form-group').addClass('is-invalid');
                }
            }
        });
    });

    $('#modal-evento').on('hidden.bs.modal', function () {
        $("#horarioAgendamento").parent('.form-group').removeClass('is-invalid');
        $("#duracaoAgendamento").parent('.form-group').removeClass('is-invalid');
        $("#formAtendimento").trigger("reset");
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

function abrirModal(servico, data, duracao) {
    
    var date = new Date(null);
    date.setSeconds(duracao);
    var result = date.toISOString().substr(11, 8);
    $("#duracaoAgendamento").val(result);
    $('#horarioAgendamento').data('daterangepicker').setStartDate(moment(data).format("DD/MM/YYYY HH:mm"));
    $("#modal-evento").modal("show");

}
