import { useState } from 'react'
import type { OrderData } from '@/types'

interface Props {
  data: OrderData
  onBack: () => void
  onSend: () => void
}

export default function ScreenConfirmation({ data, onBack, onSend }: Props) {
  const [sending, setSending] = useState(false)

  function handleSend() {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      onSend()
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-5 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-600 flex-shrink-0" />
        <span className="font-black text-white text-lg tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>ChefLine</span>
        <span className="ml-auto text-xs text-stone-500">Vérification</span>
      </div>

      <div className="flex-1 flex flex-col px-6 py-5 gap-3 overflow-y-auto">
        <h2 className="font-black text-stone-900 text-base" style={{ fontFamily: 'Syne, sans-serif' }}>Confirmer la commande</h2>

        {/* Transcription */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Transcription audio</p>
          <p className="text-sm text-stone-500 italic leading-relaxed bg-stone-50 rounded-xl p-3">
            {data.transcription || '(vide)'}
          </p>
        </div>

        {/* Client + Type */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Client</p>
            <p className="font-medium text-stone-900">{data.client || '—'}</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Type</p>
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
              data.type === 'Livraison'
                ? 'bg-orange-600 text-white'
                : 'bg-stone-900 text-white'
            }`}>
              {data.type || '—'}
            </span>
          </div>
        </div>

        {/* Adresse (livraison only) */}
        {data.adresse && (
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Adresse</p>
            <p className="font-medium text-stone-900">{data.adresse}</p>
          </div>
        )}

        {/* Heure + Total */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Heure</p>
            <p className="font-medium text-stone-900">{data.heure_souhaitee || '—'}</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Total</p>
            <p className="font-black text-orange-600 text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              {data.total ? `${data.total} €` : '—'}
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Articles</p>
          {data.items && data.items.length > 0 ? (
            data.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-stone-100 last:border-0 text-sm">
                <span className="text-stone-900">{item.quantite}x {item.nom}</span>
                <span className="text-stone-400">{item.prix_unitaire || ''}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-400">Articles non parsés</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 border border-stone-200 rounded-2xl text-stone-400 text-sm hover:border-stone-400 hover:text-stone-700 transition-all"
          >
            Recommencer
          </button>
          <button
            onClick={handleSend}
            className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-black tracking-widest hover:bg-orange-700 active:scale-95 transition-all"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ENVOYER
          </button>
        </div>
      </div>

      {/* Sending overlay */}
      {sending && (
        <div className="absolute inset-0 bg-stone-900/75 flex flex-col items-center justify-center gap-4 rounded-none">
          <div className="w-12 h-12 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin" />
          <p className="font-black text-white text-base" style={{ fontFamily: 'Syne, sans-serif' }}>Envoi en cours…</p>
        </div>
      )}
    </div>
  )
}
