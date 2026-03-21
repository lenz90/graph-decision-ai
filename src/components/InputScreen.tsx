import { useState, type FormEvent } from 'react'

type InputScreenProps = {
  onSubmit: (value: string) => void
}

function InputScreen({ onSubmit }: InputScreenProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return
    }

    onSubmit(trimmedValue)
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="space-y-4 text-center sm:space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90 sm:text-sm">
          Branching Notes Flow
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
            Start with one thought.
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Enter an idea to begin a focused, step-by-step branching flow with a cleaner path
            from initial spark to next direction.
          </p>
        </div>
      </div>

      <form className="mt-8 space-y-5 sm:mt-10 sm:space-y-6" onSubmit={handleSubmit}>
        <label className="block space-y-3 text-left">
          <span className="text-sm font-medium text-slate-200">Initial phrase</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="e.g. Plan my next writing project"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3.5 text-base text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400/80 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-400/30"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_-18px_rgba(34,211,238,0.75)] transition duration-200 hover:bg-cyan-300 hover:shadow-[0_20px_48px_-20px_rgba(34,211,238,0.95)] focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
        >
          Begin flow
        </button>
      </form>
    </div>
  )
}

export default InputScreen
