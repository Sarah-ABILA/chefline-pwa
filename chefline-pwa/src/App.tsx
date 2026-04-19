import { useState } from 'react'
import ScreenAccueil from '@/screens/ScreenAccueil'
import ScreenEcoute from '@/screens/ScreenEcoute'
import ScreenConfirmation from '@/screens/ScreenConfirmation'
import ScreenSucces from '@/screens/ScreenSucces'
import type { OrderData } from '@/types'

export type Screen = 'accueil' | 'ecoute' | 'confirmation' | 'succes'

export default function App() {
  const [screen, setScreen] = useState<Screen>('accueil')
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const goTo = (s: Screen) => setScreen(s)

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="w-full max-w-sm min-h-screen bg-stone-50 relative overflow-hidden flex flex-col shadow-xl">
        {screen === 'accueil' && <ScreenAccueil onStart={() => goTo('ecoute')} />}
        {screen === 'ecoute' && (
          <ScreenEcoute
            onBack={() => goTo('accueil')}
            onDone={(data) => { setOrderData(data); goTo('confirmation') }}
          />
        )}
        {screen === 'confirmation' && orderData && (
          <ScreenConfirmation
            data={orderData}
            onBack={() => goTo('ecoute')}
            onSend={() => goTo('succes')}
          />
        )}
        {screen === 'succes' && orderData && (
          <ScreenSucces data={orderData} onNew={() => { setOrderData(null); goTo('accueil') }} />
        )}
      </div>
    </div>
  )
}
