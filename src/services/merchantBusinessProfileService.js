import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { BUSINESS_TYPES, STORE_FORMATS, allowsStoreFormat, storeFormatLabel } from '../utils/merchantBusinessType'

function mapStoreFormatOptions(options) {
  if (Array.isArray(options) && options.length > 0) {
    return options.map((option) =>
      typeof option === 'string'
        ? { value: option, label: storeFormatLabel(option) || option }
        : {
            value: option.value,
            label: option.label ?? storeFormatLabel(option.value) ?? option.value,
          },
    )
  }

  return STORE_FORMATS
}

function mapBusinessInfo(info = {}) {
  const businessType = info.business_type ?? ''
  const storeFormat = info.store_format ?? ''
  const typeOptions =
    Array.isArray(info.business_type_options) && info.business_type_options.length > 0
      ? info.business_type_options
      : BUSINESS_TYPES

  return {
    name: info.name ?? '',
    verified: Boolean(info.verified),
    verifiedLabel: info.verified_label ?? 'Verified',
    description: info.description ?? '',
    email: info.email ?? '',
    phone: info.phone ?? '',
    location: info.location ?? '',
    logoUrl: info.logo_url ?? null,
    businessType,
    storeFormat,
    storeFormatLabel: info.store_format_label ?? storeFormatLabel(storeFormat),
    categoryLabel:
      info.category_label ||
      (businessType
        ? storeFormatLabel(storeFormat)
          ? `${businessType} · ${storeFormatLabel(storeFormat)}`
          : businessType
        : 'Not set'),
    allowsStoreFormat:
      typeof info.allows_store_format === 'boolean'
        ? info.allows_store_format
        : allowsStoreFormat(businessType),
    businessTypeOptions: typeOptions,
    storeFormatOptions: mapStoreFormatOptions(info.store_format_options),
  }
}

function mapStoreStatus(status = {}) {
  return {
    title: status.title ?? 'Store Status',
    description: status.description ?? '',
    pauseLabel: status.pause_label ?? 'Pause Store',
    paused: Boolean(status.paused),
  }
}

function mapDocumentItem(item = {}) {
  return {
    id: item.id,
    name: item.name,
    meta: item.meta ?? 'Not uploaded yet',
    status: item.status ?? null,
    iconTone: item.icon_tone ?? 'muted',
    icon: item.icon ?? 'file',
    reuploadLabel: item.reupload_label ?? null,
  }
}

function mapDocuments(documents = {}) {
  return {
    title: documents.title ?? 'Document Management',
    description: documents.description ?? '',
    uploadLabel: documents.upload_label ?? 'Upload New',
    items: (documents.items ?? []).map(mapDocumentItem),
  }
}

function mapProfileFromApi(data) {
  const mobile = data.mobile ?? {}

  return {
    pageTitle: data.page_title ?? 'Business Profile',
    merchantId: data.merchant_id,
    businessInfo: mapBusinessInfo(data.business_info),
    storeStatus: mapStoreStatus(data.store_status),
    documents: mapDocuments(data.documents),
    mobile: {
      merchantId: mobile.merchant_id ?? String(data.merchant_id ?? ''),
      subtitle: mobile.subtitle ?? 'Manage your store details and verification documents.',
      businessInfo: mapBusinessInfo(mobile.business_info ?? data.business_info),
      storeStatus: mapStoreStatus(mobile.store_status ?? data.store_status),
      documents: mapDocuments(mobile.documents ?? data.documents),
      location: {
        title: mobile.location?.title ?? 'Location Details',
        address: mobile.location?.address ?? data.business_info?.location ?? '',
      },
    },
  }
}

export async function getMerchantBusinessProfile() {
  try {
    const { data } = await api.get('/merchant/business-profile')
    return mapProfileFromApi(data?.data ?? {})
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function updateMerchantBusinessCategory({ businessType, storeFormat }) {
  try {
    const { data } = await api.put('/merchant/business-profile/category', {
      business_type: businessType,
      store_format: allowsStoreFormat(businessType) ? storeFormat || null : null,
    })
    return mapProfileFromApi(data?.data ?? {})
  } catch (err) {
    const apiErrors = err.response?.data?.errors ?? {}
    const fieldErrors = {}
    if (apiErrors.business_type?.[0]) fieldErrors.businessType = apiErrors.business_type[0]
    if (apiErrors.store_format?.[0]) fieldErrors.storeFormat = apiErrors.store_format[0]

    const error = new Error(getApiFieldError(err, 'form') || 'Unable to update business category.')
    if (Object.keys(fieldErrors).length > 0) {
      error.fieldErrors = fieldErrors
    }
    throw error
  }
}

export async function uploadMerchantBusinessLogo(file) {
  try {
    const formData = new FormData()
    formData.append('logo', file)

    const { data } = await api.post('/merchant/business-profile/logo', formData)
    return mapProfileFromApi(data?.data ?? {})
  } catch (err) {
    throw err
  }
}
