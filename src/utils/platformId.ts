export function generateTeacherID(department: string): string {
  const dept = department.toUpperCase().slice(0, 3)
  const digits = Math.floor(1000 + Math.random() * 9000)
  const year = new Date().getFullYear().toString().slice(-2)
  return `TQ-${dept}-${digits}-${year}` 
}

export function generateStudentID(currentClass: string): string {
  const cls = currentClass.toUpperCase().replace(/\s/g, '')
  const digits = Math.floor(1000 + Math.random() * 9000)
  const year = new Date().getFullYear().toString().slice(-2)
  return `SQ-${cls}-${digits}-${year}` 
}

export function generateCentreCode(length: number = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}
