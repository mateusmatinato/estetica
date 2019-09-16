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

    $("#nomeClienteModal").focusout(function () {
        if ($("#idClienteSelecionado").val() == '') {
            $(this).val('');
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

    $("#novoAgendamentoBtn").click(function () {
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
        if (validaAgendamento()) {
            var isEdit = $("#idAtendimentoModal").val() != 0 ? true : false;
            if (isEdit) {
                var title = "Confirmar alterações de agendamento";
                var btnConfirmar = "Sim, alterar!";
                var titleSuccess = "Alteração realizada";
                var msgSuccess = "As alterações no agendamento foram realizadas com sucesso!";
            } else {
                var title = "Confirmar agendamento";
                var btnConfirmar = "Sim, agendar!";
                var titleSuccess = "Agendamento realizado";
                var msgSuccess = "O agendamento foi realizado com sucesso!";
            }

            var text = "Verifique os dados abaixo:<br>";
            text += "<b>Cliente:</b> " + $("#nomeClienteModal").val() + "<br>";
            text += "<b>Serviço: </b>" + $("#selectServicoModal").find(':selected').text() + "<br>";
            text += "<b>Data e Hora: </b>" + $("#horarioAgendamento").val() + "<br>";
            text += "<b>Duração: </b>" + $("#duracaoAgendamento").val().substr(0, 5) + "<br>";
            Swal.fire({
                title: title,
                html: text,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: btnConfirmar,
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                width: '34rem',
                buttonsStyling: false
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: 'salvarAtendimento',
                        data: $("#formAtendimento").serialize(),
                        type: 'post',
                        success: function (data, textStatus, jqXHR) {
                            if (data === "sucesso") {
                                Swal.fire(titleSuccess, msgSuccess, 'success');
                                $("#calendar").fullCalendar('refetchEvents');
                                $("#formAtendimento").trigger("reset");
                                $("#modal-evento").modal('hide');
                            } else {
                                Swal.fire('Erro ao agendar!', 'Você já possui agendamentos nesse horário', 'error');
                                $("#horarioAgendamento").parent('.form-group').addClass('is-invalid');
                                $("#duracaoAgendamento").parent('.form-group').addClass('is-invalid');
                            }
                        },
                        error: function (data) {
                            Swal.fire('Erro ao agendar!', 'Ocorreu um erro ao realizar o agendamento, tente novamente.', 'error');
                        }
                    });
                }
            });
        } else {
            Swal.fire('Erro ao agendar!', 'Você precisa selecionar um cliente para o atendimento.', 'error');
        }

    });

    $("#btnExcluirAtendimento").click(function () {
        var text = "<b>Cliente:</b> " + $("#nomeClienteModal").val() + "<br>";
        text += "<b>Serviço: </b>" + $("#selectServicoModal").find(':selected').text() + "<br>";
        text += "<b>Data e Hora: </b>" + $("#horarioAgendamento").val() + "<br>";
        text += "<b>Duração: </b>" + $("#duracaoAgendamento").val().substr(0, 5) + "<br>";
        Swal.fire({
            title: "Confirmar exclusão",
            html: "Tem certeza que deseja excluir o seguinte agendamento:<br>" + text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: 'excluirAtendimento?id=' + $("#idAtendimentoModal").val(),
                    type: 'post',
                    success: function (data, textStatus, jqXHR) {
                        if (data === "sucesso") {
                            Swal.fire('Agendamento excluído!','O agendamento foi excluído com sucesso.','success');
                            $("#calendar").fullCalendar('refetchEvents');
                            $("#formAtendimento").trigger("reset");
                            $("#modal-evento").modal('hide');
                        }
                    }
                });
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

function validaAgendamento() {
    if ($("#idClienteSelecionado").val() == '') {
        //Não selecionou nenhum cliente
        $("#nomeClienteModal").parent('.form-group').addClass('is-invalid');
        return false;
    } else {
        $("#nomeClienteModal").parent('.form-group').removeClass('is-invalid');
        return true;
    }
}