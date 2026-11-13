import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

export interface DropdownOption {
  value: number;
  label: string;
}

interface Props {
  label: string;
  options: DropdownOption[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  error?: string;
}

/** Drop-down menu: tap the field, pick an option from the list. No extra packages needed. */
export default function Dropdown({ label, options, value, onChange, placeholder = 'Select...', error }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const selected = options.find(o => o.value === value);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.field, !!error && { borderColor: colors.error }]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected ? selected.label : placeholder}`}
      >
        <Text style={{ flex: 1, fontSize: 16, color: selected ? colors.ink : colors.muted }}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={{ color: colors.green, fontSize: 16 }}>▼</Text>
      </TouchableOpacity>
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView style={{ maxHeight: 360 }}>
              {options.length === 0 && <Text style={styles.empty}>Nothing to choose from.</Text>}
              {options.map(o => {
                const on = o.value === value;
                return (
                  <TouchableOpacity
                    key={o.value}
                    style={[styles.option, on && { backgroundColor: colors.sand }]}
                    onPress={() => { onChange(o.value); setOpen(false); }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <Text style={{ fontSize: 16, color: colors.ink, fontWeight: on ? '700' : '400' }}>{o.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.cancel} onPress={() => setOpen(false)} accessibilityRole="button">
              <Text style={{ color: colors.green, fontWeight: '700' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', color: colors.ink, marginBottom: 4 },
  field: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: colors.border,
    borderRadius: 12, padding: 12, minHeight: 48,
  },
  error: { color: colors.error, fontSize: 13, marginTop: 3 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: colors.white, borderRadius: 16, padding: 16 },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: colors.green, marginBottom: 8 },
  option: { paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, minHeight: 48, justifyContent: 'center' },
  empty: { color: colors.muted, padding: 12 },
  cancel: { alignItems: 'center', justifyContent: 'center', minHeight: 48, marginTop: 6 },
});
