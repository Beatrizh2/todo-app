import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones nativos do Expo (checkbox e lixeira)
import { Tarefa } from '../types/tarefa'; // Interface/tipo do modelo de dados

// Define as propriedades (props) que o componente vai receber do componente pai
type Props = {
  tarefa: Tarefa; // Objeto com os dados da tarefa (id, texto, concluida, etc)
  onAlternarConcluida: (id: string) => void; // Função para marcar/desmarcar status
  onExcluir: (id: string) => void; // Função para remover a tarefa
};

export function TarefaItem({ tarefa, onAlternarConcluida, onExcluir }: Props) {
  return (
    // Container principal do item (aplica estilo extra se estiver concluído)
    <View style={[styles.container, tarefa.concluida && styles.containerConcluida]}>
      
      {/* Botão da Checkbox */}
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => onAlternarConcluida(tarefa.id)}
      >
        {/* Muda o ícone e a cor conforme o estado 'concluida' */}
        <Ionicons
          name={tarefa.concluida ? "checkbox" : "square-outline"}
          size={24}
          color={tarefa.concluida ? "#4CAF50" : "#757575"}
        />
      </TouchableOpacity>

      {/* Área central com o texto e a tag de categoria */}
      <View style={styles.textoContainer}>
        {/* Aplica o estilo riscado e cor opaca quando concluída */}
        <Text style={[styles.texto, tarefa.concluida && styles.textoConcluido]}>
          {tarefa.texto}
        </Text>

        {/* Exibe a badge de categoria apenas se ela existir na tarefa */}
        {tarefa.categoria && (
          <Text style={styles.categoriaBadge}>{tarefa.categoria}</Text>
        )}
      </View>

      {/* Botão de Excluir */}
      <TouchableOpacity
        style={styles.excluirButton}
        onPress={() => onExcluir(tarefa.id)}
      >
        <Ionicons name="trash-outline" size={22} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
}

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinha ícones e textos lado a lado em linha
    alignItems: 'center', // Centraliza os elementos na altura
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Configurações de sombra para iOS
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  containerConcluida: {
    backgroundColor: '#F5F5F5',
    opacity: 0.8,
  },
  checkButton: {
    marginRight: 12,
  },
  textoContainer: {
    flex: 1, // Ocupa todo o espaço restante entre o checkbox e o botão excluir
  },
  texto: {
    fontSize: 16,
    color: '#212121',
  },
  textoConcluido: {
    textDecorationLine: 'line-through', // Linha cortando o texto (riscado)
    color: '#9E9E9E',
  },
  categoriaBadge: {
    fontSize: 11,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '600',
  },
  excluirButton: {
    padding: 6,
  },
});