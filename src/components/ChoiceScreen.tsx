import { motion } from 'framer-motion'

type ChoiceScreenProps = {
  branches: string[]
  onSelect: (branch: string) => void
}

function ChoiceScreen({ branches, onSelect }: ChoiceScreenProps) {
  return (
    <section className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          Choose next direction
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Choose next direction
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Pick one branch to continue the flow.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-fr">
        {branches.map((branch) => (
          <motion.button
            key={branch}
            type="button"
            onClick={() => onSelect(branch)}
            whileTap={{ scale: 0.98 }}
            className="group flex min-h-40 h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center text-base font-medium text-slate-100 shadow-lg shadow-slate-950/10 transition duration-200 hover:border-cyan-400/70 hover:bg-slate-900 hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 active:border-cyan-300/70"
          >
            <span
              className="line-clamp-4 break-words text-pretty transition duration-200 group-hover:text-white"
              title={branch}
            >
              {branch}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

export default ChoiceScreen
