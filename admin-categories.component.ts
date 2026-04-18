import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Category } from '../../core/models/models';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
  standalone: false
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  flatCategories: Category[] = [];
  loading = true;

  newName = '';
  newParentId: number | null = null;

  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(private admin: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.admin.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
        this.flatCategories = this.flatten(this.categories);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error || 'Failed to load categories';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private flatten(list: Category[]): Category[] {
    const out: Category[] = [];
    for (const c of list) {
      out.push(c);
      if (c.subCategories) out.push(...this.flatten(c.subCategories));
    }
    return out;
  }

  createCategory(): void {
    if (!this.newName.trim()) {
      this.errorMsg = 'Name is required.';
      return;
    }
    this.saving = true;
    this.cdr.detectChanges();
    this.admin.createCategory(this.newName.trim(), this.newParentId).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Category created.';
        this.newName = '';
        this.newParentId = null;
        this.load();
        setTimeout(() => { this.successMsg = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error || 'Failed to create category';
        this.cdr.detectChanges();
      }
    });
  }
}