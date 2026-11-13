import React from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export interface Photo {
  source: ImageSourcePropType;
  alt: string;
  caption?: string;
}

/** Horizontally scrolling row of photos. */
export default function PhotoStrip({ photos }: { photos: Photo[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 6 }}>
      {photos.map((p, i) => (
        <View key={`${p.alt}-${i}`} style={styles.item}>
          <Image source={p.source} style={styles.image} accessibilityLabel={p.alt} />
          {!!p.caption && <Text style={styles.caption} numberOfLines={1}>{p.caption}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: { marginRight: 10, width: 200 },
  image: { width: 200, height: 130, borderRadius: 12 },
  caption: { fontSize: 13, color: colors.muted, marginTop: 4 },
});
