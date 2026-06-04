import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

function mapBusinessInfo(info = {}) {
  return {
    name: info.name ?? '',
    verified: Boolean(info.verified),
    verifiedLabel: info.verified_label ?? 'Verified',
    description: info.description ?? '',
    email: info.email ?? '',
    phone: info.phone ?? '',
    location: info.location ?? '',
    logoUrl: info.logo_url ?? null,
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
