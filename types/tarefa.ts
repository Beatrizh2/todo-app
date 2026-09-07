export type CategoriaTarefa = 'Geral' | 'Trabalho' | 'Estudos' | 'Pessoal';

export type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
  criadaEm: string;
  categoria?: CategoriaTarefa;
};