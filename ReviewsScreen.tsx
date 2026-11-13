import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Field from '../components/Field';
import { adventures, sampleReviews } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { FormErrors, Review } from '../types';
import { isName } from '../utils';

type ReviewErrors = FormErrors<'author' | 'adventure' | 'rating' | 'comment'>;

const stars = (n: number): string => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [author, setAuthor] = useState<string>('');
  const [adventureId, setAdventureId] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [done, setDone] = useState<boolean>(false);

  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews],
  );

  const submit = (): void => {
    const e: ReviewErrors = {};
    if (!isName(author)) e.author = 'Enter your name (letters only).';
    if (adventureId === null) e.adventure = 'Choose the adventure you did.';
    if (rating < 1) e.rating = 'Tap a star rating from 1 to 5.';
    if (comment.trim().length < 5) e.comment = 'Please write a short comment.';
    setErrors(e);
    if (Object.keys(e).length > 0 || adventureId === null) {
      setDone(false);
      return;
    }
    const next: Review = { id: Date.now(), author: author.trim(), adventureId, rating, comment: comment.trim() };
    setReviews(r => [next, ...r]);
    setAuthor(''); setAdventureId(null); setRating(0); setComment('');
    setDone(true);
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Reviews</Text>
      <Text style={common.p}>Average rating: {average.toFixed(1)} / 5 from {reviews.length} review{reviews.length === 1 ? '' : 's'}</Text>
      <Text style={common.muted}>The first three reviews are sample content for this demo app.</Text>

      {reviews.map(r => (
        <View key={r.id} style={{ backgroundColor: colors.sand, borderRadius: 16, padding: 14, marginTop: 10 }}>
          <Text style={[common.h3, { color: colors.green }]}>{adventures[r.adventureId].name}</Text>
          <Text style={{ color: colors.orange, fontSize: 18 }} accessibilityLabel={`${r.rating} out of 5 stars`}>{stars(r.rating)}</Text>
          <Text style={common.p}>{r.comment}</Text>
          <Text style={common.muted}>– {r.author}</Text>
        </View>
      ))}

      <Text style={common.h2}>Leave a review</Text>
      <Field label="Your name" value={author} onChangeText={setAuthor} error={errors.author} autoComplete="name" />
      <Dropdown label="Adventure" value={adventureId} onChange={setAdventureId} placeholder="Choose an adventure"
        options={adventures.map(a => ({ value: a.id, label: a.name }))} error={errors.adventure} />

      <Text style={{ fontWeight: '600', color: colors.ink, marginBottom: 4 }}>Rating</Text>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <TouchableOpacity key={n} onPress={() => setRating(n)} accessibilityRole="button"
            accessibilityLabel={`${n} star${n > 1 ? 's' : ''}`} accessibilityState={{ selected: rating === n }}
            style={{ minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, color: n <= rating ? colors.orange : colors.border }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!!errors.rating && <Text accessibilityRole="alert" style={common.error}>{errors.rating}</Text>}

      <View style={{ height: 10 }} />
      <Field label="Comment" value={comment} onChangeText={setComment} error={errors.comment} multiline
        style={{ minHeight: 90, textAlignVertical: 'top' }} />
      <Button title="Submit review" onPress={submit} />
      {done && <Text style={common.ok}>Thanks! Your review was added (kept on this device only).</Text>}
    </ScrollView>
  );
}
