/**
 * ============================================================================
 * BERIT - Dados de Gênesis Capítulo 1
 * ============================================================================
 * 
 * ESTRUTURA:
 * - Cada versículo contém palavras com Strong's numbers
 * - Strong's H = Hebraico, G = Grego
 * 
 * MAINTENANCE:
 * - Adicionar mais versículos seguindo a mesma estrutura
 * - Strong's numbers podem ser consultados em lexicons
 * ============================================================================
 */

export interface WordData {
  text: string
  strong?: string
  transliteration?: string
  definition?: string
  partOfSpeech?: string
}

export interface VerseData {
  number: number
  words: WordData[]
  fullText: string
}

export const genesisChapter1: VerseData[] = [
  {
    number: 1,
    fullText: 'No princípio, criou Deus os céus e a terra.',
    words: [
      { text: 'No princípio,', strong: 'H7225', transliteration: 'bərēʾšîṯ', definition: 'Início, começo, primeiro em tempo ou ordem', partOfSpeech: 'Substantivo' },
      { text: 'criou', strong: 'H1254', transliteration: 'bārāʾ', definition: 'Criar (sempre com Deus como sujeito), fazer algo novo', partOfSpeech: 'Verbo' },
      { text: 'Deus', strong: 'H430', transliteration: 'ʾĕlōhîm', definition: 'Deus (plural majestático), deuses, juízes', partOfSpeech: 'Substantivo' },
      { text: 'os céus', strong: 'H8064', transliteration: 'šāmayim', definition: 'Céus, firmamento, morada de Deus', partOfSpeech: 'Substantivo' },
      { text: 'e a terra.', strong: 'H776', transliteration: 'ʾereṣ', definition: 'Terra, país, território', partOfSpeech: 'Substantivo' },
    ],
  },
  {
    number: 2,
    fullText: 'A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.',
    words: [
      { text: 'A terra,', strong: 'H776', transliteration: 'ʾereṣ', definition: 'Terra, país, território', partOfSpeech: 'Substantivo' },
      { text: 'porém, estava sem forma', strong: 'H8414', transliteration: 'tōhû', definition: 'Vazio, caos, sem forma, desolação', partOfSpeech: 'Substantivo' },
      { text: 'e vazia;', strong: 'H922', transliteration: 'bōhû', definition: 'Vazio, vacuidade', partOfSpeech: 'Substantivo' },
      { text: 'havia trevas', strong: 'H2822', transliteration: 'ḥōšeḵ', definition: 'Escuridão, trevas, obscuridade', partOfSpeech: 'Substantivo' },
      { text: 'sobre a face', strong: 'H6440', transliteration: 'pānîm', definition: 'Face, presença, superfície', partOfSpeech: 'Substantivo' },
      { text: 'do abismo,', strong: 'H8415', transliteration: 'təhôm', definition: 'Abismo, profundidade, oceano primordial', partOfSpeech: 'Substantivo' },
      { text: 'e o Espírito', strong: 'H7307', transliteration: 'rûaḥ', definition: 'Espírito, vento, fôlego, sopro', partOfSpeech: 'Substantivo' },
      { text: 'de Deus', strong: 'H430', transliteration: 'ʾĕlōhîm', definition: 'Deus (plural majestático)', partOfSpeech: 'Substantivo' },
      { text: 'pairava', strong: 'H7363', transliteration: 'rāḥap̄', definition: 'Pairar, mover-se suavemente, flutuar', partOfSpeech: 'Verbo' },
      { text: 'sobre as águas.', strong: 'H4325', transliteration: 'mayim', definition: 'Águas, água', partOfSpeech: 'Substantivo' },
    ],
  },
  {
    number: 3,
    fullText: 'Disse Deus: Haja luz; e houve luz.',
    words: [
      { text: 'Disse', strong: 'H559', transliteration: 'ʾāmar', definition: 'Dizer, falar, declarar', partOfSpeech: 'Verbo' },
      { text: 'Deus:', strong: 'H430', transliteration: 'ʾĕlōhîm', definition: 'Deus (plural majestático)', partOfSpeech: 'Substantivo' },
      { text: 'Haja', strong: 'H1961', transliteration: 'hāyâ', definition: 'Ser, tornar-se, acontecer, existir', partOfSpeech: 'Verbo' },
      { text: 'luz;', strong: 'H216', transliteration: 'ʾôr', definition: 'Luz, luminosidade, claridade', partOfSpeech: 'Substantivo' },
      { text: 'e houve', strong: 'H1961', transliteration: 'hāyâ', definition: 'Ser, tornar-se, acontecer', partOfSpeech: 'Verbo' },
      { text: 'luz.', strong: 'H216', transliteration: 'ʾôr', definition: 'Luz, luminosidade, claridade', partOfSpeech: 'Substantivo' },
    ],
  },
  {
    number: 4,
    fullText: 'E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.',
    words: [
      { text: 'E viu', strong: 'H7200', transliteration: 'rāʾâ', definition: 'Ver, olhar, perceber, considerar', partOfSpeech: 'Verbo' },
      { text: 'Deus', strong: 'H430', transliteration: 'ʾĕlōhîm', definition: 'Deus (plural majestático)', partOfSpeech: 'Substantivo' },
      { text: 'que a luz', strong: 'H216', transliteration: 'ʾôr', definition: 'Luz, luminosidade', partOfSpeech: 'Substantivo' },
      { text: 'era boa;', strong: 'H2896', transliteration: 'ṭôḇ', definition: 'Bom, agradável, belo', partOfSpeech: 'Adjetivo' },
      { text: 'e fez separação', strong: 'H914', transliteration: 'bāḏal', definition: 'Separar, dividir, distinguir', partOfSpeech: 'Verbo' },
      { text: 'entre a luz', strong: 'H216', transliteration: 'ʾôr', definition: 'Luz', partOfSpeech: 'Substantivo' },
      { text: 'e as trevas.', strong: 'H2822', transliteration: 'ḥōšeḵ', definition: 'Escuridão, trevas', partOfSpeech: 'Substantivo' },
    ],
  },
  {
    number: 5,
    fullText: 'Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.',
    words: [
      { text: 'Chamou', strong: 'H7121', transliteration: 'qārāʾ', definition: 'Chamar, nomear, proclamar', partOfSpeech: 'Verbo' },
      { text: 'Deus', strong: 'H430', transliteration: 'ʾĕlōhîm', definition: 'Deus (plural majestático)', partOfSpeech: 'Substantivo' },
      { text: 'à luz', strong: 'H216', transliteration: 'ʾôr', definition: 'Luz', partOfSpeech: 'Substantivo' },
      { text: 'Dia', strong: 'H3117', transliteration: 'yôm', definition: 'Dia, tempo, período', partOfSpeech: 'Substantivo' },
      { text: 'e às trevas,', strong: 'H2822', transliteration: 'ḥōšeḵ', definition: 'Trevas, escuridão', partOfSpeech: 'Substantivo' },
      { text: 'Noite.', strong: 'H3915', transliteration: 'layil', definition: 'Noite', partOfSpeech: 'Substantivo' },
      { text: 'Houve tarde', strong: 'H6153', transliteration: 'ʿereḇ', definition: 'Tarde, entardecer, crepúsculo', partOfSpeech: 'Substantivo' },
      { text: 'e manhã,', strong: 'H1242', transliteration: 'bōqer', definition: 'Manhã, amanhecer', partOfSpeech: 'Substantivo' },
      { text: 'o primeiro', strong: 'H259', transliteration: 'ʾeḥāḏ', definition: 'Um, primeiro, único', partOfSpeech: 'Numeral' },
      { text: 'dia.', strong: 'H3117', transliteration: 'yôm', definition: 'Dia', partOfSpeech: 'Substantivo' },
    ],
  },
]

export const defaultSaveSlots = [
  {
    id: 'genesis-1',
    title: 'Gênesis',
    chapter: 1,
    subtitle: 'Cap. 1',
    description: 'A Criação do Mundo',
    isDefault: true,
  },
]
