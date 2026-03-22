import { motion } from 'framer-motion'

type ChoiceScreenProps = {
  branches: string[]
  onSelect: (branch: string) => void
}

function ChoiceScreen({ branches, onSelect }: ChoiceScreenProps) {
  return (
    <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_32px_110px_-52px_rgba(168,85,247,0.28)] backdrop-blur-2xl ring-1 ring-white/5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/85 sm:text-sm">
          Next direction
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
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
            className="group relative flex min-h-48 h-full w-full items-start justify-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,11,20,0.95),rgba(34,21,37,0.96))] p-6 text-left text-base font-medium text-slate-100 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/50 hover:shadow-[0_28px_70px_-34px_rgba(244,114,182,0.35)] focus:outline-none focus:ring-2 focus:ring-orange-200/50 active:border-rose-300/60 sm:p-7"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_34%)] opacity-80 transition duration-200 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
            <span className="relative flex h-full w-full flex-col justify-between gap-10">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400 transition duration-200 group-hover:border-orange-300/20 group-hover:text-orange-100">
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
