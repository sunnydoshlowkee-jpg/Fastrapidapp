# Push notifications setup (User / Dispatch / Merchant APKs)

Native push uses **Firebase Cloud Messaging (FCM)** via `@capacitor/push-notifications`.

## Event matrix

### User app
| Event | When it fires |
|-------|----------------|
| Order accepted | Merchant accepts the order |
| Wallet send / receive | P2P wallet transfer |
| Order debit | Wallet charged at checkout |
| Rider arrived | Rider marks delivery as delivered (at customer) |
| Chat message | Rider sends a delivery chat message |

### Merchant app
| Event | When it fires |
|-------|----------------|
| New order | Customer places an order |
| Arrived at pickup | Dispatch taps “arrived at pickup” |
| Arrived at customer | Rider marks delivery as delivered |

### Dispatch app
| Event | When it fires |
|-------|----------------|
| New delivery available | Order creates a delivery (and again when merchant marks ready), for nearby online approved riders |
| Earnings paid | Delivery completed and payout credited |
| Chat message | Customer sends a delivery chat message |

## 1. Firebase Console

1. Create (or open) a Firebase project.
2. Add three Android apps with these package names:
   - `com.fastrapid.user` — Fast Rapid (customer)
   - `com.fastrapid.rider` — Rapid Rider (dispatch)
   - `com.fastrapid.merchant` — Rapid Merchant
3. Download each app’s `google-services.json` and place them here:

```
android/app/src/user/google-services.json
android/app/src/dispatch/google-services.json
android/app/src/merchant/google-services.json
```

Alternatively, register all three package names in one Firebase project and put a single combined `google-services.json` at:

```
android/app/google-services.json
```

4. Project settings → Service accounts → Generate new private key.
5. Save the JSON on the API server (outside the web root), e.g.:

```
/home/fastrapid_cloud/api.fastrapid.com/private/firebase-service-account.json
```

## 2. API `.env`

In `api.fastrapid.com/public_html/.env`:

```
FCM_ENABLED=true
FCM_PROJECT_ID=your-firebase-project-id
FCM_CREDENTIALS=/home/fastrapid_cloud/api.fastrapid.com/private/firebase-service-account.json
```

Then:

```bash
php84 artisan config:clear
php84 artisan queue:restart
```

Ensure a queue worker is running (`QUEUE_CONNECTION=database` is already set):

```bash
php84 artisan queue:work --tries=3
```

## 3. Rebuild APKs

From `app.fastrapid.com/public_html`:

```bash
npm install
npx cap sync android
npm run android:apk:all
```

APKs land in `releases/`:

- `FastRapid-User-release.apk`
- `FastRapid-Dispatch-release.apk`
- `FastRapid-Merchant-release.apk`

## 4. Verify on device

1. Install the APK and sign in.
2. Allow notification permission when prompted.
3. Confirm a row appears in `device_tokens` for that user.
4. Trigger a chat message or rider-arrival event — the device should show an OS notification while backgrounded.

## Notes

- In-app notification inbox + polling still works without FCM.
- Push is skipped when `FCM_ENABLED=false` or credentials are missing.
- Invalid/expired FCM tokens are deleted automatically on send failure.

## 5. iOS (TestFlight)

Register matching iOS apps in Firebase with the same bundle IDs (`com.fastrapid.user` / `.rider` / `.merchant`), download each `GoogleService-Info.plist` into `ios/config/<persona>/`, upload an APNs auth key to Firebase, then follow [IOS_PUBLISHING.md](./IOS_PUBLISHING.md).

Until Firebase iOS + APNs are configured, Android push continues to work; iOS installs still run but may not receive FCM pushes.
