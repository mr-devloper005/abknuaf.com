import type { CSSProperties, ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const shellVars = { '--editable-container': '1440px' } as CSSProperties

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={shellVars} className={`${dc.shell.page} flex min-h-screen flex-col overflow-x-clip ${className}`}>
      <EditableNavbar />
      <div className="min-h-0 flex-1">{children}</div>
      <EditableFooter />
    </div>
  )
}
// redesign-refresh-marker



