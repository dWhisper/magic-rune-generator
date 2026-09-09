import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { StoreProvider } from "./stores/store";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StoreProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</StoreProvider>
);
