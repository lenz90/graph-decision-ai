type ChoiceScreenProps = {
  branches: string[]
  onSelect: (branch: string) => void
}

function ChoiceScreen({ branches, onSelect }: ChoiceScreenProps) {
  return (
    <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          Choice Screen
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Choose the next direction
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Pick one branch to continue the flow.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {branches.map((branch) => (
          <button
            key={branch}
            type="button"
            onClick={() => onSelect(branch)}
            className="min-h-36 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-left text-base font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
          >
            {branch}
          </button>
        ))}
      </div>
    </section>
  )
}

export default ChoiceScreen
