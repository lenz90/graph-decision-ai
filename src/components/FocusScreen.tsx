import type { Node } from '../types'

type FocusScreenProps = {
  currentNode: Node
  onGenerate: () => void
}

function FocusScreen({ currentNode, onGenerate }: FocusScreenProps) {
  return (
    <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
        Current idea
      </p>
      <div className="mt-6 flex min-h-56 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-12 sm:px-10">
        <p className="max-w-full break-words text-2xl font-semibold tracking-tight text-white sm:text-4xl">
          {currentNode.text}
        </p>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        className="mt-8 inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
      >
        Generate 4 branches
      </button>
    </section>
  )
}

export default FocusScreen
