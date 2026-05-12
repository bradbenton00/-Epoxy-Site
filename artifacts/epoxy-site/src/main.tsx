import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import App from "./App";
import CityPage from "./pages/CityPage";
import "./index.css";

function Root() {
  return (
    <Switch>
      <Route path="/" component={App} />
      <Route path="/epoxy-flooring/:slug" component={CityPage} />
      <Route>
        <App />
      </Route>
    </Switch>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
