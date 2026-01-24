import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubSectionHeaderComponent } from './sub-section-header.component';

describe('SubSectionHeaderComponent', () => {
	let component: SubSectionHeaderComponent;
	let fixture: ComponentFixture<SubSectionHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SubSectionHeaderComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(SubSectionHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
