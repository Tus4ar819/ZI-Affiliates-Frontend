import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="form" options={{ headerShown: false }} />
      <Stack.Screen name="new-form" options={{ headerShown: false }} />
      <Stack.Screen name="leads" options={{ headerShown: false }} />
    </Stack>
  );
}
