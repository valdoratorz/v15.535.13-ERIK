////to be comverted to the new version later
// import { ByteStream } from "../byteStream/byteStream";
// import * as fs from 'fs';
// import * as path from 'path';
// import * as toml from '@iarna/toml';

// export type RarityType = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Champion' | '';

// export const RARITY_MAX_LEVEL: Record<RarityType, number> = {
//   '': 15,
//   Common: 15,
//   Rare: 13,
//   Epic: 10,
//   Legendary: 7,
//   Champion: 5,
// };

// const cardCache: Map<number, { rarity: RarityType; name: string }> = new Map();

// function loadCardData(): void {
//   if (cardCache.size > 0) return;
  
//   const gamefilesDir = path.resolve(__dirname, '../../Gamefiles/csv_logic');

//   const CARD_ID_BASE: { [key: string]: number } = {
//     characters: 26000000,
//     buildings: 27000000,
//     other: 28000000,
//   };

//   function parseCSV(content: string): string[][] {
//     const lines = content.trim().split('\n');
//     return lines.map(line => {
//       const result: string[] = [];
//       let current = '';
//       let inQuotes = false;
      
//       for (let i = 0; i < line.length; i++) {
//         const char = line[i];
//         if (char === '"') {
//           if (inQuotes && line[i + 1] === '"') {
//             current += '"';
//             i++;
//           } else {
//             inQuotes = !inQuotes;
//           }
//         } else if (char === ',' && !inQuotes) {
//           result.push(current.trim());
//           current = '';
//         } else {
//           current += char;
//         }
//       }
//       result.push(current.trim());
//       return result;
//     });
//   }

//   function loadFromCSV(filePath: string, baseId: number): void {
//     if (!fs.existsSync(filePath)) return;
    
//     const content = fs.readFileSync(filePath, 'utf-8');
//     const rows = parseCSV(content);
//     if (rows.length < 2) return;

//     const headers = rows[0].map((h: string) => h.toLowerCase().trim());
//     const nameIdx = headers.indexOf('name');
//     const rarityIdx = headers.indexOf('rarity');
//     const notVisibleIdx = headers.indexOf('notvisible');

//     let cardIndex = 0;
//     for (let i = 2; i < rows.length; i++) {
//       const row = rows[i];
//       if (row.length <= nameIdx) continue;
      
//       const name = row[nameIdx]?.replace(/^,/, '').trim() || '';
//       if (!name) continue;

//       const notVisible = row[notVisibleIdx]?.toLowerCase() === 'true';
//       if (notVisible) continue;

//       const rarity = (row[rarityIdx] as RarityType) || '';
//       const cardId = baseId + cardIndex;
//       cardCache.set(cardId, { rarity, name });
//       cardIndex++;
//     }
//   }

//   loadFromCSV(path.join(gamefilesDir, 'spells_characters.csv'), CARD_ID_BASE.characters);
//   loadFromCSV(path.join(gamefilesDir, 'spells_buildings.csv'), CARD_ID_BASE.buildings);
//   loadFromCSV(path.join(gamefilesDir, 'spells_other.csv'), CARD_ID_BASE.other);
// }

// export function getCardRarity(cardId: number): RarityType {
//   loadCardData();
//   const cached = cardCache.get(cardId);
//   if (cached) return cached.rarity;
  
//   return '';
// }

// export function getCardName(cardId: number): string {
//   loadCardData();
//   const cached = cardCache.get(cardId);
//   if (cached) return cached.name;
//   return '';
// }

// export class Card {
//   private _id: number;
//   private _level: number;
//   private _starPower: number;
//   private _rarity: RarityType;
//   private _relativeLevel: number;

//   constructor(
//     id: number,
//     level: number = 5,
//     starPower: number = 0, //0 = ; 3 = evo + hero
//   ) {
//     this._id = id;
//     this._rarity = getCardRarity(id);
//     this._starPower = starPower;
//     this._level = level;
//     this._relativeLevel = this.calculateRelativeLevel();
//   }

//   private calculateRelativeLevel(): number {
//     const levelDiff = RARITY_MAX_LEVEL["Common"] - RARITY_MAX_LEVEL[this._rarity];
//     return this._level + levelDiff;
//   }

//   private calculateLevel(): number {
//     const levelDiff = RARITY_MAX_LEVEL["Common"] - RARITY_MAX_LEVEL[this._rarity];
//     return this._relativeLevel - levelDiff;
//   }

//   public get id(): number { return this._id; }
//   public get level(): number { return this._level; }
//   public set level(value: number) {
//     this._level = value;
//     this._relativeLevel = this.calculateRelativeLevel();
//   }
//   public get relativeLevel(): number { return this._relativeLevel; }
//   public set relativeLevel(value: number) {
//     this._relativeLevel = value;
//     this._level = this.calculateLevel();
//   }
//   public get starPower(): number { return this._starPower; }
//   public get rarity(): RarityType { return this._rarity; }

//   public encode(stream: ByteStream): void {
//     stream.writeInt(this._id);
//     stream.writeVInt(this._level);
//     stream.writeVInt(this._starPower);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeVInt(0);
//     stream.writeBoolean(false);
//     stream.writeBoolean(false);
//   }

//   public static encodeTowerCard(stream: ByteStream, cardId: number): void {
//     stream.writeVInt(0);
//     stream.writeVInt(1);
//     stream.writeVInt(0);
//     stream.writeInt(cardId);
//     stream.writeBoolean(false);
//     stream.writeBoolean(false);
//   }
// }