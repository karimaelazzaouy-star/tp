import { StyleSheet, Text, View, FlatList } from 'react-native';
type Evenement = {
  id: string;
  titre : string;
  categorie: string;
  capacite: number;
  inscrits: number;


};
const evenements: Evenement[] = [
  {id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25},
  {id: 'E02', titre: 'Conference IA', categorie: 'Conference', capacite: 70, inscrits: 52},
  {id: 'E03', titre: 'Securite mobile', categorie: 'Atelier', capacite: 20, inscrits: 17},
  {id: 'E04', titre: 'Desin UI', categorie: 'Atelier', capacite: 18, inscrits: 9},
  {id: 'E05', titre: 'Forum projet', categorie: 'Rencontre', capacite: 50, inscrits: 49},
  {id: 'E06', titre: 'Decouverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24}
]; 
const placesRestantes = (e: Evenement) => {
  const r = e.capacite - e.inscrits;
  return r > 0 ? r : 0; 
};
const statutEvenement = (e: Evenement) => {
  const r = placesRestantes(e);
  return r === 0 ? "Complet" : (r <= 3 ? "Presque complet" : "Ouvert");
};

const totalEvenements = evenements.length;
const evenementsComplets = evenements.filter(e => placesRestantes(e) === 0).length;
const evenementsAvecPlaces = evenements.filter(e => placesRestantes(e) > 0).length;
const sommePlacesRestantes = evenements.reduce((total, e) => total + placesRestantes(e), 0);

type BadgeProps = {
  statut : string
};
function BadgeEtat ({statut}: BadgeProps) {

  let couleur = "";
  if (statut === 'complet') {
    couleur = 'red'
  } else if (statut === 'presque complet') {
    couleur = 'orange'
  }else {
    couleur = 'green'
  }
  return (
    <View style = {{
      backgroundColor: couleur,
      padding: 8,
      borderRadius: 10,
    }}
    >
      <Text> {statut}</Text>
      </View>
  );
}
type CarteEvenementProps = {evenement : Evenement}
function CarteEvenement ({evenement} : CarteEvenementProps){
  return (
    <View style = {{
      padding: 5,
      margin: 12,
      borderRadius: 10,
      backgroundColor: 'white'
    }}
    >
      <Text>{evenement.titre}</Text>
      <Text>{evenement.categorie}</Text>
      <Text>{placesRestantes(evenement)} places libres</Text>
      <BadgeEtat statut={statutEvenement(evenement)} />
      </View>

  );
}
 type BlocStatistiquePrps = {
  titre: string;
  nombre: number;
}
function BlocStatistique({titre, nombre}: BlocStatistiquePrps){
  return (
    <View style={{
      padding: 15,
      margin: 5,
      backgroundColor: 'blue',
      borderRadius: 10
    }} >
      <Text>{titre}</Text>
      <Text>{nombre}</Text>
      </View>
  );

  
}

export default function App() {
  const mode = 'tous';
  const evenementAffiches = mode=== 'tous' ? evenements : evenements.filter(
    e => e.categorie === 'Atelier' && placesRestantes(e) > 0
  );
  return (
    <View style={{flex: 1,
     backgroundColor: 'purple',
     padding: 15}
    }>
      <Text style= {{fontSize: 26,
        fontWeight: 'bold'
      }}> CampusAgenda</Text>
      <Text style  = {{ fontSize: 16,
        color: 'gray'
      }}> Evenement du campus </Text>
      
    
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 20
      }}>

        <BlocStatistique
          titre="Total evenements"
          nombre={totalEvenements }
        />

        <BlocStatistique
          titre="evenements complets"
          nombre={evenementsComplets}
        />

        <BlocStatistique
          titre="Evenements disponibles"
          nombre={evenementsAvecPlaces }
        />

        <BlocStatistique
          titre="Places restantes"
          nombre={sommePlacesRestantes }
        />

      </View>

     
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
      { mode ==='tous'? "Tous les evenements" : "Atelier disponible"}
      </Text>

      
      <FlatList
        data={evenementAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}

        
        ListEmptyComponent={
          <Text>Aucun evenement disponible</Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
});