import type { Node } from '../types'

type BreadcrumbProps = {
  path: Node[]
}

function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-2 text-sm text-slate-400 sm:gap-2.5">
        {path.map((node, index) => {
          const isLast = index === path.length - 1

          return (
            <li key={node.id} className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span
                className={[
                  'truncate whitespace-nowrap rounded-full border px-3.5 py-1.5 transition-colors',
                  isLast
                    ? 'max-w-[16rem] border-orange-300/20 bg-gradient-to-r from-orange-400/16 via-rose-400/14 to-purple-400/16 font-medium text-orange-50 shadow-[0_10px_24px_-18px_rgba(251,146,60,0.75)] sm:max-w-[24rem]'
                    : 'max-w-[10rem] border-white/10 bg-white/[0.04] text-slate-300/80 sm:max-w-[15rem]',
                ].join(' ')}
                title={node.text}
              >
                {node.text}
              </span>
              {!isLast && <span className="text-slate-600/90">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
