# Store listing drafts (MOB-04)

Updated: 31 Jul 2026

Privacy policy URL (required for Play / App Store):
`https://app.fastrapid.com/legal/privacy.html`

Terms URL:
`https://app.fastrapid.com/legal/terms.html`

## Short descriptions

### Customer (User)
Order food, groceries, and essentials with FastRapid wallet checkout and live delivery tracking.

### Merchant
Manage menu, orders, payouts, and store hours for your FastRapid shop.

### Rider (Dispatch)
Accept deliveries, navigate pickups, and cash out earnings securely.

## Permission justifications

### Android (`AndroidManifest.xml`)
- `INTERNET` — API calls and maps
- `POST_NOTIFICATIONS` — order and delivery alerts
- `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` — delivery address and rider tracking
- Biometric — optional unlock / money-action confirmation on supported devices

### iOS (`Info.plist`)
- Location When In Use / Always — delivery and rider live location
- Face ID — optional biometric unlock
- Background remote notifications — push delivery updates

## Still needed before store submit
- Screenshots per persona
- Content rating questionnaire
- Apple developer / Play Console accounts and signing keys
- On-device FCM smoke for each Android flavor
