import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AdventureCard from '../components/AdventureCard';
import Button from '../components/Button';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { FormErrors, Navigate } from '../types';
import { isEmail, isName } from '../utils';

type AccountErrors = FormErrors<'name' | 'email'>;

export default function AccountScreen({ go }: { go: Navigate }) {
  const { user, setUser, saved, toggleSaved, quote } = useQuote();
  const [name, setName] = useState<string>(user?.name ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [errors, setErrors] = useState<AccountErrors>({});
  const [done, setDone] = useState<boolean>(false);

  const save = (): void => {
    const e: AccountErrors = {};
    if (!isName(name)) e.name = 'Enter a valid name (letters only).';
    if (!isEmail(email)) e.email = 'Enter a valid email address.';
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setUser({ name: name.trim(), email: email.trim() });
      setDone(true);
    } else {
      setDone(false);
    }
  };

  const logOut = (): void => {
    setUser(null);
    go({ name: 'login' });
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>My Account</Text>

      {user === null ? (
        <>
          <Text style={common.p}>You are browsing as a guest. Log in to keep your details on this device.</Text>
          <Button title="Log in" onPress={() => go({ name: 'login' })} />
        </>
      ) : (
        <>
          <Text style={common.h2}>Your details</Text>
          <Field label="Name" value={name} onChangeText={setName} error={errors.name} autoComplete="name" />
          <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email}
            keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
          <Button title="Save details" onPress={save} />
          {done && <Text style={common.ok}>Details saved.</Text>}
        </>
      )}

      <Text style={common.h2}>My quote</Text>
      <Text style={common.p}>{quote.length} item{quote.length === 1 ? '' : 's'} in your quote.</Text>
      <Button title="View my quote" alt onPress={() => go({ name: 'quote' })} />

      <Text style={common.h2}>Saved adventures ({saved.length})</Text>
      {saved.length === 0 && <Text style={common.muted}>Tap the heart on any adventure to save it here.</Text>}
      {saved.map(id => (
        <AdventureCard key={id} adventure={adventures[id]} saved
          onOpen={() => go({ name: 'detail', id })} onToggleSaved={() => toggleSaved(id)} />
      ))}

      {user !== null && <Button title="Log out" onPress={logOut} style={{ marginTop: 16 }} />}
    </ScrollView>
  );
}
