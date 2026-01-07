import { Injectable } from '@angular/core';

export type PokemonType =
	'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' |
	'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' |
	'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export const ALL_TYPES: PokemonType[] = [
	'normal', 'fire', 'water', 'electric', 'grass', 'ice',
	'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
	'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

// Attacker -> Defender -> Multiplier
// Gen 9 Type Chart
export const TYPE_CHART: Record<PokemonType, Record<PokemonType, number>> = {
	normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
	fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1 },
	water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
	electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
	grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1 },
	ice: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1 },
	fighting: { normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5 },
	poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2 },
	ground: { normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
	flying: { normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
	psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1 },
	bug: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5 },
	rock: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
	ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1 },
	dragon: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0 },
	dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5 },
	steel: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2 },
	fairy: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1 }
};

@Injectable({
	providedIn: 'root'
})
export class GameEngineService {

	/**
	 * Generates a random target configuration (1 or 2 types).
	 * Valid combinations: 171 total (18 single + 153 dual).
	 * @param singleTypeOnly If true, only generates single-type configurations (18 total).
	 */
	generateTarget(singleTypeOnly = false): PokemonType[] {
		if (singleTypeOnly) {
			const index = Math.floor(Math.random() * ALL_TYPES.length);
			return [ALL_TYPES[index]];
		}

		// Pick strictly from the 171 pool to be uniform
		// 18 single, 153 dual. Total 171.
		// Index 0-170.
		const index = Math.floor(Math.random() * 171);

		if (index < 18) {
			// Single types
			return [ALL_TYPES[index]];
		} else {
			// Dual types logic
			// We need to map 18-170 to unique pairs.
			// Simple way: shuffle ALL_TYPES and pick 2? No, that's just random pair.
			// To be uniform over the specific 171 combinations:
			// Let's iterate and generate the pool.
			const pool: PokemonType[][] = [];
			// 1. Single types
			for (const t of ALL_TYPES) {
				pool.push([t]); // Size 18
			}
			// 2. Dual types (Combination nCr where n=18, r=2 => 153)
			for (let i = 0; i < ALL_TYPES.length; i++) {
				for (let j = i + 1; j < ALL_TYPES.length; j++) {
					pool.push([ALL_TYPES[i], ALL_TYPES[j]]);
				}
			}

			return pool[index];
		}
	}

	/**
	 * Calculates damage multiplier.
	 * Logic: defenseMultiplier = typeChart[attacker][defender1] * typeChart[attacker][defender2]
	 */
	calculateEffectiveness(attackType: PokemonType, defenseTypes: PokemonType[]): number {
		let multiplier = 1.0;
		for (const defType of defenseTypes) {
			multiplier *= TYPE_CHART[attackType][defType];
		}
		return multiplier;
	}

	getEffectivenessLabel(multiplier: number): 'critical' | 'effective' | 'neutral' | 'resisted' | 'immune' {
		if (multiplier === 0) return 'immune';
		if (multiplier > 1.0) {
			return multiplier >= 4 ? 'critical' : 'effective'; // Standard logic usually treats >1 as effective, but spec has 'Critical' for x4.
		}
		if (multiplier < 1.0) return 'resisted';
		return 'neutral';
	}

	/**
	 * Solve Logic: Hit & Blow (Chart based)
	 * 🟩 Correct: Exact match of configuration (Set equality).
	 * 🟨 Close: 1 type matches (Intersection size = 1).
	 * ⬛ Miss: 0 types match (Intersection size = 0).
	 */
	checkSolution(guess: PokemonType[], target: PokemonType[]): '🟩' | '🟨' | '⬛' {
		const guessSet = new Set(guess);
		const targetSet = new Set(target);

		// Check for exact equality (Sets are same size and items same)
		if (guessSet.size === targetSet.size) {
			let allMatch = true;
			for (const t of guessSet) {
				if (!targetSet.has(t)) {
					allMatch = false;
					break;
				}
			}
			if (allMatch) return '🟩';
		}

		// Check intersection
		let matchCount = 0;
		for (const t of guessSet) {
			if (targetSet.has(t)) {
				matchCount++;
			}
		}

		if (matchCount > 0) {
			return '🟨';
		}

		return '⬛';
	}
}
