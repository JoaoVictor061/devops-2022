const pets = require("./pets");

describe("Testes da funcionalidade listar", () => {



    test("Listar pets", () => {

        expect(pets.listar()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    idade: expect.any(Number),
                    sexo: expect.any(String),
                    especie: expect.any(String),
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
                    especie: expect.any(String),
                })
            );
    });

    it("Listar pet por ID - Pet não encontrado", () =>{
        expect(pets.listarPorId(9999999)).toEqual(
            expect.objectContaining({
                erro: "True",
                mensagem: "Pet não encontrado!"
            })
        )
    });
});

describe("Cadestro de pets", () => {
    it("Cadastrar novo pet", () => {
        expect(pets.cadastrar({
            nome:"Vitor",
            idade:10,
            sexo:"M",
            especie: "Gato",
        })).toEqual(
            expect.objectContaining({
            id: expect.any(Number),
            nome: expect.any(String),
            idade: expect.any(Number),
            sexo: expect.any(String),
            especie: expect.any(String),
        }))
    })
})