
const data = [     
    {
        id: 1,
        nome: 'Ana',
        sexo: 'Feminino',
        nota_1_bim: 7,
        nota_2_bim: 4,
        aprovado: true,
    },
    {
        id: 2,
        nome: 'Beto',
        sexo: 'Masculino',
        nota_1_bim: 5,
        nota_2_bim: 4,
        aprovado: false,
    },
    {
        id: 3,
        nome: 'Carla',
        sexo: 'Feminino',
        nota_1_bim: 8,
        nota_2_bim: 6,
        aprovado: true,
    },
    {
        id: 4,
        nome: 'Don',
        sexo: 'Masculino',
        nota_1_bim: 4,
        nota_2_bim: 4,
        aprovado: false,
    },
];

function cadastrar(aluno) {
    aluno.id = data.length+1;
    aluno.aprovado = false;
    aluno.nota_1_bim = 0;
    aluno.nota_2_bim = 0;
    data.push(aluno)

    if(aluno.nome === undefined){
        return {
            erro: true,
            mensagem: "Campo 'nome' é obrigatório!"
        }
    }
    if(aluno.sexo === undefined){
        return {
            erro: true,
            mensagem: "Campo 'sexo' é obrigatório!"
        }
    }
    if(aluno.sexo !== 'Masculino' && aluno.sexo !== 'Feminino') {
        return {
            erro: true,
            mensagem: "Campo 'sexo' deve ser apenas 'Masculino' ou 'Feminino'!"
        }
    }
    data.push(aluno);
    return aluno;
}

function listar() {
    return data;
}

function listarPorId(id) {
    const aluno = data.find(aluno => aluno.id === id)
    if(!aluno){
        return {
            erro: true,
            mensagem: "Aluno não encontrado!"
        }
    }
    return aluno
}
   

function listarAprovados() {
    const aluno = data.filter(aluno => aluno.aprovado === true)
    return aluno


}

function listarReprovados() {
    const aluno = data.filter(aluno => aluno.aprovado === false)
    return aluno
    
}

module.exports = {
    cadastrar,
    listar,
    listarPorId,
    listarAprovados,
    listarReprovados
}