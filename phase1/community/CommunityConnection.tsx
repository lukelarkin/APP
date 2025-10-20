import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { colors, radius } from '../theme/tokens';

/**
 * A lightweight community connection screen.  The TARU philosophy
 * emphasises Ubuntu—“I am because we are”—so this component
 * encourages users to reach out and celebrate wins with others.
 * At present there is no backend; the UI simply demonstrates how
 * messaging and group rituals could look.  Future versions can
 * integrate with websockets or push notifications.
 */
export default function CommunityConnection() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    // For now we simply reset the field and mark as sent.  In a
    // production build, this would call an API endpoint or update
    // local state to display messages.  Sending a message counts as a
    // win for the day and encourages reciprocal support.
    if (message.trim() !== '') {
      setSent(true);
      setMessage('');
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Connect with Your Community</Text>
        <Text style={styles.subHeading}>
          Share a win, send gratitude or reach out for support.  Your
          strength uplifts us all.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Write a message…"
          placeholderTextColor={colors.sub}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, message.trim() === '' && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={message.trim() === ''}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        {sent && (
          <Text style={styles.sentMessage}>Message sent! Someone will feel your love.</Text>
        )}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionText}>Join Gratitude Ritual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionText}>Schedule Mentor Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    minHeight: 80,
    backgroundColor: colors.bg,
    color: colors.text,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.card,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: colors.accent2,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.5,
  },
  sendButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  sentMessage: {
    fontSize: 14,
    color: colors.sub,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 8,
  },
  actionItem: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});