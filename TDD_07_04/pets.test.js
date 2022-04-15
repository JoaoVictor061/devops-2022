const pets = require("./pets");

describe("Listagem de pets",() => {
    //it ou test
    test("Listar todos os pets", () => {
        expect(pets.listar()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    idade: expect.any(Number),
                    sexo: expect.any(String),
                    especie: expect.any(String)
                })
            ])
        );
    });

    it("Listar pet por ID", () => {
        expect(pets.listarPorId(2)).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                idade: expect.any(Number),
                sexo: expect.any(String),
                especie: expect.any(String)
            })
        );
    });

    it("Listar por ID - Pet não encontrado", () => {
        expect(pets.listarPorId(99999999)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Pet não encontrado!"
            })
        );
    });
});

describe("Cadastramento de pets", () => {
    it("Cadastrar novo pet", () => {
        const length = pets.listar().length;
        expect(pets.cadastrar({
            nome: "Vitor",
            idade: 10,
            sexo: "M",
            especie: "Gato"
        })).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                idade: expect.any(Number),
                sexo: 'M' || 'F', // M ou F, apenas
                especie: expect.any(String)
            })
        );
        // garantir que foi adicionado mais 1 ao banco de pets
        expect(pets.listar().length).toEqual(length+1);
    });

    it("Cadastrar - Campo 'nome' é obrigatório", () => {
        const resultado = pets.cadastrar({ idade: 10, sexo: "M", especie: "Gato" });
        expect(resultado).toEqual(expect.objectContaining({
                erro: true,
                mensagem: "Campo 'nome' é obrigatório!"
            })
        );
    });

    it("Cadastrar - Campo 'idade' é obrigatório", () => {
        const resultado = pets.cadastrar({ nome: "Catz", sexo: "M", especie: "Gato" });
        expect(resultado).toEqual(expect.objectContaining({
                erro: true,
                mensagem: "Campo 'idade' é obrigatório!"
            })
        );
    });

    it("Cadastrar - Campo 'sexo' é obrigatório", () => {
        const resultado = pets.cadastrar({ nome: "Catz", idade: 10, especie: "Gato" });
        expect(resultado).toEqual(expect.objectContaining({
                erro: true,
                mensagem: "Campo 'sexo' é obrigatório!"
            })
        );
    });

    it("Cadastrar - Campo 'espécie' é obrigatório", () => {
        const resultado = pets.cadastrar({ nome: "Catz", idade: 10, sexo: "M" });
        expect(resultado).toEqual(expect.objectContaining({
                erro: true,
                mensagem: "Campo 'especie' é obrigatório!"
            })
        );
    });

    it("Cadastrar - campo 'idade' deve ser maior ou igual a 0", () => {
        pet = { nome: "Zeus", idade: -1, sexo: 'M', especie: 'cachorro'};
        expect(pets.cadastrar(pet)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'idade' deve ser maior ou igual a zero!"
            })
        );
    });

    it("Cadastrar - campo 'sexo' deve ser 'M' ou 'F'", () => {
        pet = { nome: "Zeus", idade: 5, sexo: 'Masculino', especie: 'cachorro'};
        expect(pets.cadastrar(pet)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'sexo' deve ser 'M' ou 'F'!"
            })
        );
    });
});

describe("Edição de pets por id", () => {

    it("Editar pet por id", () => {
        const edicao = pets.editarPorId(2, { 
            nome: "Totó", idade: 2,
            sexo: "M", especie: "cachorro"
        });
        // pet.editarPorId(id, pet)
        expect(edicao).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                idade: expect.any(Number),
                sexo: expect.any(String),
                especie: expect.any(String)
            })
        );
        // verificar se a edicao alterou os dados de pet
        expect(pets.listarPorId(edicao.id)).toEqual(expect.objectContaining({ 
            nome: "Totó", idade: 2,
            sexo: "M", especie: "cachorro"
        }));
    });

    it("Editar - pet não encontrado", () => {
        expect(pets.editarPorId(999999, {
            nome: "Totó",
            idade: 2,
            sexo: "M",
            especie: "cachorro"
        })).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Pet não encontrado!"
            })
        );
    });

    it("Editar - campo 'idade' deve ser maior ou igual a 0", () => {
        pet = { nome: "Zeus", idade: -1, sexo: 'M', especie: 'cachorro'};
        expect(pets.editarPorId(1, pet)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'idade' deve ser maior ou igual a zero!"
            })
        );
    });

    it("Editar - campo 'sexo' deve ser 'M' ou 'F'", () => {
        pet = { nome: "Zeus", idade: 5, sexo: 'Masculino', especie: 'cachorro'};
        expect(pets.editarPorId(1, pet)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'sexo' deve ser 'M' ou 'F'!"
            })
        );
    });

});

describe("Deleção de pets", () => {
    
    it("Deletar pet por id", () => {
        expect(pets.deletarPorId(1)).toEqual(
            expect.objectContaining({
                erro: false,
                mensagem: "Pet deletado com sucesso!"
            })
        );
        // verificar se realmente foi deletado
        expect(pets.deletarPorId(1)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Pet não encontrado!"
            })
        );
    });

    it("Deletar - Pet não encontrado", () => {
        expect(pets.deletarPorId(9999999)).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Pet não encontrado!"
            })
        )
    });
});