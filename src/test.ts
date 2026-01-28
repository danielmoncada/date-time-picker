// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
const testBed = getTestBed();
testBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Workaround for Angular 21.0-21.1 where the karma builder doesn't provide zone change detection
// We patch TestBed.configureTestingModule to always include provideZoneChangeDetection()
// unless it's already there or there's already a zone provider
const originalConfigureTestingModule = testBed.configureTestingModule;

testBed.configureTestingModule = function(moduleDef: any): any {
  if (!moduleDef) {
    moduleDef = {};
  }
  
  if (!moduleDef.providers) {
    moduleDef.providers = [];
  }
  
  // Check if provideZoneChangeDetection is already in the providers
  const hasZoneChangeDetection = moduleDef.providers.some((provider: any) => {
    if (!provider) return false;
    // Check if it's the provideZoneChangeDetection function
    return provider.ɵproviders || (typeof provider === 'function' && provider.toString().includes('provideZoneChangeDetection'));
  });
  
  // Add it if not already present
  if (!hasZoneChangeDetection) {
    moduleDef.providers.push(provideZoneChangeDetection());
  }
  
  return originalConfigureTestingModule.call(this, moduleDef);
};




