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
                  'truncate whitespace-nowrap rounded-full border px-3 py-1.5 transition-colors',
                  isLast
                    ? 'max-w-[16rem] border-cyan-400/20 bg-cyan-400/10 font-medium text-cyan-100 sm:max-w-[22rem]'
                    : 'max-w-[10rem] border-white/10 bg-white/[0.03] text-slate-400 sm:max-w-[14rem]',
                ].join(' ')}
                title={node.text}
              >
                {node.text}
              </span>
              {!isLast && <span className="text-slate-600">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
