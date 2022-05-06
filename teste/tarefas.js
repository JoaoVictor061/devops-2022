
const data = [     
    {
        id: 1,
        nome: 'Estudar para a prova',
        categoria: 'Estudos',
        concluido: true,
    },
    {
        id: 2,
        nome: 'Ir à academia',
        categoria: 'Lazer',
        concluido: false,
    },
    {
        id: 3,
        nome: 'Fazer caminhada',
        categoria: 'Lazer',
        concluido: true,
    },
    {
        id: 4,
        nome: 'Realizar prova',
        categoria: 'Estudos',
        concluido: false,
    },
];

function cadastrar(tarefas) {
    tarefas.id = data.length+1;
    tarefas.concluido = false;
    data.push(tarefas)
    
    if(tarefas.nome === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'nome' é obrigatório!"
        };
    }
    if(tarefas.categoria === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'categoria' é obrigatório!"
        };
    }
    if(tarefas.categoria !== 'Estudos' && tarefas.categoria !== 'Lazer') {
        return {
            erro: true,
            mensagem: "Campo 'categoria' deve ser apenas 'Estudos' ou 'Lazer'!"
        }
    }
    data.push(tarefas);
    return tarefas;
}

function listar() {
    if(data){
        return data 
    }

}


function listarPorCategoria(categoria) {
    const tarefas = data.filter(tarefas => tarefas.categoria === categoria)
    if(!tarefas){
        return {
            erro: true,
            mensagem: 'Categoria não encontrada!'
        }
    }
    return tarefas
}

function listarPorId(id) {
    const tarefas = data.find(tarefas => tarefas.id === id)
    if(!tarefas){
        return {
            erro: true,
            mensagem: "Tarefa não encontrada!"
        }
    }
    return tarefas
}

module.exports = {
    cadastrar,
    listar,
    listarPorId,
    listarPorCategoria
}