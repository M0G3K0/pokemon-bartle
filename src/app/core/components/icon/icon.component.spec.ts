import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { LucideAngularModule, Menu } from 'lucide-angular';

describe('IconComponent', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IconComponent, LucideAngularModule.pick({ Menu })]
		})
			.compileComponents();

		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		// IconComponent likely requires an icon name input, but check if it fails first
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
