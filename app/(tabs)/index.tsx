import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tarefa, CategoriaTarefa } from '../../types/tarefa';
import { TarefaItem } from '../../components/tarefa-item';
import { InputAdicionar } from '../../components/input-adicionar';

// Chave para salvar e buscar os dados no armazenamento local do dispositivo
const STORAGE_KEY = '@todo_app:tarefas';

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<'Todas' | 'Pendentes' | 'Concluídas'>('Todas');

  // Carrega as tarefas salvas no AsyncStorage assim que o app é aberto
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Salva automaticamente no AsyncStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    salvarTarefas(tarefas);
  }, [tarefas]);

  // Função para ler dados do AsyncStorage
  const carregarTarefas = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosSalvos !== null) {
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as tarefas salvas.');
    }
  };

  // Função para gravar dados no AsyncStorage
  const salvarTarefas = async (novasTarefas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  // Adiciona nova tarefa no início da lista
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

  // Alterna o status entre concluída e pendente
  const handleAlternarConcluida = (id: string) => {
    setTarefas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  // Exibe o popup de confirmação (Alert) antes de excluir a tarefa
  const handleConfirmarExclusao = (id: string) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza de que deseja remover esta tarefa?',
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

  // Filtra as tarefas conforme a aba selecionada (Todas / Pendentes / Concluídas)
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'Pendentes') return !t.concluida;
    if (filtro === 'Concluídas') return t.concluida;
    return true;
  });

  // Calcula a quantidade de tarefas não concluídas
  const pendentesCount = tarefas.filter((t) => !t.concluida).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Cabeçalho e Contador de Pendentes */}
        <View style={styles.header}>
          <Text style={styles.titulo}>📝 Minhas Tarefas</Text>
          <View style={styles.badgeContador}>
            <Text style={styles.badgeTexto}>
              {pendentesCount} {pendentesCount === 1 ? 'pendente' : 'pendentes'}
            </Text>
          </View>
        </View>

        {/* Input para adicionar tarefas com categoria */}
        <InputAdicionar onAdicionarTarefa={handleAdicionarTarefa} />

        {/* Botões de Filtro */}
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
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de Tarefas */}
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
              <Text style={styles.emptyTexto}>Nenhuma tarefa encontrada 🎯</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  badgeContador: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTexto: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  filtrosRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  filtroButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  filtroButtonAtivo: {
    backgroundColor: '#007AFF',
  },
  filtroTexto: {
    fontSize: 13,
    color: '#616161',
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTexto: {
    fontSize: 15,
    color: '#9E9E9E',
  },
});