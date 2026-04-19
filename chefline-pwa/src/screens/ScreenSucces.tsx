import type { OrderData } from '@/types'

interface Props {
  data: OrderData
  onNew: () => void
}

export default function ScreenSucces({ data, onNew }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-5 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-600 flex-shrink-0" />
        <span className="font-black text-white text-lg tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>ChefLine</span>
        <span className="ml-auto text-xs text-stone-500">Dan San · Hyères</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
        {/* Check */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl animate-bounce">
          ✓
        </div>

        <div>
          <h2 className="text-3xl font-black text-stone-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            Commande<br />enregistrée !
          </h2>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            Sauvegardée dans Airtable avec succès.
          </p>
        </div>

        {/* Récap */}
        <div className="w-full bg-white rounded-2xl border border-stone-200 p-5 text-left flex flex-col gap-2">
          {[
            ['Client', data.client],
            ['Type', data.type],
            ['Heure', data.heure_souhaitee],
            ['Total', data.total ? `${data.total} €` : undefined],
          ].map(([key, val]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-stone-400">{key}</span>
              <span className="text-stone-900 font-medium">{val || '—'}</span>
            </div>
          ))}
        </div>

        {/* Imprimante */}
        <div className="w-full bg-green-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-green-700 font-medium">Ticket envoyé à l'imprimante Epson</p>
        </div>

        <button
          onClick={onNew}
          className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest hover:bg-orange-700 active:scale-95 transition-all"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          NOUVELLE COMMANDE
        </button>
      </div>
    </div>
  )
}
