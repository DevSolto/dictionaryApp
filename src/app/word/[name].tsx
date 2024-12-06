import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function Word() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [wordData, setWordData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
        const data = await response.json();
        setWordData(data[0]);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!wordData) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Não encontramos a palavra "{name}" no dicionário.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.wordTitle}>{wordData.word}</Text>
      <Text style={styles.phoneticText}>
        {wordData.phonetic || "Pronúncia não disponível"}
      </Text>
      {wordData.phonetics?.map((phonetic: any, index: number) => (
        <Text key={index} style={styles.audioText}>
          {phonetic.audio ? `Áudio disponível: ${phonetic.audio}` : null}
        </Text>
      ))}
      {wordData.meanings?.map((meaning: any, index: number) => (
        <View key={index} style={styles.meaningContainer}>
          <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
          {meaning.definitions.map((definition: any, defIndex: number) => (
            <View key={defIndex} style={styles.definitionContainer}>
              <Text style={styles.definitionText}>
                {`${defIndex + 1}. ${definition.definition}`}
              </Text>
              {definition.example && (
                <Text style={styles.exampleText}>{`Exemplo: ${definition.example}`}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
      {wordData.origin && (
        <Text style={styles.originText}>{`Origem: ${wordData.origin}`}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  wordTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  phoneticText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 16,
  },
  audioText: {
    fontSize: 14,
    color: "blue",
    textAlign: "center",
    marginBottom: 8,
  },
  meaningContainer: {
    marginBottom: 16,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  definitionContainer: {
    marginBottom: 8,
  },
  definitionText: {
    fontSize: 16,
  },
  exampleText: {
    fontSize: 14,
    color: "gray",
    fontStyle: "italic",
    marginTop: 4,
  },
  originText: {
    fontSize: 16,
    marginTop: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
});
