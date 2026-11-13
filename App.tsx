import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import {
  AboutScreen, AccountScreen, BottomNav, ContactScreen, DetailScreen, FeesScreen, Header, HomeScreen, LoginScreen,
  MapScreen, OverviewScreen, PaymentScreen, QuoteProvider, QuoteScreen, ReviewsScreen, SplashScreen,
} from './src';
import { Navigate, Screen } from './src/types';

function renderScreen(screen: Screen, go: Navigate): React.ReactElement {
  switch (screen.name) {
    case 'splash': return <SplashScreen go={go} />;
    case 'login': return <LoginScreen go={go} />;
    case 'home': return <HomeScreen go={go} />;
    case 'about': return <AboutScreen />;
    case 'overview': return <OverviewScreen go={go} initialQuery={screen.query} />;
    case 'detail': return <DetailScreen id={screen.id} go={go} />;
    case 'fees': return <FeesScreen go={go} />;
    case 'contact': return <ContactScreen packageId={screen.packageId} />;
    case 'payment': return <PaymentScreen go={go} />;
    case 'account': return <AccountScreen go={go} />;
    case 'quote': return <QuoteScreen go={go} />;
    case 'map': return <MapScreen venueId={screen.venueId} />;
    case 'reviews': return <ReviewsScreen />;
  }
}

export default function App() {
  const [history, setHistory] = useState<Screen[]>([{ name: 'splash' }]);
  const screen = history[history.length - 1];

  // Tab screens reset the history; detail, payment and "book now" contact push onto it.
  const go: Navigate = useCallback((next: Screen) => {
    const isTab = ['login', 'home', 'about', 'overview', 'fees', 'contact', 'account', 'quote', 'map', 'reviews'].includes(next.name);
    const isBooking = next.name === 'contact' && next.packageId !== undefined;
    setHistory(h => (isTab && !isBooking ? [next] : [...h, next]));
  }, []);

  // Android back button steps back through the screen history
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (history.length > 1 && screen.name !== 'login') {
        setHistory(h => h.slice(0, -1));
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [history, screen.name]);

  const full = screen.name === 'splash' || screen.name === 'login';

  return (
    <QuoteProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={screen.name === 'splash' ? 'light-content' : 'dark-content'} />
        {!full && <Header go={go} />}
        <View style={{ flex: 1 }}>{renderScreen(screen, go)}</View>
        {!full && <BottomNav current={screen.name} go={go} />}
      </SafeAreaView>
    </QuoteProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
});
