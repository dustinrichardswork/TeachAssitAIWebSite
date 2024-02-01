import React from 'react';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    content: {
        fontFamily: 'Helvetica',
    },
    question: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    answer: {
        fontSize: 12,
        marginBottom: 16,
    },
});

const PDFDocument = ({ answer }) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.content}>
                    {answer.map((item, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            {item.question && (
                                <Text style={styles.question}>{item.question}</Text>
                            )}
                            <View style={styles.answer} dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )
};

export default PDFDocument;
