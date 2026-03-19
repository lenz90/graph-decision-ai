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
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10">
      <div className="space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          Branching Notes Flow
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Start with one thought.
        </h1>
        <p className="text-sm leading-6 text-slate-300 sm:text-base">
          Enter an idea to begin a focused, step-by-step branching flow.
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2 text-left">
          <span className="text-sm font-medium text-slate-200">Initial phrase</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="e.g. Plan my next writing project"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-base text-white outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
        >
          Begin flow
        </button>
      </form>
    </div>
  )
}

export default InputScreen
