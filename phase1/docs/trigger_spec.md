# TARU Trigger Integration Specification

This document defines the contract between the Chrome/Edge extension (`HealShield`) and the TARU mobile app backend for delivering just‑in‑time adaptive interventions.  The goal is to ensure that craving events detected on the desktop (e.g. attempted visits to blocked sites, night‑time browsing or drops in physical activity) result in emotionally resonant interventions delivered to the user’s phone within **5 seconds**.

## 1. Event Producers

### 1.1 Browser Extension

The extension monitors browsing behaviour and emits events when users:

| Event type        | Trigger description                                          | Payload fields                                    |
|-------------------|---------------------------------------------------------------|----------------------------------------------------|
| `site_blocked`    | User attempts to visit a domain in the porn/gambling blocklist. | `url` (string), `timestamp` (ISO 8601)             |
| `late_night`      | User is browsing after configured bedtime (e.g. 22:00).        | `timestamp`, `threshold` (string, e.g. "22:00")    |
| `sentiment_high`  | Real‑time sentiment analysis from the extension detects elevated craving sentiment in typed text or search queries. | `score` (0–1), `context` (string) |
| `idle_warning`    | User has been idle on the desktop for longer than N minutes after a previous trigger; used to encourage movement or reflection. | `durationMinutes` (number), `timestamp` |

Each event includes a unique user identifier (`userId`) attached at extension install time and an authentication token to verify the event.

### 1.2 Wearable & Device Integrations (future)

Step count or heart‑rate drops will be emitted by connected wearables in the same format, using event types such as `steps_low` or `hrv_spike`.  See the companion wearable spec for details.

## 2. Delivery Pipeline

1. **Extension → Webhook** – The extension sends an HTTPS POST to the `trigger-api` endpoint hosted by our backend.  The request body contains the JSON payload described above.  Authentication is provided via a bearer token stored in extension settings.
2. **n8n Workflow** – The API gateway triggers an n8n workflow that:
   - Validates the token and maps `userId` to internal user records.
   - Fetches the user’s archetype and IFS sequence from our database (initially stored in `AsyncStorage` via onboarding, but synced to the backend).
   - Determines the appropriate intervention type using the event type and archetype’s substitution priority.  For example, a `site_blocked` event for a `Lover` will try a loved‑one letter first, falling back to a gratitude ritual if no letter is available.
   - Generates a message payload containing a short prompt, the selected intervention content, and metadata (e.g. `interventionKey`, `archetype`, `eventType`).
3. **Push Notification Service** – The workflow posts the message to the push service (Firebase Cloud Messaging or Expo Push).  The mobile app receives the notification and opens the relevant screen (e.g. `InterventionModal`) with the provided content.

## 3. Message Format

Notifications sent to the app must include the following keys:

```json
{
  "title": "Stay Present, Warrior",
  "body": "Here’s a note from someone who believes in you…",
  "data": {
    "interventionKey": "lovedOneLetter",
    "archetype": "Warrior",
    "eventType": "site_blocked",
    "content": {
      "subject": "Remember Your Strength",
      "body": "Dear Brother, …"
    }
  }
}
```

The `data` object can be extended as needed.  The mobile app should fallback gracefully if unknown keys are present.

## 4. Latency and Reliability

Our commitment to users is that interventions arrive within **5 seconds** of the triggering event.  To achieve this:

* The webhook must respond with HTTP 200 within 50 ms to avoid blocking the extension’s UI.  All heavy logic should run asynchronously in n8n.
* The n8n workflow should keep stateful operations (e.g. database lookups) under 100 ms.  Parallelise calls where possible.
* Push notifications should leverage high‑priority channels.

If delivery fails (e.g. device offline), the notification service will retry.  The app should cache missed interventions and display them when connectivity is restored.

## 5. Security and Privacy

* All events and notifications must be encrypted in transit (HTTPS/TLS).
* The extension may collect sensitive browsing data.  It should send only the minimum information necessary for intervention selection (e.g. domain category rather than full URL when possible).
* The backend must not log or store raw porn/gambling URLs beyond what is required for analytics and must comply with Apple’s health data rules【740281439305781†L1924-L1939】.

---

This spec provides a blueprint for the first iteration of the trigger system.  Future revisions will incorporate wearable data and refine event detection.  Always prioritise timely, compassionate intervention over invasive data collection.