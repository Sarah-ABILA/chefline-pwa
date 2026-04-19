interface Props { onStart: () => void }

export default function ScreenAccueil({ onStart }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-5 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-600 flex-shrink-0" />
        <span className="font-black text-white text-lg tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>ChefLine</span>
        <span className="ml-auto text-xs text-stone-500">Dan San · Hyères</span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-10">
        <h1 className="text-4xl font-black text-stone-900 text-center leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          Prêt à<br /><span className="text-orange-600">prendre</span><br />la commande ?
        </h1>

        <div className="w-full bg-white rounded-2xl border border-stone-200 p-5 text-sm text-stone-500 leading-relaxed text-center">
          <span className="text-stone-800 font-medium">Comment ça marche :</span>
          <br />
          Appuyez sur Démarrer, dictez la commande à voix haute, puis appuyez sur Stop.
          <br /><br />
          L'IA détecte automatiquement <span className="text-stone-800 font-medium">emporter</span> ou <span className="text-stone-800 font-medium">livraison</span>.
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest hover:bg-orange-700 active:scale-95 transition-all"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            DÉMARRER
          </button>
          <p className="text-center text-xs text-stone-400">Le micro s'active dès que vous appuyez</p>
        </div>
      </div>
    </div>
  )
}
