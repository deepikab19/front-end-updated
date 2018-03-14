import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
	{
		path: 'book-id',
		component: AppComponent,
		outlet: 'bookPopup'
	},
	{
		path: 'Pace',
		component: AppComponent,
		outlet: 'bookPopup'
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
