
class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        this.arrayVazio = [];


    }
    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }


        }

        this.listaTabela();
        this.cancelar();

    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            fetch(`https://randomuser.me/api/`).then(res => {
                return res.json()
            }).then(dados => {
                console.log(dados.results[0].name.first)
                let tr = tbody.insertRow();

                let td_id = tr.insertCell();
                let td_produto = tr.insertCell();
                let td_valor = tr.insertCell();
                let td_acoes = tr.insertCell();
                let td_nome = tr.insertCell();
                let td_email = tr.insertCell();



                td_id.innerText = this.arrayProdutos[i].id;
                td_produto.innerText = this.arrayProdutos[i].nomeProduto;
                td_valor.innerText = this.arrayProdutos[i].preco;
                td_nome.innerText = dados.results[0].name.first;
                td_email.innerText = dados.results[0].email;


                td_id.classList.add('center');

                let imgEdit = document.createElement('img');
                imgEdit.src = 'img/edit.png';
                imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");


                let imgDelete = document.createElement('img');
                imgDelete.src = 'img/delete.png';
                imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

                td_acoes.appendChild(imgEdit);
                td_acoes.appendChild(imgDelete);

                console.log(this.arrayProdutos)
            })





        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;

    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }


    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o Nome do Produto \n';
        }

        if (produto.preco == '') {
            msg += '- Informe o Preço do Produto \n';
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;

    }


    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {

        if (confirm('Você realmente deseja deletar o produto ID ' + id)) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }


        }

        console.log(this.arrayProdutos);
    }

    deletarTodos(id) {
        if (confirm('Deseja deletar todos?')) {


            this.arrayProdutos = this.arrayVazio;
            document.getElementById('tbody').remove();

        }
    }

}
var produto = new Produto();




