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

const CATEGORIAS: CategoriaTarefa[] = ['Geral', 'Trabalho', 'Estudos', 'Pessoal', 'Saúde'];

type Props = {
  onAdicionarTarefa: (texto: string, categoria: CategoriaTarefa) => void;
};

export function InputAdicionar({ onAdicionarTarefa }: Props) {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState<CategoriaTarefa>('Geral');
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const handleAdicionar = () => {
    if (texto.trim() === '') {
      Alert.alert('CAMPO VAZIO', 'Digite a descrição da tarefa!');
      return;
    }
    onAdicionarTarefa(texto.trim(), categoria);
    setTexto('');
    setMostrarCategorias(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#8E8EA0"
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
          <Ionicons name="add-sharp" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Botão seletor de Categoria */}
      <TouchableOpacity
        style={styles.seletorButton}
        onPress={() => setMostrarCategorias(!mostrarCategorias)}
      >
        <Ionicons name="pricetag-outline" size={16} color="#E91E63" />
        <Text style={styles.seletorTexto}>
          Categoria: <Text style={styles.categoriaAtivaTexto}>{categoria}</Text>
        </Text>
        <Ionicons
          name={mostrarCategorias ? "chevron-up" : "chevron-down"}
          size={18}
          color="#8E8EA0"
        />
      </TouchableOpacity>

      {/* Opções de Categorias (exibidas apenas se o botão for clicado) */}
      {mostrarCategorias && (
        <View style={styles.categoriasRow}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaChip,
                categoria === cat && styles.categoriaChipSelecionada,
              ]}
              onPress={() => {
                setCategoria(cat);
                setMostrarCategorias(false);
              }}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#ff00bbea',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seletorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    gap: 6,
  },
  seletorTexto: {
    fontSize: 13,
    color: '#64748B',
  },
  categoriaAtivaTexto: {
    fontWeight: 'bold',
    color: '#ff00bbea',
  },
  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoriaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  categoriaChipSelecionada: {
    backgroundColor: '#ff00bbea',
  },
  categoriaTexto: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  categoriaTextoSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});