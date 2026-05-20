import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import App from "./App";
import CityPage from "./pages/CityPage";
import AdminLeads from "./pages/AdminLeads";
import { ChatWidget } from "./components/ChatWidget";
import "./index.css";

function Root() {
  return (
    <>
      <Switch>
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/" component={App} />
        <Route path="/epoxy-flooring/:slug" component={CityPage} />
        <Route>
          <App />
        </Route>
      </Switch>
      <Route path="/admin/leads">{() => null}</Route>
      <Switch>
        <Route path="/admin/:rest*">{() => null}</Route>
        <Route>
          <ChatWidget />
        </Route>
      </Switch>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
