export type CategoriaTarefa = 'Geral' | 'Trabalho' | 'Estudos' | 'Pessoal' | 'Saúde' | 'Lazer' | 'Compras' | 'Financeiro' | 'Família' | 'Amigos' | 'Viagem' | 'Casa' | 'Esporte' | 'Cultura' | 'Tecnologia' | 'Animais' | 'Voluntariado' | 'Eventos' | 'Outros';

export type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
  criadaEm: string;
  categoria?: CategoriaTarefa;
};