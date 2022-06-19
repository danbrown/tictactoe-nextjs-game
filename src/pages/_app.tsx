import { GameProvider } from "../game/GameContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
