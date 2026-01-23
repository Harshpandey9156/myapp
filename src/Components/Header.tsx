import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Heliware</Text>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginTop: 40,
        backgroundColor: '#2563EB',
        alignItems: 'flex-start',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})