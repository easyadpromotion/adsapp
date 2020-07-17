import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
 
  {
    path: '',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }, 
  { path: 'get-passcode', loadChildren: './get-passcode/get-passcode.module#GetPasscodePageModule' },
  // { path: 'survey-categories', loadChildren: './survey-categories/survey-categories.module#SurveyCategoriesPageModule' },
  // { path: 'survey-submit', loadChildren: './survey-submit/survey-submit.module#SurveySubmitPageModule' },
  // { path: 'alert-categories', loadChildren: './alert-categories/alert-categories.module#AlertCategoriesPageModule' },
  // { path: 'alert-dashboard', loadChildren: './alert-dashboard/alert-dashboard.module#AlertDashboardPageModule' },
  // { path: 'checklist', loadChildren: './checklist/checklist.module#ChecklistPageModule' },
  // { path: 'checklist-passcode', loadChildren: './checklist-passcode/checklist-passcode.module#ChecklistPasscodePageModule' },
  // { path: 'checklist-categories', loadChildren: './checklist-categories/checklist-categories.module#ChecklistCategoriesPageModule' },
  // { path: 'redeem', loadChildren: './redeem/redeem.module#RedeemPageModule' },
  // { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  // { path: 'util', loadChildren: './util/util.module#UtilPageModule' },
  // { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  // { path: 'connectivity-service', loadChildren: './connectivity-service/connectivity-service.module#ConnectivityServicePageModule' },
  // { path: 'google-maps', loadChildren: './google-maps/google-maps.module#GoogleMapsPageModule' },
  // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  // { path: 'verify-otp', loadChildren: './verify-otp/verify-otp.module#VerifyOtpPageModule' },
   { path: 'my-ads', loadChildren: './my-ads/my-ads.module#MyADsPageModule' },
  { path: 'create-photo-frame-list', loadChildren: './createPhotoFrame/create-photo-frame-list/create-photo-frame-list.module#CreatePhotoFrameListPageModule' },
  { path: 'create-photo-frame-add', loadChildren: './createPhotoFrame/create-photo-frame-add/create-photo-frame-add.module#CreatePhotoFrameAddPageModule' },
  { path: 'create-photo-frame-edit', loadChildren: './createPhotoFrame/create-photo-frame-edit/create-photo-frame-edit.module#CreatePhotoFrameEditPageModule' },
  { path: 'create-photo-frame-details', loadChildren: './createPhotoFrame/create-photo-frame-details/create-photo-frame-details.module#CreatePhotoFrameDetailsPageModule' },
  { path: 'maps', loadChildren: './maps/maps.module#MapsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
