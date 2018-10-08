import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { LoginContainerComponent } from './core/containers/login-container/login-container.component';

const routes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  { path: 'register', component: CoreComponent }, // should be RegisterComponent container instead
  { path: 'admin', loadChildren: 'src/app/features/admin/admin.module#AdminModule' },
  { path: 'shop', loadChildren: 'src/app/features/shop/shop.module#ShopModule' },
  { path: 'wishlist', loadChildren: 'src/app/features/wishlist/wishlist.module#WishlistModule' },
  { path: '**',  redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
