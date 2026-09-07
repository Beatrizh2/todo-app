import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoriaTarefa } from '../types/tarefa';

// Lista de categorias disponíveis para seleção
const CATEGORIAS: CategoriaTarefa[] = ['Geral', 'Trabalho', 'Estudos', 'Pessoal', 'Saúde', 'Lazer', 'Compras', 'Financeiro', 'Família', 'Amigos', 'Viagem', 'Casa', 'Esporte', 'Cultura', 'Tecnologia', 'Animais', 'Voluntariado', 'Eventos', 'Outros'];

type Props = {
  // Função executada ao enviar uma nova tarefa válida
  onAdicionarTarefa: (texto: string, categoria: CategoriaTarefa) => void;
};

export function InputAdicionar({ onAdicionarTarefa }: Props) {
  // Estado local para armazenar o texto digitado
  const [texto, setTexto] = useState('');
  
  // Estado local para a categoria selecionada (padrão: 'Geral')
  const [categoria, setCategoria] = useState<CategoriaTarefa>('Geral');

  // Função para validar e enviar a tarefa
  const handleAdicionar = () => {
    // Validação: previne a criação de tarefas vazias ou só com espaços
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite uma descrição para a tarefa!');
      return;
    }

    // Chama a função passada pelo pai
    onAdicionarTarefa(texto.trim(), categoria);

    // Limpa o campo de texto após adicionar
    setTexto('');
  };

  return (
    <View style={styles.container}>
      {/* Campo de Entrada de Texto */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#9E9E9E"
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Seleção de Categoria (Diferencial) */}
      <View style={styles.categoriasRow}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoriaChip,
              categoria === cat && styles.categoriaChipSelecionada,
            ]}
            onPress={() => setCategoria(cat)}
          >
            <Text
              style={[
                styles.categoriaTexto,
                categoria === cat && styles.categoriaTextoSelecionada,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#e40693',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', //vai fazer nossos categoriaszinhas desceram para linhazinha de baixo viu qrido
    marginTop: 10,
    gap: 6,
  },
  categoriaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
  },
  categoriaChipSelecionada: {
    backgroundColor: '#e40693',
  },
  categoriaTexto: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
  },
  categoriaTextoSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});