import { NgModule } from '@angular/core';
import { GlobalBannerComponent } from './global-banner/global-banner';
import { GlobalPageFooterComponent } from './global-page-footer/global-page-footer';
@NgModule({
	declarations: [GlobalBannerComponent,
    GlobalPageFooterComponent],
	imports: [],
	exports: [GlobalBannerComponent,
    GlobalPageFooterComponent]
})
export class ComponentsModule {}
