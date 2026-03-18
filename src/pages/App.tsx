import React, { Suspense, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import AppContextProvider from '../components/infrastructure/AppContextProvider.js';
import NavigationProvider from '../components/infrastructure/NavigationProvider.js';
import { navigationElements, getImportableView } from '../navigation/navigationElements.js';
import RouterPage from './RouterPage.js';
import { RESTService } from './../services/restService.js';
import { GeospatialService } from './../services/geospatialService.js';
import { OpenSkyAPIService } from './../services/openSkyAPIService.js';
import { ServiceKeys } from '../services/serviceKeys.js';
import { ThemeKeys, DarkTheme, LightTheme, PineappleTheme } from './../styles/index.js';
// Types
import type { IService } from './../services/infrastructure/serviceTypes.js';
// Styles
import 'mapbox-gl/dist/mapbox-gl.css';
import './../styles/app.style.css';
const App: React.FC = () => {
  // States
  const [themeName, setThemeName] = useState(ThemeKeys.DarkTheme);
  const getTheme = () => {
    switch (themeName) {
      case ThemeKeys.DarkTheme: {
        return DarkTheme;
      };
      case ThemeKeys.LightTheme: {
        return LightTheme;
      };
      case ThemeKeys.PineappleTheme: {
        return PineappleTheme;
      };
      default: {
        return DarkTheme;
      };
    }
  };
  const handleThemeChange = (themeName: string) => {
    setThemeName(themeName);
  };
  const getServices = (): Array<IService> => {
    return [
      new RESTService(ServiceKeys.RESTService),
      new GeospatialService(ServiceKeys.GeospatialService),
      new OpenSkyAPIService(ServiceKeys.OpenSkyAPIService)
    ];
  };
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <AppContextProvider
        onThemeChange={handleThemeChange}
        onInjectServices={getServices}>
        <HashRouter>
          <NavigationProvider
            navigationElements={navigationElements}
            getImportableView={getImportableView}>
            <Suspense fallback={
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'>
                <CircularProgress />
              </Box>
            }>
              <RouterPage />
            </Suspense>
          </NavigationProvider>
        </HashRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}
export default App;
