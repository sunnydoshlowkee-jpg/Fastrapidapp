const BUSINESS_TYPES = ['Restaurant', 'Retail', 'Grocery', 'Pharmacy', 'Other']

export function validateMerchantRegistration(values, options = {}) {
  const { isUpdate = false } = options
  const errors = {}

  if (!values.legalName?.trim()) {
    errors.legalName = 'Legal business name is required.'
  }

  if (!values.businessType?.trim()) {
    errors.businessType = 'Please select a business type.'
  } else if (!BUSINESS_TYPES.includes(values.businessType)) {
    errors.businessType = 'Please select a valid business type.'
  }

  const email = values.businessEmail?.trim()
  if (!email) {
    errors.businessEmail = 'Business email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.businessEmail = 'Enter a valid business email address.'
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required.'
  }

  const hasStreet = Boolean(values.addressStreet?.trim())
  const hasSingleAddress = Boolean(values.address?.trim())

  if (!hasSingleAddress && !hasStreet) {
    errors.address = 'Registered address is required.'
    errors.addressStreet = 'Registered address is required.'
  }

  if (!values.repName?.trim()) {
    errors.repName = 'Representative full name is required.'
  }

  if (!values.repRole?.trim()) {
    errors.repRole = 'Representative role is required.'
  }

  if (!values.repPhone?.trim()) {
    errors.repPhone = 'Representative phone is required.'
  }

  const hasPassword = Boolean(values.password?.trim())
  const hasConfirm = Boolean(values.confirmPassword?.trim())

  if (!isUpdate || hasPassword || hasConfirm) {
    if (!isUpdate && !values.password) {
      errors.password = 'Password is required.'
    } else if (hasPassword && values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.'
    }

    if (!isUpdate && !values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.'
    } else if ((hasPassword || hasConfirm) && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }
  }

  return errors
}

export function buildMerchantRegistrationPayload(values) {
  const payload = {
    legal_name: values.legalName?.trim(),
    business_type: values.businessType?.trim(),
    business_email: values.businessEmail?.trim(),
    phone: values.phone?.trim(),
    description: values.description?.trim() || '',
    rep_name: values.repName?.trim(),
    rep_role: values.repRole?.trim(),
    rep_phone: values.repPhone?.trim(),
    password: values.password,
    confirm_password: values.confirmPassword,
  }

  if (values.addressStreet?.trim()) {
    payload.address_street = values.addressStreet.trim()
    payload.address_city = values.addressCity?.trim() || ''
    payload.address_zip = values.addressZip?.trim() || ''
  } else {
    payload.address = values.address?.trim()
  }

  return payload
}

export function buildMerchantRegistrationFormData(values, logoFile) {
  const formData = new FormData()
  const payload = buildMerchantRegistrationPayload(values)

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value)
    }
  })

  if (logoFile) {
    formData.append('logo', logoFile)
  }

  if (!payload.password) {
    formData.delete('password')
    formData.delete('confirm_password')
  }

  return formData
}
