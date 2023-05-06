import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row"
  },
  section: {
    flexGrow: 1
  }
});

const PDF = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello World!</Text>
      </View>
      <View style={styles.section}>
        <Text>Inside a PDF!</Text>
      </View>
    </Page>
  </Document>
);

export default PDF;
