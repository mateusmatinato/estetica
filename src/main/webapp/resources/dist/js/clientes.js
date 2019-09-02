
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
        $.ajax({
            url: "deleteCliente/" + $("#idClienteForm").val(),
            type: 'DELETE',
            data: $("#formCliente").serialize(),
            success: function (data) {
                $("#btnLimpar").click();
                table.ajax.reload();
            }

        });
    });

    $("#btnSalvar").click(function () {
        if ($("#idClienteForm").val() === '') {
            var url = "salvarCliente/";
            var type = 'POST';
        } else {
            var url = "editarCliente/" + $("#idClienteForm").val();
            var type = 'PUT';
        }
        var $form = $("#formCliente");
        var clienteNovo = getFormData($form);
        $.ajax({
            url: url,
            type: type,
            data: JSON.stringify(clienteNovo),
            contentType: "application/json",
            success: function (data) {
                table.ajax.reload();
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