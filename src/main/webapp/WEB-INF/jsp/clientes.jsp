<%-- 
    Document   : home
    Created on : 31/08/2019, 20:40:03
    Author     : mateu
--%>
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Clientes
    </h1>
</section>

<!-- Main content -->
<section class="content container-fluid">

    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title">Tabela de clientes</h3>
        </div>
        <div class="box-body">
            <table id="tableClientes" class="table table-bordered table-hover datatable" style="width: 100%">
                <thead>
                <th>id</th>
                <th>Nome</th>
                <th>Celular</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                </thead>
            </table>
        </div>
    </div>

    <div class="box box-primary">
        <div class="box-header">
            <h3 id="formTitle" class="box-title">Adicionar Cliente</h3>
        </div>
        <div class="box-body">
            <form id="formCliente">
                <input type="hidden" name="id" value="" id="idClienteForm">
                <div class="form-group col-md-6">
                    <label for="nomeCliente">Nome</label>
                    <input name="nome" type="text" class="form-control" id="nomeCliente" placeholder="Insira o nome">
                </div>
                <div class="form-group col-md-6">
                    <label for="emailCliente">Email</label>
                    <input name="email" type="email" class="form-control" id="emailCliente" placeholder="Insira o email">
                </div>
                <div class="form-group col-md-6">
                    <label for="telefoneCliente">Celular</label>
                    <input name="celular" type="text" class="form-control" id="telefoneCliente" placeholder="Insira o celular">
                </div>
                <div class="form-group col-md-6">
                    <label for="dataNascimento">Data de Nascimento</label>
                    <input name="dataNascimento" type="text" class="form-control" id="dataNascimento" placeholder="Insira a data de nascimento">
                </div>
            </form>
        </div>
        <div class="box-footer">
            <div class="pull-left">
                <button id="btnExcluir" class="btn btn-danger">Excluir</button>
            </div>
            <div class="pull-right">
                <button id="btnLimpar" class="btn btn-default">Limpar</button>
                <button id="btnSalvar" class="btn btn-success">Salvar</button>
            </div>
        </div>
        <div class="box-footer">

        </div>
    </div>

</section>
<!-- /.content -->


<script src="resources/dist/js/clientes.js"></script>
