import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho da Tela */}
      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={64} color="#007AFF" />
        <Text style={styles.titulo}>Sobre o Aplicativo</Text>
        <Text style={styles.subtitulo}>Gerenciador de Tarefas (To-Do List)</Text>
      </View>

      {/* Cartão de Informações do Aluno / Projeto */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>📌 Projeto Acadêmico</Text>
        <Text style={styles.cardTexto}>
          <Text style={styles.bold}>Disciplina:</Text> Desenvolvimento de Sistemas Para Dispositivos Móveis
        </Text>
        <Text style={styles.cardTexto}>
          <Text style={styles.bold}>Tecnologias:</Text> React Native, Expo, TypeScript e AsyncStorage.
        </Text>
      </View>

      {/* Cartão de Funcionalidades */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>🚀 Funcionalidades</Text>
        <Text style={styles.itemLista}>• Adição de tarefas com categorias</Text>
        <Text style={styles.itemLista}>• Filtro por concluídas e pendentes</Text>
        <Text style={styles.itemLista}>• Persistência de dados local (AsyncStorage)</Text>
        <Text style={styles.itemLista}>• Confirmação para exclusão e contador de progresso</Text>
      </View>

      <Text style={styles.rodape}>Desenvolvido como projeto final do curso.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  cardTexto: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#212121',
  },
  itemLista: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 6,
  },
  rodape: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 20,
  },
});