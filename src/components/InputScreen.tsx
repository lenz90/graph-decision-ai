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
    <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_32px_110px_-50px_rgba(244,114,182,0.32)] backdrop-blur-2xl ring-1 ring-white/5 sm:p-8 lg:p-10">
      <div className="space-y-5 text-center sm:space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/85 sm:text-sm">
          Branching Notes Flow
        </p>
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-orange-100 via-rose-100 to-fuchsia-100 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl lg:text-[3rem] lg:leading-[1.02]">
            Start with one thought.
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Enter an idea to begin a focused, step-by-step branching flow with a cleaner path
            from initial spark to next direction.
          </p>
        </div>
        <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />
      </div>

      <form className="mt-8 space-y-5 sm:mt-10 sm:space-y-6" onSubmit={handleSubmit}>
        <label className="block space-y-3 text-left">
          <span className="text-sm font-medium text-slate-200">Initial phrase</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="e.g. Plan my next writing project"
            className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,10,16,0.92),rgba(25,19,30,0.92))] px-4 py-4 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_-24px_rgba(0,0,0,0.9)] outline-none transition duration-200 placeholder:text-slate-500 focus:border-orange-300/70 focus:ring-2 focus:ring-orange-300/30"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-13 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-300 via-rose-300 to-fuchsia-300 px-4 text-sm font-semibold text-slate-950 shadow-[0_18px_48px_-20px_rgba(251,146,60,0.5)] transition duration-200 hover:from-orange-200 hover:via-rose-200 hover:to-fuchsia-200 hover:shadow-[0_22px_52px_-20px_rgba(244,114,182,0.62)] focus:outline-none focus:ring-2 focus:ring-orange-200/60"
        >
          Begin flow
        </button>
      </form>
    </div>
  )
}

export default InputScreen
