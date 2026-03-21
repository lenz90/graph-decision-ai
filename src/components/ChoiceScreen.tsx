import { motion } from 'framer-motion'

type ChoiceScreenProps = {
  branches: string[]
  onSelect: (branch: string) => void
}

function ChoiceScreen({ branches, onSelect }: ChoiceScreenProps) {
  return (
    <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90 sm:text-sm">
          Next direction
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Choose the branch to explore next.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
          Pick one option to continue the flow. Each branch keeps the path focused while
          opening a distinct direction.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 sm:auto-rows-fr lg:gap-6">
        {branches.map((branch) => (
          <motion.button
            key={branch}
            type="button"
            onClick={() => onSelect(branch)}
            whileTap={{ scale: 0.985 }}
            className="group relative flex min-h-44 h-full w-full items-start justify-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-6 text-left text-base font-medium text-slate-100 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-900/90 hover:shadow-[0_24px_64px_-32px_rgba(34,211,238,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-300/50 active:border-cyan-300/70 sm:p-7"
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
            <span className="flex h-full w-full flex-col justify-between gap-8">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400 transition duration-200 group-hover:border-cyan-400/20 group-hover:text-cyan-200">
                Branch option
              </span>
              <span
                className="line-clamp-5 break-words text-pretty text-lg leading-7 text-slate-100 transition duration-200 group-hover:text-white"
                title={branch}
              >
                {branch}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

export default ChoiceScreen
