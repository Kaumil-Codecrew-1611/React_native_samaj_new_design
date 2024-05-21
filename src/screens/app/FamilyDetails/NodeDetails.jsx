// NodeDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NodeDetails = ({ route }) => {
    const { node } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Node Details</Text>
            <Text>Name: {node.name}</Text>
            {node.spouse && <Text>Spouse: {node.spouse.name}</Text>}
            {node.children && (
                <View>
                    <Text>Children:</Text>
                    {node.children.map((child, index) => (
                        <Text key={index}>- {child.name}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default NodeDetails;
