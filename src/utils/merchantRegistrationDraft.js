const DEFAULT_BUSINESS_TYPE = 'Restaurant'

/**
 * Maps API user + merchant payload to registration form field keys.
 * @param {object|null} user
 * @returns {{ values: object, logoUrl: string|null }|null}
 */
export function mapUserToRegistrationDraft(user) {
  if (!user?.merchant) {
    return null
  }

  const merchant = user.merchant

  const values = {
    legalName: merchant.business_name ?? '',
    businessType: merchant.business_type ?? DEFAULT_BUSINESS_TYPE,
    storeFormat: merchant.store_format ?? '',
    businessEmail: user.email ?? '',
    phone: user.phone ?? '',
    address: merchant.registered_address ?? '',
    addressStreet: merchant.registered_address ?? '',
    addressCity: merchant.address_city ?? '',
    addressZip: merchant.address_zip ?? '',
    description: merchant.description ?? '',
    repName: merchant.representative_name ?? user.full_name ?? '',
    repRole: merchant.representative_role ?? '',
    repPhone: merchant.representative_phone ?? '',
    password: '',
    confirmPassword: '',
  }

  return {
    values,
    logoUrl: merchant.logo_url ?? null,
  }
}
