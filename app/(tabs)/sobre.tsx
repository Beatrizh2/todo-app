import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E15" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.tituloApp}>TAREFUNCTION</Text>
          <Text style={styles.versao}>Versão 1.0.0</Text>
        </View>

        {/* Card Informações Acadêmicas */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="school-outline" size={20} color="#e40693" />
            <Text style={styles.cardTitulo}>INFORMAÇÕES ACADÊMICAS</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoRotulo}>Aluna:</Text>
            <Text style={styles.infoValor}>Beatriz Albuquerque</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoRotulo}>Turma:</Text>
            <Text style={styles.infoValor}>DSI11</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoRotulo}>Instituição:</Text>
            <Text style={styles.infoValor}>Grau Técnico</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoRotulo}>Professor:</Text>
            <Text style={styles.infoValor}>Gabriel Neves</Text>
          </View>
        </View>

        {/* Card Sobre o Projeto */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={20} color="#e40693" />
            <Text style={styles.cardTitulo}>SOBRE O PROJETO</Text>
          </View>
          <Text style={styles.cardTexto}>
            O TAREFUNCTION é um aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido em React Native com Expo e TypeScript. Projetado para proporcionar organização simples com categorização flexível e persistência de dados local via AsyncStorage.
          </Text>
        </View>

        {/* Card Tecnologias */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="code-slash-outline" size={20} color="#e40693" />
            <Text style={styles.cardTitulo}>TECNOLOGIAS UTILIZADAS</Text>
          </View>
          <Text style={styles.cardTexto}>
            • React Native & Expo Router{"\n"}
            • TypeScript{"\n"}
            • AsyncStorage (Armazenamento Local){"\n"}
            • Expo Vector Icons
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f7',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 90,
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b0b0d',
    letterSpacing: 2,
    marginTop: 4,
  },
  versao: {
    fontSize: 11,
    color: '#55556A',
    fontWeight: 'bold',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  cardTitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0b0b0d',
    letterSpacing: 1,
  },
  cardTexto: {
    fontSize: 13,
    color: '#55556A',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  infoRotulo: {
    fontSize: 13,
    color: '#55556A',
    fontWeight: '600',
  },
  infoValor: {
    fontSize: 13,
    color: '#0b0b0d',
    fontWeight: 'bold',
  },
});