import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LEGAL_PRIVACY_URL, LEGAL_TERMS_URL } from '../../../services/data/legalPaths'

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    href: LEGAL_PRIVACY_URL,
    summary: 'How FastRapid collects, uses, and protects personal data.',
  },
  terms: {
    title: 'Terms of Service',
    href: LEGAL_TERMS_URL,
    summary: 'Rules for using FastRapid as a customer, merchant, or rider.',
  },
}

export default function LegalHub() {
  const navigate = useNavigate()
  const { doc } = useParams()
  const selected = DOCS[doc]

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-16">
      <div className="mx-auto max-w-lg px-5 pt-app">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {selected ? selected.title : 'Legal'}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {selected
            ? selected.summary
            : 'Official FastRapid policies for privacy and platform use.'}
        </p>

        {selected ? (
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-xl bg-rapid-orange px-5 py-3 text-sm font-bold text-white"
          >
            Open full {selected.title}
          </a>
        ) : (
          <ul className="mt-6 space-y-3">
            {Object.entries(DOCS).map(([id, item]) => (
              <li key={id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <p className="font-bold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
