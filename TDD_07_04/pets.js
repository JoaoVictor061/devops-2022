const data = [
    {id: 1, nome:"Capitu", idade: 15, sexo: "F", especie:"Calopsita"},
    {id: 2, nome:"Bentinho", idade: 5, sexo: "M", especie:"Cachorro"},
];

function listar(){
    return data;

}
function listarPorId(id){
    const pet = data.find(pet => pet.id === id);
    if(!pet) {
        return {
            erro: "True",
            mensagem: "Pet não encontrado!"
        }
    }

    return pet;
}

function cadastrar(pet){
    pet.id = data.length+1;
    data.push(pet);
    return pet;

}

module.exports = {
    listar, listarPorId, cadastrar
}