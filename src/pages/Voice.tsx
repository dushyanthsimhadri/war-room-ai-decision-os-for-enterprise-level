import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { Mic, MicOff, Volume2, Swords } from 'lucide-react'
import { AI_EMPLOYEES, sampleDebateMessages } from '@/data/mockData'
import { sleep } from '@/lib/utils'

const VOICE_RESPONSES = [
  { agent: 'cfo', text: "Based on current cash flow projections, I recommend proceeding with caution. We have 18 months of runway and this initiative requires 8 months to break even." },
  { agent: 'cpo', text: "From a product perspective, this addresses our top customer request. We've seen 847 feature requests for exactly this capability. I support moving forward." },
  { agent: 'moderator', text: "The board is aligned. Recommendation: proceed with the initiative with a phased budget approach. Confidence level is 87 percent." },
]

export function Voice() {
  const [isListening, setIsListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [responses, setResponses] = useState<typeof VOICE_RESPONSES>([])
  const [currentAgent, setCurrentAgent] = useState<(typeof AI_EMPLOYEES)[0] | null>(null)

  const handleVoiceToggle = async () => {
    if (isListening) {
      setIsListening(false)
      if (!transcript) return
      setSpeaking(true)
      for (const resp of VOICE_RESPONSES) {
        const agent = AI_EMPLOYEES.find((a) => a.id === resp.agent)!
        setCurrentAgent(agent)
        setResponses((prev) => [...prev, resp])
        // Simulate TTS
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(resp.text)
          utter.rate = 0.9
          window.speechSynthesis.speak(utter)
          await new Promise((r) => { utter.onend = r })
        } else {
          await sleep(2500)
        }
      }
      setCurrentAgent(null)
      setSpeaking(false)
    } else {
      setTranscript('')
      setResponses([])
      setIsListening(true)
      // Try Web Speech API
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SR()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.onresult = (event: any) => {
          const t = Array.from(event.results).map((r: any) => r[0].transcript).join('')
          setTranscript(t)
        }
        recognition.onend = () => setIsListening(false)
        recognition.start()
      } else {
        // Simulate voice input
        await sleep(3000)
        setTranscript('Should we launch Feature X this quarter?')
        setIsListening(false)
      }
    }
  }

  return (
    <div>
      <TopBar title="Voice Mode" subtitle="Speak to your AI executive board" />
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 700, margin: '0 auto' }}>

        {/* Voice Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
          <div style={{ position: 'relative', marginBottom: 24 }}>
            {isListening && (
              <>
                <div style={{
                  position: 'absolute',
                  inset: -16,
                  borderRadius: '50%',
                  border: '2px solid rgba(99,102,241,0.3)',
                  animation: 'pulse-ring 1.5s ease-out infinite',
                }} />
                <div style={{
                  position: 'absolute',
                  inset: -32,
                  borderRadius: '50%',
                  border: '2px solid rgba(99,102,241,0.15)',
                  animation: 'pulse-ring 1.5s ease-out infinite 0.4s',
                }} />
              </>
            )}
            <motion.button
              onClick={handleVoiceToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { boxShadow: ['0 0 0px rgba(99,102,241,0.4)', '0 0 60px rgba(99,102,241,0.6)', '0 0 0px rgba(99,102,241,0.4)'] } : {}}
              transition={isListening ? { duration: 1.5, repeat: Infinity } : {}}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: isListening ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${isListening ? 'var(--accent-indigo)' : 'var(--border-default)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {isListening
                ? <Mic size={40} style={{ color: 'var(--accent-indigo)' }} />
                : <MicOff size={40} style={{ color: 'var(--text-muted)' }} />}
            </motion.button>
          </div>

          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            {isListening ? 'Listening…' : speaking ? 'AI Board is responding…' : 'Tap to speak'}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 400 }}>
            {isListening
              ? 'Ask any business question. The AI board will convene and respond.'
              : speaking
                ? 'Your AI executives are discussing the question.'
                : 'Click the microphone and ask your executive board anything.'}
          </div>
        </div>

        {/* Transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: '100%',
              padding: 20,
              borderRadius: 14,
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              You said
            </div>
            <div style={{ fontSize: 16, color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{transcript}"
            </div>
          </motion.div>
        )}

        {/* AI Responses */}
        <AnimatePresence>
          {responses.map((resp, i) => {
            const agent = AI_EMPLOYEES.find((a) => a.id === resp.agent)!
            const isCurrentlySpeaking = currentAgent?.id === agent.id
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  width: '100%',
                  padding: 20,
                  borderRadius: 14,
                  background: isCurrentlySpeaking ? `${agent.color}10` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isCurrentlySpeaking ? agent.color + '40' : 'var(--border-subtle)'}`,
                  marginBottom: 12,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>{agent.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</span>
                    <span style={{ fontSize: 12, color: agent.color, fontWeight: 600 }}>{agent.role}</span>
                    {isCurrentlySpeaking && <Volume2 size={14} style={{ color: agent.color }} className="animate-thinking" />}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{resp.text}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
