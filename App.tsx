import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/Components/Header';
import Footer from './src/Components/Footer';
import Form from './src/Components/Form';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <View style={styles.content}>
        <Form />
      </View>

      {/* Footer (Sticky) */}
      {/* <Footer /> */}
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f9fafb',
  },

  content: {
    flex: 1,  
    padding: 16,
  },
});
