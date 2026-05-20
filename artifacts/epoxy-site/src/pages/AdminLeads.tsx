import { useEffect, useState, useMemo } from "react";

type Lead = {
  id: number;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  zip: string | null;
  service: string | null;
  sqft: string | null;
  timeline: string | null;
  message: string | null;
  sourcePage: string | null;
  userAgent: string | null;
  ipAddress: string | null;
};

const STORAGE_KEY = "ee_admin_pw";

function authHeader(pw: string): string {
  return "Basic " + btoa("admin:" + pw);
}

export default function AdminLeads() {
  const [pw, setPw] = useState<string>(
    () => sessionStorage.getItem(STORAGE_KEY) ?? "",
  );
  const [pwInput, setPwInput] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!pw) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("/api/admin/leads", { headers: { Authorization: authHeader(pw) } })
      .then(async (r) => {
        if (r.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setPw("");
          throw new Error("Wrong password");
        }
        if (!r.ok) throw new Error("Failed to load (" + r.status + ")");
        const data = (await r.json()) as { leads: Lead[] };
        if (!cancelled) setLeads(data.leads);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pw]);

  const filtered = useMemo(() => {
    if (!leads) return [];
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [
        l.name,
        l.phone,
        l.email,
        l.zip,
        l.service,
        l.timeline,
        l.message,
        l.sourcePage,
      ]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q)),
    );
  }, [leads, query]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, pwInput);
    setPw(pwInput);
    setPwInput("");
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setPw("");
    setLeads(null);
  }

  async function handleDownloadCsv() {
    try {
      const r = await fetch("/api/admin/leads.csv", {
        headers: { Authorization: authHeader(pw) },
      });
      if (!r.ok) throw new Error("Download failed (" + r.status + ")");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `leads_${stamp}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Download failed");
    }
  }

  if (!pw) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a2332",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            background: "#fff",
            color: "#1a2332",
            padding: "32px",
            borderRadius: "12px",
            maxWidth: "360px",
            width: "100%",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <h1 style={{ margin: "0 0 6px", fontSize: "22px" }}>Admin Login</h1>
          <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>
            Enter password to view leads.
          </p>
          <input
            type="password"
            autoFocus
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "11px 14px",
              fontSize: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              boxSizing: "border-box",
              marginBottom: "12px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px",
              background: "#d4a843",
              color: "#1a2332",
              fontWeight: 700,
              fontSize: "15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          {error && (
            <div style={{ color: "#c33", marginTop: "12px", fontSize: "13px" }}>
              {error}
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f3f0",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1a2332",
      }}
    >
      <header
        style={{
          background: "#1a2332",
          color: "#fff",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "20px" }}>Leads</h1>
          <div style={{ fontSize: "12px", color: "#d4a843", marginTop: "2px" }}>
            {leads ? `${filtered.length} of ${leads.length}` : "Loading…"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            type="search"
            placeholder="Filter…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #2d3a4f",
              background: "#0f1620",
              color: "#fff",
              minWidth: "200px",
            }}
          />
          <button
            onClick={handleDownloadCsv}
            style={{
              padding: "8px 14px",
              background: "#d4a843",
              color: "#1a2332",
              border: "none",
              borderRadius: "6px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Download CSV
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              background: "transparent",
              color: "#fff",
              border: "1px solid #2d3a4f",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <main style={{ padding: "16px" }}>
        {loading && <p>Loading leads…</p>}
        {error && (
          <div
            style={{
              background: "#fee",
              color: "#900",
              padding: "12px 16px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            {error}
          </div>
        )}
        {leads && leads.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "8px",
              textAlign: "center",
              color: "#666",
            }}
          >
            No leads yet. Submitted leads will appear here.
          </div>
        )}
        {leads && leads.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              overflow: "auto",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                minWidth: "1100px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#1a2332",
                    color: "#fff",
                    textAlign: "left",
                  }}
                >
                  {[
                    "When",
                    "Name",
                    "Phone",
                    "Email",
                    "ZIP",
                    "Service",
                    "Sq Ft",
                    "Timeline",
                    "Message",
                    "Source",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 12px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr
                    key={l.id}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#fafaf8",
                      verticalAlign: "top",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 12px",
                        whiteSpace: "nowrap",
                        color: "#666",
                      }}
                    >
                      {new Date(l.submittedAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "10px 12px", fontWeight: 600 }}>
                      {l.name}
                    </td>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      <a
                        href={`tel:${l.phone.replace(/[^0-9+]/g, "")}`}
                        style={{ color: "#b8922e" }}
                      >
                        {l.phone}
                      </a>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <a
                        href={`mailto:${l.email}`}
                        style={{ color: "#b8922e" }}
                      >
                        {l.email}
                      </a>
                    </td>
                    <td style={{ padding: "10px 12px" }}>{l.zip ?? ""}</td>
                    <td style={{ padding: "10px 12px" }}>{l.service ?? ""}</td>
                    <td style={{ padding: "10px 12px" }}>{l.sqft ?? ""}</td>
                    <td style={{ padding: "10px 12px" }}>{l.timeline ?? ""}</td>
                    <td
                      style={{
                        padding: "10px 12px",
                        maxWidth: "320px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {l.message ?? ""}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: "11px",
                        color: "#888",
                        maxWidth: "180px",
                        wordBreak: "break-all",
                      }}
                    >
                      {l.sourcePage ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
