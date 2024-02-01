// ContentToPDF.js
import React from "react";
import { Document, Page, View, Text, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "20px",
  },
  question: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "3px",
  },
  answer: {
    fontSize: "14px",
  },
});

const ContentToPDF = ({ data }) => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page style={styles.page}>
        {data.map((el, i) => (
          <View key={i}>
            {el?.question && <Text style={styles.question}>{el.question}</Text>}
            <Text style={styles.answer}>{el.answer}</Text>
          </View>
        ))}
      </Page>
    </Document>
  </PDFViewer>
);

export default ContentToPDF;
