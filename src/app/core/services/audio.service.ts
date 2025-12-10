import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AudioService {
	// Sound enabled state (persisted in localStorage)
	private readonly STORAGE_KEY = 'pb-sound-enabled';
	soundEnabled = signal<boolean>(this.loadSoundPreference());

	// Audio instance for win sound
	private winAudio: HTMLAudioElement | null = null;

	constructor() {
		// Preload win sound
		this.preloadWinSound();
	}

	/**
	 * Load sound preference from localStorage
	 */
	private loadSoundPreference(): boolean {
		const stored = localStorage.getItem(this.STORAGE_KEY);
		return stored !== null ? stored === 'true' : true; // Default: enabled
	}

	/**
	 * Save sound preference to localStorage
	 */
	private saveSoundPreference(enabled: boolean): void {
		localStorage.setItem(this.STORAGE_KEY, String(enabled));
	}

	/**
	 * Toggle sound on/off
	 */
	toggleSound(): void {
		const newValue = !this.soundEnabled();
		this.soundEnabled.set(newValue);
		this.saveSoundPreference(newValue);
	}

	/**
	 * Set sound enabled state
	 */
	setSoundEnabled(enabled: boolean): void {
		this.soundEnabled.set(enabled);
		this.saveSoundPreference(enabled);
	}

	/**
	 * Preload win sound for instant playback
	 */
	private preloadWinSound(): void {
		try {
			this.winAudio = new Audio('assets/sounds/win_gym_leader.wav');
			this.winAudio.preload = 'auto';
			this.winAudio.volume = 0.7; // Set volume to 70%
			this.winAudio.loop = true; // Loop the sound while modal is open
		} catch (error) {
			console.warn('Failed to preload win sound:', error);
		}
	}

	/**
	 * Play win sound if sound is enabled (loops until stopped)
	 */
	playWinSound(): void {
		if (!this.soundEnabled()) {
			return;
		}

		try {
			if (this.winAudio) {
				// Reset to start if already playing
				this.winAudio.currentTime = 0;
				this.winAudio.play().catch(error => {
					console.warn('Failed to play win sound:', error);
				});
			}
		} catch (error) {
			console.warn('Error playing win sound:', error);
		}
	}

	/**
	 * Stop win sound (called when starting a new game)
	 */
	stopWinSound(): void {
		if (this.winAudio) {
			this.winAudio.pause();
			this.winAudio.currentTime = 0;
		}
	}
}
