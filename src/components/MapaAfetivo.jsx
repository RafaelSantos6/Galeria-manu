import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { styles } from '../styles/themeStyles';
import { PONTOS_MAPA } from '../constants/dadosApp';

const heartIcon = new L.DivIcon({
  html: `<div style="color: #ff85a2; filter: drop-shadow(0px 2px 5px rgba(0,0,0,0.4)); animation: pulse 1.5s infinite alternate;"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ff85a2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>`,
  className: 'custom-heart-marker', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32]
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 14, { animate: true, duration: 1 }); }, [center, map]);
  return null;
}

export default function MapaAfetivo() {
  const [mapCenter, setMapCenter] = useState([-26.3045, -48.8464]);

  return (
    <motion.div key="mapa" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={styles.mapPageWrapper}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)' }}>MAPA AFETIVO DE JOINVILLE</h1>
        <p style={{ color: '#fff', marginBottom: '30px', fontFamily: 'monospace' }}>CADA CANTO DA CIDADE GUARDA UM DETALHE NOSSO</p>
      </div>

      <div style={styles.mapLayoutContainer}>
        <div style={styles.mapSidebar}>
          {PONTOS_MAPA.map((ponto) => (
            <motion.div
              key={ponto.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setMapCenter(ponto.coords)}
              style={{
                ...styles.sidebarCard,
                border: mapCenter === ponto.coords ? '2px solid #ff85a2' : '1px solid rgba(255,255,255,0.1)',
                background: mapCenter === ponto.coords ? 'rgba(255,133,162,0.15)' : 'rgba(0,0,0,0.4)'
              }}
            >
              <h4 style={{ color: '#ff85a2', margin: '0 0 5px 0', fontSize: '1.1rem' }}>{ponto.titulo}</h4>
              <span style={{ color: '#00ff88', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{ponto.subtitulo}</span>
            </motion.div>
          ))}
        </div>

        <div style={styles.mapWrapperBox}>
          <MapContainer center={mapCenter} zoom={14} style={{ width: '100%', height: '100%' }} zoomControl={true}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <ChangeView center={mapCenter} />
            {PONTOS_MAPA.map((ponto) => (
              <Marker key={ponto.id} position={ponto.coords} icon={heartIcon}>
                <Popup className="custom-romantic-popup">
                  <div style={styles.popupContent}>
                    <img src={ponto.foto} style={styles.popupImage} alt={ponto.titulo} />
                    <h3 style={{ margin: '10px 0 3px 0', color: '#ff85a2', fontSize: '1.2rem' }}>{ponto.titulo}</h3>
                    <span style={{ color: '#00ff88', fontSize: '0.75rem', fontWeight: 'bold' }}>{ponto.subtitulo}</span>
                    <p style={{ color: '#333', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.4' }}>{ponto.descricao}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </motion.div>
  );
}
