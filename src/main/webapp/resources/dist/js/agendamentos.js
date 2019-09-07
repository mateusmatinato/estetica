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

    $("#selectServicoModal").change(function () {
        //Deve pegar o preço do serviço se não estiver selecionado promoção
        var preco = $(this).find(':selected').attr('name');
        $("input[name='preco']").val(parseFloat(preco).toFixed(2));
    });

    $("input[name='preco']").change(function () {
        $(this).val(parseFloat($(this).val()).toFixed(2));
    });

    $("#promocao").change(function () {
        if ($(this).is(':checked') == true) {
            $("input[name='preco']").prop("readonly", false);
        } else {
            $("#selectServicoModal").change();
            $("input[name='preco']").prop("readonly", true);
        }
    });
    
    $("#novoAgendamentoBtn").click(function (){
       $("#modal-evento").modal('show'); 
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
            abrirModal(start, seconds, true);
        },
        minTime: "08:00:00",
        maxTime: "24:00:00",
        height: "auto",
        eventClick: function (info) {
            carregarModal(info);

        }
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
    
    $("#btnExcluirAtendimento").click(function (){
        $.ajax({
            url: 'excluirAtendimento?id='+$("#idAtendimentoModal").val(),
            type: 'post',
            success: function (data, textStatus, jqXHR) {
                if (data === "sucesso") {
                    $("#calendar").fullCalendar('refetchEvents');
                    $("#formAtendimento").trigger("reset");
                    $("#modal-evento").modal('hide');
                }
            }
        });
    });

    $('#modal-evento').on('hidden.bs.modal', function () {
        $("#horarioAgendamento").parent('.form-group').removeClass('is-invalid');
        $("#duracaoAgendamento").parent('.form-group').removeClass('is-invalid');
        $("#formAtendimento").trigger("reset");
        $("input[name='preco']").prop("readonly", true);
        $("#idClienteSelecionado").val('');
        $("#idAtendimentoModal").val('0');
        $(".modal-title").text('Novo agendamento');
        
    $("#btnExcluirAtendimento").addClass('hide');
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

function carregarModal(info) {
    $("#idAtendimentoModal").val(info.idAtendimento);
    $("#nomeClienteModal").val(info.nomeCliente);
    $("#idClienteSelecionado").val(info.idCliente);
    $("#selectServicoModal").find("option[value='" + info.idServico + "']").prop('selected', true);
    $("#preco").val(info.preco);
    if (info.cartao === true) {
        $("#cartao").prop('checked', true);
    } else {
        $("#cartao").prop('checked', false);
    }

    $(".modal-title").text('Editar agendamento');
    $("#btnExcluirAtendimento").removeClass('hide');
    
    if (info.promocao === true) {
        $("#promocao").prop('checked', true);
    } else {
        $("#promocao").prop('checked', false);
    }
    abrirModal(info.start, info.duracao, false);
}

function abrirModal(data, duracao, flag) {
    $("#promocao").change(); // Atualiza checkbox
    if (flag == true) {
        $("#selectServicoModal").change(); //Atualiza preço
    }

    var date = new Date(null);
    date.setSeconds(duracao);
    var result = date.toISOString().substr(11, 8);
    $("#duracaoAgendamento").val(result);
    $('#horarioAgendamento').data('daterangepicker').setStartDate(moment(data).format("DD/MM/YYYY HH:mm"));
    $("#modal-evento").modal("show");

}
