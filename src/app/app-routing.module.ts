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
  { path: 'verify-otp', loadChildren: './verify-otp/verify-otp.module#VerifyOtpPageModule' },
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
  },
  {
    path: 'create-video-add',
    loadChildren: () => import('./createVideoFrame/create-video-add/create-video-add.module').then( m => m.CreateVideoAddPageModule)
  },
  {
    path: 'create-video-edit',
    loadChildren: () => import('./createVideoFrame/create-video-edit/create-video-edit.module').then( m => m.CreateVideoEditPageModule)
  },
  {
    path: 'create-video-list',
    loadChildren: () => import('./createVideoFrame/create-video-list/create-video-list.module').then( m => m.CreateVideoListPageModule)
  },
  {
    path: 'create-video-details',
    loadChildren: () => import('./createVideoFrame/create-video-details/create-video-details.module').then( m => m.CreateVideoDetailsPageModule)
  },
  {
    path: 'survey-questions-add',
    loadChildren: () => import('./surveyQuestions/survey-questions-add/survey-questions-add.module').then( m => m.SurveyQuestionsAddPageModule)
  },
  {
    path: 'survey-questions-edit',
    loadChildren: () => import('./surveyQuestions/survey-questions-edit/survey-questions-edit.module').then( m => m.SurveyQuestionsEditPageModule)
  },
  {
    path: 'survey-questions-list',
    loadChildren: () => import('./surveyQuestions/survey-questions-list/survey-questions-list.module').then( m => m.SurveyQuestionsListPageModule)
  },
  {
    path: 'survey-questions-details',
    loadChildren: () => import('./surveyQuestions/survey-questions-details/survey-questions-details.module').then( m => m.SurveyQuestionsDetailsPageModule)
  },  {
    path: 'photoads',
    loadChildren: () => import('./user-ads/photoads/photoads.module').then( m => m.PhotoadsPageModule)
  },
  {
    path: 'videoads',
    loadChildren: () => import('./user-ads/videoads/videoads.module').then( m => m.VideoadsPageModule)
  },
  {
    path: 'surveyads',
    loadChildren: () => import('./user-ads/surveyads/surveyads.module').then( m => m.SurveyadsPageModule)
  },
  {
    path: 'photoad-detail',
    loadChildren: () => import('./user-ads/photoad-detail/photoad-detail.module').then( m => m.PhotoadDetailPageModule)
  },
  {
    path: 'videoad-detail',
    loadChildren: () => import('./user-ads/videoad-detail/videoad-detail.module').then( m => m.VideoadDetailPageModule)
  },
  {
    path: 'surveyad-detail',
    loadChildren: () => import('./user-ads/surveyad-detail/surveyad-detail.module').then( m => m.SurveyadDetailPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
