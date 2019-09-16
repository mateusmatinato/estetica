
$(document).ready(function () {

    var table = $("#tableClientes").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "ajax": {
            url: "listClientes",
            type: "GET",
            dataSrc: ""
        },
        "columns": [
            {"data": "id"},
            {"data": "nome"},
            {"data": "celular"},
            {"data": "email"},
            {"data": "dataNascimento"}
        ],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },
            {
                "targets": [4],
                "width": "130px"
            }
        ],
        rowId: function (a) {
            return 'id_' + a['id'];
        },
        "drawCallback": function (settings) {
            var idSelected = $("#idClienteForm").val();
            if (idSelected !== '') {
                $("#id_" + idSelected).addClass('selected');
            }
        }
    });

    $('#telefoneCliente').inputmask('(99)99999-9999', {'placeholder': '(__)_____-____'});
    $('#dataNascimento').inputmask('dd/mm/yyyy', {'placeholder': 'dd/mm/aaaa'});

    $('#tableClientes tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            //Desselecionando
            $(this).removeClass('selected');
            $("#formTitle").text('Adicionar Cliente');
            populate($("#formCliente"), null);
        } else {
            $(".selected").removeClass('selected');
            $(this).toggleClass('selected');
            var data = table.row(this).data();

            $.ajax({
                url: "getCliente/" + data['id'],
                type: 'GET',
                success: function (data, textStatus, jqXHR) {
                    $("#formTitle").text('Editar Cliente: ' + data['nome']);
                    populate($("#formCliente"), data);
                }
            });
        }
    });

    $("#btnLimpar").click(function () {
        populate($("#formCliente"), null);
        $("#formTitle").text('Adicionar Cliente');
        $(".selected").removeClass('selected');
    });

    $("#btnExcluir").click(function () {
        var idCliente = $("#idClienteForm").val();
        if (idCliente != '') {
            var nomeCliente = $("#id_" + idCliente).find('td:first-child').text();
            Swal.fire({
                title: "Confirmar exclusão",
                text: "Tem certeza que deseja excluir o cadastro do(a) cliente " + nomeCliente + "?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, deletar!',
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
                        url: "deleteCliente/" + $("#idClienteForm").val(),
                        type: 'DELETE',
                        data: $("#formCliente").serialize(),
                        success: function (data) {
                            Swal.fire('Exclusão realizada', 'O cadastro foi excluído com sucesso!', 'success');
                            $("#btnLimpar").click();
                            table.ajax.reload();
                        }
                    });

                }
            });
        } else {
            Swal.fire('Erro ao excluir', 'Você não selecionou nenhum cliente para excluir!', 'error');
        }
    });

    $("#btnSalvar").click(function () {
        var nomeCliente = $("#nomeCliente").val();
        if ($("#idClienteForm").val() === '') {
            var url = "salvarCliente/";
            var type = 'POST';
            var title = "Confirmar cadastro";
            var msg = "Tem certeza que deseja cadastrar o(a) cliente " + nomeCliente + "?";
            var msgSuccess = "Cadastro realizado";
            var textSuccess = "O cadastro foi realizado com sucesso";
        } else {
            var url = "editarCliente/" + $("#idClienteForm").val();
            var type = 'PUT';
            var title = "Confirmar edição";
            var msg = "Tem certeza que deseja editar o cadastro  do(a) cliente " + nomeCliente + "?";
            var msgSuccess = "Cadastro alterado";
            var textSuccess = "O cadastro foi alterado com sucesso";
        }
        Swal.fire({
            title: title,
            text: msg,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                var $form = $("#formCliente");
                var clienteNovo = getFormData($form);
                $.ajax({
                    url: url,
                    type: type,
                    data: JSON.stringify(clienteNovo),
                    contentType: "application/json",
                    success: function (data) {
                        Swal.fire(msgSuccess, textSuccess, 'success');
                        $("#btnLimpar").click();
                        table.ajax.reload();
                    },
                    error: function(data){
                        Swal.fire("Erro","Não foi possível realizar essa operação, tente novamente.",'error');
                    }
                });
            }
        });
    });

});

function populate(frm, data) {

    if (data === null) {
        $(frm).find('input').each(function () {
            $(this).val('');
        });
    }

    $.each(data, function (key, value) {

        var ctrl = $('[name=' + key + ']', frm);
        switch (ctrl.prop("type")) {
            case "radio":
            case "checkbox":
                ctrl.each(function () {
                    if ($(this).attr('value') == value)
                        $(this).attr("checked", value);
                });
                break;
            default:
                ctrl.val(value);
        }
    });
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        if (n['name'] === 'dataNascimento') {
            var dataArray = n['value'].toString().split('/');
            var dataNasc = (parseInt(dataArray[0]) + 1) + "/" + dataArray[1] + "/" + dataArray[2];
            indexed_array[n['name']] = dataNasc;
        } else {
            indexed_array[n['name']] = n['value'];
        }

    });

    return indexed_array;
}