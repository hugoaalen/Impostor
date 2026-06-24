import { useEffect, useMemo, useState } from "react";
import { categories, createRound, type Round } from "./game";
import { loadSettings, saveSettings } from "./settings";

type Screen = "home" | "setup" | "reveal" | "round";

function App() {
  const [initialSettings] = useState(loadSettings);
  const [screen, setScreen] = useState<Screen>("home");
  const [players, setPlayers] = useState(initialSettings.players);
  const [impostors, setImpostors] = useState(initialSettings.impostors);
  const [impostorHintsEnabled, setImpostorHintsEnabled] = useState(
    initialSettings.impostorHintsEnabled,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSettings.selectedCategories,
  );
  const [customPlayerNames, setCustomPlayerNames] = useState<string[]>(
    initialSettings.customPlayerNames,
  );
  const [showPlayerNames, setShowPlayerNames] = useState(false);
  const [round, setRound] = useState<Round | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);

  const playerNames = useMemo(
    () =>
      Array.from({ length: players }, (_, index) => {
        const customName = customPlayerNames[index]?.trim();
        return customName || `Jugador ${index + 1}`;
      }),
    [customPlayerNames, players],
  );

  useEffect(() => {
    saveSettings({
      players,
      impostors,
      impostorHintsEnabled,
      selectedCategories,
      customPlayerNames,
    });
  }, [customPlayerNames, impostorHintsEnabled, impostors, players, selectedCategories]);

  const setPlayerCount = (nextPlayers: number) => {
    const bounded = Math.min(14, Math.max(3, nextPlayers));
    setPlayers(bounded);
    setImpostors((current) => Math.min(current, Math.max(1, bounded - 2)));
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((current) =>
      current.includes(id)
        ? current.filter((categoryId) => categoryId !== id)
        : [...current, id],
    );
  };

  const toggleAllCategories = () => {
    setSelectedCategories((current) =>
      current.length === categories.length
        ? []
        : categories.map((category) => category.id),
    );
  };

  const updatePlayerName = (index: number, name: string) => {
    setCustomPlayerNames((current) =>
      current.map((currentName, currentIndex) =>
        currentIndex === index ? name : currentName,
      ),
    );
  };

  const startGame = () => {
    const nextRound = createRound(selectedCategories, players, impostors);
    setRound(nextRound);
    setCurrentPlayer(0);
    setCardRevealed(false);
    setScreen("reveal");
  };

  const continueReveal = () => {
    if (currentPlayer === players - 1) {
      setScreen("round");
      setCardRevealed(false);
      return;
    }
    setCurrentPlayer((current) => current + 1);
    setCardRevealed(false);
  };

  const resetGame = () => {
    setRound(null);
    setCurrentPlayer(0);
    setCardRevealed(false);
    setScreen("setup");
  };

  return (
    <main className="app-shell">
      <div className="grain" aria-hidden="true" />

      {screen === "home" && (
        <section className="screen home-screen">
          <header className="brand">
            <span className="brand-mark">?</span>
            <span>¿Quién finge?</span>
          </header>

          <div className="hero">
            <p className="eyebrow">Un móvil. Una palabra. Algún mentiroso.</p>
            <h1>
              Todos saben de qué hablan.
              <span> Menos tú.</span>
            </h1>
            <p className="hero-copy">
              Elige categorías, pasa el móvil y descubre quién está improvisando.
              Sin registros, sin anuncios y sin votaciones innecesarias.
            </p>
            <button className="primary-button hero-button" onClick={() => setScreen("setup")}>
              Crear partida <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="home-preview" aria-hidden="true">
            <div className="floating-card card-left">🍕</div>
            <div className="secret-card">
              <span className="tiny-label">TU PALABRA ES</span>
              <strong>SECRETO</strong>
              <span className="card-category">Categoría sorpresa</span>
            </div>
            <div className="floating-card card-right">🦊</div>
          </div>

          <div className="feature-strip">
            <span>✓ Gratis</span>
            <span>✓ Sin cuentas</span>
            <span>✓ 3–14 jugadores</span>
          </div>
        </section>
      )}

      {screen === "setup" && (
        <section className="screen setup-screen">
          <header className="topbar">
            <button className="icon-button" onClick={() => setScreen("home")} aria-label="Volver">
              ←
            </button>
            <div className="mini-brand">
              <span className="brand-mark small">?</span>
              <span>Nueva partida</span>
            </div>
            <span className="topbar-spacer" />
          </header>

          <div className="setup-content">
            <div className="section-heading">
              <span className="step-number">01</span>
              <div>
                <h2>¿Cuántos jugáis?</h2>
                <p>Necesitáis al menos 3 personas.</p>
              </div>
            </div>

            <div className="counter-panel">
              <button onClick={() => setPlayerCount(players - 1)} aria-label="Quitar jugador">−</button>
              <div>
                <strong>{players}</strong>
                <span>jugadores</span>
              </div>
              <button onClick={() => setPlayerCount(players + 1)} aria-label="Añadir jugador">+</button>
            </div>

            <div className="impostor-row">
              <div>
                <strong>Impostores</strong>
                <span>¿Cuántos no conocerán la palabra?</span>
              </div>
              <div className="small-counter">
                <button onClick={() => setImpostors(Math.max(1, impostors - 1))}>−</button>
                <strong>{impostors}</strong>
                <button onClick={() => setImpostors(Math.min(players - 2, impostors + 1))}>+</button>
              </div>
            </div>

            <button
              className={`setting-toggle ${impostorHintsEnabled ? "active" : ""}`}
              onClick={() => setImpostorHintsEnabled((current) => !current)}
              aria-pressed={impostorHintsEnabled}
            >
              <span>
                <strong>Pista para impostores</strong>
                <small>
                  {impostorHintsEnabled
                    ? "El impostor verá una pista amplia de la categoría"
                    : "El impostor irá totalmente a ciegas"}
                </small>
              </span>
              <span className="switch" aria-hidden="true">
                <span />
              </span>
            </button>

            <div className="section-heading names-heading">
              <span className="step-number">02</span>
              <div>
                <h2>Nombres</h2>
                <p>Opcional. Si lo dejas vacío, usaremos Jugador 1, 2, 3…</p>
              </div>
            </div>

            <button
              className="names-toggle"
              onClick={() => setShowPlayerNames((current) => !current)}
              aria-expanded={showPlayerNames}
              aria-controls="player-names"
            >
              <span>
                <strong>{showPlayerNames ? "Ocultar nombres" : "Añadir nombres"}</strong>
                <small>
                  {customPlayerNames.slice(0, players).filter((name) => name.trim()).length
                    ? `${customPlayerNames.slice(0, players).filter((name) => name.trim()).length} personalizados`
                    : "Mantener nombres automáticos"}
                </small>
              </span>
              <span className={`toggle-chevron ${showPlayerNames ? "open" : ""}`}>⌄</span>
            </button>

            {showPlayerNames && (
              <div className="player-name-grid" id="player-names">
                {Array.from({ length: players }, (_, index) => (
                  <label className="player-name-field" key={index}>
                    <span>{index + 1}</span>
                    <input
                      type="text"
                      value={customPlayerNames[index]}
                      onChange={(event) => updatePlayerName(index, event.target.value)}
                      placeholder={`Jugador ${index + 1}`}
                      maxLength={24}
                      autoComplete="off"
                      aria-label={`Nombre del jugador ${index + 1}`}
                    />
                    {customPlayerNames[index] && (
                      <button
                        type="button"
                        onClick={() => updatePlayerName(index, "")}
                        aria-label={`Restaurar nombre del jugador ${index + 1}`}
                      >
                        ×
                      </button>
                    )}
                  </label>
                ))}
              </div>
            )}

            <div className="section-heading category-heading">
              <span className="step-number">03</span>
              <div>
                <h2>Elige categorías</h2>
                <p>Mezclaremos palabras de todas las seleccionadas.</p>
              </div>
            </div>

            <div className="category-grid">
              <button
                className={`category-card all-categories-card ${
                  selectedCategories.length === categories.length ? "selected" : ""
                } ${selectedCategories.length > 0 && selectedCategories.length < categories.length ? "partial" : ""}`}
                onClick={toggleAllCategories}
                style={{ "--category-color": "#f26a2e" } as React.CSSProperties}
                aria-pressed={selectedCategories.length === categories.length}
              >
                <span className="category-emoji">✨</span>
                <span className="category-copy">
                  <strong>Todas</strong>
                  <small>
                    {selectedCategories.length === categories.length
                      ? `Las ${categories.length} categorías seleccionadas`
                      : "Seleccionar todo el catálogo"}
                  </small>
                </span>
                <span className="check">
                  {selectedCategories.length === categories.length
                    ? "✓"
                    : selectedCategories.length > 0
                      ? "−"
                      : ""}
                </span>
              </button>

              {categories.map((category) => {
                const selected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    className={`category-card ${selected ? "selected" : ""}`}
                    onClick={() => toggleCategory(category.id)}
                    style={{ "--category-color": category.color } as React.CSSProperties}
                    aria-pressed={selected}
                  >
                    <span className="category-emoji">{category.emoji}</span>
                    <span className="category-copy">
                      <strong>{category.name}</strong>
                      <small>{category.description}</small>
                    </span>
                    <span className="check">{selected ? "✓" : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sticky-action">
            <div>
              <span>
                {selectedCategories.length === categories.length
                  ? "Todas las categorías"
                  : `${selectedCategories.length} categorías`}
              </span>
              <small>{players} jugadores · {impostors} impostor{impostors > 1 ? "es" : ""}</small>
            </div>
            <button
              className="primary-button"
              onClick={startGame}
              disabled={selectedCategories.length === 0}
            >
              Empezar <span>→</span>
            </button>
          </div>
        </section>
      )}

      {screen === "reveal" && round && (
        <section className="screen reveal-screen">
          <div className="reveal-progress">
            <span>Repartiendo roles</span>
            <strong>{currentPlayer + 1} / {players}</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${((currentPlayer + 1) / players) * 100}%` }} />
          </div>

          <div className="reveal-copy">
            <p>Pasa el móvil a</p>
            <h2>{playerNames[currentPlayer]}</h2>
            <span>Que nadie mire la pantalla 👀</span>
          </div>

          <button
            className={`role-card ${cardRevealed ? "revealed" : ""}`}
            onClick={() => setCardRevealed(true)}
            disabled={cardRevealed}
          >
            {!cardRevealed ? (
              <div className="card-cover">
                <span className="cover-icon">?</span>
                <strong>Toca para ver tu rol</strong>
                <small>Después, ocúltalo antes de pasar el móvil</small>
              </div>
            ) : round.impostorIndexes.includes(currentPlayer) ? (
              <div className="role-content impostor-role">
                <span className="role-emoji">🕵️</span>
                <span className="tiny-label">TU ROL ES</span>
                <strong>IMPOSTOR</strong>
                <p>No conoces la palabra. Escucha, improvisa y que no te descubran.</p>
                {impostorHintsEnabled && (
                  <div className="impostor-hint">
                    <span>Pista</span>
                    <strong>{round.impostorHint}</strong>
                  </div>
                )}
                <span className="category-pill">
                  {round.category.emoji} {round.category.name}
                </span>
              </div>
            ) : (
              <div className="role-content citizen-role">
                <span className="tiny-label">LA PALABRA ES</span>
                <strong>{round.word}</strong>
                <p>Da una pista útil, pero no se lo pongas fácil al impostor.</p>
                <span className="category-pill">
                  {round.category.emoji} {round.category.name}
                </span>
              </div>
            )}
          </button>

          <button
            className="primary-button full-width"
            onClick={continueReveal}
            disabled={!cardRevealed}
          >
            {currentPlayer === players - 1 ? "Todos listos" : "Ocultar y pasar"} <span>→</span>
          </button>
        </section>
      )}

      {screen === "round" && round && (
        <section className="screen round-screen">
          <div className="round-icon">{round.category.emoji}</div>
          <p className="eyebrow">Empieza la ronda</p>
          <h2>Hablad. Dudad.<br />No regaléis la palabra.</h2>
          <div className="starter-card">
            <span>Empieza dando una pista</span>
            <strong>{playerNames[round.startingPlayer]}</strong>
          </div>

          <div className="rules">
            <div><span>1</span><p>Cada persona da una pista relacionada.</p></div>
            <div><span>2</span><p>Comentad quién parece estar improvisando.</p></div>
            <div><span>3</span><p>Cuando queráis, señalad al impostor en persona.</p></div>
          </div>

          <div className="round-actions">
            <button className="primary-button full-width" onClick={startGame}>
              Otra ronda <span>↻</span>
            </button>
            <button className="text-button" onClick={resetGame}>Cambiar configuración</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
