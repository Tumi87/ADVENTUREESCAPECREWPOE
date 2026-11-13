import React, { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { adventures, business } from '../data';
import { common } from '../styles';
import { colors } from '../theme';

const mapsSearch = (venue: string): string =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue);
const mapsDirections = (venue: string): string =>
  'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(venue);

export default function MapScreen({ venueId }: { venueId?: number }) {
  const [venue, setVenue] = useState<number>(venueId ?? 0);
  const [error, setError] = useState<string>('');
  const a = adventures[venue];

  const open = async (url: string): Promise<void> => {
    try {
      await Linking.openURL(url);
      setError('');
    } catch {
      setError('Could not open the maps app on this device.');
    }
  };

  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>Find Us</Text>
      <Text style={common.p}>Operating across {business.location}. Pick an adventure to see where you meet your guide.</Text>

      <Dropdown label="Adventure" value={venue} onChange={id => { setVenue(id); setError(''); }}
        options={adventures.map(x => ({ value: x.id, label: x.name }))} />

      <View style={{ backgroundColor: colors.sand, borderRadius: 16, padding: 16, marginVertical: 8 }}>
        <Text style={[common.h3, { color: colors.green }]}>{a.name}</Text>
        <Text style={common.p}>Meeting point: {a.venue}</Text>
        <Text style={common.muted}>{a.duration}</Text>
      </View>
      <Button title="Open in Maps" onPress={() => { open(mapsSearch(a.venue)); }} />
      <Button title="Get directions" alt onPress={() => { open(mapsDirections(a.venue)); }} />
      {!!error && <Text accessibilityRole="alert" style={common.error}>{error}</Text>}

      <Text style={common.h2}>All meeting points</Text>
      {adventures.map(x => (
        <TouchableOpacity key={x.id} onPress={() => setVenue(x.id)} accessibilityRole="button"
          style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.border, minHeight: 48, justifyContent: 'center' }}>
          <Text style={[common.h3, venue === x.id && { color: colors.orange }]}>{x.name}</Text>
          <Text style={common.muted}>{x.venue}</Text>
        </TouchableOpacity>
      ))}

      <Text style={common.h2}>Need help finding us?</Text>
      <Text style={common.p}>Call {business.phone} ({business.hours}).</Text>
      <Button title="Call us" alt onPress={() => { open(business.phoneLink); }} />
    </ScrollView>
  );
}
