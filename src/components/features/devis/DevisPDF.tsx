import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export type DevisData = {
  clientId: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise?: string;
  typeSite: string;
  description?: string;
  prestations: { label: string; montant: number }[];
  acompte: number;
  solde: number;
  totalHT: number;
  dateDevis: string;
  validiteJours?: number;
};

const COLORS = {
  text: "#0d0f14",
  accent: "#00D4FF",
  white: "#ffffff",
} as const;

const formatMontant = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    padding: 40,
    lineHeight: 1.4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  brand: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  devisLabel: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    marginBottom: 6,
  },
  meta: {
    fontSize: 9,
    color: COLORS.text,
  },
  sectionTitle: {
    backgroundColor: COLORS.accent,
    color: COLORS.text,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  block: {
    marginBottom: 18,
  },
  line: {
    marginBottom: 4,
  },
  label: {
    fontFamily: "Helvetica-Bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text,
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e4e8",
  },
  colPrestation: {
    width: "72%",
    paddingRight: 8,
  },
  colMontant: {
    width: "28%",
    textAlign: "right",
  },
  recapRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  recapLabel: {
    width: 120,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    marginRight: 24,
  },
  recapValue: {
    width: 90,
    textAlign: "right",
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.text,
  },
  conditions: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 40,
    right: 40,
    fontSize: 8,
    color: COLORS.text,
    textAlign: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
});

function acomptePercent(totalHT: number, acompte: number): number {
  if (totalHT <= 0) return 0;
  return Math.round((acompte / totalHT) * 1000) / 10;
}

export type DevisPDFProps = {
  data: DevisData;
};

export function DevisPDF({ data }: DevisPDFProps) {
  const validite = data.validiteJours ?? 30;
  const pctAcompte = acomptePercent(data.totalHT, data.acompte);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow} fixed>
          <Text style={styles.brand}>DevCraft</Text>
          <View style={styles.headerRight}>
            <Text style={styles.devisLabel}>DEVIS</Text>
            <Text style={styles.meta}>Date : {data.dateDevis}</Text>
            <Text style={styles.meta}>N° {data.clientId}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Client</Text>
        <View style={styles.block}>
          <Text style={styles.line}>
            <Text style={styles.label}>Nom : </Text>
            {data.prenom} {data.nom}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Email : </Text>
            {data.email}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Téléphone : </Text>
            {data.telephone}
          </Text>
          {data.entreprise ? (
            <Text style={styles.line}>
              <Text style={styles.label}>Entreprise : </Text>
              {data.entreprise}
            </Text>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Prestations</Text>
        <View style={styles.block}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colPrestation, styles.label]}>Prestation</Text>
            <Text style={[styles.colMontant, styles.label]}>Montant HT</Text>
          </View>
          {data.prestations.map((p, i) => (
            <View key={i} style={styles.tableRow} wrap={false}>
              <Text style={styles.colPrestation}>{p.label}</Text>
              <Text style={styles.colMontant}>{formatMontant(p.montant)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Récapitulatif</Text>
        <View style={styles.block}>
          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>Total HT</Text>
            <Text style={styles.recapValue}>{formatMontant(data.totalHT)}</Text>
          </View>
          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>Acompte demandé</Text>
            <Text style={styles.recapValue}>{formatMontant(data.acompte)}</Text>
          </View>
          <View style={[styles.recapRow, styles.totalRow]}>
            <Text style={styles.recapLabel}>Solde restant</Text>
            <Text style={styles.recapValue}>{formatMontant(data.solde)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Conditions</Text>
        <View style={styles.block}>
          <Text style={styles.conditions}>Validité : {validite} jours</Text>
          <Text style={styles.conditions}>
            Acompte de {pctAcompte}% à la commande
          </Text>
        </View>

        <Text style={styles.footer} fixed>
          DevCraft — devcraft.store@gmail.com — dev-craft.store
        </Text>
      </Page>
    </Document>
  );
}
