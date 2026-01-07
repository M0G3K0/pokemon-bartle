import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface TabItem {
	id: string;
	label: string;
	disabled?: boolean;
	icon?: string; // Optional icon name (e.g., 'lock', 'star', etc.)
}

@Component({
	selector: 'pb-tabs',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss'
})
export class TabsComponent {
	@Input() tabs: TabItem[] = [];
	@Input() activeTabId: string = '';
	@Output() tabChange = new EventEmitter<string>();

	selectTab(tabId: string, disabled: boolean = false) {
		if (disabled) {
			return;
		}
		this.tabChange.emit(tabId);
	}

	isActive(tabId: string): boolean {
		return this.activeTabId === tabId;
	}
}
