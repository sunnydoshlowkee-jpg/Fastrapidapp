# Rapid Super App — GitHub Project Plan

Generated: **2026-07-22** · Source of truth: codebase audit

- Frontend: `headmaster2hm/rapid-superapp`
- Backend: `headmaster2hm/rapid-superapp-api`
- Project name: **Rapid Super App Development**
- Columns: Backlog, Todo, In Progress, Testing, Review, Done, Phase 2

## Executive summary

| Metric | Value |
|--------|-------|
| Epics | 14 |
| Issues (catalog) | 93 |
| Open / active | 74 |
| Done (tracked completed) | 19 |
| Overall completion (module avg) | **69%** |
| Frontend completion | **68%** |
| Backend completion | **80%** |
| MVP readiness estimate | **72%** |

Completed Authentication ClickUp tasks were **not** re-created as open work. Only remaining auth gaps + Done summary trackers were included.

## Suggested priorities

- P0: Rider withdraw API+UI, OTP strict+rate limit, disable crypto sim, admin 2FA
- P1: Admin transactions/payouts/analytics APIs+wiring, cart validation, CI
- P2: iOS TestFlight + mobile QA + FCM verification
- P3: Compliance audit log, privacy pages, monitoring
- Phase 2: Disputes, support, settings, referrals, saved cards, crypto

## Missing features / integration gaps

- Rider wallet withdraw (BE+FE)
- Admin transactions/payouts APIs + FE wiring
- Admin disputes/support/audit/notifications/settings APIs
- Admin platform analytics (stub page)
- Admin live rider tracking
- Admin real 2FA + password reset APIs
- Saved payment methods
- Real crypto checkout (Phase 2)
- Referral reward pipeline (Phase 2)
- Production OTP strict flags
- OTP rate limiting
- Audit log write path
- CI workflows
- iOS TestFlight for 3 personas

## Risks

- **critical**: Admin finance screens are live (ledger / payouts / overview KPIs); transaction detail + dispute auto-refund stay Phase 2
- **critical**: Rider cannot cash out earnings — blocks rider adoption
- **critical**: OTP strict mode off in prod defaults — auth bypass risk
- **high**: Admin 2FA stub accepts any code when not strict
- **high**: No CI — regressions can ship unnoticed
- **high**: iOS not yet on TestFlight — Apple launch path unknown
- **high**: Crypto checkout simulated — legal/financial risk if left enabled
- **medium**: Cart lacks server-side price validation — payment integrity risk

## Module completion

| Module | % | Repo |
|--------|---|------|
| Authentication | 90% | both |
| Customer App | 85% | frontend |
| Merchant Portal | 80% | both |
| Delivery Rider | 75% | both |
| Admin Portal | 45% | both |
| Wallet | 85% | both |
| Payments | 88% | backend |
| Marketplace | 80% | both |
| Notifications | 75% | both |
| Mobile Apps | 80% | frontend |
| Compliance | 25% | both |
| Deployment | 70% | both |
| Analytics | 35% | both |
| Testing & QA | 55% | both |

## 4-week roadmap

### Week 1
**Focus:** Close MVP money + auth hard gaps

- `RID-01` Implement rider wallet withdraw API (rapid-superapp-api, critical, 1d)
- `RID-02` Wire rider Withdraw UI to withdraw API (rapid-superapp, critical, 0.75d)
- `AUTH-04` Add rate limiting on auth OTP endpoints (rapid-superapp-api, high, 0.75d)
- `AUTH-02` Implement Admin TOTP verify and password-reset APIs (rapid-superapp-api, high, 1d)
- `AUTH-01` Wire admin TOTP 2FA in strict mode (rapid-superapp, high, 1d)
- `CUS-06` Replace simulated CryptoCheckout with real provider or hide for MVP (rapid-superapp, high, 0.5d)
- `CUS-04` Harden cart update with pricing and stock validation (rapid-superapp-api, high, 1d)
- `WAL-01` Add PHPUnit coverage for VTpass bill payments (rapid-superapp-api, high, 1d)
- `ADM-18` Feature tests for Admin Orders and Admin Riders (rapid-superapp-api, high, 1d)

### Week 2
**Focus:** Admin finance visibility + analytics + rider tracking

- `ADM-01` Admin platform transactions list/detail API (rapid-superapp-api, high, 1d)
- `ADM-02` Wire Admin Transactions pages to API (rapid-superapp, high, 1d)
- `ADM-03` Admin payouts queue API (approve/reject) (rapid-superapp-api, high, 1d)
- `ADM-04` Wire Admin Payouts page to API (rapid-superapp, high, 0.75d)
- `ADM-13` Admin platform analytics API (rapid-superapp-api, high, 1d)
- `ADM-14` Build Admin Analytics dashboard against API (rapid-superapp, high, 1d)
- `RID-04` Admin live rider tracking API (rapid-superapp-api, high, 1d)
- `RID-05` Wire Admin Rider Tracking page to live location API (rapid-superapp, high, 1d)
- `MER-01` Replace merchant inventory mock constants with API-only data (rapid-superapp, medium, 0.75d)
- `CUS-03` Remove leftover mock data from Customer Home and CartDetail (rapid-superapp, low, 0.5d)
- `CUS-05` Fix VendorDetail unimplemented mockup tabs (rapid-superapp, medium, 0.75d)

### Week 3
**Focus:** iOS TestFlight + mobile QA + notifications

- `MOB-01` Publish Customer iOS build to TestFlight (rapid-superapp, critical, 1d)
- `MOB-02` Publish Merchant iOS build to TestFlight (rapid-superapp, critical, 1d)
- `MOB-03` Publish Rider iOS build to TestFlight (rapid-superapp, critical, 1d)
- `AUTH-07` Mobile auth QA — iOS TestFlight (rapid-superapp, high, 1d)
- `AUTH-06` Mobile auth QA — Android (user/merchant/dispatch) (rapid-superapp, high, 1d)
- `NOT-01` Verify FCM push on all three Android flavors (rapid-superapp, high, 1d)
- `NOT-02` Validate Laravel Echo realtime on staging (rapid-superapp, medium, 0.75d)
- `RID-03` Rider location streaming reliability hardening (rapid-superapp, high, 1d)
- `DEP-01` Add CI workflows for API PHPUnit and Frontend build (rapid-superapp-api, high, 1d)
- `ANL-01` Ensure analytics/track events fire on core funnels (rapid-superapp, medium, 0.75d)

### Week 4
**Focus:** Compliance + production hardening + launch gates

- `AUTH-03` Enable production EMAIL_OTP_STRICT and PHONE_OTP_STRICT (rapid-superapp-api, critical, 0.25d)
- `AUTH-09` Write production auth hardening checklist (rapid-superapp-api, critical, 0.5d)
- `DEP-02` Production secrets rotation and bootstrap secret lockdown (rapid-superapp-api, critical, 0.5d)
- `DEP-03` Application monitoring and uptime checks (rapid-superapp-api, high, 0.75d)
- `ADM-09` Implement AuditLog write path and Admin audit API (rapid-superapp-api, high, 1d)
- `ADM-10` Wire Admin Audit Log page to API (rapid-superapp, high, 0.5d)
- `COM-01` KYC document review SLAs and rejection reason UX (rapid-superapp, high, 0.75d)
- `COM-02` Publish privacy policy and terms endpoints or static pages (rapid-superapp, high, 0.5d)
- `WAL-02` Add PHPUnit coverage for UserSecurityController (rapid-superapp-api, high, 1d)
- `PAY-01` Paystack webhook failure alerting (rapid-superapp-api, high, 0.75d)
- `MOB-04` Prepare Play Store listing assets for three Android apps (rapid-superapp, medium, 1d)

## Epics

### [Epic] Authentication (~90%)
- Column: Done
- Multi-persona auth (customer OTP, merchant password, rider OTP, admin). Source: codebase + ClickUp auth export (~90%). Remaining: admin 2FA strict, OTP rate limits, production strict flags, docs, E2E.

### [Epic] Customer App (~85%)
- Column: In Progress
- Discovery, cart, checkout, orders, tracking, profile. Core API-wired; polish mocks, payment methods, crypto deferred.

### [Epic] Merchant Portal (~80%)
- Column: In Progress
- Merchant auth, onboarding, catalog, orders, wallet, analytics. Strong API coverage; UI mock cleanup and QA remaining.

### [Epic] Delivery Rider (~75%)
- Column: In Progress
- Rider onboarding, deliveries, maps, earnings. Missing withdraw/payout API + FE wiring and admin live tracking.

### [Epic] Admin Portal (~45%)
- Column: In Progress
- Core admin (users/merchants/riders/orders/dashboard) live. Finance/support/disputes/audit/settings/analytics mostly mock UI — need backend + wiring.

### [Epic] Wallet (~85%)
- Column: In Progress
- User + merchant wallets via Paystack. Rider earnings read-only. Bills via VTpass. Gaps: rider cash-out, bill tests.

### [Epic] Payments (~88%)
- Column: In Progress
- Paystack checkout, webhook, VA funding, transfers. Crypto checkout is FE-simulated (Phase 2).

### [Epic] Marketplace & Restaurants (~80%)
- Column: In Progress
- Live merchants/products discovery & search. Legacy restaurant/menu tables unused. Referrals/promos read-only.

### [Epic] Notifications (~75%)
- Column: In Progress
- In-app notifications + FCM device tokens + push jobs. Admin notifications UI still mock; realtime Echo env-dependent.

### [Epic] Mobile Apps (~80%)
- Column: In Progress
- Android 3 flavors + iOS persona prep. Remaining: TestFlight, store QA, push on device.

### [Epic] Compliance (~25%)
- Column: Todo
- OTP strict prod, admin 2FA, KYC review flows, privacy/security docs, audit logging.

### [Epic] Deployment (~70%)
- Column: In Progress
- app.fastrapid.com + api.fastrapid.com live. Remaining: CI, monitoring, prod secrets hardening.

### [Epic] Analytics (~35%)
- Column: Todo
- Client track endpoint exists; admin analytics page is stub; merchant analytics live.

### [Epic] Testing & QA (~55%)
- Column: Todo
- ~185 backend feature tests; gaps in security/cart/bills/chat/admin orders. Cypress smoke-only for auth.

## Issues by column

### Backlog (2)

- **AUTH-05**: Expand Cypress full auth E2E coverage
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Production Launch
  - Labels: testing, frontend, authentication, medium
  - Depends on: AUTH-01
- **MKT-03**: Retire or migrate legacy restaurants/menu tables
  - Priority: low · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: database, marketplace, documentation, low
  - Depends on: EPIC-MARKET

### Todo (49)

- **AUTH-03**: Enable production EMAIL_OTP_STRICT and PHONE_OTP_STRICT
  - Priority: critical · Effort: 0.25d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: infrastructure, authentication, compliance, critical
  - Depends on: EPIC-AUTH
- **AUTH-09**: Write production auth hardening checklist
  - Priority: critical · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: documentation, compliance, authentication, critical
  - Depends on: AUTH-03, AUTH-01, AUTH-04
- **DEP-02**: Production secrets rotation and bootstrap secret lockdown
  - Priority: critical · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: infrastructure, compliance, authentication, critical
  - Depends on: AUTH-03
- **MOB-01**: Publish Customer iOS build to TestFlight
  - Priority: critical · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: iOS TestFlight
  - Labels: mobile, ios, customer, infrastructure, critical
  - Depends on: EPIC-MOBILE
- **MOB-02**: Publish Merchant iOS build to TestFlight
  - Priority: critical · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: iOS TestFlight
  - Labels: mobile, ios, merchant, infrastructure, critical
  - Depends on: EPIC-MOBILE
- **MOB-03**: Publish Rider iOS build to TestFlight
  - Priority: critical · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: iOS TestFlight
  - Labels: mobile, ios, rider, infrastructure, critical
  - Depends on: EPIC-MOBILE
- **RID-01**: Implement rider wallet withdraw API
  - Priority: critical · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, rider, wallet, payments, feature
  - Depends on: EPIC-WALLET
- **RID-02**: Wire rider Withdraw UI to withdraw API
  - Priority: critical · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, rider, wallet, feature, critical, cross-repo
  - Depends on: RID-01
- **ADM-01**: Admin platform transactions list/detail API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, admin, wallet, payments, feature
  - Depends on: EPIC-ADMIN
- **ADM-02**: Wire Admin Transactions pages to API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, admin, wallet, feature, high, cross-repo
  - Depends on: ADM-01
- **ADM-03**: Admin payouts queue API (approve/reject)
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, admin, payments, feature, high
  - Depends on: EPIC-ADMIN
- **ADM-04**: Wire Admin Payouts page to API
  - Priority: high · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, admin, payments, feature, high, cross-repo
  - Depends on: ADM-03
- **ADM-09**: Implement AuditLog write path and Admin audit API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: backend, api, admin, compliance, database, feature
  - Depends on: EPIC-COMPLY
- **ADM-10**: Wire Admin Audit Log page to API
  - Priority: high · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Compliance
  - Labels: frontend, admin, compliance, feature, high, cross-repo
  - Depends on: ADM-09
- **ADM-13**: Admin platform analytics API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, admin, analytics, feature, high
  - Depends on: EPIC-ANALYTICS
- **ADM-14**: Build Admin Analytics dashboard against API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, admin, analytics, feature, high, cross-repo
  - Depends on: ADM-13
- **ADM-18**: Feature tests for Admin Orders and Admin Riders
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: testing, backend, admin, rider, high
  - Depends on: EPIC-TEST
- **AUTH-02**: Implement Admin TOTP verify and password-reset APIs
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: backend, api, authentication, admin, feature, high
  - Depends on: EPIC-AUTH
- **AUTH-04**: Add rate limiting on auth OTP endpoints
  - Priority: high · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, authentication, high
  - Depends on: EPIC-AUTH
- **AUTH-07**: Mobile auth QA — iOS TestFlight
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: iOS TestFlight
  - Labels: testing, mobile, ios, authentication, high
  - Depends on: MOB-01, MOB-02, MOB-03
- **AUTH-08**: Document auth API endpoints (OpenAPI/Markdown)
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: documentation, api, authentication, high
  - Depends on: EPIC-AUTH
- **COM-01**: KYC document review SLAs and rejection reason UX
  - Priority: high · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Compliance
  - Labels: frontend, admin, compliance, merchant, rider, enhancement
  - Depends on: ADM-09
- **COM-02**: Publish privacy policy and terms endpoints or static pages
  - Priority: high · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Compliance
  - Labels: compliance, documentation, frontend, high
  - Depends on: EPIC-COMPLY
- **CUS-04**: Harden cart update with pricing and stock validation
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, customer, marketplace, feature, high
  - Depends on: EPIC-CUSTOMER
- **CUS-06**: Replace simulated CryptoCheckout with real provider or hide for MVP
  - Priority: high · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, payments, customer, feature, high
  - Depends on: EPIC-PAYMENTS
- **DEP-01**: Add CI workflows for API PHPUnit and Frontend build
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: infrastructure, testing, high
  - Depends on: EPIC-DEPLOY
- **DEP-03**: Application monitoring and uptime checks
  - Priority: high · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Production Launch
  - Labels: infrastructure, high
  - Depends on: EPIC-DEPLOY
- **EPIC-ANALYTICS**: [Epic] Analytics
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-COMPLY**: [Epic] Compliance
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-TEST**: [Epic] Testing & QA
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **MER-03**: Merchant wallet withdraw production smoke test
  - Priority: high · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: testing, merchant, wallet, payments, high
  - Depends on: EPIC-WALLET
- **NOT-01**: Verify FCM push on all three Android flavors
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: testing, mobile, android, notifications, high
  - Depends on: EPIC-NOTIF
- **PAY-01**: Paystack webhook failure alerting
  - Priority: high · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Production Launch
  - Labels: backend, payments, infrastructure, enhancement, high
  - Depends on: EPIC-PAYMENTS
- **RID-03**: Rider location streaming reliability hardening
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, mobile, rider, enhancement, high
  - Depends on: EPIC-RIDER
- **RID-04**: Admin live rider tracking API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, api, admin, rider, feature, high
  - Depends on: EPIC-ADMIN
- **RID-05**: Wire Admin Rider Tracking page to live location API
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, admin, rider, feature, high, cross-repo
  - Depends on: RID-04
- **WAL-01**: Add PHPUnit coverage for VTpass bill payments
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: testing, backend, wallet, payments, high
  - Depends on: EPIC-WALLET
- **WAL-02**: Add PHPUnit coverage for UserSecurityController
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Compliance
  - Labels: testing, backend, authentication, high
  - Depends on: EPIC-AUTH
- **ADM-17**: Complete Admin Merchant Detail remaining tabs
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, admin, merchant, enhancement, medium
  - Depends on: EPIC-ADMIN
- **ANL-01**: Ensure analytics/track events fire on core funnels
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, analytics, customer, enhancement, medium
  - Depends on: EPIC-ANALYTICS
- **CUS-01**: Wire Payment Methods page to backend payment sources API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Phase 2
  - Labels: frontend, customer, payments, feature, medium, cross-repo
  - Depends on: CUS-02
- **CUS-05**: Fix VendorDetail unimplemented mockup tabs
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, customer, marketplace, bug, medium
  - Depends on: EPIC-CUSTOMER
- **MER-01**: Replace merchant inventory mock constants with API-only data
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, merchant, enhancement, medium
  - Depends on: EPIC-MERCHANT
- **MER-02**: Merchant product CSV import E2E QA
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: testing, merchant, frontend, medium
  - Depends on: EPIC-MERCHANT
- **MOB-04**: Prepare Play Store listing assets for three Android apps
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Production Launch
  - Labels: mobile, android, documentation, medium
  - Depends on: EPIC-MOBILE
- **NOT-02**: Validate Laravel Echo realtime on staging
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, backend, notifications, medium, cross-repo
  - Depends on: EPIC-NOTIF
- **TST-01**: Cart API feature tests
  - Priority: medium · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: testing, backend, customer, medium
  - Depends on: CUS-04
- **WAL-03**: Add Delivery Chat feature tests
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: testing, backend, medium
  - Depends on: EPIC-TEST
- **CUS-03**: Remove leftover mock data from Customer Home and CartDetail
  - Priority: low · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, customer, enhancement, low
  - Depends on: EPIC-CUSTOMER

### In Progress (12)

- **AUTH-01**: Wire admin TOTP 2FA in strict mode
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Compliance
  - Labels: frontend, backend, authentication, admin, bug, high
  - Depends on: AUTH-02
- **AUTH-06**: Mobile auth QA — Android (user/merchant/dispatch)
  - Priority: high · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: testing, mobile, android, authentication, high
  - Depends on: EPIC-MOBILE
- **EPIC-ADMIN**: [Epic] Admin Portal
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-CUSTOMER**: [Epic] Customer App
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-DEPLOY**: [Epic] Deployment
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-MARKET**: [Epic] Marketplace & Restaurants
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-MERCHANT**: [Epic] Merchant Portal
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-MOBILE**: [Epic] Mobile Apps
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-NOTIF**: [Epic] Notifications
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-PAYMENTS**: [Epic] Payments
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-RIDER**: [Epic] Delivery Rider
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: epic, high
- **EPIC-WALLET**: [Epic] Wallet
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high

### Testing (0)


### Review (0)


### Done (19)

- **EPIC-AUTH**: [Epic] Authentication
  - Priority: high · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: epic, high
- **DONE-01**: [Done] Customer email/phone OTP auth + Sanctum
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, authentication, customer, feature, low
  - Depends on: EPIC-AUTH
- **DONE-02**: [Done] Merchant registration, login, password reset APIs
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, authentication, merchant, feature, low
  - Depends on: EPIC-AUTH
- **DONE-03**: [Done] Rider auth/register and document upload APIs
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, authentication, rider, feature, low
  - Depends on: EPIC-AUTH
- **DONE-04**: [Done] Admin login + EnsureAdminRole middleware
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, authentication, admin, feature, low
  - Depends on: EPIC-AUTH
- **DONE-05**: [Done] Customer onboarding and auth UI
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, authentication, customer, feature, low
  - Depends on: EPIC-AUTH
- **DONE-06**: [Done] Merchant and Dispatch onboarding UI
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, authentication, merchant, rider, feature, low
  - Depends on: EPIC-AUTH
- **DONE-07**: [Done] User wallet fund/send/VA/bills APIs
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, wallet, payments, feature, low
  - Depends on: EPIC-WALLET
- **DONE-08**: [Done] Merchant wallet withdraw/send APIs
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, wallet, merchant, feature, low
  - Depends on: EPIC-WALLET
- **DONE-09**: [Done] Orders checkout + Paystack initialize + webhook
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, payments, customer, feature, low
  - Depends on: EPIC-PAYMENTS
- **DONE-10**: [Done] Discovery/search against live merchants/products
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, marketplace, api, feature, low
  - Depends on: EPIC-MARKET
- **DONE-11**: [Done] Merchant products/orders/analytics APIs + UI
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, merchant, feature, feature, low
  - Depends on: EPIC-MERCHANT
- **DONE-12**: [Done] Rider deliveries accept/status/chat + maps home
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, rider, feature, feature, low
  - Depends on: EPIC-RIDER
- **DONE-13**: [Done] Admin dashboard users/merchants/riders/orders live APIs
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, admin, api, feature, low
  - Depends on: EPIC-ADMIN
- **DONE-14**: [Done] FCM device tokens + SendPushNotificationJob
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, notifications, feature, low
  - Depends on: EPIC-NOTIF
- **DONE-15**: [Done] Android three-flavor Capacitor packaging
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, mobile, android, feature, low
  - Depends on: EPIC-MOBILE
- **DONE-16**: [Done] Customer wallet/orders/discovery UI wired to API
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, customer, wallet, feature, low
  - Depends on: EPIC-CUSTOMER
- **DONE-17**: [Done] Resend + Twilio OTP integrations
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: MVP Launch
  - Labels: backend, authentication, feature, low
  - Depends on: EPIC-AUTH
- **DONE-18**: [Done] Capacitor biometric app lock
  - Priority: low · Effort: 0d · Repo: `headmaster2hm/rapid-superapp` · Milestone: MVP Launch
  - Labels: frontend, mobile, authentication, feature, low
  - Depends on: EPIC-AUTH

### Phase 2 (11)

- **ADM-05**: Admin disputes schema and API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, admin, database, feature, medium
  - Depends on: EPIC-ADMIN
- **ADM-06**: Wire Admin Disputes pages to API
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Phase 2
  - Labels: frontend, admin, feature, medium, cross-repo
  - Depends on: ADM-05
- **ADM-07**: Admin support tickets API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, admin, feature, medium
  - Depends on: EPIC-ADMIN
- **ADM-08**: Wire Admin Support pages to API
  - Priority: medium · Effort: 0.75d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Phase 2
  - Labels: frontend, admin, feature, medium, cross-repo
  - Depends on: ADM-07
- **ADM-11**: Admin notifications API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, admin, notifications, feature, medium
  - Depends on: EPIC-NOTIF
- **ADM-12**: Wire Admin Notifications page to API
  - Priority: medium · Effort: 0.5d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Phase 2
  - Labels: frontend, admin, notifications, feature, medium, cross-repo
  - Depends on: ADM-11
- **ADM-15**: Admin settings CRUD API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, admin, database, feature, medium
  - Depends on: EPIC-ADMIN
- **ADM-16**: Wire Admin Settings screens to settings API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp` · Milestone: Phase 2
  - Labels: frontend, admin, feature, medium, cross-repo
  - Depends on: ADM-15
- **CUS-02**: Implement user payment methods API
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, payments, customer, feature, medium
  - Depends on: EPIC-PAYMENTS
- **MKT-01**: Implement referral reward completion pipeline
  - Priority: medium · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, customer, marketplace, feature, medium
  - Depends on: EPIC-MARKET
- **MKT-02**: Admin CRUD for Promotions and FAQs
  - Priority: low · Effort: 1d · Repo: `headmaster2hm/rapid-superapp-api` · Milestone: Phase 2
  - Labels: backend, api, admin, marketplace, feature, low
  - Depends on: EPIC-MARKET

## Dependencies (selected)

```
Wallet Dashboard (FE) → Wallet API (BE) → Authentication
Rider Withdraw UI → RID-01 Rider withdraw API → Paystack + Auth
Admin Transactions UI → ADM-01 Transactions API → Wallet/Payments data
Admin Payouts UI → ADM-03 Payouts API → Merchant/Rider wallet
Admin Rider Tracking → RID-04 Location API → Rider location pings
Admin Analytics UI → ADM-13 Analytics API → Orders/Users aggregates
Admin 2FA UI → AUTH-02 Admin TOTP API → User security TOTP
iOS Auth QA → MOB-01/02/03 TestFlight → Capacitor builds
```

## How to create on GitHub

```bash
export GITHUB_TOKEN=ghp_xxx
export GITHUB_OWNER=headmaster2hm
cd docs/github-project/scripts
./setup-github.sh --dry-run
./setup-github.sh
```

Catalog JSON: `data/rapid-superapp-project-catalog.json`