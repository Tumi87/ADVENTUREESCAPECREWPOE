import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigate } from '../types';
import { colors } from '../theme';

export default function SplashScreen({ go }: { go: Navigate }) {
  useEffect(() => {
    const t = setTimeout(() => go({ name: 'login' }), 2500);
    return () => clearTimeout(t);
  }, [go]);

  return (
    <View style={styles.wrap}>
      <View style={styles.logo}><Text style={{ fontSize: 44, color: colors.sand }}>▲</Text></View>
      <Text style={styles.title}>Adventure Escape SA</Text>
      <Text style={styles.tag}>Explore. Discover. Thrive.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { color: colors.white, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  tag: { color: colors.sand, fontSize: 16, marginTop: 6 },
});
