# Publish Fast Rapid iOS apps for testing (TestFlight)

You already have three Android apps. iOS mirrors the same personas:

| Persona | Bundle ID | Display name | Sync command |
|---------|-----------|--------------|--------------|
| Customer | `com.fastrapid.user` | Fast Rapid | `npm run ios:sync:user` |
| Rider | `com.fastrapid.rider` | Rapid Rider | `npm run ios:sync:dispatch` |
| Merchant | `com.fastrapid.merchant` | Rapid Merchant | `npm run ios:sync:merchant` |

**Important:** Building and signing iOS apps requires a **Mac with Xcode**. This Linux server can prepare the project and web assets, but cannot produce an installable `.ipa`.

---

## What you need

1. **Apple Developer Program** membership ([developer.apple.com/programs](https://developer.apple.com/programs/)) — $99/year.
2. A **Mac** with **Xcode 16+** (App Store).
3. An **iPhone** signed into the same Apple ID you will invite as a tester (or the Apple ID of each tester).
4. Node **22+** on the Mac (Capacitor 8 CLI requires it).

---

## One-time Apple / Xcode setup

### 1. Create App IDs in Apple Developer

In [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list):

1. Create three **App IDs** (type: App) with the bundle IDs above.
2. For each App ID, enable:
   - **Push Notifications**
   - **Associated Domains** (only if you add Universal Links later)

### 2. Create apps in App Store Connect

In [App Store Connect](https://appstoreconnect.apple.com/) → **My Apps** → **+**:

Create three apps (one per bundle ID). You can leave store listing incomplete for TestFlight-only testing.

### 3. Signing in Xcode

1. Copy or clone this repo onto the Mac.
2. Open the project:

```bash
cd app.fastrapid.com/public_html
npm install
npm run ios:sync:user   # or dispatch / merchant
npm run ios:open
```

3. In Xcode: select the **App** target → **Signing & Capabilities**.
4. Check **Automatically manage signing**.
5. Choose your **Team** (Apple Developer account).
6. Confirm the **Bundle Identifier** matches the persona you synced.
7. Add capability **Push Notifications** (and **Background Modes → Remote notifications** if not already present).

Repeat signing for each persona after running its `ios:sync:*` command (bundle ID changes each time).

### 4. Firebase / push (optional for first install test)

To match Android FCM push:

1. Firebase Console → add three **iOS** apps with the same bundle IDs.
2. Download each `GoogleService-Info.plist` into:

```
ios/config/user/GoogleService-Info.plist
ios/config/dispatch/GoogleService-Info.plist
ios/config/merchant/GoogleService-Info.plist
```

3. In Xcode, add the correct plist to the App target (or copy into `ios/App/App/` before archive).
4. Create an **APNs Auth Key** in Apple Developer → Keys → enable Apple Push Notifications → upload that `.p8` in Firebase → Project settings → Cloud Messaging.

Until Firebase iOS is wired, the app still installs and runs; push may not reach the Laravel FCM backend.

### 5. Icons (optional)

On the Mac, with assets in `resources/`:

```bash
npm run ios:icons
```

---

## Build for TestFlight (recommended for testers)

Do this **once per persona** (user / dispatch / merchant).

### A. Prepare on Mac (or sync from this server)

```bash
cd app.fastrapid.com/public_html
npm run ios:sync:user        # Fast Rapid
# npm run ios:sync:dispatch  # Rapid Rider
# npm run ios:sync:merchant  # Rapid Merchant
npm run ios:open
```

### B. Archive in Xcode

1. Select target device: **Any iOS Device (arm64)** (not a simulator).
2. Menu: **Product → Archive**.
3. When the Organizer opens: **Distribute App → App Store Connect → Upload**.
4. Wait for processing in App Store Connect (often 5–30 minutes).

### C. Invite testers

1. App Store Connect → your app → **TestFlight**.
2. Add **Internal testers** (App Store Connect users on your team) — available almost immediately after processing.
3. Or **External testing**: create a group, add email addresses, submit the build for Beta App Review (usually quicker than full App Review).
4. Testers install the **TestFlight** app from the App Store, accept the invite email/link, then install your build.

Testers can keep all three apps installed side by side (different bundle IDs).

---

## Alternative: install on one physical iPhone without TestFlight

Useful for your own device only:

1. Connect the iPhone by cable.
2. In Xcode, select that iPhone as the run destination.
3. **Product → Run** (or the Play button).
4. On the phone: **Settings → General → VPN & Device Management** → trust your developer certificate.

Limits: free Apple ID builds expire after 7 days; paid Developer Program lasts longer. You must rebuild from Xcode to refresh. Not practical for many testers — use TestFlight for that.

---

## Ad hoc / enterprise (usually skip)

- **Ad Hoc**: register each device UDID, export an ad hoc IPA — cumbersome.
- **Enterprise**: only for companies with Apple Enterprise Program — not for public testing.

Prefer **TestFlight**.

---

## Server-side prepare (this Linux host)

You can build the web bundle and stamp the iOS persona here, then copy `ios/` + `dist/` to a Mac:

```bash
# Needs Node 22+ for `npx cap` / open; sync scripts work on Node 20 too
npm run ios:sync:user
```

Then on the Mac: open `ios/App/App.xcodeproj` (or `npm run ios:open`) and Archive.

---

## Checklist before inviting testers

- [ ] Apple Developer Program active
- [ ] Three App IDs + three App Store Connect apps
- [ ] Mac Xcode signing set for the persona’s bundle ID
- [ ] `npm run ios:sync:<persona>` run before each archive
- [ ] Archive uploaded; build shows as **Ready to Test** in TestFlight
- [ ] Tester emails invited; they installed TestFlight

---

## Versioning

Scripts set:

- **Marketing version** `1.1` (user-visible)
- **Build** `2` (must increase for every App Store Connect upload)

Bump `CURRENT_PROJECT_VERSION` in `scripts/prepare-ios-persona.js` (or in Xcode) before each new upload of the same version.
