import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

export default function App() {
  const [campo, setCampo] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [info, setInfo] = useState(false);

  async function buscarCep(cep) {
    //regex
    const ceplimpo = cep.replace(/\D/g, "");

    if (ceplimpo === "") {
      alert("Preencha o CEP");
      return;
    }
    if (ceplimpo.length !== 8) {
      alert("Cep invalido. Digite 8 números");
      return;
    }
    try{
    const resposta = await fetch(`https://viacep.com.br/ws/${ceplimpo}/json`)

    const json =  await resposta.json()

    if(json.erro){
      throw new Error("CEP NÃO ENCONTRADO")
    }
setBairro(json.bairro)
setCidade(json.localidade)
setLogradouro(json.logradouro)
setEstado(json.estado)
setCep(json.cep)
setInfo(true)

    }catch(error){
console.error("Error ao consultar API: "+ error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <View style={styles.cabecalho}>
          <Entypo name="location-pin" size={32} color={"purple"} />
          <Text style={styles.titulo}>Busca Endereço</Text>
        </View>
        <Text style={styles.subtitulo}>
          Digite o CEP para encontrar o endereço completo
        </Text>
        <Text style={styles.label}>CEP</Text>
        <View style={styles.formulario}>
          <TextInput value={campo} onChangeText={(text)=>setCampo(text)} placeholder="00000000" style={styles.campo} />
          <TouchableOpacity onPress={()=>buscarCep(campo)}style={styles.botaoPesquisa}>
            <Entypo name="magnifying-glass" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        {info && (
          <View style={styles.endereco}>
            <Text style={styles.tituloCep}> Endereço encontrado</Text>

            <View style={styles.informacoes}>
              <View>
                <Text style={styles.tituloInfo}>Cep</Text>
                <Text style={styles.enderecoInfo}>{cep}</Text>
                <View>
                  <View>
                    <Text style={styles.tituloInfo}>Logradouro</Text>
                    <Text style={styles.enderecoInfo}>{logradouro}</Text>
                  </View>
                  <Text style={styles.tituloInfo}>Bairro</Text>
                  <Text style={styles.enderecoInfo}>{bairro}</Text>
                </View>
                <Text style={styles.tituloInfo}>Cidade</Text>
                <Text style={styles.enderecoInfo}>{cidade}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Estado</Text>
                <Text style={styles.enderecoInfo}>{estado}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  caixa: {
    borderWidth: 1,
    borderColor: "#d4d4d4d4",
    borderRadius: 4,
    padding: 12,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#e11fb7ff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 6,
  },
  formulario: {
    flexDirection: "row",
    marginTop: 4,
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d77da4ff",
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    borderTopLeftRadius: 4,
    fontSize: 18,
    paddingVertical: 4,
  },
  botaoPesquisa: {
    backgroundColor: "#f82bbaff",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  endereco: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e766b4ff",
    padding: 12,
  },
  tituloCep: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ac3e89ff",
  },
  tituloInfo: {
    color: "#8b0b85ff",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
  },
  enderecoInfo: {
    color: "#fa0eb7ff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
