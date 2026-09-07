import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tarefa, CategoriaTarefa } from '../../types/tarefa';
import { TarefaItem } from '../../components/tarefa-item';
import { InputAdicionar } from '../../components/input-adicionar';

const STORAGE_KEY = '@todo_app:tarefas';

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<'Todas' | 'Pendentes' | 'Concluídas'>('Todas');

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    salvarTarefas(tarefas);
  }, [tarefas]);

  const carregarTarefas = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosSalvos !== null) {
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as missões salvas.');
    }
  };

  const salvarTarefas = async (novasTarefas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleAdicionarTarefa = (texto: string, categoria: CategoriaTarefa) => {
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      texto,
      concluida: false,
      criadaEm: new Date().toISOString().split('T')[0],
      categoria,
    };
    setTarefas((prev) => [novaTarefa, ...prev]);
  };

  const handleAlternarConcluida = (id: string) => {
    setTarefas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  const handleConfirmarExclusao = (id: string) => {
    Alert.alert(
      'DELETAR TAREFFINHA ',
      'Tem certeza de que deseja abandonar esta TAREFA SEU PREGUIÇOSO?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setTarefas((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'Pendentes') return !t.concluida;
    if (filtro === 'Concluídas') return t.concluida;
    return true;
  });

  const pendentesCount = tarefas.filter((t) => !t.concluida).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E15" />
      <View style={styles.content}>
        {/* Cabeçalho com a Logo em Imagem */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.badgeContador}>
            <Text style={styles.badgeTexto}>
              {pendentesCount} {pendentesCount === 1 ? 'TAREFA' : 'TAREFAS'}
            </Text>
          </View>
        </View>

        {/* Input */}
        <InputAdicionar onAdicionarTarefa={handleAdicionarTarefa} />

        {/* Filtros */}
        <View style={styles.filtrosRow}>
          {(['Todas', 'Pendentes', 'Concluídas'] as const).map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filtroButton,
                filtro === item && styles.filtroButtonAtivo,
              ]}
              onPress={() => setFiltro(item)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtro === item && styles.filtroTextoAtivo,
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista */}
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TarefaItem
              tarefa={item}
              onAlternarConcluida={handleAlternarConcluida}
              onExcluir={handleConfirmarExclusao}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTexto}>SEM TAREFAS NO MOMENTO</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 90,
  },
  badgeContador: {
    backgroundColor: '#161626',
    borderWidth: 1,
    borderColor: '#ff00bbea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeTexto: {
    fontSize: 11,
    color: '#fafffc',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  filtrosRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filtroButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#161626',
    borderWidth: 1,
    borderColor: '#262638',
  },
  filtroButtonAtivo: {
    backgroundColor: '#e40693',
    borderColor: '#000000',
  },
  filtroTexto: {
    fontSize: 11,
    color: '#fcfcff',
    fontWeight: 'bold',
  },
  filtroTextoAtivo: {
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyTexto: {
    fontSize: 13,
    color: '#55556A',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});