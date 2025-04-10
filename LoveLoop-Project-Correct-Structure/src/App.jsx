import { useState } from "react";
import RegistrationScreen from "./screens/RegistrationScreen";
import AddPartnerScreen from "./screens/AddPartnerScreen";
import MainMenu from "./screens/MainMenu";
import PlanDateScreen from "./screens/PlanDateScreen";
import DateListScreen from "./screens/DateListScreen";
import CompleteDateScreen from "./screens/CompleteDateScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { t, defaultLang } from "./i18n";

export default function LoveLoopApp() {
  const [lang, setLang] = useState(defaultLang);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loveloop_user") || "null"));
  const [partner, setPartner] = useState(() => JSON.parse(localStorage.getItem("loveloop_partner") || "null"));
  const [screen, setScreen] = useState("main");
  const [editIndex, setEditIndex] = useState(null);

  const go = (view, index = null) => {
    setEditIndex(index);
    setScreen(view);
  };

  if (!user) return <RegistrationScreen onFinish={setUser} lang={lang} t={t} />;
  if (!partner) return <AddPartnerScreen onDone={setPartner} lang={lang} t={t} />;

  if (screen === "plan") return <PlanDateScreen lang={lang} t={t} onBack={() => go("main")} />;
  if (screen === "list") return <DateListScreen lang={lang} t={t} onBack={() => go("main")} onComplete={(i) => go("complete", i)} />;
  if (screen === "complete") return <CompleteDateScreen lang={lang} t={t} index={editIndex} onBack={() => go("main")} />;
  if (screen === "history") return <HistoryScreen lang={lang} t={t} onBack={() => go("main")} />;

  return <MainMenu user={user} partner={partner} lang={lang} t={t} onLangChange={setLang} onNavigate={go} />;
}