export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map<K, V>();
    this.maxSize = maxSize;
  }

  // Adiciona um item ao cache
  put(key: K, value: V): void {
    console.log("[PUT] LRUCache", key, value);
		
    // Se a chave já existe, removemos para atualizar a ordem
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Adiciona o novo item ao final (mais recentemente usado)
    this.cache.set(key, value);

    // Se o cache exceder o tamanho máximo, removemos o item menos recentemente usado
    if (this.cache.size > this.maxSize) {
      // keys().next().value nos dá a primeira chave inserida, que é a menos recentemente usada
      const firstKey = this.cache.keys().next().value!;
      this.cache.delete(firstKey);
    }
  }

  // Busca um item no cache
  get(key: K): V | undefined {
    console.log("[GET] LRUCache", key);
    if (!this.cache.has(key)) {
      return undefined;
    }

    // Ao acessar um item, removemos e re-inserimos para atualizar a ordem de uso
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  // Verifica se a chave está no cache
  has(key: K): boolean {
    return this.cache.has(key);
  }

  // Remove um item do cache
  remove(key: K): void {
    this.cache.delete(key);
  }

  // Retorna o número de elementos no cache
  size(): number {
    return this.cache.size;
  }
}
