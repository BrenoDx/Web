function ocultarInformacoes(){
    // Ocultar campos dos dados para pagamentos
    document.getElementById('container-pix').style.display = 'none'
    document.getElementById('container-cartao').style.display = 'none'
    document.getElementById('erro-cartao').style.display = 'none'
    document.getElementById('venda').style.display = 'none'
    ocultarImagem()
}
function ocultarImagem(){
    // Ocultar imagens das bandeiras dos cartões
    document.getElementById('img-visa').style.display = 'none'
    document.getElementById('img-master').style.display = 'none'
}
function detalhesPagamento(){
    // Pegando valor selecionado do input radio selecionado e o valor da compra
    let formPagamento = document.querySelector('input[name="opcao-pagamento"]:checked')
    let valor = parseFloat(document.getElementById('pagamento').value.trim())

    if(!isNaN(valor) && valor > 0){
        if(formPagamento.id === "pix"){
            ocultarInformacoes()
            document.getElementById('container-pix').style.display = 'block'
            document.getElementById('venda').style.display = 'block'
            document.getElementById('valorTotal').innerHTML = 'Total: R$' + pagamentoPix(valor)
        }else{
            ocultarInformacoes()
            document.getElementById('container-cartao').style.display = 'block'
            document.getElementById('venda').style.display = 'block'
            parcelaEscolhida(pagamentoCartao(valor))
        }
    }else{
        alert("Campo valor deve ser preenchido corretamente!")
    }
}

function pagamentoPix(valor){
    let desconto = valor * 10/100
    return valor-desconto
}
 function pagamentoCartao(valor){
    let valores = [];
    let juros = {
        4: 5, // 4x tem 5% de juros
        5: 10 // 5x tem 10% de juros
    }
    for(let i =1; i<=5; i++){
        let valorFinal = valor
        if(juros[i]){
            valorFinal = valor * (1+juros[i]/100)
        }
        valores.push(valorFinal)
    }
    return valores
 }

 function validarCartao(){
    let numero = document.getElementById('numero-cartao').value
    if(numero == 1234){
        ocultarImagem()
        document.getElementById('img-visa').style.display = 'block'
        document.getElementById('erro-cartao').style.display = 'none'
    }else if(numero == 4321){
        ocultarImagem()
        document.getElementById('img-master').style.display = 'block'
        document.getElementById('erro-cartao').style.display = 'none'
    }else{
        ocultarImagem()
        document.getElementById('erro-cartao').style.display = 'block'
    }
 }
 function parcelaEscolhida(valores) {
    var resultado = ""
    let select = document.getElementById('select-parcelas')
    let indice = select.value
    let parcelaSelecionada
    for(let i = 1; i<= valores.length; i++){
        let parcela = valores[i-1] / i

        resultado += i+'x R$' + parcela.toFixed(2) + " "
        if(i == 3) resultado += '<br>'
        if(indice == i) parcelaSelecionada =  valores[i-1]
    }
    document.getElementById('parcelas').innerHTML = resultado
    document.getElementById('valorTotal').innerHTML = 'Total: R$' + parcelaSelecionada.toFixed(2)
 }
 function efetuarPagamento(){
    document.getElementById('ven-confirmada').innerHTML = 'Pagamento concluído'
 }