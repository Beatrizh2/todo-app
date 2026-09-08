import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tarefa } from '../types/tarefa';

type Props = {
  tarefa: Tarefa;
  onAlternarConcluida: (id: string) => void;
  onExcluir: (id: string) => void;
};

export function TarefaItem({ tarefa, onAlternarConcluida, onExcluir }: Props) {
  return (
    <View style={[styles.container, tarefa.concluida && styles.containerConcluida]}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => onAlternarConcluida(tarefa.id)}
      >
        <View style={[
          styles.checkboxWrapper,
          tarefa.concluida && styles.checkboxWrapperConcluida
        ]}>
          {tarefa.concluida ? (
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          ) : (
            <Ionicons name="add" size={20} color="#8E8E93" />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.textoContainer}>
        <Text style={[styles.texto, tarefa.concluida && styles.textoConcluido]}>
          {tarefa.texto}
        </Text>
        <View style={styles.tagsContainer}>
          {tarefa.categoria && (
            <View style={styles.categoriaBadge}>
              <Text style={styles.categoriaTexto}>{tarefa.categoria}</Text>
            </View>
          )}
          <Text style={styles.dataTexto}>{tarefa.criadaEm}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.excluirButton}
        onPress={() => onExcluir(tarefa.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#e40693" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  containerConcluida: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    opacity: 0.7,
  },
  checkButton: {
    marginRight: 12,
  },
  checkboxWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxWrapperConcluida: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  textoContainer: {
    flex: 1,
  },
  texto: {
    fontSize: 16,
    color: '#0d0c0c',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#0c0c0e',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  categoriaBadge: {
    backgroundColor: 'rgba(228, 6, 147, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoriaTexto: {
    fontSize: 10,
    color: '#e40693',
    fontWeight: '600',
  },
  dataTexto: {
    fontSize: 10,
    color: '#8E8E93',
  },
  excluirButton: {
    padding: 6,
  },
});