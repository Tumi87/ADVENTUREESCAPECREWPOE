import React, { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Field from '../components/Field';
import SimpleTable from '../components/SimpleTable';
import { adventures, business } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { FormErrors } from '../types';
import { isEmail, isName, isPhone } from '../utils';

type ContactErrors = FormErrors<'name' | 'email' | 'phone' | 'package' | 'message'>;

export default function ContactScreen({ packageId }: { packageId?: number }) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pkg, setPkg] = useState<number | null>(packageId ?? null);
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState<boolean>(false);
  const [venue, setVenue] = useState<number>(packageId ?? 0);

  const send = (): void => {
    const e: ContactErrors = {};
    if (!isName(name)) e.name = 'Enter a valid name.';
    if (!isEmail(email)) e.email = 'Enter a valid email.';
    if (!isPhone(phone)) e.phone = 'Enter a valid SA phone number.';
    if (pkg === null) e.package = 'Please select a package.';
    if (message.trim().length < 5) e.message = 'Please enter a message.';
    setErrors(e);
    setSent(Object.keys(e).length === 0);
  };

  const openMap = (): void => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(adventures[venue].venue));
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Contact Us</Text>
      <Field label="Name" value={name} onChangeText={setName} error={errors.name} autoComplete="name" />
      <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone Number" value={phone} onChangeText={setPhone} error={errors.phone} keyboardType="phone-pad" />

      <Dropdown label="Select a Package" value={pkg} onChange={setPkg} placeholder="Choose a package" error={errors.package}
        options={adventures.map(a => ({ value: a.id, label: `${a.name} – R${a.price}` }))} />

      <View style={{ height: 10 }} />
      <Field label="Message" value={message} onChangeText={setMessage} error={errors.message} multiline style={{ minHeight: 90, textAlignVertical: 'top' }} />
      <Button title="Send" onPress={send} />
      {sent && <Text style={common.ok}>Message sent! We will be in touch soon.</Text>}

      <Text style={common.h2}>Find us</Text>
      <Text style={common.muted}>Choose a venue for directions</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 6 }}>
        {adventures.map(a => (
          <TouchableOpacity key={a.id} onPress={() => setVenue(a.id)} accessibilityRole="button" accessibilityState={{ selected: venue === a.id }}
            style={[common.pill, venue === a.id && { backgroundColor: colors.orange, borderColor: colors.orange }]}>
            <Text style={{ color: venue === a.id ? colors.white : colors.ink }}>{a.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={common.p}>{adventures[venue].venue}</Text>
      <Button title="Open in Maps" alt onPress={openMap} />

      <Text style={common.h2}>Business Info</Text>
      <SimpleTable header={['Item', 'Details']} rows={[
        ['Location', business.location], ['Email', business.email], ['Phone', business.phone], ['Hours', business.hours],
      ]} />

      <Text style={common.h2}>Meeting points</Text>
      <SimpleTable header={['Activity', 'Meeting point']} rows={adventures.map(a => [a.name, a.venue] as [string, string])} />
    </ScrollView>
  );
}
