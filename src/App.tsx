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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={!canGoBack}
              className="inline-flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-cyan-400/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10"
            >
              Back
            </button>
            <div className="max-w-4xl">
              {path.length > 0 ? (
                <Breadcrumb path={path} />
              ) : (
                <p className="text-xs tracking-wide text-slate-500">No branch selected yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden">
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
    </main>
  )
}

export default App
