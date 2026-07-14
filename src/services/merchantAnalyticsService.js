import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'

export const MERCHANT_ANALYTICS_PERIODS = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: 'custom', label: 'Custom' },
]

function mapChart(chart = []) {
  return chart.map((item) => ({
    label: item.label,
    value: Number(item.value) || 0,
    peak: Boolean(item.peak),
  }))
}

function mapQuickStats(stats = []) {
  return stats.map((stat) => ({
    id: stat.id,
    label: stat.label,
    value: stat.value,
    change: stat.change,
    positive: Boolean(stat.positive),
  }))
}

function mapTopPerformers(products = []) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    image: resolveStorageUrl(product.image) || product.image,
    status: product.status,
    unitsSold: product.units_sold ?? product.unitsSold ?? 0,
    revenue: product.revenue,
  }))
}

function mapFeedback(feedback = {}) {
  return {
    rating: feedback.rating ?? '—',
    reviewCount: feedback.review_count ?? feedback.reviewCount ?? '0',
    reviews: (feedback.reviews ?? []).map((review) => ({
      id: review.id,
      name: review.name,
      timeAgo: review.time_ago ?? review.timeAgo,
      stars: review.stars,
      orderLabel: review.order_label ?? review.orderLabel,
      text: review.text,
    })),
  }
}

function mapCustomerInsights(insights = {}) {
  return {
    returnRate: Number(insights.return_rate ?? insights.returnRate) || 0,
    segments: (insights.segments ?? []).map((segment) => ({
      id: segment.id,
      label: segment.label,
      count: segment.count,
      color: segment.color,
    })),
    avgSpend: insights.avg_spend ?? insights.avgSpend ?? '₦0.00',
  }
}

function mapMobileCustomerInsights(insights = {}) {
  return {
    totalUsers: Number(insights.total_users ?? insights.totalUsers) || 0,
    segments: (insights.segments ?? []).map((segment) => ({
      id: segment.id,
      label: segment.label,
      percent: Number(segment.percent) || 0,
      count: Number(segment.count) || 0,
      color: segment.color,
    })),
    avgSpend: insights.avg_spend ?? insights.avgSpend ?? '₦0.00',
  }
}

function mapAnalyticsFromApi(data = {}) {
  const mobile = data.mobile ?? {}

  return {
    period: data.period ?? 'today',
    dateFilterLabel: data.date_filter_label ?? data.dateFilterLabel ?? 'Today',
    revenue: {
      total: data.revenue?.total ?? '₦0.00',
      change: data.revenue?.change ?? '0%',
      changePositive: Boolean(data.revenue?.change_positive ?? data.revenue?.changePositive),
      chart: mapChart(data.revenue?.chart),
    },
    quickStats: mapQuickStats(data.quick_stats ?? data.quickStats),
    peakHours: {
      chart: mapChart(data.peak_hours?.chart ?? data.peakHours?.chart),
      insight: data.peak_hours?.insight ?? data.peakHours?.insight ?? '',
    },
    customerInsights: mapCustomerInsights(data.customer_insights ?? data.customerInsights),
    topPerformers: mapTopPerformers(data.top_performers ?? data.topPerformers),
    feedback: mapFeedback(data.feedback),
    mobile: {
      revenue: {
        highlightDay: mobile.revenue?.highlight_day ?? mobile.revenue?.highlightDay ?? null,
        changePill: Boolean(mobile.revenue?.change_pill ?? mobile.revenue?.changePill),
      },
      quickStats: mapQuickStats(mobile.quick_stats ?? mobile.quickStats ?? data.quick_stats),
      peakHours: {
        chart: mapChart(mobile.peak_hours?.chart ?? mobile.peakHours?.chart),
        insight: mobile.peak_hours?.insight ?? mobile.peakHours?.insight ?? data.peak_hours?.insight ?? '',
      },
      customerInsights: mapMobileCustomerInsights(mobile.customer_insights ?? mobile.customerInsights),
      topPerformers: mapTopPerformers(mobile.top_performers ?? mobile.topPerformers).map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        status: product.status,
      })),
      feedback: mapFeedback(mobile.feedback ?? data.feedback),
    },
  }
}

export async function getMerchantAnalytics({ period = 'today', from, to } = {}) {
  try {
    const { data } = await api.get('/merchant/analytics', {
      params: {
        period,
        from,
        to,
      },
    })

    return mapAnalyticsFromApi(data?.data ?? {})
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load analytics.')
  }
}
