/**
 * Enhanced Lighting Component for 3D Model
 * 
 * Uses a multi-light setup for optimal visibility:
 * - Hemisphere light for natural ambient fill (sky-to-ground gradient)
 * - Strong ambient light for base illumination
 * - Key light (main directional) for primary shadows
 * - Fill lights to reduce harsh shadows
 * - Rim/back lights for edge definition and dramatic effect
 * - Warm accent lights for metallic material highlights
 */

function Lighting() {
  return (
    <>
      {/* ============================================
          AMBIENT & HEMISPHERE LIGHTS
          Base illumination to ensure visibility
          ============================================ */}

      {/* Hemisphere light: Creates natural gradient from sky to ground */}
      <hemisphereLight
        args={['#ffeeb1', '#080820', 1.2]} // Sky color, ground color, intensity
      />

      {/* Strong ambient light for overall visibility - prevents dark spots */}
      <ambientLight intensity={1.5} color="#ffffff" />

      {/* ============================================
          KEY LIGHT (Main Light Source)
          Primary light creating main shadows
          ============================================ */}
      <directionalLight
        position={[8, 10, 8]}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      {/* ============================================
          FILL LIGHTS
          Soften shadows and add depth
          ============================================ */}

      {/* Left fill light - softens right-side shadows */}
      <directionalLight
        position={[-8, 5, 5]}
        intensity={2}
        color="#e8f4ff"
      />

      {/* Front fill light - illuminates the face of the model */}
      <directionalLight
        position={[0, 3, 10]}
        intensity={2.5}
        color="#ffffff"
      />

      {/* Bottom fill light - reduces under-shadows, adds depth */}
      <directionalLight
        position={[0, -8, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* ============================================
          RIM/BACK LIGHTS
          Edge definition and dramatic effect
          ============================================ */}

      {/* Back rim light - creates edge highlights */}
      <directionalLight
        position={[-5, 8, -10]}
        intensity={2}
        color="#ffffff"
      />

      {/* ============================================
          ACCENT LIGHTS (Point Lights)
          Warm highlights for metallic/gold materials
          ============================================ */}

      {/* Warm gold accent - enhances Bitcoin's golden color */}
      <pointLight
        position={[5, 5, 5]}
        intensity={3}
        color="#ffa500"
        distance={20}
        decay={2}
      />

      {/* Secondary warm accent from opposite side */}
      <pointLight
        position={[-5, 0, 5]}
        intensity={2}
        color="#ffcc00"
        distance={15}
        decay={2}
      />

      {/* Cool accent for contrast */}
      <pointLight
        position={[0, -5, 8]}
        intensity={1.5}
        color="#ffffff"
        distance={15}
        decay={2}
      />

      {/* ============================================
          SPOTLIGHT
          Focused beam for dramatic highlights
          ============================================ */}
      <spotLight
        position={[0, 15, 10]}
        angle={0.5}
        penumbra={0.8}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}

export default Lighting;