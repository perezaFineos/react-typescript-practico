import type { ReactNode } from 'react'

type TarjetaProps = {
  children: ReactNode
  titulo?: string
}

export function Tarjeta({ children, titulo }: TarjetaProps) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
    }}>
      {titulo ? <h3 style={{ marginTop: 0 }}>{titulo}</h3> : null}
      {children}
    </div>
  )
}