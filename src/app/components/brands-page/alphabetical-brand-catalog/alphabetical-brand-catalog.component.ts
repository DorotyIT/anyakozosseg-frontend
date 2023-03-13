import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { alphabetLetters } from '../../shared/constants';
import { BrandApiGetResponse } from '../brand.api';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-alphabetical-brand-catalog',
  templateUrl: './alphabetical-brand-catalog.component.html',
  styleUrls: ['./alphabetical-brand-catalog.component.scss'],
})
export class AlphabeticalBrandCatalogComponent {
  public category: Category = {} as Category;
  public categoryTitlePart: string = '';
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string | null = '';

  public brandList: BrandApiGetResponse[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {
    combineLatest([
      this.activatedRoute.paramMap.pipe(
        first(),
        map(() => window.history.state)
      ),
      this.activatedRoute.paramMap,
    ]).subscribe(([routeData, paramMap]) => {
      this.activeLetter = paramMap.get('abcLetter');
      this.category = {
        id: routeData.id,
        name: routeData.name,
        imagePath: '',
      };
      this.setCategoryTitlePart(this.category);

      this.brandsService
        .fetchBrands(this.category.id, this.activeLetter)
        .subscribe(
          (brands: BrandApiGetResponse[]) => (this.brandList = brands)
        );
    });
  }

  public setCategoryTitlePart(category: Category): void {
    if (category.name?.endsWith('S')) {
      this.categoryTitlePart = `${category.name}I TERMÉKEKET`;
    } else if (category.name?.endsWith('K')) {
      this.categoryTitlePart = `${category.name}ET FORGALMAZÓ`;
    }
  }
}