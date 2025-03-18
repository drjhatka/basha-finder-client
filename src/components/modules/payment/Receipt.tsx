import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useRouter } from 'next/router';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 3,
  },
  value: {
    fontWeight: 'bold',
  },
});

interface ReceiptProps {
  paymentIntentId: string;
  paymentAmount: number;
  customerName: string;
  customerEmail: string;
  paymentDate: string;
  paymentStatus: string;
}

const Receipt = ({ paymentIntentId, paymentAmount, customerName, customerEmail, paymentDate, paymentStatus }: ReceiptProps) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Payment Receipt</Text>
        <Text style={styles.text}>Payment Status: <Text style={styles.value}>{paymentStatus}</Text></Text>
        <Text style={styles.text}>Payment Intent ID: <Text style={styles.value}>{paymentIntentId}</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Customer Details</Text>
        <Text style={styles.text}>Name: <Text style={styles.value}>{customerName}</Text></Text>
        <Text style={styles.text}>Email: <Text style={styles.value}>{customerEmail}</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Details</Text>
        <Text style={styles.text}>Amount: <Text style={styles.value}>${(paymentAmount / 100).toFixed(2)}</Text></Text>
        <Text style={styles.text}>Payment Date: <Text style={styles.value}>{paymentDate}</Text></Text>
      </View>
    </Page>
  </Document>
);

export default Receipt;
