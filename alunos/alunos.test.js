const alunos = require("./alunos");

describe("Cadastramento de alunos", () => {
    it("Inserir novo aluno - Para cada novo aluno (nome, sexo), deve inicializar as notas do 1 e 2 bimestre com zero e a aprovação deve ser false", () => {
        const resultado = alunos.cadastrar({ nome: 'Caio', sexo: 'Masculino' });
        expect(resultado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: 'Caio',
                sexo: 'Masculino',
                nota_1_bim: 0,
                nota_2_bim: 0,
                aprovado: false
            })
        );
    });

    it("Inserir novo aluno - Nome deve ser obrigatório", () => {
        const resultado = alunos.cadastrar({ sexo: 'Masculino' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'nome' é obrigatório!"
            })
        );
    });

    it("Inserir novo aluno - Sexo deve ser obrigatório", () => {
        const resultado = alunos.cadastrar({ nome: 'Caio' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'sexo' é obrigatório!"
            })
        );
    });

    it("Inserir novo aluno - Sexo deve ser apenas 'Masculino' ou 'Feminino'", () => {
        const resultado_1 = alunos.cadastrar({ nome: 'Caio', sexo: 'M'  });
        const resultado_2 = alunos.cadastrar({ nome: 'Dani', sexo: 'Feminino' });
        const resultado_3 = alunos.cadastrar({ nome: 'Caio', sexo: 'Masculino' });
        
        expect(resultado_1).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'sexo' deve ser apenas 'Masculino' ou 'Feminino'!"
            })
        );
        // Garantia de que o cadastramento é realizado com os sexos 'Masculino' e 'Feminino'
        expect(resultado_2.sexo).toEqual('Feminino');
        expect(resultado_3.sexo).toEqual('Masculino');
    });

    it("Inserir novo aluno - Garantir que o novo aluno foi adicionado no array data", () =>{
        const resultado = alunos.cadastrar({ nome: 'Caio', sexo: 'Masculino' });
        expect(alunos.listarPorId(resultado.id)).toEqual(
            expect.objectContaining(resultado)
        );
    });
});

describe("Listar alunos", () => {
    it("Listar todos os alunos - Deve retornar um array de alunos", () => {
        const resultado = alunos.listar();
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    sexo: expect.any(String),
                    nota_1_bim: expect.any(Number),
                    nota_2_bim: expect.any(Number),
                    aprovado: expect.any(Boolean)
                })
            ])
        );
    });

    it("Listar todos os alunos aprovados - Deve retornar um array de apenas alunos aprovados", () => {
        const resultado = alunos.listarAprovados();
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    sexo: expect.any(String),
                    nota_1_bim: expect.any(Number),
                    nota_2_bim: expect.any(Number),
                    aprovado: true
                })
            ])
        );
    });

    it("Listar todos os alunos reprovados - Deve retornar um array de apenas alunos reprovados", () => {
        const resultado = alunos.listarReprovados();
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    sexo: expect.any(String),
                    nota_1_bim: expect.any(Number),
                    nota_2_bim: expect.any(Number),
                    aprovado: false
                })
            ])
        );
    });

    it("Listar aluno por Id - Deve retornar um aluno com o id correspondente", () => {
        const resultado = alunos.listarPorId(1);
        expect(resultado).toEqual(
            expect.objectContaining({
                id: 1,
                nome: expect.any(String),
                sexo: expect.any(String),
                nota_1_bim: expect.any(Number),
                nota_2_bim: expect.any(Number),
                aprovado: expect.any(Boolean)
            })
        );
    });

    it("Listar aluno por Id - Quando o id não corresponde a algum aluno, retorna 'Aluno não encontrado'", () => {
        const resultado = alunos.listarPorId(999999);
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Aluno não encontrado!"
            })
        );
    });
});