import { useState, useRef, useEffect } from 'react'
import type { OrderData } from '@/types'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'VOTRE_URL_WEBHOOK_ICI'

interface Props {
  onBack: () => void
  onDone: (data: OrderData) => void
}

type State = 'idle' | 'recording' | 'processing'

export default function ScreenEcoute({ onBack, onDone }: Props) {
  const [state, setState] = useState<State>('idle')
  const [seconds, setSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => { clearInterval(timerRef.current!) }
  }, [])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  async function startRecord() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const mr = new MediaRecorder(stream)
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = handleStop
      mr.start()
      mediaRecorderRef.current = mr
      setState('recording')
      setSeconds(0)
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } catch {
      alert('Microphone non accessible. Vérifiez les permissions.')
    }
  }

  function stopRecord() {
    clearInterval(timerRef.current!)
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop())
    setState('processing')
  }

  async function handleStop() {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    const formData = new FormData()
    formData.append('audio', blob, 'commande.webm')
    try {
      const res = await fetch(WEBHOOK_URL, { method: 'POST', body: formData })
      const data: OrderData = await res.json()
      onDone(data)
    } catch {
      alert('Erreur connexion webhook. Vérifiez que n8n tourne et l\'URL ngrok.')
      setState('idle')
      setSeconds(0)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-5 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-600 flex-shrink-0" />
        <span className="font-black text-white text-lg tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>ChefLine</span>
        <span className="ml-auto text-xs text-stone-500">Enregistrement</span>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5">
        {/* Record zone */}
        <div className="w-full bg-white rounded-2xl border border-stone-200 p-8 flex flex-col items-center gap-4">
          {/* Mic */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${
            state === 'recording'
              ? 'bg-orange-600 animate-pulse'
              : state === 'processing'
              ? 'bg-stone-200'
              : 'bg-orange-50'
          }`}>
            {state === 'processing' ? '⏳' : '🎙'}
          </div>

          {/* Timer */}
          <div className="text-5xl font-black text-orange-600" style={{ fontFamily: 'Syne, sans-serif' }}>
            {formatTime(seconds)}
          </div>

          {/* Status */}
          <div className="font-bold text-stone-900 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            {state === 'idle' && 'Appuyez sur DÉMARRER'}
            {state === 'recording' && 'Enregistrement en cours…'}
            {state === 'processing' && 'Traitement en cours…'}
          </div>

          <p className="text-xs text-stone-400 text-center leading-relaxed">
            {state === 'idle' && 'Ex : "Sophie, 3 makis saumon, livraison 12 rue de la Paix, 19h30"'}
            {state === 'recording' && 'Parlez clairement, puis appuyez sur STOP'}
            {state === 'processing' && 'Transcription et analyse par l\'IA…'}
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3 mt-2">
          <button
            onClick={startRecord}
            disabled={state !== 'idle'}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-700 active:scale-95 transition-all"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ▶ DÉMARRER
          </button>

          <button
            onClick={stopRecord}
            disabled={state !== 'recording'}
            className={`w-full py-5 rounded-2xl font-black text-lg tracking-widest transition-all ${
              state === 'recording'
                ? 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95 animate-pulse'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-40'
            }`}
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ⬛ STOP — ENVOYER
          </button>

          <button
            onClick={onBack}
            disabled={state === 'processing'}
            className="w-full py-3.5 border border-stone-200 rounded-2xl text-stone-400 text-sm hover:border-stone-400 hover:text-stone-700 disabled:opacity-30 transition-all"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  )
}
