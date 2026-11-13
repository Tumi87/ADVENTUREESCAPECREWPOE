import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import SimpleTable from '../components/SimpleTable';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { Navigate } from '../types';
import { calculateFees, formatRand } from '../utils';

export default function QuoteScreen({ go }: { go: Navigate }) {
  const { quote, toggleQuote, removeFromQuote } = useQuote();
  const [error, setError] = useState<string>('');
  const fees = calculateFees(quote, adventures);

  const addOptions = adventures
    .filter(a => !quote.includes(a.id))
    .map(a => ({ value: a.id, label: `${a.name} – R${a.price}` }));

  const checkout = (): void => {
    if (quote.length === 0) {
      setError('Add at least one adventure to your quote first.');
      return;
    }
    setError('');
    go({ name: 'payment' });
  };

  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>My Quote</Text>

      <Dropdown label="Add an adventure" options={addOptions} value={null} placeholder="Choose an adventure"
        onChange={id => { toggleQuote(id); setError(''); }} />

      {quote.length === 0 ? (
        <Text style={common.muted}>Your quote is empty.</Text>
      ) : (
        <>
          <Text style={common.h2}>Selected adventures</Text>
          {quote.map(id => (
            <View key={id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Text style={[common.p, { flex: 1, marginBottom: 0 }]}>{adventures[id].name}</Text>
              <TouchableOpacity onPress={() => removeFromQuote(id)} accessibilityRole="button"
                accessibilityLabel={`Remove ${adventures[id].name}`}
                style={{ minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.error, fontWeight: '700' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={common.h2}>Cost breakdown</Text>
          <SimpleTable header={['Item', 'Amount']} rows={[
            ...quote.map(id => [adventures[id].name, formatRand(adventures[id].price)] as [string, string]),
            ['Subtotal', formatRand(fees.subtotal)],
            [`Discount (${fees.discountPercent}%)`, `-${formatRand(fees.discount)}`],
            ['VAT (15%)', formatRand(fees.vat)],
            ['Total', formatRand(fees.total)],
          ]} />
        </>
      )}

      {!!error && <Text accessibilityRole="alert" style={common.error}>{error}</Text>}
      <Button title="Continue to payment" onPress={checkout} style={{ marginTop: 12 }} />
      <Button title="Request a formal quote" alt onPress={() => go({ name: 'fees' })} />
      <Text style={common.muted}>This is a quoted fee only, not a formal invoice.</Text>
    </ScrollView>
  );
}
