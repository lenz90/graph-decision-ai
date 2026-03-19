import type { Node } from '../types'

type BreadcrumbProps = {
  path: Node[]
}

function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
      <ol className="flex min-w-max items-center gap-1.5 text-xs tracking-wide text-slate-500 sm:gap-2">
        {path.map((node, index) => {
          const isLast = index === path.length - 1

          return (
            <li key={node.id} className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <span
                className={[
                  'max-w-[10rem] truncate whitespace-nowrap',
                  isLast ? 'font-medium text-slate-200 sm:max-w-[16rem]' : 'text-slate-500 sm:max-w-[12rem]',
                ].join(' ')}
                title={node.text}
              >
                {node.text}
              </span>
              {!isLast && <span className="text-slate-700">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
