import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");
export interface AppConfig {
    apiEndpoint: string;
}

export const AppConfig: AppConfig = {    
    // apiEndpoint: window.document.location.origin,
    apiEndpoint: 'Put your end point here'   

};