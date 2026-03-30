import { useEffect, useState } from "react";

export default function WhatsAppButton() {
    const [visible, setVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show button after 2 seconds
        const timer = setTimeout(() => setVisible(true), 2000);
        // Show tooltip after 4 seconds
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
            // Hide tooltip after 5 seconds
            setTimeout(() => setShowTooltip(false), 5000);
        }, 4000);
        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    return (
        <>
            <style>{`
                @keyframes wa-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-6px) scale(1.05); }
                }
                @keyframes wa-fade-in {
                    from { opacity: 0; transform: translateY(20px) scale(0.8); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes wa-pulse-ring {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes tooltip-slide {
                    from { opacity: 0; transform: translateX(10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .wa-btn {
                    animation: wa-fade-in 0.5s ease forwards, wa-bounce 3s ease-in-out 3s infinite;
                }
                .wa-pulse {
                    animation: wa-pulse-ring 1.5s ease-out infinite;
                }
                .wa-tooltip {
                    animation: tooltip-slide 0.3s ease forwards;
                }
            `}</style>

            {visible && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "28px",
                        right: "28px",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    {/* Tooltip */}
                    {showTooltip && (
                        <div
                            className="wa-tooltip"
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "10px 14px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                                border: "1px solid #e2e8f0",
                                maxWidth: "200px",
                                position: "relative",
                            }}
                        >
                            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1e293b", lineHeight: 1.4 }}>
                                💬 Chat with us!
                            </p>
                            <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748b", lineHeight: 1.4 }}>
                                Get answers in minutes
                            </p>
                            {/* Arrow */}
                            <div style={{
                                position: "absolute",
                                right: "-8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 0,
                                height: 0,
                                borderTop: "8px solid transparent",
                                borderBottom: "8px solid transparent",
                                borderLeft: "8px solid white",
                            }} />
                        </div>
                    )}

                    {/* Button */}
                    <div style={{ position: "relative" }}>
                        {/* Pulse ring */}
                        <div
                            className="wa-pulse"
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                background: "#25D366",
                                pointerEvents: "none",
                            }}
                        />
                        <a
                            href="https://wa.me/13072180376?text=Hi%2C%20I%27m%20interested%20in%20forming%20a%20US%20LLC.%20Can%20you%20help%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wa-btn"
                            title="Chat on WhatsApp"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                background: "#25D366",
                                boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
                                position: "relative",
                                zIndex: 1,
                                textDecoration: "none",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(37,211,102,0.6)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.5)";
                            }}
                        >
                            {/* WhatsApp SVG icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width="32"
                                height="32"
                                fill="white"
                            >
                                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4a11.4 11.4 0 0 1-5.8-1.58l-.42-.24-4.42 1.04 1.06-4.3-.28-.44A11.36 11.36 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.24-8.52c-.34-.18-2.02-1-2.34-1.1-.32-.12-.56-.18-.8.18-.22.34-.88 1.1-1.08 1.34-.2.22-.4.24-.74.08-.34-.18-1.44-.52-2.74-1.66-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.4.52-.6.18-.2.22-.34.34-.56.12-.22.06-.42-.02-.6-.08-.18-.8-1.92-1.1-2.62-.28-.68-.58-.58-.8-.6h-.68c-.22 0-.58.08-.9.42-.3.34-1.16 1.14-1.16 2.78s1.18 3.22 1.34 3.44c.18.22 2.34 3.56 5.66 4.98.8.34 1.42.54 1.9.7.8.26 1.52.22 2.1.14.64-.1 1.98-.82 2.26-1.6.28-.8.28-1.48.2-1.62-.1-.14-.3-.22-.64-.4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
