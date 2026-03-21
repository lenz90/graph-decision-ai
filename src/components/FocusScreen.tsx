import type { Node } from '../types'

type FocusScreenProps = {
  currentNode: Node
  onGenerate: () => void
}

function FocusScreen({ currentNode, onGenerate }: FocusScreenProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_32px_120px_-48px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90 sm:text-sm">
          Current idea
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Keep the next decision in sharp focus.
        </h2>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-4 shadow-inner shadow-black/20 sm:p-5">
        <div className="flex min-h-64 items-center justify-center rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-6 py-12 sm:px-10">
          <p className="max-w-2xl break-words text-2xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight">
            {currentNode.text}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_46px_-20px_rgba(34,211,238,0.8)] transition duration-200 hover:bg-cyan-300 hover:shadow-[0_20px_52px_-20px_rgba(34,211,238,0.95)] focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
        >
          Generate 4 branches
        </button>
      </div>
    </section>
  )
}

export default FocusScreen
