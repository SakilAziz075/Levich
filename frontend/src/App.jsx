import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useUser } from "../hooks/useUser";

function App() {
  const { user, login, logout } = useUser();

  function handleLogout() {
    logout();
    window.location.reload();
  }

  if (!user) {
    return (
      <div className="app-container">
        <Login onLogin={login} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Dashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
