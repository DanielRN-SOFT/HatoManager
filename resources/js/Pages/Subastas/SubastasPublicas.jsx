// resources/js/Pages/Subastas/Index.jsx
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/* ─────────────────────────── helpers ─────────────────────────── */
function useCountdown(initialSeconds) {
    const [secs, setSecs] = useState(initialSeconds);
    useEffect(() => {
        const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
        return () => clearInterval(id);
    }, []);
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

/* ─────────────────────────── sub-components ─────────────────────────── */
function LiveBadge({ seconds }) {
    const time = useCountdown(seconds);
    return (
        <div className="auction-timer">
            <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
            >
                schedule
            </span>
            <span className="tabular-nums">{time}</span>
        </div>
    );
}

function ActiveAuctionCard({
    lot,
    farm,
    region,
    bid,
    bids,
    bidders,
    lastBid,
    seconds,
}) {
    return (
        <div className="auction-card">
            <div className="auction-card__image-wrap">
                <div className="auction-card__image-placeholder" />
                <LiveBadge seconds={seconds} />
            </div>
            <div className="auction-card__body">
                <div className="auction-card__header">
                    <h3 className="auction-card__title">{lot}</h3>
                    <div className="auction-card__meta">
                        <span className="auction-card__farm">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 14 }}
                            >
                                agriculture
                            </span>
                            {farm}
                        </span>
                        <span className="auction-card__region">{region}</span>
                    </div>
                </div>
                <div className="auction-card__stats">
                    <div className="auction-card__bid-box">
                        <span className="auction-card__bid-label">
                            Puja actual
                        </span>
                        <span className="auction-card__bid-value">{bid}</span>
                    </div>
                    <div className="auction-card__counters">
                        <div className="auction-card__tags">
                            <span className="tag tag--primary">
                                {bids} pujas
                            </span>
                            <span className="tag tag--secondary">
                                {bidders} postores
                            </span>
                        </div>
                        <p className="auction-card__last-bid">{lastBid}</p>
                    </div>
                </div>
                <button className="btn-auction">
                    Ver subasta
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}

function UpcomingAuctionCard({ lot, region, animals, date }) {
    const [reminded, setReminded] = useState(false);
    return (
        <div className="upcoming-card">
            <div className="upcoming-card__image-wrap">
                <div className="upcoming-card__image-placeholder" />
                <div className="upcoming-card__date-badge">
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 14 }}
                    >
                        calendar_today
                    </span>
                    {date}
                </div>
            </div>
            <div className="upcoming-card__body">
                <h4 className="upcoming-card__title">{lot}</h4>
                <div className="upcoming-card__info">
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 13,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                        >
                            location_on
                        </span>
                        {region}
                    </span>
                    <span
                        style={{
                            fontSize: 13,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        • {animals} Animales
                    </span>
                </div>
                <button
                    className={`btn-remind${reminded ? 'btn-remind--active' : ''}`}
                    onClick={() => setReminded((r) => !r)}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 14 }}
                    >
                        {reminded ? 'notifications_active' : 'notifications'}
                    </span>
                    {reminded ? 'Recordatorio activo' : 'Recordarme'}
                </button>
            </div>
        </div>
    );
}

/* ─────────────────────────── data ─────────────────────────── */
const ACTIVE_AUCTIONS = [
    {
        id: 1,
        lot: 'Lote 24: Novillas de Vientre',
        farm: 'Hacienda El Rocío',
        region: 'Casanare',
        bid: '$15.400.000 COP',
        bids: 12,
        bidders: 5,
        lastBid: 'Última puja hace 3 mins',
        seconds: 9258,
    },
    {
        id: 2,
        lot: 'Lote 27: Toros de Registro',
        farm: 'Ganadería Los Pinos',
        region: 'Antioquia',
        bid: '$32.000.000 COP',
        bids: 28,
        bidders: 9,
        lastBid: 'Última puja hace 1 min',
        seconds: 2712,
    },
];

const UPCOMING_AUCTIONS = [
    {
        id: 1,
        lot: 'Lote 31: Vacas Paridas',
        region: 'Meta',
        animals: 15,
        date: '25 Oct, 10:00 AM',
    },
    {
        id: 2,
        lot: 'Lote 35: Terneros de Destete',
        region: 'Córdoba',
        animals: 40,
        date: '26 Oct, 09:00 AM',
    },
    {
        id: 3,
        lot: 'Lote 42: Novillos Cebados',
        region: 'Cesar',
        animals: 22,
        date: '28 Oct, 02:00 PM',
    },
];

/* ─────────────────────────── page ─────────────────────────── */
export default function SubastasIndex() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    return (
        <PublicLayout>
            <Head title="Subastas - Agro-Pro" />

            <style>{`
                /* ── HERO ── */
                .hero {
                    background-color: #3B6D11;
                    padding: 4rem 2rem;
                    position: relative;
                    overflow: hidden;
                }
                .hero__dots {
                    position: absolute;
                    inset: 0;
                    opacity: .1;
                    background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
                    background-size: 40px 40px;
                }
                .hero__content {
                    position: relative;
                    z-index: 1;
                    max-width: 1440px;
                    margin: 0 auto;
                }
                .hero__title {
                    color: #fff;
                    font-size: clamp(2rem, 5vw, 3.75rem);
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 1.25rem;
                    letter-spacing: -.02em;
                }
                .hero__subtitle {
                    color: #b2ed83;
                    font-size: clamp(1rem, 2vw, 1.375rem);
                    max-width: 42rem;
                    font-weight: 500;
                    line-height: 1.6;
                }

                /* ── PAGE WRAPPER ── */
                .page-content {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 3rem 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                /* ── SECTION HEADERS ── */
                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                    padding-left: 1rem;
                }
                .section-header--active  { border-left: 4px solid var(--primary); }
                .section-header--upcoming { border-left: 4px solid #2563eb; }

                .section-title {
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 700;
                    color: var(--on-surface);
                }
                .live-indicator {
                    display: flex;
                    align-items: center;
                    gap: .5rem;
                    color: var(--primary);
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: .05em;
                }
                .live-dot {
                    position: relative;
                    width: 10px;
                    height: 10px;
                }
                .live-dot::before,
                .live-dot::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: var(--primary);
                }
                .live-dot::before {
                    animation: ping 1.5s cubic-bezier(0,0,.2,1) infinite;
                    opacity: .75;
                }
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                .upcoming-badge {
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: .2rem .75rem;
                    border-radius: 9999px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: .05em;
                }

                /* ── ACTIVE AUCTION CARD ── */
                .auctions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr));
                    gap: 2rem;
                }
                .auction-card {
                    background: #fff;
                    border-radius: .75rem;
                    border: 1px solid var(--outline-variant);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: box-shadow .3s, transform .3s;
                }
                .auction-card:hover {
                    box-shadow: 0 8px 32px rgba(0,0,0,.12);
                    transform: translateY(-2px);
                }
                .auction-card__image-wrap {
                    height: 240px;
                    position: relative;
                    background: var(--surface-container);
                    overflow: hidden;
                }
                .auction-card__image-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 40%, #81c784 100%);
                }
                .auction-timer {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: #f59e0b;
                    color: #fff;
                    padding: .5rem 1rem;
                    border-radius: 9999px;
                    font-weight: 700;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: .5rem;
                    box-shadow: 0 2px 8px rgba(245,158,11,.4);
                }
                .auction-card__body {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                .auction-card__title {
                    font-size: 1.375rem;
                    font-weight: 700;
                    color: var(--on-surface);
                    margin-bottom: .25rem;
                }
                .auction-card__meta {
                    display: flex;
                    align-items: center;
                    gap: .75rem;
                    flex-wrap: wrap;
                }
                .auction-card__farm {
                    display: flex;
                    align-items: center;
                    gap: .25rem;
                    color: var(--on-surface-variant);
                    font-weight: 500;
                    font-size: 14px;
                }
                .auction-card__region {
                    background: var(--surface-container-high);
                    color: var(--on-surface-variant);
                    padding: .2rem .75rem;
                    border-radius: 9999px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .05em;
                }
                .auction-card__stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .auction-card__bid-box {
                    background: var(--surface-container-low);
                    padding: 1rem;
                    border-radius: .5rem;
                }
                .auction-card__bid-label {
                    display: block;
                    font-size: 12px;
                    color: var(--on-surface-variant);
                    margin-bottom: .25rem;
                }
                .auction-card__bid-value {
                    font-size: 1.375rem;
                    font-weight: 700;
                    color: var(--primary);
                    letter-spacing: -.02em;
                }
                .auction-card__counters {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: .5rem;
                }
                .auction-card__tags {
                    display: flex;
                    gap: .5rem;
                    flex-wrap: wrap;
                }
                .tag {
                    padding: .2rem .5rem;
                    border-radius: .375rem;
                    font-size: 11px;
                    font-weight: 700;
                }
                .tag--primary {
                    background: rgba(59,109,17,.12);
                    color: var(--primary);
                }
                .tag--secondary {
                    background: rgba(62,106,0,.1);
                    color: var(--secondary);
                }
                .auction-card__last-bid {
                    font-size: 11px;
                    color: var(--on-surface-variant);
                    font-style: italic;
                }
                .btn-auction {
                    width: 100%;
                    background: #3B6D11;
                    color: #fff;
                    border: none;
                    padding: 1rem;
                    border-radius: .5rem;
                    font-family: inherit;
                    font-weight: 700;
                    font-size: 1.0625rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: .5rem;
                    transition: background .2s, transform .1s;
                    margin-top: auto;
                }
                .btn-auction:hover { background: var(--primary); }
                .btn-auction:active { transform: scale(.98); }

                /* ── UPCOMING CARD ── */
                .upcoming-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
                    gap: 1.5rem;
                }
                .upcoming-card {
                    background: #eff6ff80;
                    border-radius: .75rem;
                    border: 1px solid #bfdbfe;
                    overflow: hidden;
                    transition: border-color .2s;
                }
                .upcoming-card:hover { border-color: #60a5fa; }
                .upcoming-card__image-wrap {
                    height: 180px;
                    position: relative;
                    overflow: hidden;
                }
                .upcoming-card__image-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%);
                    filter: grayscale(.3);
                    transition: filter .3s;
                }
                .upcoming-card:hover .upcoming-card__image-placeholder {
                    filter: grayscale(0);
                }
                .upcoming-card__image-wrap::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(37,99,235,.08);
                }
                .upcoming-card__date-badge {
                    position: absolute;
                    bottom: .75rem;
                    left: .75rem;
                    z-index: 1;
                    background: rgba(255,255,255,.92);
                    backdrop-filter: blur(4px);
                    color: #1d4ed8;
                    font-size: 12px;
                    font-weight: 700;
                    padding: .25rem .75rem;
                    border-radius: .375rem;
                    display: flex;
                    align-items: center;
                    gap: .25rem;
                }
                .upcoming-card__body {
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: .75rem;
                }
                .upcoming-card__title {
                    font-size: 1.0625rem;
                    font-weight: 700;
                    color: var(--on-surface);
                }
                .upcoming-card__info {
                    display: flex;
                    flex-wrap: wrap;
                    gap: .5rem;
                }
                .btn-remind {
                    width: 100%;
                    background: none;
                    border: 2px solid #2563eb;
                    color: #2563eb;
                    padding: .625rem 1rem;
                    border-radius: .5rem;
                    font-family: inherit;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: .5rem;
                    transition: all .2s;
                }
                .btn-remind:hover {
                    background: #2563eb;
                    color: #fff;
                }
                .btn-remind--active {
                    background: #2563eb;
                    color: #fff;
                }

                /* ── TRUST SECTION ── */
                .trust-section {
                    background: var(--surface-container);
                    border-radius: 1rem;
                    padding: 3rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: center;
                }
                @media (max-width: 768px) {
                    .trust-section { grid-template-columns: 1fr; }
                }
                .trust-section__heading {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--on-surface);
                    margin-bottom: 1rem;
                }
                .trust-section__body {
                    color: var(--on-surface-variant);
                    font-size: 1.0625rem;
                    line-height: 1.65;
                    margin-bottom: 1.5rem;
                }
                .trust-items { display: flex; flex-direction: column; gap: 1rem; }
                .trust-item { display: flex; align-items: flex-start; gap: 1rem; }
                .trust-icon {
                    background: rgba(59,109,17,.12);
                    padding: .75rem;
                    border-radius: 9999px;
                    flex-shrink: 0;
                    color: var(--primary);
                }
                .trust-item-title { font-weight: 700; color: var(--on-surface); font-size: 15px; }
                .trust-item-desc { color: var(--on-surface-variant); font-size: 13px; margin-top: 2px; }

                /* ── NEWSLETTER ── */
                .newsletter-card {
                    background: #fff;
                    border-radius: .75rem;
                    padding: 2rem;
                    border: 1px solid var(--outline-variant);
                    box-shadow: 0 1px 4px rgba(0,0,0,.06);
                }
                .newsletter-card h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: .75rem;
                }
                .newsletter-card p {
                    color: var(--on-surface-variant);
                    font-size: 14px;
                    margin-bottom: 1.25rem;
                    line-height: 1.6;
                }
                .newsletter-form {
                    display: flex;
                    flex-direction: column;
                    gap: .75rem;
                }
                .newsletter-input {
                    background: var(--surface);
                    border: 1px solid var(--outline-variant);
                    border-radius: .5rem;
                    padding: .75rem 1rem;
                    font-family: inherit;
                    font-size: 14px;
                    outline: none;
                    transition: border-color .2s, box-shadow .2s;
                }
                .newsletter-input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(39,83,0,.15);
                }
                .newsletter-submit {
                    background: var(--primary);
                    color: var(--on-primary);
                    border: none;
                    padding: .75rem;
                    border-radius: .5rem;
                    font-family: inherit;
                    font-weight: 700;
                    font-size: 15px;
                    cursor: pointer;
                    transition: background .2s;
                }
                .newsletter-submit:hover { background: var(--primary-container); }
                .newsletter-legal {
                    font-size: 10px;
                    color: var(--on-surface-variant);
                    text-align: center;
                    margin-top: .5rem;
                }
            `}</style>

            {/* Hero */}
            <header className="hero">
                <div className="hero__dots" />
                <div className="hero__content">
                    <h1 className="hero__title">Subastas de ganado en línea</h1>
                    <p className="hero__subtitle">
                        Participa en subastas verificadas directamente con
                        ganaderos colombianos.
                    </p>
                </div>
            </header>

            <div className="page-content">
                {/* Active Auctions */}
                <section>
                    <div className="section-header section-header--active">
                        <h2 className="section-title">Subastas Activas</h2>
                        <div className="live-indicator">
                            <span className="live-dot" />
                            EN VIVO
                        </div>
                    </div>
                    <div className="auctions-grid">
                        {ACTIVE_AUCTIONS.map((a) => (
                            <ActiveAuctionCard key={a.id} {...a} />
                        ))}
                    </div>
                </section>

                {/* Upcoming Auctions */}
                <section>
                    <div className="section-header section-header--upcoming">
                        <h2 className="section-title">Próximas Subastas</h2>
                        <span className="upcoming-badge">PROGRAMADAS</span>
                    </div>
                    <div className="upcoming-grid">
                        {UPCOMING_AUCTIONS.map((a) => (
                            <UpcomingAuctionCard key={a.id} {...a} />
                        ))}
                    </div>
                </section>

                {/* Trust + Newsletter */}
                <section className="trust-section">
                    <div>
                        <h2 className="trust-section__heading">
                            Transparencia y Seguridad Garantizada
                        </h2>
                        <p className="trust-section__body">
                            Todas nuestras subastas cuentan con el respaldo de
                            asociaciones ganaderas locales. Verificamos cada
                            lote personalmente antes de publicarlo.
                        </p>
                        <div className="trust-items">
                            <div className="trust-item">
                                <div className="trust-icon">
                                    <span className="material-symbols-outlined">
                                        verified
                                    </span>
                                </div>
                                <div>
                                    <div className="trust-item-title">
                                        Vendedores Verificados
                                    </div>
                                    <div className="trust-item-desc">
                                        Protocolos estrictos de autenticación de
                                        identidad.
                                    </div>
                                </div>
                            </div>
                            <div className="trust-item">
                                <div className="trust-icon">
                                    <span className="material-symbols-outlined">
                                        health_and_safety
                                    </span>
                                </div>
                                <div>
                                    <div className="trust-item-title">
                                        Garantía Sanitaria
                                    </div>
                                    <div className="trust-item-desc">
                                        Certificados de vacunación y salud al
                                        día por el ICA.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="newsletter-card">
                        <h3>No te pierdas ninguna oferta</h3>
                        <p>
                            Suscríbete a nuestro boletín semanal con los mejores
                            lotes disponibles.
                        </p>
                        {subscribed ? (
                            <div
                                style={{
                                    background: 'rgba(39,83,0,.08)',
                                    color: 'var(--primary)',
                                    padding: '1rem',
                                    borderRadius: '.5rem',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    fontSize: 15,
                                }}
                            >
                                ✓ ¡Suscripción exitosa!
                            </div>
                        ) : (
                            <div className="newsletter-form">
                                <input
                                    className="newsletter-input"
                                    type="email"
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className="newsletter-submit"
                                    onClick={() => email && setSubscribed(true)}
                                >
                                    Suscribirme ahora
                                </button>
                            </div>
                        )}
                        <p className="newsletter-legal">
                            Al suscribirte, aceptas nuestras políticas de
                            privacidad.
                        </p>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
