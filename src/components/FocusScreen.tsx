import type { Node } from '../types'

type FocusScreenProps = {
  currentNode: Node
  onGenerate: () => void
}

function FocusScreen({ currentNode, onGenerate }: FocusScreenProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 text-center shadow-[0_32px_110px_-52px_rgba(168,85,247,0.28)] backdrop-blur-2xl ring-1 ring-white/5 sm:p-8 lg:p-10">
      <div className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/85 sm:text-sm">
          Current idea
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
          Keep the next decision in sharp focus.
        </h2>
      </div>

      <div className="mt-8 rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,10,17,0.92),rgba(30,20,34,0.92))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_70px_-42px_rgba(244,114,182,0.35)] sm:mt-10 sm:p-5">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-12 sm:px-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent" />
          <p className="relative max-w-2xl break-words text-2xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight">
            {currentNode.text}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-300 via-rose-300 to-fuchsia-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_46px_-20px_rgba(244,114,182,0.45)] transition duration-200 hover:from-orange-200 hover:via-rose-200 hover:to-fuchsia-200 hover:shadow-[0_22px_54px_-20px_rgba(251,146,60,0.62)] focus:outline-none focus:ring-2 focus:ring-orange-200/60"
        >
          Generate 4 branches
        </button>
      </div>
    </section>
  )
}

export default FocusScreen
