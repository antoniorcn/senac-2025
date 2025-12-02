// Source - https://stackoverflow.com/a
// Posted by Charles, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-01, License - CC BY-SA 4.0

import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => { 
    console.log("app.config.ts - executado...");
    return ({
    ...config,
        name: "pet-tinder",
        slug: "pet-tinder",
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
            package: "com.profantonio.pettinder",
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_MAPSAPIKEY,
                },
            },
        },
    });
}
