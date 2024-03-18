import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [LoadingComponent],
})
export class ComponentsModule {}
