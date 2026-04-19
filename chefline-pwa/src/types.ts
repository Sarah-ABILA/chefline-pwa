export interface OrderItem {
  quantite: number
  nom: string
  prix_unitaire?: string
}

export interface OrderData {
  transcription?: string
  client?: string
  type?: 'Emporter' | 'Livraison'
  adresse?: string
  telephone?: string
  heure_souhaitee?: string
  items?: OrderItem[]
  total?: string
  notes?: string
}
