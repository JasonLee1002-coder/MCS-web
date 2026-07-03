'use client'
import { useSearchParams } from 'next/navigation'
import ConsultLayout from '@/components/ai-advisor/ConsultLayout'
import { Role } from '@/lib/chat-stages'

const VALID_ROLES: Role[] = ['venue', 'brand', 'franchise', 'custom']

export default function ConsultLayoutWrapper() {
  const params = useSearchParams()
  const rawRole = params.get('role') as Role
  const role: Role = VALID_ROLES.includes(rawRole) ? rawRole : 'venue'
  return <ConsultLayout role={role} />
}
