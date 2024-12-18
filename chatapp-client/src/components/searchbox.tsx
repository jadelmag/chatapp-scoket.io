import { useAuthContext } from "@/auth/authcontext";

export const SearchBox = () => {
  const { auth, logout } = useAuthContext();

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{auth.name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button className="btn text-danger" onClick={logout}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
