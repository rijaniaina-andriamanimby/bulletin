import React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

// 🎨 Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
  },
  bulletin: {
    width: "50%",
    border: "1 solid #aaa",
    padding: 8,
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    border: "0.5 solid #ccc",
    padding: 2,
    textAlign: "center",
  },
  bold: { fontWeight: "bold" },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
  },
  infoSection: {
    marginBottom: 4,
    fontSize: 8,
  },
  footer: {
    marginTop: 6,
    fontSize: 8,
  },
})

// 🧾 Composant principal
const BulletinPDF = ({ bulletins }) => {
  // Groupe 2 bulletins par page
  const pages = []
  for (let i = 0; i < bulletins.length; i += 2) {
    pages.push(bulletins.slice(i, i + 2))
  }

  return (
    <Document>
      {pages.map((pair, i) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={i}>
          {pair.map((b, idx) => (
            <View style={styles.bulletin} key={idx}>
              {/* ---------- En-tête du bulletin ---------- */}
              <View style={styles.header}>
                <Text style={styles.bold}>MINISTÈRE DE L’ÉDUCATION NATIONALE</Text>
                <Text>Année scolaire : 2024 - 2025</Text>
                <Text style={styles.title}>BULLETIN DU {b.session?.toUpperCase()}</Text>
              </View>

              {/* ---------- Infos élève ---------- */}
              <View style={styles.infoSection}>
                <Text>
                  <Text style={styles.bold}>Nom et Prénoms :</Text>{" "}
                  {b.eleve.nom.toUpperCase()} {b.eleve.prenom}
                </Text>
                <Text>
                  <Text style={styles.bold}>Date de naissance :</Text>{" "}
                  {b.eleve.naissance || "—"} |{" "}
                  <Text style={styles.bold}>Sexe :</Text> {b.eleve.genre || "—"} |{" "}
                  <Text style={styles.bold}>Classe :</Text> {b.eleve.classe?.nom || ""}
                </Text>
                <Text>
                  <Text style={styles.bold}>Matricule :</Text> {b.eleve.matricule}
                </Text>
              </View>

              {/* ---------- Tableau des matières ---------- */}
              <View style={styles.table}>
                <View style={[styles.row, styles.bold]}>
                  <Text style={[styles.cell, { flex: 2 }]}>Discipline</Text>
                  <Text style={styles.cell}>Note 1</Text>
                  <Text style={styles.cell}>Note 2</Text>
                  <Text style={styles.cell}>Examen</Text>
                  <Text style={styles.cell}>Moyenne</Text>
                  <Text style={styles.cell}>Coef</Text>
                  <Text style={styles.cell}>Total</Text>
                  <Text style={styles.cell}>Appréciation</Text>
                  <Text style={[styles.cell, { flex: 2 }]}>Professeur</Text>
                </View>

                {b.notes.map((n, k) => {
                  // Calcul de la moyenne et du total
                  const moy =
                    ((Number(n.n1 || 0) + Number(n.n2 || 0) + Number(n.exam || 0)) /
                      (n.n1 || n.n2 || n.exam ? 3 : 1)).toFixed(2)
                  const total = (moy * n.coef).toFixed(2)

                  return (
                    <View style={styles.row} key={k}>
                      <Text style={[styles.cell, { flex: 2 }]}>{n.matiere}</Text>
                      <Text style={styles.cell}>{n.n1 || "-"}</Text>
                      <Text style={styles.cell}>{n.n2 || "-"}</Text>
                      <Text style={styles.cell}>{n.exam || "-"}</Text>
                      <Text style={styles.cell}>{moy}</Text>
                      <Text style={styles.cell}>{n.coef}</Text>
                      <Text style={styles.cell}>{total}</Text>
                      <Text style={styles.cell}>{n.appreciation || ""}</Text>
                      <Text style={[styles.cell, { flex: 2 }]}>{n.enseignant || ""}</Text>
                    </View>
                  )
                })}
              </View>

              {/* ---------- Résumé ---------- */}
              <View style={styles.footer}>
                <Text>
                  <Text style={styles.bold}>Total :</Text> {b.total_points} |{" "}
                  <Text style={styles.bold}>Moyenne générale :</Text>{" "}
                  {b.moyenne_generale}/20
                </Text>
                <Text>
                  <Text style={styles.bold}>Rang :</Text> {b.rang} / {b.total_eleves}
                </Text>
                <Text>
                  <Text style={styles.bold}>Appréciation générale :</Text>{" "}
                  {b.appreciation || "—"}
                </Text>
                <Text style={{ marginTop: 5 }}>
                  <Text style={styles.bold}>Observation du chef d’établissement :</Text>{" "}
                  {b.observation || ""}
                </Text>
                <Text style={{ marginTop: 10, textAlign: "right" }}>
                  <Text style={styles.bold}>Le Proviseur :</Text> {b.proviseur || ""}
                </Text>
              </View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  )
}

export default BulletinPDF
