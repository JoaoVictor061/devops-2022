const tarefas = require('./tarefas');


describe("Cadastramento de tarefas", () => {
    it("Inserir nova tarefa - Para cada nova tarefa, deve inserir apenas o nome e a categoria, a tarefa deve inicializar com um nova id e sua conclusão deve ser inicializada com false", () => {
        const resultado = tarefas.cadastrar({ nome: 'Executar testes', categoria: 'Estudos' });
        expect(resultado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: 'Executar testes',
                categoria: 'Estudos',
                concluido: false
            })
        );
    });

    it("Inserir nova tarefa - Nome deve ser obrigatório", () => {
        const resultado = tarefas.cadastrar({ categoria: 'Estudos' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'nome' é obrigatório!"
            })
        );
    });

    it("Inserir nova tarefa - Categoria deve ser obrigatório", () => {
        const resultado = tarefas.cadastrar({ nome: 'Executar testes' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'categoria' é obrigatório!"
            })
        );
    });

    it("Inserir nova tarefa - Categoria deve ser apenas 'Estudos' ou 'Lazer'", () => {
        const resultado_1 = tarefas.cadastrar({ nome: 'Planejar testes', categoria: 'Planejamento'  });
        const resultado_2 = tarefas.cadastrar({ nome: 'Estudar testes', categoria: 'Estudos' });
        const resultado_3 = tarefas.cadastrar({ nome: 'Patinar', categoria: 'Lazer' });
        
        expect(resultado_1).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'categoria' deve ser apenas 'Estudos' ou 'Lazer'!"
            })
        );
        // Garantia de que o cadastramento é realizado com as categorias 'Estudos' e 'Lazer'
        expect(resultado_2.categoria).toEqual('Estudos');
        expect(resultado_3.categoria).toEqual('Lazer');
    });

    it("Inserir nova tarefa - Garantir que a nova tarefa foi adicionada no array data", () =>{
        const resultado = tarefas.cadastrar({ nome: 'Estudar testes', categoria: 'Estudos' });
        expect(tarefas.listarPorId(resultado.id)).toEqual(
            expect.objectContaining(resultado)
        );
    });
});

describe('Listagem de tarefas', () => {
    it("Listar todas as tarefas - Deve retornar um array contendo todas as tarefas", () => {
        const resultado = tarefas.listar();
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    categoria: expect.any(String),
                    concluido: expect.any(Boolean)
                })
            ])
        );
    });

    it("Listar tarefas por id - Deve retornar uma tarefa por id", () => {
        const resultado = tarefas.listarPorId(2);
        expect(resultado).toEqual(
            expect.objectContaining({
                id: 2,
                nome: expect.any(String),
                categoria: expect.any(String),
                concluido: expect.any(Boolean)
            })
        );
    });

    it("Listar tarefas por id - Deve retornar que a tarefa não foi encontrada", () => {
        const resultado = tarefas.listarPorId(99999999);
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Tarefa não encontrada!"
            })
        );
    });

    it("Listar tarefas por categoria - Deve retornar um array contendo apenas tarefas da categoria especificada", () => {
        const resultado = tarefas.listarPorCategoria('Estudos');
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    categoria: 'Estudos',
                    concluido: expect.any(Boolean)
                })
            ])
        );
    });

    it("Listar tarefas por categoria - Deve retornar uma mensagem que a categoria não existe", () => {
        const resultado = tarefas.listarPorCategoria('xxxxxxx');
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: 'Categoria não encontrada!',
            })
        );
    });
});

