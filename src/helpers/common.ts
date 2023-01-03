import configs from '@configs';

export const isDevelopment = () => configs.environment === 'development';
export const isProduction = () => configs.environment === 'production';
export const isTest = () => configs.environment === 'test';
