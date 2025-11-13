import { useColorScheme as useRNColorScheme } from 'react-native';
export function useColorScheme() {
  return useRNColorScheme() ?? 'light';
}
export default useColorScheme;
