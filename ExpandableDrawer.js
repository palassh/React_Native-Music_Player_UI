import React, {useState} from 'react';
import {SafeAreaView,View,StyleSheet,Button,ActivityIndicator,} from 'react-native';

const Activity = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            visible={loading}
            color='red'
          />
        ) : (
          <View>
            <Button
              title="Start Loading"
              onPress={startLoading}>
            </Button>
            </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: 'white',
    padding: 8,
  },
});

export default Activity;