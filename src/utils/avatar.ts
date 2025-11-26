/**
 * Gera as iniciais para um avatar baseado no nome
 * - Se for um nome: primeira letra maiúscula
 * - Se for dois ou mais nomes: primeira letra de cada nome (máximo 2)
 */
export function getInitials(name: string | null | undefined): string {
  if (!name || name.trim().length === 0) {
    return 'U';
  }

  const trimmedName = name.trim();
  const parts = trimmedName.split(/\s+/).filter(part => part.length > 0);

  if (parts.length === 0) {
    return 'U';
  }

  if (parts.length === 1) {
    // Um nome: primeira letra maiúscula
    return parts[0].charAt(0).toUpperCase();
  }

  // Dois ou mais nomes: primeira letra de cada nome (máximo 2)
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

