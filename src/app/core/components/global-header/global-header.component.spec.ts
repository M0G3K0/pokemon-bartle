import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalHeaderComponent } from './global-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GlobalHeaderComponent', () => {
	let component: GlobalHeaderComponent;
	let fixture: ComponentFixture<GlobalHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GlobalHeaderComponent, RouterTestingModule]
		})
			.compileComponents();

		fixture = TestBed.createComponent(GlobalHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
