import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Breadcrumb from './components/Breadcrumb'
import ChoiceScreen from './components/ChoiceScreen'
import FocusScreen from './components/FocusScreen'
import InputScreen from './components/InputScreen'
import type { Node } from './types'

type Mode = 'focus' | 'choice'
type Direction = 'forward' | 'backward'

function generateBranches(text: string): string[] {
  return [text + ' A', text + ' B', text + ' C', text + ' D']
}

const screenVariants = {
  enter: (direction: Direction) => ({
    x: direction === 'forward' ? 56 : -56,
    opacity: 0,
    scale: 0.985,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: Direction) => ({
    x: direction === 'forward' ? -56 : 56,
    opacity: 0,
    scale: 0.985,
    filter: 'blur(6px)',
  }),
}

function createNode(text: string): Node {
  return {
    id: crypto.randomUUID(),
    text,
  }
}

function App() {
  const [path, setPath] = useState<Node[]>([])
  const [mode, setMode] = useState<Mode>('focus')
  const [branches, setBranches] = useState<string[]>([])
  const [direction, setDirection] = useState<Direction>('forward')

  const currentNode = path[path.length - 1]

  const screenKey = useMemo(() => {
    if (!currentNode) {
      return 'input'
    }

    return `${currentNode.id}-${mode}`
  }, [currentNode, mode])

  const handleStart = (value: string) => {
    setDirection('forward')
    setPath([createNode(value)])
    setBranches([])
    setMode('focus')
  }

  const handleGenerate = () => {
    if (!currentNode) {
      return
    }

    setDirection('forward')
    setBranches(generateBranches(currentNode.text))
    setMode('choice')
  }

  const handleSelectBranch = (branch: string) => {
    setDirection('forward')
    setPath((currentPath) => [...currentPath, createNode(branch)])
    setBranches([])
    setMode('focus')
  }

  const handleBack = () => {
    if (mode === 'choice') {
      setDirection('backward')
      setMode('focus')
      return
    }

    if (path.length <= 1) {
      setDirection('backward')
      setPath([])
      setBranches([])
      setMode('focus')
      return
    }

    setDirection('backward')
    setPath((currentPath) => currentPath.slice(0, -1))
    setBranches([])
    setMode('focus')
  }

  const canGoBack = mode === 'choice' || path.length > 0
  const hasPath = path.length > 0
  const progressLabel = !hasPath ? 'Start' : mode === 'choice' ? 'Choose' : 'Focus'

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_32px_120px_-48px_rgba(8,145,178,0.4)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.85),_transparent_48%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

          <div className="relative px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-5 sm:gap-6 sm:pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={!canGoBack}
                      className="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition duration-200 hover:border-cyan-400/60 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/[0.04]"
                    >
                      Back
                    </button>
                    <div className="hidden h-px flex-1 bg-white/10 sm:block" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                      <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-cyan-200">
                        {progressLabel}
                      </span>
                      <span>Decision path</span>
                    </div>
                    <div className="max-w-4xl">
                      {hasPath ? (
                        <Breadcrumb path={path} />
                      ) : (
                        <p className="text-sm text-slate-500">No branch selected yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[30rem] items-center justify-center py-8 sm:min-h-[32rem] sm:py-10">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={screenKey}
                  custom={direction}
                  variants={screenVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  {!currentNode ? (
                    <InputScreen onSubmit={handleStart} />
                  ) : mode === 'focus' ? (
                    <FocusScreen currentNode={currentNode} onGenerate={handleGenerate} />
                  ) : (
                    <ChoiceScreen branches={branches} onSelect={handleSelectBranch} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
