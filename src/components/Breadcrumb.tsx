import type { Node } from '../types'

type BreadcrumbProps = {
  path: Node[]
}

function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-sm text-slate-400">
        {path.map((node, index) => {
          const isLast = index === path.length - 1

          return (
            <li key={node.id} className="flex items-center gap-2">
              <span
                className={isLast ? 'font-medium text-slate-100' : 'text-slate-400'}
              >
                {node.text}
              </span>
              {!isLast && <span className="text-slate-600">&gt;</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
