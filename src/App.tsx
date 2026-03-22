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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16),_transparent_24%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_30%),linear-gradient(180deg,_#140f18_0%,_#0d0a11_100%)] px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(39,23,41,0.94),rgba(20,14,24,0.96))] shadow-[0_36px_120px_-46px_rgba(15,23,42,0.85)] ring-1 ring-white/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.14),_transparent_26%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.16),_transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/30 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 top-24 h-28 rounded-full bg-gradient-to-r from-orange-500/8 via-pink-500/8 to-purple-500/8 blur-3xl" />

          <div className="relative px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:gap-7 sm:pb-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={!canGoBack}
                      className="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-white/12 bg-white/[0.045] px-4 text-sm font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:border-orange-300/50 hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/12 disabled:hover:bg-white/[0.045]"
                    >
                      Back
                    </button>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent sm:block" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      <span className="inline-flex items-center rounded-full border border-orange-300/20 bg-gradient-to-r from-orange-400/18 via-pink-400/14 to-purple-400/18 px-3 py-1 text-orange-100 shadow-[0_10px_30px_-18px_rgba(251,146,60,0.8)]">
                        {progressLabel}
                      </span>
                      <span className="text-slate-400/80">Decision path</span>
                    </div>
                    <div className="max-w-4xl rounded-2xl border border-white/8 bg-black/10 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-4">
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

            <div className="relative flex min-h-[31rem] items-center justify-center py-8 sm:min-h-[33rem] sm:py-12 lg:min-h-[34rem] lg:py-14">
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
