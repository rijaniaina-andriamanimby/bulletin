// src/service/BulletinService.js
export const calculerBulletins = async (classeId, session, api) => {
  const [elevesRes, notesRes, matieresRes] = await Promise.all([
    api.get("/eleves/"),
    api.get("/notes/"),
    api.get("/matieres/"),
  ])

  const eleves = elevesRes.data.filter(e => e.classe === parseInt(classeId))
  const notes = notesRes.data.filter(n => n.session === session)

  const bulletins = []

  for (const eleve of eleves) {
    const notesEleve = notes.filter(n => n.eleve === eleve.id)
    if (!notesEleve.length) continue

    // Liste unique des matières de cet élève
    const matieres = [...new Set(notesEleve.map(n => n.matiere))]
    let totalPondere = 0
    let totalCoef = 0
    const notesData = []

    for (const idMatiere of matieres) {
      const matiere = matieresRes.data.find(m => m.id === idMatiere)
      const notesMatiere = notesEleve.filter(n => n.matiere === idMatiere)

      const n1 = notesMatiere.find(n => n.typeNote === "Note 1")?.valeur || 0
      const n2 = notesMatiere.find(n => n.typeNote === "Note 2")?.valeur || 0
      const exam = notesMatiere.find(n => n.typeNote === "Examen")?.valeur || 0
      const coef = notesMatiere[0]?.coefficient || 1

      const def = ((Number(n1) + Number(n2)) / 2 + Number(exam)) / 2
      totalPondere += def * coef
      totalCoef += coef

      notesData.push({
        matiere: matiere.nom,
        coef,
        n1: Number(n1),
        n2: Number(n2),
        exam: Number(exam),
        def: def.toFixed(2)
      })
    }

    const moyenne = totalCoef ? totalPondere / totalCoef : 0
    const appreciation = appreciationAuto(moyenne)

    bulletins.push({
      eleve,
      session,
      notes: notesData,
      moyenne_generale: moyenne.toFixed(2),
      appreciation
    })
  }

  // Tri pour déterminer les rangs
  bulletins.sort((a, b) => b.moyenne_generale - a.moyenne_generale)
  bulletins.forEach((b, i) => (b.rang = i + 1))
  bulletins.forEach(b => (b.total = bulletins.length))

  return bulletins
}

const appreciationAuto = (m) => {
  if (m < 5) return "Travail très insuffisant."
  if (m < 8) return "Doit redoubler d’efforts."
  if (m < 10) return "Résultats faibles, peut mieux faire."
  if (m < 12) return "Travail moyen, encourageant."
  if (m < 14) return "Assez bien, continuez vos efforts."
  if (m < 16) return "Bon travail, régulier et sérieux."
  if (m < 18) return "Très bon travail, félicitations."
  return "Excellent, félicitations du conseil de classe."
}
