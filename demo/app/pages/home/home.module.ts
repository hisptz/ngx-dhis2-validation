import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'demo/app/shared/shared.module';
import { pages } from './pages';

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
