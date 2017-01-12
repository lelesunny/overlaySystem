import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, CreateNewUserComponent, PostLoginComponent, SSOLoginSucComponent } from './login/index';
import { AuthGuard } from './_guards/index';
// user component
import {
    HomeComponent,
    InstructionComponent,
    AccountComponent,
    HelpComponent
} from './user/index';
// admin component
import {
    AdminUsersComponent,
    AdminHomeComponent,
    AdminBulkCreateComponent,
    AdminBulkCreateHistoryComponent,
    AdminReportsComponent,
    AdminSettingComponent,
    AdminTagsComponent,
    AdminTemplatesComponent
} from './admin/index'

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'ssologin',
        component: PostLoginComponent
    },
    {
        path: 'ssologin/success',
        component: SSOLoginSucComponent
    },
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    // { path: '', component: HelpComponent, canActivate: [AuthGuard] },
    //  { path: '**', redirectTo: '/home',canActivate: [AuthGuard] },


    //otherwise redirect to home
    // {
    //     path: '',
    //     redirectTo: '/home',
    //     pathMatch: 'full',
    //     canActivate: [AuthGuard]
    // },

    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'account',
        component: AccountComponent, canActivate: [AuthGuard]
    },
    {
        path: 'instruction',
        component: InstructionComponent, canActivate: [AuthGuard]
    },
    {
        path: 'help',
        component: HelpComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/home',
        component: AdminHomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/users',
        component: AdminUsersComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/tags',
        component: AdminTagsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/templates',
        component: AdminTemplatesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/bulkcreate',
        component: AdminBulkCreateComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/settings',
        component: AdminSettingComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/reports',
        component: AdminReportsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/user/createnewuser',
        component: CreateNewUserComponent
    },
    {
        path: 'admin/bulkcreatehistory',
        component: AdminBulkCreateHistoryComponent, canActivate: [AuthGuard]

    },
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });