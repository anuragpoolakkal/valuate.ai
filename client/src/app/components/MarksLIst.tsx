import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Mark } from "../test/marksheet/page";

const MarksheetPDF: React.FC<{ data: Mark[] }> = ({ data }) => {
  const styles = StyleSheet.create({
    table: { width: "100%", border: "1px solid #000" },
    row: { flexDirection: "row", borderBottom: "1px solid #000" },
    cell: { flex: 1, padding: "8px", textAlign: "center" },
    headerCell: { fontWeight: "bold" },
  });

  return (
    <Document>
      <Page size="A4">
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Midterm Exam 2023-24
          </Text>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerCell]}>
              <Text>Serial number</Text>
              <Text>Name</Text>
              <Text>Roll number</Text>
              <Text>Marks</Text>
              <Text>Checked</Text> {/* Add a new column for isChecked */}
            </View>
            {data.map((row) => (
              <View key={row.id} style={styles.row}>
                <Text style={styles.cell}>{row.id}</Text>
                <Text style={styles.cell}>{row.name}</Text>
                <Text style={styles.cell}>{row.rollNo}</Text>
                <Text style={styles.cell}>{row.marks}</Text>
                <Text style={styles.cell}>
                  {row.isChecked ? "Yes" : "No"}
                </Text>{" "}
                {/* Display isChecked value */}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const ExportPDFButton: React.FC<{ data: Mark[] }> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<MarksheetPDF data={data} />}
      fileName="Marksheet.pdf"
    >
      {({ loading }) =>
        loading ? (
          <button className="btn btn-primary mt-20 justify-center" disabled>
            Exporting...
          </button>
        ) : (
          <button className="btn btn-primary mt-20 justify-center">
            Export Marksheet
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default ExportPDFButton;
