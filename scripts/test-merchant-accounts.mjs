/**
 * Lightweight smoke test for merchant multi-account store (Node, no vitest).
 * Run: node --input-type=module < scripts/test-merchant-accounts.mjs
 * or:  node scripts/test-merchant-accounts.mjs
 */
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storePath = pathToFileURL(
  path.join(__dirname, '../src/services/merchantAccountStore.js'),
).href

const memory = new Map()
globalThis.localStorage = {
  getItem: (key) => (memory.has(key) ? memory.get(key) : null),
  setItem: (key, value) => memory.set(key, String(value)),
  removeItem: (key) => memory.delete(key),
  clear: () => memory.clear(),
}

const store = await import(storePath)

store.storeMerchantSession({
  token: 'token-a',
  user: { id: 1, email: 'a@test.com', merchant: { business_name: 'Shop A' } },
})
store.storeMerchantSession({
  token: 'token-b',
  user: { id: 2, email: 'b@test.com', merchant: { business_name: 'Shop B' } },
})

assert.equal(store.listMerchantAccounts().length, 2)
assert.equal(store.getStoredMerchantSession()?.user?.id, 2)
assert.equal(store.getMerchantAccountLabel(store.getStoredMerchantSession().user), 'Shop B')

const switched = store.switchMerchantAccount(1)
assert.equal(switched.user.id, 1)
assert.equal(store.getStoredMerchantSession()?.token, 'token-a')

store.removeMerchantAccount(1)
const next = store.activateNextMerchantAccount()
assert.equal(next?.user?.id, 2)

store.clearAllMerchantAccounts()
assert.equal(store.listMerchantAccounts().length, 0)
assert.equal(store.getStoredMerchantSession(), null)

// Hydrate from legacy active-only session
store.clearAllMerchantAccounts()
memory.set('rapid_merchant_token', 'legacy')
memory.set(
  'rapid_merchant_user',
  JSON.stringify({ id: 9, email: 'legacy@test.com', merchant: { business_name: 'Legacy' } }),
)
store.ensureMerchantAccountsHydrated()
assert.equal(store.listMerchantAccounts().length, 1)
assert.equal(store.listMerchantAccounts()[0].user.id, 9)

console.log('merchantAccountStore OK')
