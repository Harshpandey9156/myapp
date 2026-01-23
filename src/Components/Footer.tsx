import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.footer}>
      <Text style={styles.text}>© 2026 Employee App</Text>
    </TouchableOpacity>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    height: 70,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,

    marginHorizontal: 20,
    marginVertical: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
